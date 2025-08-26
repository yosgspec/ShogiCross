using System;
using System.Collections.Concurrent;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

public class Program{
	private static readonly ConcurrentDictionary<string, List<WebSocket>> _games = new();
	private static readonly ConcurrentDictionary<WebSocket, string> _wsToGame = new();
	private static readonly ConcurrentDictionary<WebSocket, int> _wsToDeg = new();

	public static async Task Main(string[] args){
		var listener = new HttpListener();
		listener.Prefixes.Add("http://localhost:8080/");

		Console.WriteLine("WebSocket server started on port 3000");
		listener.Start();

		while(true){
			var context = await listener.GetContextAsync();
			if(context.Request.IsWebSocketRequest){
				_ = ProcessWebSocketRequest(context);
			}
			else{
				context.Response.StatusCode = 400;
				context.Response.Close();
			}
		}
	}

	private static async Task ProcessWebSocketRequest(HttpListenerContext context){
		WebSocketContext? webSocketContext = null;
		try{
			webSocketContext = await context.AcceptWebSocketAsync(subProtocol: null);
			Console.WriteLine("Client connected");
		}
		catch(Exception e){
			context.Response.StatusCode = 500;
			context.Response.Close();
			Console.Error.WriteLine($"WebSocket accept error: {e.Message}");
			return;
		}

		WebSocket ws = webSocketContext.WebSocket;

		try{
			var buffer = new byte[1024 * 4];
			while(ws.State == WebSocketState.Open){
				var receiveResult = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

				if(receiveResult.MessageType == WebSocketMessageType.Close){
					await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
				}
				else{
					var message = Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);
					Console.WriteLine($"Received: {message}");

					using var jsonDoc = JsonDocument.Parse(message);
					var type = jsonDoc.RootElement.GetProperty("type").GetString();

					if(type == "join"){
						var gameName = jsonDoc.RootElement.GetProperty("gameName").GetString();
						var game = _games.GetOrAdd(gameName, new List<WebSocket>());

						WebSocket? player1 = null;
						WebSocket? player2 = null;

						lock(game){
							game.RemoveAll(socket=>socket.State != WebSocketState.Open);
							game.Add(ws);
							_wsToGame[ws] = gameName;
							Console.WriteLine($"Client joined game: {gameName}. Players: {game.Count}");

							if(game.Count == 2){
								Console.WriteLine($"Game '{gameName}' starting with 2 players.");
								player1 = game[0];
								player2 = game[1];
								_wsToDeg[player1] = 0;
								_wsToDeg[player2] = 180;
							}
						}

						if(player1 != null && player2 != null){
							var readyMsg1 = new {type = "readyOnline", playerId = 0};
							var bytes1 = JsonSerializer.SerializeToUtf8Bytes(readyMsg1);
							if(player1.State == WebSocketState.Open) await player1.SendAsync(new ArraySegment<byte>(bytes1), WebSocketMessageType.Text, true, CancellationToken.None);

							var readyMsg2 = new {type = "readyOnline", playerId = 1};
							var bytes2 = JsonSerializer.SerializeToUtf8Bytes(readyMsg2);
							if(player2.State == WebSocketState.Open) await player2.SendAsync(new ArraySegment<byte>(bytes2), WebSocketMessageType.Text, true, CancellationToken.None);
						}
					}
					else{
						if(_wsToGame.TryGetValue(ws, out var gameName) && _games.TryGetValue(gameName, out var game)){
							var originalMessage = JsonDocument.Parse(message).RootElement;
							var newMsg = new Dictionary<string, object>();
							foreach(var prop in originalMessage.EnumerateObject()){
								newMsg[prop.Name] = prop.Value.Clone();
							}
							newMsg["playerDeg"] = _wsToDeg.GetValueOrDefault(ws, 0);

							var messageWithDeg = JsonSerializer.Serialize(newMsg);
							var messageBytes = Encoding.UTF8.GetBytes(messageWithDeg);

							List<WebSocket> clients;
							lock(game){
								clients = game.ToList();
							}
							foreach(var client in clients){
								if(client != ws && client.State == WebSocketState.Open){
									await client.SendAsync(new ArraySegment<byte>(messageBytes), WebSocketMessageType.Text, true, CancellationToken.None);
								}
							}
						}
					}
				}
			}
		}
		catch(Exception e){
			Console.Error.WriteLine($"Error during WebSocket communication: {e.Message}");
		}
		finally{
			Console.WriteLine("Client disconnected");
			_wsToDeg.TryRemove(ws, out _);
			if(_wsToGame.TryRemove(ws, out var gameName) && _games.TryGetValue(gameName, out var game)){
				List<WebSocket> remainingClients;
				lock(game){
					game.RemoveAll(socket=>socket.State != WebSocketState.Open);
					remainingClients = game.ToList();
				}

				var disconnectMsg = new {type = "disconnect"};
				var bytes = JsonSerializer.SerializeToUtf8Bytes(disconnectMsg);

				foreach(var client in remainingClients){
					if(client.State == WebSocketState.Open){
						await client.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);
					}
				}
			}
			ws?.Dispose();
		}
	}
}
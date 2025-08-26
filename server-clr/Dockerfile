# ビルドステージ
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["server-cli/server-cli.csproj", "server-cli/"]
RUN dotnet restore "server-cli/server-cli.csproj"
COPY . .
WORKDIR "/src/server-cli"
RUN dotnet build "server-cli.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "server-cli.csproj" -c Release -o /app/publish /p:UseAppHost=false

# 最終ステージ
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "server-cli.dll"]

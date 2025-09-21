// クライアントサイド(通常の<script>タグ)で実行された場合
if("serviceWorker" in navigator){
	// PWAでの起動判定
	if(window.matchMedia("(display-mode: standalone)").matches
		|| window.navigator.standalone === true || true
	){
		// 擬似的に履歴を積んで戻れなくする
		for(let i=0;i<10;i++)
			history.pushState(null, "", location.href);
		window.addEventListener("popstate", async e=>{
			// 本当に終了(履歴を戻す)
			if(confirm("アプリを終了しますか?"))
				return history.go(-history.length + 2);
			// 終了しない⇒履歴を戻さないように再度積む
			history.pushState(null, "", location.href);
		});
	}

	// --- インストールボタンの動的生成 ---
	let deferredPrompt;
	const installButton = document.createElement("button");
	installButton.id = "installButton";
	installButton.textContent = "📥";
	installButton.title = "アプリをインストール";
	Object.assign(installButton.style, {
		position: "fixed",
		bottom: "20px",
		right: "20px",
		width: "50px",
		height: "50px",
		borderRadius: "50%",
		backgroundColor: "#f0f0f0",
		border: "1px solid #ccc",
		fontSize: "24px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
		zIndex: "1000",
		display: "none",
	});

	document.body.appendChild(installButton);

	window.addEventListener("beforeinstallprompt", e=>{
		e.preventDefault();
		deferredPrompt = e;
		console.log("beforeinstallprompt event fired. Button is now active.");
		installButton.style.display = "flex"; // ← イベント発火で表示

		installButton.addEventListener("click", async ()=>{
			if(!deferredPrompt){
				console.log("Install prompt is not available yet.");
				return;
			}
			await deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			console.log(`User response to the install prompt: ${outcome}`);
			deferredPrompt = null;
			installButton.style.display = "none"; // ← クリック後非表示
		});
	});

	window.addEventListener("appinstalled", ()=>{
		deferredPrompt = null;
		installButton.style.display = "none";
		console.log("PWA was installed");
	});

	// --- Service Workerの登録処理 ---
	window.addEventListener("load", async ()=>{
		// このファイル自身をService Workerとして登録する
		try{
			const registration = await navigator.serviceWorker.register("./sw.js");
			console.log("PWA registration successful");
		}
		catch(ex){
			console.log("PWA registration failed: ", ex);
		}
	});
}
// Service Workerとしてバックグラウンドで実行された場合
else{
	const CACHE_NAME = "shogicross-cache";
	const APP_SHELL_URLS = [
		"./app.html",
		"./manifest.json",
		"./sample/img/favicon.min.svg"
	];

	self.addEventListener("install", event=>
		event.waitUntil((async ()=>{
			const cache = await caches.open(CACHE_NAME);
			console.log("SW: Opened cache and caching app shell");
			await cache.addAll(APP_SHELL_URLS);
		})())
	);

	self.addEventListener("activate", event=>
		event.waitUntil((async ()=>{
			const cacheKeys = await caches.keys();
			if(!Array.isArray(cacheKeys)) return;
			Promise.all(
				cacheKeys.map(cacheName=>{
					if(cacheName === CACHE_NAME) return;
					console.log("SW: Deleting old cache:", cacheName);
					return caches.delete(cacheName);
				})
			)
		})())
	);

	self.addEventListener("fetch", event=>
		event.respondWith((async ()=>{
			const {request} = event;
			const url = new URL(request.url);

			if(url.origin !== self.location.origin || request.mode === "navigate"){
				try{
					return await fetch(request);
				}
				catch(error){
					return await caches.match("./app.html");
				}
			}

			if(/\.(css|js|svg|png|jpg|jpeg|gif)$/.test(url.pathname)){
				const cache = await caches.open(CACHE_NAME);
				const cachedResponse = await cache.match(request);

				const fetchPromise = fetch(request).then(networkResponse=>{
					cache.put(request, networkResponse.clone());
					return networkResponse;
				});

				return cachedResponse || fetchPromise;
			}

			const cache = await caches.open(CACHE_NAME);
			const cachedResponse = await cache.match(request);
			return cachedResponse || fetch(request);
		})())
	);
}

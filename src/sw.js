// クライアントサイド(通常の<script>タグ)で実行された場合
if("serviceWorker" in navigator){
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
	const CACHE_NAME = "shogicross-cache-v6";
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
		event.waitUntil(
			Promise.all(
				caches.keys()
				.map(cacheName=>{
					if(cacheName === CACHE_NAME) return;
					console.log("SW: Deleting old cache:", cacheName);
					return caches.delete(cacheName);
				})
			)
		)
	);

	self.addEventListener("fetch", event=>
		event.respondWith((async ()=>{
			const {request} = event;
			const url = new URL(request.url);

			if(url.origin !== self.location.origin)
				return fetch(request);

			if(request.mode === "navigate"){
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

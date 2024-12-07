if (!self.define) { let e, r = {}; const a = (a, i) => (a = new URL(a + ".js", i).href, r[a] || new Promise((r => { if ("document" in self) { const e = document.createElement("script"); e.src = a, e.onload = r, document.head.appendChild(e) } else e = a, importScripts(a), r() })).then((() => { let e = r[a]; if (!e) throw new Error(`Module ${a} didn’t register its module`); return e }))); self.define = (i, s) => { const f = e || ("document" in self ? document.currentScript.src : "") || location.href; if (r[f]) return; let d = {}; const c = e => a(e, f), n = { module: { uri: f }, exports: d, require: c }; r[f] = Promise.all(i.map((e => n[e] || c(e)))).then((e => (s(...e), d))) } } define(["./workbox-915e8d08"], (function (e) { "use strict"; self.addEventListener("message", (e => { e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting() })), e.precacheAndRoute([{ url: "App.vue", revision: "94e3ef66481f7fde6851a077c8dc546d" }, { url: "images/brand/br1.png", revision: "43e437752ca195dc16d467dd3b8f486c" }, { url: "images/brand/br2.png", revision: "044ad0194762e42a8c5921e252fe9862" }, { url: "images/brand/br3.png", revision: "5e16b0b045f93bf098cc76b750c3d0b4" }, { url: "images/brand/br4.png", revision: "2a980f63399094bd860676f8376b230f" }, { url: "images/brand/br5.png", revision: "28202c8e05a8ceed90d7efaa958b2908" }, { url: "images/brand/br6.png", revision: "d10f98674b9c0d49c8fa252208b51f70" }, { url: "images/featured-cars/fc1.png", revision: "9e03f50305044f5231b79cd893e19100" }, { url: "images/featured-cars/fc2.png", revision: "b1b0c779f2cd2331ed0a9961099fdeb1" }, { url: "images/featured-cars/fc3.png", revision: "6e612a502488d5496af4f02d1b4a1000" }, { url: "images/featured-cars/fc4.png", revision: "60219c48a18a3f94bfa88473d483230d" }, { url: "images/featured-cars/fc5.png", revision: "86c40f5a13529c363a3fbed33792b458" }, { url: "images/featured-cars/fc6.png", revision: "76c8ba04af7dcec8deb796042444bf5a" }, { url: "images/featured-cars/fc7.png", revision: "c9adb5643d648d782ea801c891c53bfb" }, { url: "images/featured-cars/fc8.png", revision: "d7bfb8efbee6454d3137e26d4fe33dd9" }, { url: "images/welcome-banner.jpg", revision: "3fefd07072346334ff175d48832a373a" }, { url: "images/welcome-hero/welcome-banner.jpg", revision: "3fefd07072346334ff175d48832a373a" }, { url: "main.ts", revision: "0be52e33a269d5196761718160117869" }, { url: "router/index.ts", revision: "1c1f15a74ca5f2de8a36e8c9572dc029" }, { url: "theme/variables.css", revision: "f6f146a809ca379894e1b85cf800ac69" }, { url: "views/HomePage.vue", revision: "8aa5362294ecfacd779d3507f2662aea" }, { url: "views/LoginPage.vue", revision: "0246ca81295b2dca071f6a714cf14c8e" }, { url: "views/MyRentals.vue", revision: "38fafe6b7ff5dd7d358c6d52b662d015" }, { url: "vite-env.d.ts", revision: "0352474ba2918efe13895edbc3780d94" }], { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }) }));
//# sourceMappingURL=sw.js.map

// sw.js

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.2/workbox-sw.js');

if (workbox) {
    console.log(`Workbox está cargado`);

    // Precaching de los recursos generados
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

    // Plugin de Background Sync para almacenar solicitudes POST
    const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('post-rental-queue', {
        maxRetentionTime: 24 * 60, // Retener por 24 horas
    });

    // Ruta para manejar solicitudes POST a /api/rentals
    workbox.routing.registerRoute(
        ({ url, request }) => url.pathname.startsWith('/api/rentals') && request.method === 'POST',
        new workbox.strategies.NetworkOnly({
            plugins: [bgSyncPlugin],
        }),
        'POST'
    );

    // Escuchar mensajes desde la aplicación para saltarse la espera
    self.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
            self.skipWaiting();
        }
    });
} else {
    console.log(`Workbox no se pudo cargar`);
}
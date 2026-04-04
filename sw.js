const CACHE_NAME = "livro-anjo-v5";

// arquivos principais do livro
const STATIC_FILES = [

  "./",
  "index.html",
  "autor.html",

  "1.html","2.html","3.html","4.html","5.html",
  "6.html","7.html","8.html","9.html","10.html",
  "11.html","12.html","13.html","14.html","15.html",
  "16.html","17.html","18.html","19.html","20.html",
  "21.html","22.html",

  "manifest.json",
  "logo-192.png",
  "logo-512.png",
  "musica.mp3",

  "aparicao-anjo-deserto-hq.png",
  "aparicao-deserto-hq.png",
  "banquete-belsazar-hq.png",
  "beltessazar-devastacao-hq.png",
  "campainhas-celestiais-hq.png",
  "caravana-vale-chamas-hq.png",
  "caravana.png",
  "cova-leoes-hq.png",
  "cova-paz-hq.png",
  "ebede-meleque-hq.png",
  "escriba-biblioteca.png",
  "escriba-bosque-hq.png",
  "escriba-reflexivo.png",
  "escriba.png",
  "estudo-noturno.png",
  "intercessao.png",
  "janelas-abertas-hq.png",
  "mao-na-parede-hq.png",
  "mercado-escravos-hq.png",
  "o-escriba-hq.png",
  "palacio-persa-hq.png",
  "pos-visao-hq.png",
  "revelacao-anjo.png",
  "rio-eufrates.png",
  "rio-hidequel-hq.png",
  "sala-decisoes-hq.png",
  "visao-final-hq.png"

];


// INSTALAÇÃO
self.addEventListener("install", event => {

  console.log("Service Worker instalando...");

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME).then(cache => {

      return cache.addAll(STATIC_FILES);

    })

  );

});


// ATIVAÇÃO
self.addEventListener("activate", event => {

  console.log("Service Worker ativado");

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if (key !== CACHE_NAME) {

            console.log("Removendo cache antigo:", key);

            return caches.delete(key);

          }

        })

      );

    })

  );

  return self.clients.claim();

});


// BUSCA DE ARQUIVOS
self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  event.respondWith(

    caches.match(event.request).then(cached => {

      if (cached) {

        return cached;

      }

      return fetch(event.request)

        .then(response => {

          if (!response || response.status !== 200) {

            return response;

          }

          const responseClone = response.clone();

          caches.open(CACHE_NAME).then(cache => {

            cache.put(event.request, responseClone);

          });

          return response;

        })

        .catch(() => {

          if (event.request.destination === "document") {

            return caches.match("index.html");

          }

        });

    })

  );

});

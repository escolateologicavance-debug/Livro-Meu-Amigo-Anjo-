
const CACHE_NAME = "livro-anjo-v3";

// Arquivos principais do app
const FILES = [
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
      return Promise.all(
        FILES.map(file => {
          return cache.add(file).catch(err => {
            console.error("Erro ao salvar:", file, err);
          });
        })
      );
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
            console.log("Apagando cache antigo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  return self.clients.claim();
});


// FETCH (BUSCA DE ARQUIVOS)
self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request).then(cachedResponse => {

      // se existir no cache
      if (cachedResponse) {
        return cachedResponse;
      }

      // se não existir, busca na internet
      return fetch(event.request)
        .then(networkResponse => {

          // salva no cache automaticamente
          return caches.open(CACHE_NAME).then(cache => {

            cache.put(event.request, networkResponse.clone());

            return networkResponse;

          });

        })
        .catch(() => {
          // fallback se offline
          if (event.request.destination === "document") {
            return caches.match("index.html");
          }
        });

    })

  );

});

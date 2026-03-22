const CACHE_NAME = "livro-anjo-v1";

const FILES = [
  "index.html",
  "autor.html",
  "1.html","2.html","3.html","4.html","5.html",
  "6.html","7.html","8.html","9.html","10.html",
  "11.html","12.html","13.html","14.html","15.html",
  "16.html","17.html","18.html","19.html","20.html",
  "21.html","22.html",

  // Arquivos de Manifesto e Logos
  "manifest.json",
  "logo-192.png",
  "logo-512.png",

  // Música
  "musica.mp3",

  // Imagens (Nomes verificados nos seus prints)
  "aparição-anjo-deserto-hq.png",
  "aparição-deserto-hq.png",
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

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        FILES.map(file => {
          return cache.add(file).catch((error) => {
            console.error("Falha ao cachear:", file, error);
          });
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

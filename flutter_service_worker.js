'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "eb5d199cf084607667505966bb0fd4f7",
"/": "eb5d199cf084607667505966bb0fd4f7",
"main.dart.js": "7ebb8e1d66fb6d6b65882736bbb858da",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "b0f182e89c9b355ef68294ad664b72e8",
"assets/AssetManifest.json": "96edb4537c86d7482740dc455f07c625",
"assets/NOTICES": "b9e17807104985d4703d6c6ce6e4480b",
"assets/FontManifest.json": "61d0bbb2d0438cbea8937db46283b6fc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/fonts/nanum-bold.ttf": "7cab7ee6f3424ad7bd094997e38175bc",
"assets/fonts/nanum.ttf": "14d2d9d36cde446b6b171c1ebe465b4f",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-22-21.jpeg": "de44659a81661293688365c1de15a0ad",
"assets/assets/mutsa.jpeg": "a37922e676e721de61b1ae30b8bc0734",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-21-51.jpeg": "d512249a407bfb2ab6b3e405d4add430",
"assets/assets/KakaoTalk_Photo_2020-07-28-02-44-20.jpeg": "6ecdf74b90cd0f9302155352f30bb88d",
"assets/assets/KakaoTalk_Photo_2020-07-28-02-45-21.jpeg": "4e67aea14a3b214acc1f8acb10c22583",
"assets/assets/KakaoTalk_Photo_2020-07-28-02-45-17.jpeg": "55e9eaae915c305fabf9f71388da777d",
"assets/assets/KakaoTalk_Photo_2020-07-28-02-45-40.jpeg": "6cecc94ef760f18319345e52f2633eb4",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-22-11.jpeg": "98271a202cc357f722e8ee6b359a7ab2",
"assets/assets/git_icon.png": "91caccae069808f2b2ad913da20b15ac",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-21-57.jpeg": "2b46ff49bfe7899a37691ffe1294e85e",
"assets/assets/KakaoTalk_Photo_2020-07-28-02-44-56.jpeg": "8ec25c823c13a17362027c5a74467fe2",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-22-30.jpeg": "570ecfbe5817430862d1163796b060b8",
"assets/assets/KakaoTalk_Photo_2020-07-28-02-45-35.jpeg": "24ab47e69eb49725165b91a2ba3c20fd",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-22-25.jpeg": "60cc176a9c02c9d98ccea3d535cb7fa5",
"assets/assets/insta_icon.png": "a56816c5f7327dcac9cb817e2d9dd5d9",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-22-04.jpeg": "1348af3bc71bb629577a42af79b4a166",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-21-43.jpeg": "ef530372afb07c69e65358f8ce042df0",
"assets/assets/music3.mp3": "98efa932bafee2d5363d9a853b30d7dc",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-22-15.jpeg": "d3a43f308a610b420d708e89911a5985",
"assets/assets/background3.jpeg": "1367a0df6496ff25f8132739e7a70b70",
"assets/assets/music2.mp3": "93b6f06a0e5f7ebb6f96a174708cfa08",
"assets/assets/KakaoTalk_Photo_2020-07-28-02-45-13.jpeg": "418c9c81dadc4a71afc6c11a802f4737",
"assets/assets/music1.mp3": "aecab886956a3af462d6e14a5e7aba55",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-21-33.jpeg": "2edaa77ad7259879eb457030c3fcc0be",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-22-34.jpeg": "20820e1298c96ee84e8aa9461e6cf354",
"assets/assets/KakaoTalk_Photo_2020-07-28-03-22-38.jpeg": "dd27d46861ec8dcfb846e89826f7045c"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

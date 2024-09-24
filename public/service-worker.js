const CACHE_NAME = 'watch-cache-v1';

// const urlCaching = `http://192.168.1.121/md/image/`
const urlCaching = `https://backend.hanguyen.online/md/image/`

self.addEventListener('install', (event) => {
    // Kích hoạt service worker nhưng không cache gì lúc cài đặt
    console.log('Service worker installed');
});

// Lắng nghe sự kiện fetch
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // Kiểm tra nếu URL bắt đầu với url

    if (requestUrl.href.startsWith(urlCaching)) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                // Nếu ảnh đã có trong cache, trả về từ cache
                if (response) {
                    return response;
                }

                // Nếu chưa có trong cache, fetch từ server và lưu vào cache
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone()); // Lưu ảnh vào cache
                        return networkResponse;
                    });
                });
            })
        );
    } else {
        // Nếu không phải ảnh từ URL mong muốn, fetch trực tiếp từ server
        event.respondWith(fetch(event.request));
    }
});
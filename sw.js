// =========================
// SERVICE WORKER
// PWA functionality with caching and offline support
// =========================

const CACHE_NAME = 'bistrodelight-v1.0.0';
const STATIC_CACHE = 'bistrodelight-static-v1.0.0';
const DYNAMIC_CACHE = 'bistrodelight-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/about.html',
    '/menu.html',
    '/gallery.html',
    '/contact.html',
    '/reservations.html',
    '/css/style.css',
    '/css/responsive.css',
    '/js/main.js',
    '/js/reservations.js',
    '/manifest.json',
    '/images/hero/hero.webp',
    '/images/hero/hero2.webp',
    '/images/hero/hero3.webp',
    '/images/hero/hero4.webp',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Network-first resources (always try network first)
const NETWORK_FIRST = [
    '/reservations.html',
    '/api/',
    'https://api.'
];

// Cache-first resources (serve from cache if available)
const CACHE_FIRST = [
    '/images/',
    '/css/',
    '/js/',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - handle requests with different strategies
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
    
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension requests
    if (requestUrl.protocol === 'chrome-extension:') {
        return;
    }
    
    event.respondWith(
        handleRequest(event.request)
    );
});

// Handle different request types with appropriate strategies
async function handleRequest(request) {
    const requestUrl = new URL(request.url);
    const pathname = requestUrl.pathname;
    
    try {
        // Network-first strategy for dynamic content
        if (shouldUseNetworkFirst(request.url)) {
            return await networkFirst(request);
        }
        
        // Cache-first strategy for static assets
        if (shouldUseCacheFirst(request.url)) {
            return await cacheFirst(request);
        }
        
        // Stale-while-revalidate for HTML pages
        if (request.headers.get('accept').includes('text/html')) {
            return await staleWhileRevalidate(request);
        }
        
        // Default to network-first
        return await networkFirst(request);
        
    } catch (error) {
        console.error('Service Worker: Error handling request', error);
        return await handleOffline(request);
    }
}

// Network-first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful responses
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Network failed, try cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Cache-first strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Not in cache, fetch from network
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        throw error;
    }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);
    
    // Fetch from network in background
    const networkResponsePromise = fetch(request)
        .then(response => {
            if (response.ok) {
                const cache = caches.open(DYNAMIC_CACHE);
                cache.then(c => c.put(request, response.clone()));
            }
            return response;
        })
        .catch(() => null);
    
    // Return cached version immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Otherwise wait for network
    return await networkResponsePromise;
}

// Handle offline scenarios
async function handleOffline(request) {
    const requestUrl = new URL(request.url);
    
    // Return offline page for HTML requests
    if (request.headers.get('accept').includes('text/html')) {
        const offlinePage = await caches.match('/offline.html');
        if (offlinePage) {
            return offlinePage;
        }
        
        // Fallback offline response
        return new Response(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>BistroDelight - Offline</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .offline-message { max-width: 400px; margin: 0 auto; }
                    .icon { font-size: 64px; color: #C9A961; margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <div class="offline-message">
                    <div class="icon">🍽️</div>
                    <h1>You're Offline</h1>
                    <p>Please check your internet connection and try again.</p>
                    <button onclick="location.reload()">Retry</button>
                </div>
            </body>
            </html>
        `, {
            status: 200,
            headers: { 'Content-Type': 'text/html' }
        });
    }
    
    // Return placeholder for images
    if (request.headers.get('accept').includes('image')) {
        return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="#f0f0f0"/><text x="100" y="75" text-anchor="middle" fill="#999">Image Unavailable</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
        );
    }
    
    throw new Error('Network error and no cached version available');
}

// Check if request should use network-first strategy
function shouldUseNetworkFirst(url) {
    return NETWORK_FIRST.some(pattern => url.includes(pattern));
}

// Check if request should use cache-first strategy
function shouldUseCacheFirst(url) {
    return CACHE_FIRST.some(pattern => url.includes(pattern));
}

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'reservation-sync') {
        event.waitUntil(syncReservations());
    }
});

// Sync offline reservations
async function syncReservations() {
    try {
        // Get pending reservations from IndexedDB
        const pendingReservations = await getPendingReservations();
        
        for (const reservation of pendingReservations) {
            try {
                const response = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reservation.data)
                });
                
                if (response.ok) {
                    await removePendingReservation(reservation.id);
                    console.log('Reservation synced successfully');
                }
            } catch (error) {
                console.error('Failed to sync reservation:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Placeholder functions for IndexedDB operations
async function getPendingReservations() {
    // In a real implementation, this would query IndexedDB
    return [];
}

async function removePendingReservation(id) {
    // In a real implementation, this would remove from IndexedDB
    console.log('Removing pending reservation:', id);
}

// Push notification handling
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/images/icons/icon-192x192.png',
        badge: '/images/icons/badge-72x72.png',
        vibrate: [200, 100, 200],
        data: data.data,
        actions: [
            {
                action: 'view',
                title: 'View Details',
                icon: '/images/icons/view-icon.png'
            },
            {
                action: 'dismiss',
                title: 'Dismiss',
                icon: '/images/icons/dismiss-icon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/')
        );
    }
});

console.log('Service Worker: Loaded successfully');

self.addEventListener('install', function(e){ self.skipWaiting && self.skipWaiting(); });
self.addEventListener('activate', function(e){ self.clients && self.clients.claim && self.clients.claim(); });

self.addEventListener('push', function(event){
  try {
    var data = {};
    if (event.data) { data = event.data.json(); }
    var title = data.title || '通知';
    var body = data.body || '';
    var opts = { body: body, icon: '/icon-192.png', badge: '/icon-192.png' };
    event.waitUntil(self.registration.showNotification(title, opts));
  } catch (e) {}
});

self.addEventListener('notificationclick', function(event){
  event.notification.close();
  var targetUrl = '/parent/review';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients){
      for (var i=0; i<windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url && client.url.indexOf(targetUrl) >= 0 && 'focus' in client) { return client.focus(); }
      }
      if (clients.openWindow) { return clients.openWindow(targetUrl); }
    })
  );
});
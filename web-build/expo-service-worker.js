self.addEventListener('message', (t) => {
  let a;
  if ('string' === typeof t.data)
    try {
      a = JSON.parse(t.data);
    } catch (i) {}
  a && a.fromExpoWebClient && (self.notificationIcon = a.fromExpoWebClient.notificationIcon);
}),
  self.addEventListener('push', (t) => {
    let a = {};
    try {
      a = t.data.json();
    } catch (n) {
      a = { title: '', body: t.data.text() };
    }
    const i = a.title,
      e = { body: a.body, data: a.data || {} };
    (e.icon = e.data._icon || self.notificationIcon || null),
      e.data._tag && ((e.tag = e.data._tag), (e.renotify = e.data._renotify)),
      e.data._richContent && e.data._richContent.image && (e.image = e.data._richContent.image),
      t.waitUntil(self.registration.showNotification(i, e));
  }),
  self.addEventListener('notificationclick', (t) => {
    t.notification.close(),
      t.waitUntil(
        (async () => {
          const a = await self.clients.matchAll({ includeUncontrolled: !0 });
          let i;
          const e = t.notification.data._webPath || '/';
          for (const t of a) {
            if (new URL(t.url).pathname === e) {
              t.focus(), (i = t);
              break;
            }
          }
          i || (i = await self.clients.openWindow(e)),
            i.postMessage({
              origin: 'selected',
              data: t.notification.data,
              remote: !t.notification._isLocal,
            });
        })(),
      );
  }),
  self.importScripts('service-worker.js');

self.addEventListener("install", () => {
    self.skipWaiting();
  });
  
  self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim());
  });
  
  self.addEventListener("push", (event) => {
    const data = event.data?.json() ?? {
      title: "MediNexus Alert",
      body: "You have a new notification",
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/vite.svg",
        badge: "/vite.svg",
        vibrate: [200, 100, 200],
        data: data,
      })
    );
  });
  
  self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/dashboard");
      })
    );
  });
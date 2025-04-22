let clock = document.getElementById("clock");
setInterval(() => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  console.log(hour);
  clock.innerHTML = `Giờ ${hour}<br>Phút ${minutes}<br>Giây ${seconds}<br>`;
}, 1000);

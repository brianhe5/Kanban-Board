import "/socket.io/socket.io.js";
window.updateSocket = io();

window.updateSocket.on("cssChange", (path) => {
  let timestamp = `${new Date().getTime()}`;
  let links = document.querySelectorAll("link[rel=stylesheet]");
  for (const link of links) {
    let url = new URL(link.href);
    if (!url.host.includes("localhost")) continue;
    url.searchParams.delete("_ts");
    url.searchParams.append("_ts", timestamp);
    link.href = url.href;
  }
});

window.updateSocket.on("reload", () => {
  window.location.reload();
});

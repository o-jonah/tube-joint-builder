import { contextBridge } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  console.log("Preload loaded");
});

// optional safe bridge
contextBridge.exposeInMainWorld("api", {
  ping: () => "pong"
});

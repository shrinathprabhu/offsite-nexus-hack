import Game from "./src/modules/Game";
import { initNexus } from "./src/nexus/nexus";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    let game = new Game({
      spritesheet: "sprites.json",
    }).load();

    initNexus(window.ethereum);
  },
  false
);

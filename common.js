let canvas;
let mainFont, auxFont;
let logo;

let spinner;

let sizeConfig = {
  facebook_feed: { w: 1200, h: 630 },
  twitter_feed: { w: 1024, h: 512 },
  instagram_feed: { w: 1080, h: 1080 },
  instagram_stories: { w: 1080, h: 1920 }
};

function preload() {
  mainFont = loadFont("./fonts/CooperHewitt-Semibold.otf");
  auxFont = loadFont("./fonts/CooperHewitt-Book.otf");
  logo = loadImage("./imgs/logo.png");
}

function updateCanvas() {
  spinner.elt.style.opacity = "1";
  setTimeout(redraw, 10);
}

function saveImg() {
  let now = new Date();
  let clock = now.getHours() + "·" + now.getMinutes();
  let day = now.toJSON().slice(0, 10);
  saveCanvas(canvas, "post-" + day + "-" + clock, "jpg");
}

function updateZoom() {
  let padding = ((36 * 2) / 3) * 2;
  let availableHSpace = window.innerHeight - padding;
  let ratioH = availableHSpace / sizeConfig[data.format].h;

  let toolbarW = document.getElementById("toolbar").clientWidth;
  let availableWSpace = window.innerWidth - padding - toolbarW;
  let ratioW = availableWSpace / sizeConfig[data.format].w;

  if (ratioW < 1 || ratioH < 1) {
    canvas.elt.style.transform = `scale(${Math.min(ratioW, ratioH)})`;
  } else {
    canvas.elt.style.transform = `scale(1)`;
  }
}

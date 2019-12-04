let canv;
let mainFont, auxFont;

let imgInput;
let img = null;

let margin = 40;

let logo;

let data = {
  format: "instagram_feed",
  text: { mainText: "", auxText: "" },
  img: null
};

function preload() {
  mainFont = loadFont("./fonts/CooperHewitt-SemiBold.otf");
  auxFont = loadFont("./fonts/CooperHewitt-Book.otf");
  logo = loadImage("./imgs/logo.png");
}

function setup() {
  canv = createCanvas(1080, 1080);
  canv.parent("p5js-container");
  noLoop();

  imgInput = createFileInput(handleUpload);
  imgInput.id("img-upload");
  let container = select("#img-upload");
  container.child(imgInput);
}

function draw() {
  background(0);
  drawImage();
  drawOverlay();
  drawLogo();
  drawText();
}

function setSizeFormat() {
  let sizeConfig = {
    facebook_feed: { w: 1200, h: 630 },
    twitter_feed: { w: 1024, h: 512 },
    instagram_feed: { w: 1080, h: 1080 },
    instagram_stories: { w: 1080, h: 1920 }
  };
  resizeCanvas(sizeConfig[data.format].w, sizeConfig[data.format].h);
}

function drawText() {
  textFont(mainFont);
  textAlign(LEFT, TOP);
  fill(255);

  let w = width / 2 - margin;
  let h = height / 2 - margin;

  textSize(60);
  textLeading(80);
  text(data.text.mainText, margin, margin, w, h);

  textFont(auxFont);
  textSize(40);
  textLeading(60);
  text(data.text.auxText, margin, height / 2, w, h);
}

function drawImage() {
  if (img) {
    tint("#cb0072");

    let ratio;
    if (width >= height) {
      ratio = width / img.width;
    } else {
      ratio = height / img.height;
    }
    let newW = img.width * ratio;
    let newH = img.height * ratio;
    let x = width / 2 - newW / 2;
    let y = height / 2 - newH / 2;

    image(img, x, y, newW, newH);

    noTint();
  }
}
function drawOverlay() {}
function drawLogo() {
  let s = Math.max(width * 0.1, 90);
  let x = width - margin - s;
  let y = height - margin - s;
  image(logo, x, y, s, s);
}

function handleUpload(file) {
  if (file.type === "image") {
    img = loadImage(file.data, () => {
      img.filter(GRAY);
      redraw();
    });
  }
}

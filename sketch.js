let canv;
let mainFont, auxFont;

let margin = 40;

let data = {
  format: "instagram_feed",
  text: { mainText: "", auxText: "" }
};

function preload() {
  mainFont = loadFont("./fonts/CooperHewitt-SemiBold.otf");
  auxFont = loadFont("./fonts/CooperHewitt-Book.otf");
}

function setup() {
  canv = createCanvas(1080, 1080);
  canv.parent("p5js-container");
  noLoop();
}

function draw() {
  background(0);
  // drawImage();
  // drawOverlay();
  // drawLogo();
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

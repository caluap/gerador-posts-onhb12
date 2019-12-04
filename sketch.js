let canvas;
let mainFont, auxFont;

let imgInput;
let img = null;
let originalImg = null;

let sizeConfig = {
  facebook_feed: { w: 1200, h: 630 },
  twitter_feed: { w: 1024, h: 512 },
  instagram_feed: { w: 1080, h: 1080 },
  instagram_stories: { w: 1080, h: 1920 }
};

let loadedPatterns = {};

let sliderYMainText,
  sliderFsMainText,
  sliderYAuxText,
  sliderFsAuxText,
  sliderTint;

let margin = 40;

let logo;

let data = {
  format: "instagram_feed",
  text: { mainText: "", auxText: "" },
  pattern: 0,
  img: null,
  tint: 1
};

function preload() {
  mainFont = loadFont("./fonts/CooperHewitt-SemiBold.otf");
  auxFont = loadFont("./fonts/CooperHewitt-Book.otf");
  logo = loadImage("./imgs/logo.png");
}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.parent("p5js-container");
  noLoop();

  imgInput = createFileInput(handleUpload);
  imgInput.id("img-upload");
  let container = select("#img-upload");
  container.child(imgInput);

  sliderTint = createSlider(0, 1, 1, 0.05);
  sliderTint.changed(() => {
    data.tint = sliderTint.value();
    redraw();
  });
  container = select("#tint-percentage");
  container.child(sliderTint);

  sliderYMainText = createSlider(margin, sizeConfig[data.format].h, margin, 1);
  sliderYMainText.changed(redraw);
  container = select("#slider-y-main-text");
  container.child(sliderYMainText);

  sliderYAuxText = createSlider(
    margin,
    sizeConfig[data.format].h,
    sizeConfig[data.format].h / 2,
    1
  );
  sliderYAuxText.changed(redraw);
  container = select("#slider-y-aux-text");
  container.child(sliderYAuxText);

  sliderFsMainText = createSlider(20, 100, 60, 2);
  sliderFsMainText.changed(redraw);
  container = select("#slider-fs-main-text");
  container.child(sliderFsMainText);

  sliderFsAuxText = createSlider(10, 60, 40, 2);
  sliderFsAuxText.changed(redraw);
  container = select("#slider-fs-aux-text");
  container.child(sliderFsAuxText);

  updateTextVars();
  updateZoom();
}

function draw() {
  background(0);
  drawImage();
  drawPattern();
  drawLogo();
  drawText();
}

function setSizeFormat() {
  resizeCanvas(sizeConfig[data.format].w, sizeConfig[data.format].h);
  sliderYMainText.elt.max = sizeConfig[data.format].h;
  sliderYAuxText.elt.max = sizeConfig[data.format].h;
}

function drawText() {
  textFont(mainFont);
  textAlign(LEFT, TOP);
  fill(255);

  let w = (width * 2) / 3 - margin;
  let yMainText = sliderYMainText.value();
  let fsMainText = sliderFsMainText.value();

  textSize(fsMainText);
  textLeading((fsMainText * 4) / 3);
  text(data.text.mainText, margin, yMainText, w, height - yMainText);

  let yAuxText = sliderYAuxText.value();
  let fsAuxText = sliderFsAuxText.value();
  textFont(auxFont);
  textSize(fsAuxText);
  textLeading((fsAuxText * 4) / 3);
  text(data.text.auxText, margin, yAuxText, w, height - yAuxText);
}

function drawImage() {
  if (img) {
    tint(203, 0, 114);
    let ratio;
    let rCanv = width / height;
    let rImg = img.width / img.height;
    if (rCanv >= rImg) {
      ratio = width / img.width;
    } else {
      ratio = height / img.height;
    }
    let newW = img.width * ratio;
    let newH = img.height * ratio;
    let x = width / 2 - newW / 2;
    let y = height / 2 - newH / 2;

    image(img, x, y, newW, newH);

    let alpha = 255 * (1 - data.tint);
    tint(255, alpha);
    image(originalImg, x, y, newW, newH);

    noTint();
  }
}
function drawPattern() {
  if (data.pattern != 0) {
    if (!(data.format in loadedPatterns)) {
      loadedPatterns[data.format] = {};
    }
    if (!(data.pattern in loadedPatterns[data.format])) {
      let path = "./imgs/patterns/" + data.format + "/" + data.pattern + ".png";
      loadedPatterns[data.format][data.pattern] = loadImage(path, function() {
        console.log("has loaded the pattern");
        redraw();
      });
    } else {
      if (img) {
        tint("#ff008f");
      } else {
        tint("#cb0072");
      }
      image(loadedPatterns[data.format][data.pattern], 0, 0, width, height);
      noTint();
    }
  }
}
function drawLogo() {
  let s = Math.max(width * 0.1, 90);
  let x = width - margin - s;
  let y = height - margin - s;
  image(logo, x, y, s, s);
}

function handleUpload(file) {
  if (file.type === "image") {
    img = loadImage(file.data, () => {
      originalImg = img.get();
      img.filter(GRAY);
      redraw();
    });
  }
}

function removeImage() {
  if (img) {
    img = null;
    originalImg = null;
    redraw();
  }
}

function saveImg() {
  let now = new Date();
  let clock = now.getHours() + "·" + now.getMinutes();
  let day = now.toJSON().slice(0, 10);
  saveCanvas(canvas, "post-" + day + "-" + clock, "jpg");
}

function updateZoom() {
  let padding = ((36 * 2) / 3) * 2;
  let availableSpace = window.innerHeight - padding;
  let ratio = availableSpace / sizeConfig[data.format].h;
  if (ratio < 1) {
    canvas.elt.style.transform = `scale(${ratio})`;
  } else {
    canvas.elt.style.transform = `scale(1)`;
  }
}

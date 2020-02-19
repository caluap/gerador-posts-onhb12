let data = {
  format: "instagram_feed",
  text: { mainText: "", name: "", origin: "" },
  img: null
};

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.parent("p5js-container");

  spinner = select("#spinner");
  noLoop();

  updateTextVars();
  updateZoom();
}

function draw() {
  background(0);
  // drawImage();
  // drawPattern();
  // drawLogo();
  // drawText();
  spinner.elt.style.opacity = "0";
}

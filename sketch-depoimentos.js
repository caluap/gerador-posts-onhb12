let data = {
  format: "instagram_feed",
  text: { testimony: "", deponent: "", deponentOrigin: "" },
  img: null
};

let sliderFsTestimony;

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.parent("p5js-container");

  spinner = select("#spinner");
  noLoop();

  sliderFsTestimony = createSlider(20, 100, 60, 2);
  sliderFsTestimony.changed(updateCanvas);
  let container = select("#slider-fs-testimony");
  container.child(sliderFsTestimony);

  imgInput = createFileInput(handleUpload);
  imgInput.id("img-upload");
  container = select("#img-upload");
  container.child(imgInput);

  updateTextVars();
  updateZoom();
}

function handleUpload(file) {
  // if (file.type === "image") {
  //   img = loadImage(file.data, () => {
  //     originalImg = img.get();
  //     img.filter(GRAY);
  //     updateCanvas();
  //   });
  // }
}
function draw() {
  background(0);
  // drawImage();
  // drawPattern();
  // drawLogo();
  // drawText();
  spinner.elt.style.opacity = "0";
}

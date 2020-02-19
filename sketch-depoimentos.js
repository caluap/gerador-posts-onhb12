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

  sliderFsTestimony = createSlider(20, 100, 50, 1);
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

function drawText() {
  textFont(mainFont);
  textAlign(LEFT, TOP);
  fill(255);

  let fsMainText = sliderFsTestimony.value();

  let w1 = textSize(fsMainText);
  textLeading((fsMainText * 4) / 3);
  text(
    data.text.testimony,
    500,
    margin,
    width - 500 - margin * 2,
    height - margin * 2
  );

  textSize(32);
  textLeading(50);

  let dep = `${data.text.deponent}, ${data.text.deponentOrigin}`;
  text(dep, margin, 500, width - 500 - margin * 3, height - margin - 500);
}

function draw() {
  background(0);
  // drawImage();
  // drawPattern();
  // drawLogo();
  drawText();
  spinner.elt.style.opacity = "0";
}

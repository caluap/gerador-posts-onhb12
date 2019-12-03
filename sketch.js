let canv;
function setup() {
  canv = createCanvas(1080, 1080);
  canv.parent("p5js-container");
  noLoop();
}

function draw() {
  background(255);
}

function setSizeFormat(format) {
  let sizeConfig = {
    facebook_feed: { w: 1200, h: 630 },
    twitter_feed: { w: 1024, h: 512 },
    instagram_feed: { w: 1080, h: 1080 },
    instagram_stories: { w: 1080, h: 1920 }
  };

  if (!(format in sizeConfig)) {
    // a nice default?
    format = "instagram_feed";
  }
  resizeCanvas(sizeConfig[format].w, sizeConfig[format].h);
}

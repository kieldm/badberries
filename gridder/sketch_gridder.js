var tFont = [];
var pg = [];
var colorSet = [];
var pgTextSize = 60;

var starterText = "BAD_BERRIES_";

var fontSel = 0;

var coreGrid;

function preload(){
  tFont[0] = loadFont("resources/Inter-Medium.ttf");
  tFont[1] = loadFont("resources/Inter-Black.ttf");
  tFont[2] = loadFont("resources/EditorialNew-Thin.otf");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  bkgdColor = color('#000000');
  foreColor = color('#ffffff');
  colorSet[1] = color('#f24182');
  colorSet[2] = color('#d95bad');
  colorSet[3] = color('#7c05f2');
  colorSet[4] = color('#bff205');
  colorSet[0] = color('#f26e50');

  document.getElementById("text0").value = starterText;
  setText(starterText);

  // frameRate(30);
  // smooth();

  textFont(tFont[fontSel]);
  textSize(pgTextSize);
  textAlign(CENTER);

  coreGrid = new Gridder();
}

function draw(){
  background(bkgdColor);
  // ortho();

  // print(frameRate());

  push();
    translate(width/2, height/2);
    coreGrid.run();
  pop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
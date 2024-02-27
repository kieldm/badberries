var tFont = [];
var pg = [];
var colorSet = [];
var pgTextSize = 50;

var starterText = "FANATICS HAVE THEIR DREAMS";

var pgBkgd = [];

var coreBerry;

function preload(){
  tFont[0] = loadFont("resources/Inter-Medium.ttf");
  // tFont[0] = loadFont("resources/EditorialNew-Thin.otf");
}

function setup(){
  createCanvas(windowWidth,windowHeight, WEBGL);

  bkgdColor = color('#000000');
  foreColor = color('#ffffff');
  colorSet[0] = color('#f24182');
  colorSet[1] = color('#d95bad');
  colorSet[2] = color('#7c05f2');
  colorSet[3] = color('#bff205');
  colorSet[4] = color('#f26e50');

  // document.getElementById("text0").value = starterText;
  // setText(starterText);

  // frameRate(30);
  // noSmooth();
  textureMode(NORMAL);
  textureWrap(REPEAT);
  rectMode(CENTER);

  drawGradH1(0);

  coreBerry = new Berry();
}

function draw(){
  background(bkgdColor);
  orbitControl();
  ortho(-width/2, width/2, -height/2, height/2, 0, 10000);

  push();
    rotateZ(-PI/4);
    rotateX(-PI/4);
    coreBerry.run();
  pop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight,WEBGL);
}
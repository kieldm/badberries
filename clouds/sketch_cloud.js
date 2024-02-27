var tFont = [];
var pg = [];
var colorSet = [];
var pgTextSize = 50;

var starterText = "BAD";

var loopLength = 300;
var loopResolve = 30;
var cloudCount = 20;
var clouds = [];

function preload(){
  tFont[0] = loadFont("resources/Inter-Medium.ttf");
  // tFont[0] = loadFont("resources/EditorialNew-Thin.otf");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

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
  smooth();

  for(var m = 0; m < cloudCount; m++){
    clouds[m] = new Cloud(loopLength - m * loopLength/cloudCount);
  }
}

function draw(){
  background(0,0,255);
  // ortho();

  push();  
    translate(width/2, height/2);

    for(var m = 0; m < cloudCount; m++){
      clouds[m].run();
    }
  pop();

  if(frameCount%(loopLength/cloudCount) == 1){
    var firstElement = clouds[0];
    for(var i = 0; i < cloudCount - 1; i++){
      clouds[i] = clouds[i+1];
    }
    clouds[cloudCount - 1] = firstElement;

    clouds[cloudCount - 1].reset();
  }

  // print(frameRate());
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
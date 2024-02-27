var tFont = [];
var pg = [];
var colorSet = [];
var pgTextSize = 200;

// var starterText = "BERRIES\nBERRIES\nBERRIES";
var starterText = "NOT\nALL\nBAD";
// var starterText = "BAD";

var words = [];
var mounds = [];

var fontSel = 2;

function preload(){
  tFont[0] = loadFont("resources/Inter-Medium.ttf");
  tFont[1] = loadFont("resources/EditorialNew-Thin.otf");
  tFont[2] = loadFont("resources/FormulaCondensed-Bold.otf");
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
  colorSet[5] = color('#ffffff');

  document.getElementById("text0").value = starterText;
  setText(starterText);

  // frameRate(30);
  smooth();

  for(var m = 0; m < inputText.length; m++){
    words[m] = new Word(m);
  }

  // mounds[0] = new Mound();
}

function draw(){
  background(bkgdColor);

  push();
    translate(width/2, height/2);
    translate(0, - (inputText.length - 1) * (pgTextSize * 0.85)/2);
    for(var m = 0; m < inputText.length; m++){
      words[m].run();
    }
  pop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
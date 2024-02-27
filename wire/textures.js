//////////////////////////////////////////////
/////////////////////////////       TEXT
//////////////////////////////////////////////

function drawText(p, inp, tFont, single){   // straight text
  var pgW, pgH;

  if(single){
    pgH = pgTextSize * 1.0;
    pgW = TWO_PI*coreRadius/2 * pgH/coreStripH;
  } else {
    textSize(pgTextSize);
    textFont(tFont);
    var repeatSize = round(textWidth(inp) * 1.1);
    pgW = repeatSize;
    pgH = pgTextSize * 1.0;
  }


  pg[p] = createGraphics(pgW, pgH);
  pg[p].background(bkgdColor);

  pg[p].fill(foreColor);
  pg[p].noStroke();
  pg[p].textSize(pgTextSize/2);
  pg[p].textAlign(CENTER);
  pg[p].textFont(tFont);
  pg[p].text(inp, pgW/2, pgH/2 + pgTextSize*0.7025/4);
}

//////////////////////////////////////////////
/////////////////////////////       GRADIENT
//////////////////////////////////////////////

function drawGradH1(p){
  var w = 4096;
  var h = 512;
  var steps = 1024;
  var stepLength = w/steps;

  pg[p] = createGraphics(w, h);
  pg[p].background(colorSet[0]);

  for(var i = 0; i<steps; i++){
    var gradientColor;
    if(i<steps* 1/5){
      gradientColor = lerpColor(colorSet[0], colorSet[1], i/(steps/5));
    } else if(i<steps * 2/5){
      gradientColor = lerpColor(colorSet[1], colorSet[2], (i - steps/5)/(steps/5));
    } else if(i<steps * 3/5){
      gradientColor = lerpColor(colorSet[2], colorSet[3], (i - steps*2/5)/(steps/5));
    } else if(i<steps * 4/5){
      gradientColor = lerpColor(colorSet[3], colorSet[4], (i - steps*3/5)/(steps/5));
    } else {
      gradientColor = lerpColor(colorSet[4], colorSet[0], (i - steps*4/5)/(steps/5));
    }
    pg[p].stroke(gradientColor);
    pg[p].strokeWeight(stepLength);
    pg[p].line(i * stepLength, 0, i * stepLength, pg[p].height);
  }
}

function drawGradH2(p){
  var w = 4096;
  var h = 512;
  var steps = 1024;
  var stepLength = w/steps;

  pg[p] = createGraphics(w, h);
  pg[p].background(bkgdColor);

  for(var i = 0; i<steps; i++){
    var gradientColor;
    if(i < steps/2){
      gradientColor = lerpColor(bkgdColor, colorSet[1], i/(steps/2));
    } else {
      gradientColor = lerpColor(colorSet[1], bkgdColor, (i - steps/2)/(steps/2));
    }
    pg[p].stroke(gradientColor);
    pg[p].strokeWeight(stepLength);
    pg[p].line(i * stepLength, 0, i * stepLength, pg[p].height);
  }
}

function drawGradH3(p){
  var w = 4096;
  var h = 512;
  var steps = 1024;
  var stepLength = w/steps;

  pg[p] = createGraphics(w, h);
  pg[p].background(colorSet[4]);

  for(var i = 0; i<steps; i++){
    var gradientColor;
    if(i < steps/3){
      gradientColor = lerpColor(colorSet[4], colorSet[2], i/(steps/3));
    } else if(i < steps * 2/3){
      gradientColor = lerpColor(colorSet[2], colorSet[3], (i - steps/3)/(steps/3));
    } else {
      gradientColor = lerpColor(colorSet[3], colorSet[4], (i - steps * 2/3)/(steps/3));
    }
    pg[p].stroke(gradientColor);
    pg[p].strokeWeight(stepLength);
    pg[p].line(i * stepLength, 0, i * stepLength, pg[p].height);
  }
}

//////////////////////////////////////////////
/////////////////////////////       GRAPHIC
//////////////////////////////////////////////

function drawAcid(p){
  var w = 2048;
  var h = 512;
  var sprayCount = 400;

  pg[p] = createGraphics(w, h);
  pg[p].background(foreColor);

  var cX = random(w/2, w*3/4);
  var cY = random(h/2, h*3/4);

  var dist = [];
  var ang = [];
  var rad = [];
  for(var r = 0; r<sprayCount; r++){
    dist[r] = random(-400,1500);
    ang[r] = random(2*PI);
    rad[r] = random(20, 120);
  }

  for(var c = 0; c<2; c++){
    for(var r = 0; r<sprayCount; r++){
      var thisR = rad[r] - c*8;

      var x = cX + cos(ang[r]) * dist[r];
      var y = cY + sin(ang[r]) * dist[r];

      pg[p].noStroke();
      if(c==0){
        pg[p].fill(bkgdColor);
      } else {
        pg[p].fill(foreColor);
      }
      pg[p].ellipse(x, y, thisR);

      if(x - thisR/2 < 0){
        pg[p].ellipse(x + w, y, thisR);
      }
      if(x + thisR/2 > w){
        pg[p].ellipse(x - w, y, thisR);
      }
    }
  }
}

function drawSpray(p){
  var w = 4096;
  var h = 512;
  var sprayCount = 800;

  pg[p] = createGraphics(w, h);
  pg[p].background(bkgdColor);

  for(var r = 0; r<sprayCount; r++){
    var x = random(w);
    var y = random(h);
    var rad = random(5, 20);

    pg[p].noStroke();
    pg[p].fill(foreColor);
    pg[p].ellipse(x,y,rad);
  }
}

function drawGrid1(p){
  var gridW = 4096;
  var gridH = 512;

  var gridCountH = 5;
  var spacer = gridH/gridCountH;
  var gridCountW = gridW/spacer;

  pg[p] = createGraphics(gridW, gridH);

  pg[p].background(bkgdColor);
  pg[p].noFill();
  pg[p].stroke(foreColor);
  pg[p].strokeWeight(8);

  pg[p].push();
  for(var m = 0; m <= gridCountH; m++){
    pg[p].line(0, m * spacer, gridW, m * spacer);
  }

  for(var m = 0; m <= gridCountW; m++){
    pg[p].line(m * spacer, 0, m * spacer, gridH);
  }
  pg[p].pop();
}

function drawChecker(p){
  var gridW = 4096;
  var gridH = 512;

  var gridCountH = 4;
  var spacerH = gridH/gridCountH;
  var spacerW = spacerH * 8;
  var gridCountW = gridW/spacerW;

  pg[p] = createGraphics(gridW, gridH);

  pg[p].background(bkgdColor);
  pg[p].noStroke();

  pg[p].push();
    for(var m = 0; m < gridCountH; m++){
      for(var n = 0; n < gridCountW; n++){

        if((m + n)%2 == 0){
          pg[p].fill(colorSet[3]);
        } else {
          pg[p].fill(bkgdColor);
        }

        pg[p].rect(n * spacerW, m * spacerH, spacerW, spacerH);
      }
    }
  pg[p].pop();
}
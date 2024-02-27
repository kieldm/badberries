class Mound {
  constructor(index){
    this.index = index;

    this.ticker = [];
    this.lineLength;

    this.actuals = [];
    this.points = [];

    this.delay = -6;
    this.indexDelay = -6;

    this.animWin = 90;
    this.animWin2 = 150;
    this.animWin3 = 210;
    this.animWin4 = 300;

    this.colorSel = 0;

    this.make();

    this.currentWidth = 0;
    this.animSW = 0;
  }

  make(){
    this.colorSel = int(random(6));

    this.lineLength = random(0, 400);
    // this.lineLength = 50;
    this.points = [];
    this.actuals = [];

    var culmDist = 0;

    this.points[0] = {
      x: culmDist, y: 0, ang: 0, influ: 50
    }

    while(culmDist < this.lineLength/2){
      var ranDist = random(25, 100);

      var x_ = culmDist + ranDist;
      var y_ = 0;

      var ang_ = -PI/4 + random(-PI/20, PI/20);
      // var tk0 = map(culmDist + ranDist, -this.lineLength/2, this.lineLength/2, 0, PI);
      var tk0 = map(culmDist + ranDist, 0, this.lineLength, 0, PI);
      var tk1 = map(sin(tk0), 0, 1, 0, 300);
      var influ_ = random(tk1 - 20, tk1 + 20);
 
      this.points[this.points.length] = {
        x: x_, y: y_, ang: ang_, influ: influ_
      }

      culmDist += ranDist;
    }

    this.points[this.points.length-1] = {
      x: this.lineLength/2, y: 0, ang: 0, influ: 50
    }

    for(var p = 0; p < this.points.length; p ++){
      this.actuals[p] = {
        x: 0, y: 0, ang: 0, influ: 0
      }
      this.ticker[p] = p * this.delay + this.index * this.indexDelay;
    }
  }

  run(){
    this.update();
    this.displayLine();
    // this.displayDebug();
    // noLoop();
  }

  update(){   
    // print(this.actuals.length + " and " + this.ticker[0]);
     
    this.currentWidth = 0;

    for(var p = 0; p < this.actuals.length; p++){
      this.ticker[p]++;

      if(this.ticker[p] < 0){
        this.actuals[p].x = 0;
        this.actuals[p].y = 0;
        this.actuals[p].ang = 0;
        this.actuals[p].influ = 0;
      } else if(this.ticker[p] < this.animWin){
        var tk0 = map(this.ticker[p], 0, this.animWin, 0, 1);
        // var tk1 = easeOutElastic(tk0);
        var tk1 = easeOutExpo(tk0);

        this.actuals[p].x = map(tk1, 0, 1, 0, this.points[p].x);
        this.actuals[p].y = map(tk1, 0, 1, 0, this.points[p].y);
        this.actuals[p].ang = map(tk1, 0, 1, 0, this.points[p].ang);
        this.actuals[p].influ = map(tk1, 0, 1, 0, this.points[p].influ);
      } else if(this.ticker[p] < this.animWin2){
        this.actuals[p] = this.points[p];
      } else if(this.ticker [p] < this.animWin3){
        var tk0 = map(this.ticker[p], this.animWin2, this.animWin3, 0, 1);
        // var tk1 = easeInExpo(tk0);
        var tk1 = easeInExpo(tk0);

        this.actuals[p].x = map(tk1, 0, 1, this.points[p].x, 0);
        this.actuals[p].y = map(tk1, 0, 1, this.points[p].y, 0);
        this.actuals[p].ang = map(tk1, 0, 1, this.points[p].ang, 0);
        this.actuals[p].influ = map(tk1, 0, 1, this.points[p].influ, 0);
      }

      this.currentWidth = this.actuals[this.actuals.length - 1].x;
    }

    if(this.currentWidth < 10){
      this.animSW = map(this.currentWidth, 0, 10, 0, 1);
    } else {
      this.animSW = 1;
    }

    if(this.ticker[0] == this.animWin4){
      this.make();
    }
  }

  displayLine(){
    noFill();
    stroke(colorSet[this.colorSel]);
    strokeWeight(this.animSW);

    push();
      beginShape();
        vertex(this.actuals[0].x, this.actuals[0].y);
        for(var p = 1; p < this.actuals.length; p++){
          var xPH = this.actuals[p-1].x + cos(this.actuals[p-1].ang) * this.actuals[p-1].influ;
          var yPH = this.actuals[p-1].y + sin(this.actuals[p-1].ang) * this.actuals[p-1].influ;
  
          var xH = this.actuals[p].x + cos(this.actuals[p].ang) * -this.actuals[p].influ;
          var yH = this.actuals[p].y + sin(this.actuals[p].ang) * -this.actuals[p].influ;

          bezierVertex(
            xPH, yPH,
            xH, yH,
            this.actuals[p].x, this.actuals[p].y,
          )
        }
      endShape();
    pop();
  }

  displayDebug(){
    push();
      for(var p = 1; p < this.actuals.length; p++){
        var xPH = this.actuals[p-1].x + cos(this.actuals[p-1].ang) * this.actuals[p-1].influ;
        var yPH = this.actuals[p-1].y + sin(this.actuals[p-1].ang) * this.actuals[p-1].influ;

        var xH = this.actuals[p].x + cos(this.actuals[p].ang) * -this.actuals[p].influ;
        var yH = this.actuals[p].y + sin(this.actuals[p].ang) * -this.actuals[p].influ;

        noStroke();
        fill(foreColor);
        ellipse(this.actuals[p].x, this.actuals[p].y, 5, 5);
        stroke(0,255,0);
        line(this.actuals[p].x, this.actuals[p].y, xH, yH);
        stroke(0,0,255);
        line(this.actuals[p-1].x, this.actuals[p-1].y, xPH, yPH);
      }
    pop();
  }

  reset(){

  }
}

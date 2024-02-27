class Cloud {
  constructor(ticker){
    this.ticker = ticker;

    this.zIndex = 0;
    this.rIndex = 0;

    this.rad = 400;

    this.p = [];
    this.final = [];

    // this.currentStroke = int(random(5))

    this.make();
  }

  make(){
    this.rMax = -random(PI, TWO_PI);

    this.p = [];
    this.final = [];

    var culmAng = 0;
    while(culmAng < TWO_PI){
      var thisAng = random(PI/32, PI/4);

      this.p[this.p.length] = { x: 0, y: 0, xH: 0, yH: 0 }

      let ranMain = random(-50, 50);
      let ranHan = random(150, 250);
      let x_ = cos(culmAng) * (this.rad + ranMain);
      let y_ = sin(culmAng) * (this.rad + ranMain);
      let xH_ = x_ + cos(culmAng) * ranHan;
      let yH_ = y_ + sin(culmAng) * ranHan;

      this.final[this.final.length] = {
        x: x_,
        y: y_,
        xH: xH_,
        yH: yH_
      }

      culmAng += thisAng;
    }
    
    this.p[this.p.length] = this.p[0];
    this.final[this.final.length] = this.final[0];
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    this.zIndex = map(this.ticker, 0, loopLength, 0, -20);

    if(this.ticker < loopLength - loopResolve){
      var tk0 = map(this.ticker, 0, loopLength - loopResolve, 0, 1);
      var tk1 = easeInQuad(tk0);
      // var tk2 = easeInOutExpo(tk0);
      for(var m = 0; m < this.p.length; m++){
        this.p[m].x = map(tk1, 0, 1, 0, this.final[m].x);
        this.p[m].y = map(tk1, 0, 1, 0, this.final[m].y);
        this.p[m].xH = map(tk1, 0, 1, this.p[m].x, this.final[m].xH);
        this.p[m].yH = map(tk1, 0, 1, this.p[m].y, this.final[m].yH);
      }
    } else if(this.ticker < loopLength){
      var tk0 = map(this.ticker, loopLength - loopResolve, loopLength, 0, 1);
      var tk1 = easeInCirc(tk0);
      // var tk2 = easeInOutExpo(tk0);
      for(var m = 0; m < this.p.length; m++){
        this.p[m].x = map(tk1, 0, 1, this.final[m].x, 0);
        this.p[m].y = map(tk1, 0, 1, this.final[m].y, 0);
        this.p[m].xH = map(tk1, 0, 1, this.final[m].xH, 0);
        this.p[m].yH = map(tk1, 0, 1, this.final[m].yH, 0);
      }
    }
    
    var tk0 = map(this.ticker, 0, loopLength, 0, 1);
    this.rIndex = map(easeOutSine(tk0), 0, 1, 0, this.rMax);

    this.ticker ++;
  }

  display(){
    fill(bkgdColor);
    stroke(foreColor);

    push();
      // translate(0, 0, this.zIndex);
      rotate(this.rIndex);

      beginShape();
      vertex(this.p[0].x, this.p[0].y);
      for(var m = 1; m < this.p.length; m++){
        bezierVertex(
          this.p[m - 1].xH, this.p[m - 1].yH,
          this.p[m].xH, this.p[m].yH,
          this.p[m].x, this.p[m].y
        )
      }
      endShape();
    pop();
  }

  reset(){
    print("RESET!");
    this.make();
    this.ticker = 0;
  }
}

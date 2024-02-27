class Berry {
  constructor(){
    this.lonRes = 40;
    this.lonAng = TWO_PI/this.lonRes;
    this.latRes = 30;
    this.latAng = PI/this.latRes;

    this.rad = 300;
    this.radPlus = [];

    this.animWindow = 300;
    this.noiseRes = 0.5;
    this.noiseDist = 2;
    this.noiseDelay = 0;

    this.uOffset = [];
    this.points = [];
    this.textureAnim = []
    for(var m = 0; m < this.latRes + 1; m++){
      this.points[m] = [];
      this.uOffset[m] = random(this.lonRes);
      this.textureAnim[m] = random(0.3);
    }
  }

  make(){

  }

  run(){
    this.update();
    this.display();
  }

  update(){
    for(var m = 0; m < this.latRes + 1; m++){
      var thisFrame = frameCount + m * this.noiseDelay;
      var tk0 = map(thisFrame%this.animWindow, 0, this.animWindow, 0, 1);
      var noiseMover = easeInOutExpo(tk0) + floor(thisFrame/this.animWindow);
      noiseMover *= this.noiseDist;

      var max0 = map(m, 0, this.latRes, 0, PI);
      var maxRad = map(sin(max0), 0, 1, 0, 200);

      this.radPlus[m] = map(noise(m * this.latAng * this.noiseRes + noiseMover), 0, 1, -maxRad, maxRad);
    }

    for(var m = 0; m < this.latRes + 1; m++){
      for(var n = 0; n <= this.lonRes; n++){
        var thisX = (this.rad + this.radPlus[m]) * sin(m * this.latAng) * cos(n * this.lonAng);
        var thisY = (this.rad + this.radPlus[m]) * cos(m * this.latAng);
        var thisZ = (this.rad + this.radPlus[m]) * sin(m * this.latAng) * sin(n * this.lonAng);

        this.points[m][n] = {
          x: thisX,
          y: thisY,
          z: thisZ
        };
      }
    }
  }

  display(){
    for(var m = 0; m < this.latRes; m++){
      noStroke();
      texture(pg[0]);

      beginShape(TRIANGLE_STRIP);
      for(var n = 0; n <= this.lonRes; n++){
        var u = map(n + this.uOffset[m] + frameCount * this.textureAnim[m], 0, this.lonRes, 0, 1);

        vertex(this.points[m][n].x, this.points[m][n].y, this.points[m][n].z, u, 0);
        vertex(this.points[m + 1][n].x, this.points[m + 1][n].y, this.points[m + 1][n].z, u, 1);
      }
      endShape();
    }
  }

  reRoll(){

  }
}

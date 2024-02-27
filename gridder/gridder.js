class Gridder {
  constructor(){
    textSize(pgTextSize);
    textFont(tFont[fontSel]);

    this.xCount = 25;
    this.yCount = 15;
    this.xSpace = textWidth("M");
    this.ySpace = pgTextSize;

    this.fullWidth = this.xCount * this.xSpace;
    this.fullHeight = this.yCount * this.ySpace;

    this.charLength = inputText.length;

    this.waveSize = -800;
    this.waveSpeed = 0.05;
  }

  make(){
    
  }

  run(){
    this.update();
    this.display();
  }

  update(){
   
  }

  display(){
    noStroke();
    fill(foreColor);

    push();
      translate(-this.fullWidth/2, -this.fullHeight/2);

      // var counter = floor((frameCount * 0.1));
      var counter = 0;
      for(var m = 0; m < this.yCount; m++){
        for(var n = 0; n < this.xCount; n++){
          var x = n * this.xSpace;
          var y = m * this.ySpace;

          /////////////////// ConfigWave
          // var dist0 = dist(x, y, this.fullWidth/2, this.fullHeight/2);
          var dist0 = dist(x, y, this.fullWidth/2, this.fullHeight);
          // var dist0 = dist(x, y, this.fullWidth, this.fullHeight/2);

          var distMap = map(dist0, 0, this.waveSize, 0, TWO_PI);
          var waver = map(sin(distMap + frameCount * this.waveSpeed), -1, 1, 0.05, 0.95);

          /////////////////// DRAW TEXT

          if(waver < 0.3666){          //////////////////////////////// 4x4            
            push();
              translate(x - this.xSpace/2 + this.xSpace/8, y - this.ySpace/2 + this.ySpace/8);
              for(var mm = 0; mm < 4; mm++){
                for(var nn = 0; nn < 4; nn++){
                  
                  var xx = nn * this.xSpace/4;
                  var yy = mm * this.ySpace/4;

                  push();
                    translate(xx, yy);
                    
                    scale(waver)
                    translate(0, pgTextSize * 0.7/2);
                    
                    if((mm + nn%2)%2 == 1){
                      fill(colorSet[0]);
                    } else {
                      fill(colorSet[1]);
                    }

                    // ellipse(0, 0, 3, 3);
                    text(inputText.charAt((counter + (mm + nn%2)%2)%this.charLength), 0, 0);
                  pop();
                }
              }
            pop();
          } else if(waver < 0.6833333){   //////////////////////////////// 2x2
            push();
              translate(x - this.xSpace/2 + this.xSpace/4, y - this.ySpace/2 + this.ySpace/4);
              for(var mm = 0; mm < 2; mm++){
                for(var nn = 0; nn < 2; nn++){
                  var xx = nn * this.xSpace/2;
                  var yy = mm * this.ySpace/2;

                  push();
                    translate(xx, yy);
                    
                    scale(waver)
                    translate(0, pgTextSize * 0.7/2);
                    
                    if((mm + nn%2)%2 == 1){
                      fill(colorSet[2]);
                    } else {
                      fill(colorSet[3]);
                    }

                    // ellipse(0, 0, 3, 3);
                    text(inputText.charAt((counter + (mm + nn%2)%2)%this.charLength), 0, 0);
                  pop();
                }
              }
            pop();
          } else {
            var tk0 = map(waver, 0.683333, 1, 0, 1);

            push();
              translate(x, y);

              scale(waver);

              fill(lerpColor(colorSet[4], color(255), tk0));
              // ellipse(0, 0, 3, 3);
              translate(0, pgTextSize * 0.7/2);
              text(inputText.charAt(counter%this.charLength), 0, 0);
            pop();
          }

          counter ++;
        }
      }
    pop();
  }

  reset(){
    print("RESET!");

  }
}

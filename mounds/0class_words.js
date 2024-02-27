class Word {
  constructor(index){
    this.index = index;

    this.lineText = inputText[index];
    this.ySpot = index * (pgTextSize * 0.85);

    this.spot = [];
    
    this.fullWidth = 0;

    this.make();
  }

  make(){
    textFont(tFont[fontSel]);
    textSize(pgTextSize);
    textAlign(LEFT);

    var culmLength = 0;
    var clicker = 0;
    this.spot[0] = {
      x: 0,
      y: 0,
      type: 0,
      content: this.lineText.charAt(0)
    }
    clicker++;
    culmLength += textWidth(this.lineText.charAt(0));

    for(var n = 1; n < this.lineText.length * 2 - 1; n++){
      if(n%2 == 0){         ////////// SPECIFY LETTER
        var culmText = this.lineText.substring(0, clicker + 1);
        var thisText = this.lineText.charAt(clicker);
        var widthCurrent = textWidth(culmText);
        var widthThis = textWidth(thisText);
        var thisWidth = widthCurrent - widthThis;

        this.spot[n] = {
          x: thisWidth,
          y: 0,
          type: 0,
          content: this.lineText.charAt(clicker)
        }

        clicker++;
      } else {           ////////// SPECIFY AnimSpot
        var x_ = textWidth(this.lineText.charAt(clicker - 1));

        this.spot[n] = {
          x: this.spot[n - 1].x + x_,
          y: -pgTextSize * 0.7/2,
          type: 1,
          content: new Mound(this.index)
        }
      }
    }
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    this.fullWidth = 0;

    for(var n = 0; n < this.spot.length; n++){
      if(this.spot[n].type == 0){
        this.fullWidth += textWidth(this.spot[n].content);
      } else {
        this.fullWidth += this.spot[n].content.currentWidth;
      }
    }
  }

  display(){
    push();
      translate(-this.fullWidth/2, this.ySpot);

      // translate(-width/3, 0)
      // translate(0, this.ySpot);
      
      textFont(tFont[fontSel]);
      textSize(pgTextSize);

      noStroke();
      fill(foreColor);

      push();
      for(var n = 0; n < this.spot.length; n++){
        push();
          translate(this.spot[n].x, this.spot[n].y);

          if(this.spot[n].type == 0){
            text(this.spot[n].content, 0, 0);
          } else {
            // ellipse(0, 0, 5, 5);
            this.spot[n].content.update();
          }
        pop();

        if(this.spot[n].type == 1){
          translate(this.spot[n].content.currentWidth, 0);
        }
      }
      pop();

      push();
      for(var n = 0; n < this.spot.length; n++){
        push();
          translate(this.spot[n].x, this.spot[n].y);

          if(this.spot[n].type == 0){
            // text(this.spot[n].content, 0, 0);
          } else {
            // ellipse(0, 0, 5, 5);
            this.spot[n].content.displayLine();
          }
        pop();

        if(this.spot[n].type == 1){
          translate(this.spot[n].content.currentWidth, 0);
        }
      }
      pop();
    pop();
  }
}
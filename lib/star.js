class Star {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // this.speed = speed;
    // this.type = Math.floor(Math.random() * 2);
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    ctx.drawImage(star, this.x, this.y, this.w - 20, this.h - 20);
  }

  move() {
    
    //fill in later
    // if (this.y > 550) {
      //if star moves outside the screen, we will generate another one on the top, and wait 5 seconds
      // this.clouds[index] = new Cloud(this.getRandomNum(400), this.getRandomNum(400), 80, 50);
    // }
  }

  disappear() {
    this.x = 600;
  }

}

export default Star;
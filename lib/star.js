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

    ctx.drawImage(star, this.x, this.y, this.w, this.h);
  }

  move() {
    //fill in later
  }

}

export default Star;
class Star {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    const star = new Image();
    star.src = '../cloud-jumper/src/images/star.png';

    ctx.drawImage(star, this.x, this.y, this.w - 20, this.h - 20);
  }

  move(){

  }
}

export default Star;
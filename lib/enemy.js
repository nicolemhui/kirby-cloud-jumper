class Enemy {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // this.type = Math.floor(Math.random() * 2);
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    ctx.drawImage(cloud, this.x - 30, this.y + 10, this.w + 80, this.h + 50);
    ctx.drawImage(enemy2, this.x, this.y, this.w, this.h);
  }

  move() {
    
    //fill in later
    // if (this.y > 550) {
      //if star moves outside the screen, we will generate another one on the top, and wait 5 seconds
      // this.clouds[index] = new Cloud(this.getRandomNum(400), this.getRandomNum(400), 80, 50);
    // }
  }
}

export default Enemy;
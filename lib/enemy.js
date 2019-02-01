class Enemy {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    const cloud = new Image();
    cloud.src = '../cloud-jumper/src/images/cloud.png';

    const enemy = new Image();
    // enemy.src = '../cloud-jumper/src/images/moonja.png';
    enemy.src = '../cloud-jumper/src/images/bandana1.png';

    ctx.drawImage(cloud, this.x - 30, this.y + 10, this.w + 80, this.h + 50);
    ctx.drawImage(enemy, this.x, this.y, this.w, this.h);
  }

  move() {
  }
}

export default Enemy;
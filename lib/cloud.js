class Cloud {
  constructor(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.type = Math.floor(Math.random() * 2);
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");

    ctx.drawImage(cloud, this.x, this.y, this.w + 50, this.h + 50);
  }

  move() {
    // Make it move down with a constant speed
    // this.y += this.speed;

    // Check if the cloud is out of the screen
    // if (this.y + this.h >= 500) {
    //   this.y = 0; // Make it jump to the top of the screen
    //   this.x = Math.floor(Math.random() * (400));
    // }
  }

}

export default Cloud;
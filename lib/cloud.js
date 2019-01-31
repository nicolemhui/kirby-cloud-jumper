class Cloud {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = null;

    //0 is not moving, 1 is moving
    this.moving = Math.floor(Math.random() * 3);
    this.type = Math.floor(Math.random() * 2);

    const dirArray = ["none", "x", "y"];
    this.moveDirection = dirArray[Math.floor(Math.random() * dirArray.length)];
    
    this.cloudImage = null;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    const cloud = new Image();
    cloud.src = '../cloud-jumper/src/images/cloud.png';
    const grayCloud = new Image();
    grayCloud.src = '../cloud-jumper/src/images/gray_cloud.png';

    if (this.type === 1) {
      this.cloudImage = ctx.drawImage(cloud, this.x, this.y, this.w + 50, this.h + 50);
    } else {
      this.cloudImage = ctx.drawImage(grayCloud, this.x, this.y, this.w, this.h + 20);
    }
  }

  move() {  
    if (this.moving === 1) {
      if (this.moveDirection === "y") {
        this.y += 2;
        this.checkBoundaries();
      } else if (this.moveDirection === "x") {
        this.x += 2;
        this.checkBoundaries();
      }
    }
  }

  checkBoundaries() {
    if (this.x >= 700 || this.x <= 0) {
      this.x -= 2;
    } else if (this.y >= 700 || this.y <= 0) {
      this.y -= 2;
    }
  }
}

export default Cloud;
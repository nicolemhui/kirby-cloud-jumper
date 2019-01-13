class Cloud {
  constructor(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");

    ctx.drawImage(cloud, this.x, this.y, this.w + 50, this.h + 50);
  }

  move() {
    // Make it move down with a constant speed
    this.y += this.speed;

    // Check if the cloud is out of the screen
    if (this.y + this.h >= 500) {
      this.y = 0; // Make it jump to the top of the screen
      this.x = Math.floor(Math.random() * (400));
    }
  }

  // move() {
  //   // Make it move down with a constant speed
  //   this.y += this.speed;

  //   // Check if the cloud is out of the screen
  //   if (this.y + this.h >= 500) {
  //     this.y = 0; // Make it jump to the top of the screen

  //     // If the cloud is the top one
  //     // if (this.y <= 320) {
  //     //   this.y = 0; // Math.random() * (max - min) + min
  //     //   // this.y = -(Math.random() * (150 - 50) + 50); // Math.random() * (max - min) + min
  //     //   // If the wall is the bottom one
  //     // } else {
  //     //   this.y = 370;
  //     //   // this.y = 320 + (Math.random() * (150 - 50) + 50);
  //     // }
  //   }
  // }



  addPlatform() {
    // var t = rand((320 - 60));
    var platformType = rand(50);

    // if (platformType <= 30) {
    //   platformType = "standard_platform";
    //   this.lastGoodPlatform = lowestPlank;
    // }
    // else if (platformType > 75 && platformType <= 93) {
    //   platformType = "broken_platform";
    // }
    // else {
    //   platformType = "spring_platform";
    // }


    var bottom = lowestPlank;

    if (this.lastGoodPlatform + 80 <= bottom) {
      platformType = "standard_platform";
    }


    var sp = new Element('div', {
      'class': platformType,
      'styles': {
        'left': rand((320 - 60)),
        'bottom': bottom
      }
    });

    sp.inject(gameInners);
    this.items.include(sp);
  }

}

export default Cloud;
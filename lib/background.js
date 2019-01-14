// class Background {
//   constructor(x, y, w, h, ctx) {
//     // Physical properties
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;
//     this.ctx = ctx;
//   }
  
//   // Draw call
//   draw() {
//     this.ctx.drawImage(bg, 0, 0, 500, 500, this.x, this.y, this.w, this.h);
//   }

//   // Move call
//   move() {
//     // Make it move to left with a constant speed
//     this.y -= 1;
    
//     // If it gets out from the screen, make it jump to the starting position so it seamlessly keeps scrolling endlessly
//     if (this.y <= -500) {
//       this.y = 500;
//     }
//   }
// }

// export default Background;
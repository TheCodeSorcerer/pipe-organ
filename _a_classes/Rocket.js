


// 🍆  🍆 DICK: ROCKET 🍆  🍆  
class Rocket {
  constructor(img, bx, by, angle, len, girth) {
    this.origin = createVector(bx, by);
    // 🍆  🍆 DICK 🍆  🍆  
    this.dick = new Penis(img, bx, by, angle);
    this.dick.setHeight(len);
    this.dick.setGirth(girth);

    this.velocity = 0;
    this.angle = angle;
    let a = angle - HALF_PI;
    const SPEED = 10;
    // 🐎 🐎 VELOCITY 🐎 🐎
    this.launchVelocity = createVector(SPEED * cos(a), SPEED * sin(a));

    this.hidden = false;
    this.throbbing = false;
    this.moving = false;

    this.exploding = false;
  }

  run () {
    if (this.exploding) {
      this.explosionSystem.run(); // 🎆 🎆 PARTICLE SYSTEM 🎆 🎆  
    }
    if (this.hidden) {
      return;
    }
    this.update();
  }
  
  update() {
    this.dick.update();
  
    if (this.throbbing) {
      // console.log(`c: ${this.dick.spring.currentHeight}; r: ${this.dick.spring.restingHeight}`);  
      if (this.dick.spring.currentHeight < this.dick.spring.restingHeight) {
        // console.log('on downstream');
      } else {
        this.throbbing = false;
        this.moving = true;
        this.velocity = this.launchVelocity;
      }
    }
  
    if (this.moving) {
      this.dick.spring.basex += this.velocity.x;
      this.dick.spring.basey += this.velocity.y;
  
      // 🎆 🎆 PARTICLE SYSTEM 🎆 🎆  
      this.smokeParticleSystem.setOrigin(createVector(
        this.dick.spring.basex, this.dick.spring.basey
      ));
      this.smokeParticleSystem.addParticle();
      this.smokeParticleSystem.addParticle();
      this.smokeParticleSystem.run();
    }
  }


  launch() {
    this.dick.throb();
    this.throbbing = true;
  
    // 🎆 🎆 PARTICLE SYSTEM 🎆 🎆  
    let origin = createVector(this.dick.spring.basex, this.dick.spring.basey);
    this.smokeParticleSystem = new SmokeParticleSystem(
      origin, {x: [-1, 1], y: [-1, 1]},
      150, color(200, 200, 200, 200)
    )
  }

  reset() {
    this.moving = false;
    this.hidden = false;
    this.dick.spring.basex = this.origin.x;
    this.dick.spring.basey = this.origin.y;
  }

  explode() {

    let h = this.dick.spring.restingHeight/2;
    let w = this.dick.spring.girth/2;
    const center = createVector(
      this.dick.spring.basex - w * cos(this.angle) + h * sin(this.angle),
      this.dick.spring.basey - w * sin(this.angle) - h * cos(this.angle)
    );
    // 🎆 🎆 PARTICLE SYSTEM 🎆 🎆  
    this.explosionSystem = new ExplosionSystem(center, 'red');
    this.explosionSystem.explode();
  
    this.exploding = true;
  
    this.reset();
    this.hidden = true;
  }

  getTip() {
    let h = 3/4* this.dick.spring.restingHeight;
    let w = 3/4* this.dick.spring.girth;
    return createVector(
      this.dick.spring.basex - w * cos(this.angle) + h * sin(this.angle),
      this.dick.spring.basey - w * sin(this.angle) - h * cos(this.angle)
    );
  }

}

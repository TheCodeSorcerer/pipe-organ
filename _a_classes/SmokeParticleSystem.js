
class SmokeParticle {

}

class SmokeParticleSystem {

  constructor(origin, vspread, lifespan, colr) {
    
    this.system = new CumParticleSystem(
      origin, 0, vspread, null,
      createVector(0, 0), lifespan, colr, 20
    );
  }

  addParticle() {
    this.system.addParticle();
  }

  addParticlesDelayed(num, delay) {
    this.system.addParticlesDelayed(num, delay);
  }

  setOrigin(origin) {
    this.system.setOrigin(origin);
  }

  run() {
    this.system.run();
  }

  setDefaultColorArray(colorArray) {
    this.system.setDefaultColorArray(colorArray);
  }

}
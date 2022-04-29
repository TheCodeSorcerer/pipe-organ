
/**
 * GREAT MERGER
 */
//--- PROJECT WITH ExplosionSystem MUST HAVE:
//--- array to hold the ExplosionSystems
//--- a triggering event that calls "ExplodeAt"
//--- constructor: _explosionSystem = new CPS(...);
//--- constructor: _explosionSystem.addParticlesDelayed
//--- a loop that calls _explosionSystem.run()

class ExplosionSystem {

  constructor(origin, particleColor, exParams={
    numParticles:100, radialMax:20
  }) {
    let particleColorArray;
    /// --- FIXME: this is bad, should check for array
    if (typeof particleColor === 'object' && particleColor.length) {
      particleColorArray = particleColor;
      particleColor = 'yellow';
    }
    this.system = new CumParticleSystem(
      origin,
      0, {x: [-20, 20], y: [-20, 20]},
      null, createVector(0, 0.7), 255, particleColor, 20
    );
    if (particleColorArray) {
      this.system.setDefaultColorArray(particleColorArray);
    }
    this.exParams = exParams;
    this.system.setVFunction(() => {
      let radialRange = [0, this.exParams.radialMax];
      let radius = random(radialRange[0], radialRange[1]);
      let angle = random(0, TWO_PI);
      return createVector(radius * cos(angle), radius * sin(angle));
    });

  }

  explode() {
    this.system.addParticlesDelayed(this.exParams.numParticles, 1);
  }

  /**
   * call inside the "draw" function
   */
  run() {
    this.system.run();
  }
}

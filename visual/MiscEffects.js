

class MiscEffects {

  constructor(organ) {
    this.SURPRISE_ROCKETS = [];
    this.ROCKETS_LAUNCHED = false;

    this.SPRINKLER_EFFECT = false;
    this.SPRINKLER_PERIOD = ((90 * 4)*4) / TWO_PI;
    this.sprinklerStartTime = 0;
    
    this.organ = organ;
  }

  setupRockets() {
    // --- initialize rockets
    for (let i = 0; i < 20; i++) {

      let x = map(i, 0, 20, 0 + 200, CW - 200);
      let y = CH + 300; // they will come from below
      
      this.SURPRISE_ROCKETS.push(new Rocket(ImageManager.HUE_DICKS[5], x, y, 0, 300, 50));
    }
  }

  launchRockets() {
    this.ROCKETS_LAUNCHED = true;
    let t0 = 0;
    for (let R of this.SURPRISE_ROCKETS) {
      setTimeout(() => {
        R.launch()
      }, t0);
      t0 += 800;
    }
  }


  // FIXME: these could be way better

  turnOffSprinklers() {
    //
    this.SPRINKLER_EFFECT = false;

    // --- this could go terribly wrong if the button is pressed more than once... let's table this
    let startTime = this.sprinklerStartTime;
    let currentTime = millis();



    //let endTime = next multiple of PI (plus startTime) after currentTime;
    // for example... if startTime is 4 then it will be 
    // -- t = 4 + n * PI,
    // -- where t is the smallest possible value greater than $currentTime
    /*
    for (let i = 0; i < organ.pipes.length; i++) {
      let ROW = organ.pipes[i];

      for (let j = 0; j < ROW.length; j++) {

        let P = ROW[j];
        let position = ANCHOR_POSITIONS[i][j];
        P.aimAtAngle(position.tht);
      }
    }
    */
  }

  turnOnSprinklers() {

    this.SPRINKLER_EFFECT = true;
    this.sprinklerStartTime = millis();

  }

  /**
   * 
   * @param {int} __clock__ time in millis
   */
  applySwayEffect(__clock__, rowId) {


    // FIXME: this should ADD to the angle, not blindly jump to the clock
    // FIXME: an option to do this is adjust the phase so "zero" is when the button is pressed;

    // (1) 'sprinklerStartTime = millis()'
    // (2)  subtract...
    // (3) calculate the "last phase"... which is the next 0 state after turned off

    let __clock_adjusted__ = (__clock__ - this.sprinklerStartTime) / this.SPRINKLER_PERIOD;

    for (let i of [rowId]) {
      let ROW = this.organ.pipes[i];

      for (let j = 0; j < ROW.length; j++) {
        let P = ROW[j];

        let position = this.organ.pipeAnchors[i][j];

        if (position.x === 0) {
          P.aimAtAngle(position.tht + 0.5 * sin(__clock_adjusted__));
        } else {
          P.aimAtAngle(position.tht - 0.5 * sin(__clock_adjusted__));
        }
      }
    }
  }

  /**
   * draw cursor as JK Simmons in Whiplash
   * 
   * @param {int} fCount the frame count
   */
  static drawSpecialCursor(fCount) {

    let IMG_INDEX = floor(fCount / 8) % 4;
    imageMode(CENTER);
    let FACE_DIRECTION = (fCount % 32 > 16);
    FACE_DIRECTION = false;
    // let NUM_GUYS = (false) ? (frameCount % 64 > 32) ? 3 : 1);
    let NUM_GUYS = 1;

    if (FACE_DIRECTION) {
      push();

      translate(mouseX, mouseY + (FACE_DIRECTION ? 50 : 0));
      scale(-1, 1);

      image(ImageManager.WHIPLASH[IMG_INDEX], 0, 0);

      pop();


    } else {
      image(ImageManager.WHIPLASH[IMG_INDEX], mouseX, mouseY + (FACE_DIRECTION ? 50 : 0));
    }

    if (NUM_GUYS === 3) {
      image(ImageManager.WHIPLASH[IMG_INDEX], mouseX - 300, mouseY + (FACE_DIRECTION ? 50 : 0));

      push();
      translate(mouseX + 300, mouseY + (FACE_DIRECTION ? 50 : 0));
      scale(-1, 1);

      //image(ImageManager.WHIPLASH[IMG_INDEX], mouseX + 300, mouseY + (FACE_DIRECTION ? 50 : 0));
      image(ImageManager.WHIPLASH[IMG_INDEX], 0, 0);

      pop();
    }
  }

  static drawSpecialCursorLightningFingersTo(target) {
    
    let fingerLocation = {
      x: mouseX + 115,
      y: mouseY
    };

    let distance = dist(fingerLocation.x, fingerLocation.y, target.x, target.y);
    let angle = atan2(target.y - fingerLocation.y, target.x - fingerLocation.x);

    noFill();
    strokeWeight(3);

    //circle(fingerLocation.x, fingerLocation.y, 20);

    const LIGHTNING_COLORS = [
      'yellow',
      'pink',
      'cyan',
      'lime'
    ]
    let NUM_RAYS = 5;
    let ANGLE_RANGE = PI/8;
    let RAY_DISPERSAL = 20;

    for (let i = 0; i < NUM_RAYS; i++) {
      let lastPoint = fingerLocation;
      for (let j = 0; j < distance; j += 10) {
        stroke(LIGHTNING_COLORS[floor(random(LIGHTNING_COLORS.length))]);
  
        let nextPoint = radial(lastPoint, 10, angle + random(-ANGLE_RANGE, ANGLE_RANGE));
  
        line(lastPoint.x, lastPoint.y, nextPoint.x, nextPoint.y);
  
        lastPoint = nextPoint;
      }
    }


    /*
    for (let i = 0; i < NUM_RAYS; i++) {

      stroke(LIGHTNING_COLORS[floor(random(LIGHTNING_COLORS.length))]);
      let randomR = random(RAY_DISPERSAL);
      line(
        fingerLocation.x , fingerLocation.y,
        target.x + randomR * cos(i / NUM_RAYS * TWO_PI),
        target.y + randomR * sin(i / NUM_RAYS * TWO_PI),
      );
    } */
  }

}

function radial(origin, radius, angle) {
  return {
    x: origin.x + radius * cos(angle),
    y: origin.y + radius * sin(angle),
  }
}

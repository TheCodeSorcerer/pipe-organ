
/// --- begin CORN:
let cornDicks;
let CORN_NOTES_LEFT;
let CORN_NOTES_RIGHT;

let tNotesCornLeft;
let tNotesCornRight;

let cornEnv = [], cornOsc = [];
let soundIndex = 0;


/**
 * 
 * @param {timedarray} timedNotes stored with corn
 * @param {index} timeIndex retrieved from default organ
 */
 function playNextCornNotes(timedNotes, timeIndex) {

  // MIDI MAP
  let midiMapLeft = [62, 64, 66, 67, 69];
  let midiMapRight = [74, 76, 78, 79, 81];

  let notesToPlay = timedNotes[timeIndex];

  if (!notesToPlay) return;

  for (let note of notesToPlay) {

    let si = soundIndex;

    cornOsc[si].start();
    let midiVal = note.midi;
    let freq = midiToFreq(midiVal);
    cornOsc[si].freq(freq);
    cornEnv[si].ramp(cornOsc[si], 0, 1.0, 0);

    if (++soundIndex >= cornOsc.length) soundIndex = 0;

    let penisIndex, penis;
    let indexLeft = midiMapLeft.indexOf(midiVal);
    if (indexLeft >= 0) {
      penisIndex = indexLeft;

      penis = cornDicks.CORN_DICKS_LEFT[penisIndex];

    } else {
      penisIndex = midiMapRight.indexOf(midiVal);

      penis = cornDicks.CORN_DICKS_RIGHT[penisIndex];
    }

    penis.cum(10, 3);
  }
}

function setupCornSound() {
  for (let i = 0; i < 2; i++) {
    // https://p5js.org/reference/#/p5.Oscillator
    cornOsc.push(new p5.TriOsc());
    cornEnv.push(new p5.Envelope()); 
  }
}
//// --- end CORN:


/// --- it might look better with:
// --- bigger dicks
// --- around an arch
// --- idk man... maybe one insdie the other?
class CornDicks {
  constructor(cw, ch) {
    // CORN: initialize
    this.CORN_ROOT_Y = ch + 200;

    this.CORN_SPACER = 40;

    this.CORN_ANGLE = QUARTER_PI;

    this.CORN_ROOT_X_LEFT = 1 / 3 * cw;
    this.CORN_DICKS_LEFT = [];
    this.CORN_ANCHORS_LEFT = [];

    this.CORN_ROOT_X_RIGHT = 2 / 3 * cw;
    this.CORN_DICKS_RIGHT = [];
    this.CORN_ANCHORS_RIGHT = [];


    this.CORN_ROOT_X_MID = 1/2 * cw;

    this.CORN_UP = false;
    this.CORN_DOWN = false;
    this.CORN_DISPLAY = false;

    this.CORN_DOWN_LEFT = 0;
    this.CORN_DOWN_RIGHT = 0;

    this.CORN_VEL = 2;
  }

  setupCorn(numCorn) {

    let origin = {
      x: this.CORN_ROOT_X_MID,
      y: this.CORN_ROOT_Y
    };

    for (let i = 0; i < numCorn; i++) {
  
      /// --- TWO CORN STALKS
      //let y = this.CORN_ROOT_Y - i * this.CORN_SPACER;
      //let angle = 0 + ((i % 2 === 0) ? this.CORN_ANGLE : -this.CORN_ANGLE);
  
      //this.CORN_ANCHORS_LEFT.push({ x: this.CORN_ROOT_X_LEFT, y, angle});
      //this.CORN_ANCHORS_RIGHT.push({ x: this.CORN_ROOT_X_RIGHT, y, angle});

      let angle = - QUARTER_PI + i / 5 * HALF_PI;
      let inner = {
        x: origin.x + 10 * cos(angle),
        y: origin.y + 10 * sin(angle)
      };
      let outer = {
        x: origin.x + 10 * cos(angle),
        y: origin.y + 10 * sin(angle)
      };
      this.CORN_ANCHORS_LEFT.push({x: inner.x, y: inner.y, angle});
      this.CORN_ANCHORS_RIGHT.push({x: outer.x, y: outer.y, angle});
    }
  
    // just copy over
    this.CORN_DICKS_LEFT = this.CORN_ANCHORS_LEFT.map(c => {
      let p = new Penis(ImageManager.HUE_DICKS[2], c.x, c.y, c.angle);
      p.setGirth(60);
      p.setHeight(300);
      p.cumSystem.setDefaultRadius(30);
      return p;
    });

    this.CORN_DICKS_RIGHT = this.CORN_ANCHORS_RIGHT.map(c => {
      let p = new Penis(ImageManager.HUE_DICKS[2], c.x, c.y, c.angle);
      p.setGirth(40);
      p.setHeight(200);
      p.cumSystem.setDefaultRadius(20);
      return p;
    });
  }
  
  drawCorn() {
  
    for (let i = 0; i < this.CORN_DICKS_LEFT.length; i++) {
      let cPen = this.CORN_DICKS_LEFT[i];
      let cPos = this.CORN_ANCHORS_LEFT[i];

      cPen.moveTo({
        x: cPos.x,
        y: cPos.y + this.CORN_DOWN_LEFT
      })
      cPen.update();
      //this.radialLine(cPen, 40, cPen.angle);
    }
  
    for (let i = 0; i < this.CORN_DICKS_RIGHT.length; i++) {
      let cPen = this.CORN_DICKS_RIGHT[i];
      let cPos = this.CORN_ANCHORS_RIGHT[i];

      cPen.moveTo({
        x: cPos.x,
        y: cPos.y + this.CORN_DOWN_RIGHT
      })
      cPen.update();
      //this.radialLine(c, 40, c.angle);
    }
  }
  
  radialLine(origin, radius, angle) {
    let dest = {
      x: origin.x + radius * cos(angle),
      y: origin.y + radius * sin(angle),
    }
  
    stroke('cyan');
    circle(origin.x, origin.y, 5);
    strokeWeight(5);
    stroke('yellow');
    line(origin.x, origin.y, dest.x, dest.y);
  }
  
  
  upCorn() {
    this.CORN_DOWN_LEFT -= this.CORN_VEL;
    this.CORN_DOWN_RIGHT -= this.CORN_VEL;
  }
  
  downCorn() {
    this.CORN_DOWN_LEFT += this.CORN_VEL;
    this.CORN_DOWN_RIGHT += this.CORN_VEL;
  }
  
}

/**
 *  🕶️ 🕶️ KEYBOARD 🕶️ 🕶️  
 *  🕶️ 🕶️ KEYBOARD 🕶️ 🕶️  
 * === KEY PRESS HANDLER ==
 *  🕶️ 🕶️ KEYBOARD 🕶️ 🕶️  
 */
 class KeyPressHandler {

  constructor(pipeOrgan, timeJumps=[]) {

    this.pipeOrgan = pipeOrgan;
    this.timeJumps = timeJumps;

    // ---- INPUTS
    this.RADIUS_MAP = {
      'u': 10,
      'i': 20,
      'o': 30
    };

    this.VELOCITY_MAP = {
      'n': {x: [-1, 1], y: [-30, -40]},
      'd': {x: [-1, 1], y: [-12, -9]}
    };


    /** CUM DISPLAY */

    this.COLOR_MAP = {
      'g': CUM_COLORS.lime,
      'w': '#ffffff'
    };

    this.COLOR_FUNCTION_MAP = {
      // 💥 💥 EFFECTS 💥 💥
      /** Confetti Array */
      'q': (P) => {
        P.cumSystem.setDefaultImageArray(null);
        P.cumSystem.setDefaultColorArray(PASTEL);
      },

      // 💥 💥 EFFECTS 💥 💥
      /** Random Confetti selection */
      'r': (P) => {
        P.cumSystem.setDefaultImageArray(null);
        P.cumSystem.setDefaultColorArray(null);
        P.setCumColor(CONFETTI[floor(random(CONFETTI.length))]);
      }
    }

    this.IMAGE_MAP = {
      'h': ImageManager.HEARTS_FOREGROUND,
      'y': ImageManager.FLOWER_EMOJIS
    }


  }

  bindTimeJumps(timeJumps) {
    this.timeJumps = timeJumps;
  }

  setTimeIndex(timeIndex) {
    this.pipeOrgan.timeIndex = timeIndex;
  }

  allPipes() {

    let all = [];
    for (let ROW of this.pipeOrgan.pipes) {
      for (let P of ROW) all.push(P);
    }
    return all;
  }

  applyEffect(effectFunction) {
    for (let pipe of this.allPipes()) {
      effectFunction(pipe);
    }
  }


  /**
   * 
   * @param {int} key key pressed
   */
  checkForTimeJumps(key) {

    // map keys 0-9 to various times
    // ---- INPUTS
    let m = min(this.timeJumps.length, Object.keys(KEY_NUMBERS).length);

    for (let i = 0; i < m; i++) {
      if (key === KEY_NUMBERS[i]) {
        // ⏳  ⏳ TIMER ⏳  ⏳
        this.setTimeIndex(this.timeJumps[i]);
      }
    }
  }


  /**
   * Check for effects changes
   * 
   * @param {int} key keyCode of key pressed
   */
  checkForEffects(key, miscEffects) {
    this.checkForRadiusChanges(key);
    this.checkForColorChanges(key);
    this.checkForVelocityChanges(key);

    this.checkForMiscEffects(key, miscEffects);
  }

  checkForRadiusChanges(key) {
     // ---- CUM RADIUSES
     let rMap = this.RADIUS_MAP;

     for (let k of Object.keys(rMap)) {
      if (key === KEY_LETTERS[k]) {
        // 💥 💥 EFFECTS 💥 💥
        this.applyEffect(P => P.cumSystem.setDefaultRadius(rMap[k]));
      }
     }
  }

  checkForVelocityChanges(key) {
    // --- CUM VELOCITIES
    let vMap = this.VELOCITY_MAP;

    for (let k of Object.keys(vMap)) {
      if (key === KEY_LETTERS[k]) {
        // 💥 💥 EFFECTS 💥 💥
        this.applyEffect(P => P.setVelocityRange(vMap[k]));
      }
    }
  }

  checkForColorChanges(key) {
    /// --- CUM COLORS

    let cMap = this.COLOR_MAP;

    for (let k of Object.keys(cMap)) {
      if (key === KEY_LETTERS[k]) {
        // 💥 💥 EFFECTS 💥 💥
        this.applyEffect(P => {
          P.cumSystem.setDefaultImageArray(null);
          P.cumSystem.setDefaultColorArray(null);
          P.setCumColor(cMap[k]);
        });
      }
    }

    let cFunMap = this.COLOR_FUNCTION_MAP;

    for (let k of Object.keys(cFunMap)) {
      if (key === KEY_LETTERS[k]) {
        this.applyEffect(cFunMap[k]);
      }
    }

    // ---- INPUTS
    let imgMap = this.IMAGE_MAP;

    for (let k of Object.keys(imgMap)) {
      if (key === KEY_LETTERS[k]) {
        this.applyEffect(P => P.cumSystem.setDefaultImageArray(imgMap[k]));
      }
    }
  }

  checkForMiscEffects(key, miscEffects) {

    // 💥 💥 EFFECTS 💥 💥
    // ---- SPRINKLER EFFECT
    if (key === KEY_LETTERS.s) {

      if (miscEffects.SPRINKLER_EFFECT) {

       let waitTime = miscEffects.turnOffSprinklers();


      } else {

        miscEffects.turnOnSprinklers();
      }
    }

    // -- ROCKET LAUNCH
    // 💥 💥 EFFECTS 💥 💥
    if (keyCode === KEY_LETTERS.x) {
      if (!miscEffects.ROCKETS_LAUNCHED) miscEffects.launchRockets();
    }

  }



  displayKeyMappings(cw, ch) {

    // see-through!!!
    fill('#00000066');

    let x = 100, y = 100;
    rect(x, y, 500, 500);

    let keys;

    fill('white');
    let TEXT_SIZE = 40;
    textSize(TEXT_SIZE);
    textAlign(LEFT, TOP);
    // cum radiuses
    for (let k of Object.keys(this.RADIUS_MAP)) {

      let value = this.RADIUS_MAP[k];
      
      text(k, x + 10, y + 10);
      text(`radius: ${value}`, x + 50, y + 10);

      y += TEXT_SIZE;
    }

    // cum velocities
    for (let k of Object.keys(this.VELOCITY_MAP)) {

      let value = this.VELOCITY_MAP[k];
      value = `[${value.y[0]} to ${value.y[1]}]`;
      
      text(k, x + 10, y + 10);
      text(`velocity: ${value}`, x + 50, y + 10);

      y += TEXT_SIZE;
    }

    // cum colors
    for (let k of Object.keys(this.COLOR_MAP)) {

      let value = this.COLOR_MAP[k];
      //value = `[${value.y[0]} to ${value.y[1]}]`;
      
      fill('white');
      text(k, x + 10, y + 10);
      let cText = `color:`;
      text(cText, x + 50, y + 10);

      noStroke();
      fill(value);
      circle(x + 50 + + 30 + textWidth(cText) + TEXT_SIZE/2, y + 10 + TEXT_SIZE/2, TEXT_SIZE * 2/3);

      y += TEXT_SIZE;
    }

    // cum color functions

    // images
    for (let k of Object.keys(this.IMAGE_MAP)) {
      let value = this.IMAGE_MAP[k];

      text(k, x + 10, y + 10);
      let cText = `images:`;
      text(cText, x + 50, y + 10);

      imageMode(CENTER);
      for (let i = 0; i < value.length; i++) {
        image(value[i],
          x + 50 + 30 + textWidth(cText) + TEXT_SIZE/2 + i * TEXT_SIZE,
          y + 10 + TEXT_SIZE/2,
          TEXT_SIZE * 2/3, TEXT_SIZE * 2/3
        );
      }

      y += TEXT_SIZE;
    }
  }
}

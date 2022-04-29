

class SceneManager {

  constructor(scenes, effectTriggers=[]) {
    this.scenes = scenes;

    this.effectTriggers = effectTriggers;
  }

  bindMiscEffects(miscEffects) {
    this.miscEffects = miscEffects;
  }

  checkForSceneChanges() {
    /**
     * This database is for dick changes
     */
    for (let s of this.scenes) {
      let sceneTick = s.ticks;//s.time / GCF;
      let lastTick = organ.timeIndex - 1;

      // -- must check just in case there are non-integers (there may be)
      if (sceneTick <= organ.timeIndex && sceneTick > lastTick) {
        this.applySceneChange(s);
      }
    }

    /**
     * This database is for bonus effects
     * 
     */
    for (let tr of this.effectTriggers) {
      let triggerTick = tr.ticks;
      let lastTick = organ.timeIndex - 1;

      if (triggerTick <= organ.timeIndex && triggerTick > lastTick) {
        console.log(`applying trigger: ${tr.action}`);

        // 💥 💥 EFFECTS 💥 💥
        switch(tr.action) {
          case 'rockets':
            // FIXME: this is a good place to leave off for the evening
            this.miscEffects.launchRockets();
          break;

          case 'swayOn':
            this.miscEffects.turnOnSprinklers();
            break;

          case 'swayOff':
            this.miscEffects.turnOffSprinklers();
            break;
        }
      }
    }
  }

  applySceneChange(scene) {
    let DICKS = organ.pipes[scene.dicks];

    console.log(`time=${scene.ticks}: applying action ${scene.action}:${scene.value} to ${DICKS.length} pipes`);

    switch(scene.action) {
      case 'cumColor':
        for (let D of DICKS) {
          // 💥 💥 EFFECTS 💥 💥
          D.cumSystem.setDefaultImageArray(null);
          D.cumSystem.setDefaultColorArray(null);
          D.setCumColor(scene.value);
        }
        break;

      case 'cumImageArray':
        console.log('changing cumImageArray:')
        console.log(scene.value);
        for (let D of DICKS) {
          // 💥 💥 EFFECTS 💥 💥
          D.cumSystem.setDefaultImageArray(IMAGE_MAP[scene.value]);
        }
        break;

      case 'vSpread':
        for (let D of DICKS) {
          // 💥 💥 EFFECTS 💥 💥
          D.setVelocityRange(scene.value);
        }
        break;

      case 'cumColorArray':
        for (let D of DICKS) {
          D.cumSystem.setDefaultImageArray(null);
          D.cumSystem.setDefaultColorArray(scene.value);
        }
        break;

      case 'cumRadius':
        for (let D of DICKS) {
          // 💥 💥 EFFECTS 💥 💥
          D.cumSystem.setDefaultRadius(scene.value);
        }
        break;

      case 'numCum':
        for (let D of DICKS) {
          D.setNumCum(scene.value);
        }
        break;
    }
  }
}
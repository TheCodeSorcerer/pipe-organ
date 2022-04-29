
/**
 * HERE we can keep everything that is specific to the song ALONE.
 */


/**
 * FIXME: these variables are scattered throughout the code, a diaspora of settings
 * SongSettings are mostly how the song is displayed
 */
class SongAlone extends SongSettings {

  static BASS = 0;
  static MELODY = 1;
  static RHYTHM = 2;

  // which colors to draw the notes for each track
  // √√√ found in sketch-pipeorgan.js
  // piped directly into NoteDisplay.js
  static noteColorsByTrack = ['#ddddff', '#9BFF8C', '#F68FC7'];

  // background color
  // √√√ found in sketch-pipeorgan.js
  static backgroundColor = BKG_COLORS.light_blue;

  // -- where the keys 0-9 will jump to
  // √√√ found in sketch-pipeorgan.js
  // piped directly into KeyPressHandler.js
  static timeJumps = [
    2000, // lol the end
    200,
    400 - 20,
    600,
    800,
    1000,
    1200,
    1400,
    1600,
    1800 - 40
  ];

  /**
   * for each track, what are the dick settings?
   */
  // √√√ found in sketch-pipeorgan.js
  // piped directly into Organ.js "setupPipes"
  static penisParams = {
    // BASS
    0: {
      // TODO: this could tell which image to use
      img: 8,
      girth: 60,
      height: 180,
      initDisp: 40,
      cumRadius: 30,
      lifespan: 200,
      vRange: {x: [-1, 1], y: [-9, -12]},
      numCum: 10,
      cumDelay: 3,
    },
    // MELODY
    1: {
      img: 3,
      girth: 30,
      height: 120,
      initDisp: 30,
      cumRadius: 20,
      lifespan: 200,
      vRange: {x: [-1, 1], y: [-13, -17]},
      numCum: 10,
      cumDelay: 3,
    },
    // RHYTHM
    2: {
      img: 10,
      girth: 40,
      height: 160,
      initDisp: 40,
      cumRadius: 20,
      lifespan: 200,
      vRange: {x: [-1, 1], y: [-15, -20]},
      numCum: 10,
      cumDelay: 3,
    },
  }


  /**
   * compute the penis positions based on track
   * 
   * @param {Range} minmax range of track
   * @param {index} trackId track ID
   * @param {int} noteCol midi 
   * @returns 
   */

  // √√√ found in sketch-pipeorgan.js
  // piped directly into Organ.js "setupPipes"
  static calcTrackOrganXY(minmax, trackId, noteCol) {
    switch (trackId) {
      // BASS
      case SongAlone.BASS: 
        const BASS_X_BUFFER = 200;
        return {
          x: map(noteCol, minmax.min, minmax.max, 0 + BASS_X_BUFFER, CW - BASS_X_BUFFER),
          y: CH,
          tht: 0
        }

      case SongAlone.MELODY:
        const M1_BUFFER = 300;
        return {
          x: map(noteCol, minmax.min, minmax.max, 0 + M1_BUFFER, CW - M1_BUFFER),
          y: 600,
          tht: 0
        }

      case SongAlone.RHYTHM:
        let lSide = noteCol % 2 === 1;
        return {
          x: lSide ? 0 : CW,
          y: map(noteCol, minmax.min, minmax.max, 400, 900),
          tht: lSide ? PI/4 : -PI/4
        }
    }
    return {
      x: 20 + (noteCol - minmax.min) * 40,
      y: 800 - (trackId * 100),
      tht: 0
    }
  }
}


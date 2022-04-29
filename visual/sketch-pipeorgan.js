
/**
 * SOURCES:

 * Midi to JSON Converter: https://github.com/Tonejs/Midi
 * 
 * MIDI format, just in case: https://www.cs.cmu.edu/~music/cmsip/readings/Standard-MIDI-file-format-updated.pdf


 */

let songJSON, trackIndices;
let DO_THE_CORN = false;
const SONG = [
  SONGS.ALONEP2,
  SONGS.ALONE_CORN,
  SONGS.CASCADA,
  SONGS.DISORDER
][DO_THE_CORN ? 1 : 0]; // see db-songs.js
const GCF = SONG.GCF; // TICK divider

let songSettings = SongAlone;

let IMAGE_MAP = {};


let tNotes = []; // <-- notes time-indexed
let trackMinMax = [];

// -- the important guys
let organ, keyHandler, sceneManager, noteDisplay;
let miscEffects;

// ⏳  ⏳ TIMER ⏳  ⏳
let __clock_last__ = 0;
const NOTE_DELAY = 90;

// -- DISPLAY
const DISPLAY = OTIS_TV;
const CW = DISPLAY.CW;
const CH = DISPLAY.CH;

let SHOW_NOTES_BACKGROUND = false;
let DISPLAY_KEY_MAPPINGS = false;
let DISPLAY_TIME_INDEX = true;
let DRAW_SPECIAL_CURSOR = false;
let DRAW_SPECIAL_CURSOR_LIGHTNING = false;
let LIGHTNING_TARGET = [0, 0];

function preload() {

    let url = SONG.url; //'../json/Alone-verbose.json'; // track 0
    trackIndices = SONG.trackIndices;//0;
    songJSON = loadJSON(url);

    // CORN: which penis?
    // CORN: load leaves

    ImageManager.preload('./images');

    IMAGE_MAP['HEARTS'] = ImageManager.HEART_EMOJIS;
    IMAGE_MAP['HEARTS_BKG'] = ImageManager.HEARTS_BACKGROUND;
    IMAGE_MAP['HEARTS_FORE'] = ImageManager.HEARTS_FOREGROUND;
    IMAGE_MAP['HEART_YELLOW'] = ImageManager.HEART_YELLOW;
    IMAGE_MAP['HEART_GREEN'] = ImageManager.HEART_GREEN;
    IMAGE_MAP['HEART_ORANGE'] = ImageManager.HEART_ORANGE;
    IMAGE_MAP['FLOWERS'] = ImageManager.FLOWER_EMOJIS;


    IMAGE_MAP['FLOWERS'] = ImageManager.FLOWER_EMOJIS;
}


function setup() {
    createCanvas(CW, CH);
    noCursor();

    organ = new PipeOrgan(SONG.drawOrder);

    keyHandler = new KeyPressHandler(organ);
    keyHandler.bindTimeJumps(songSettings.timeJumps);

    // FIXME: this must depend on the "miscEffects" object
    sceneManager = new SceneManager(SCENE_CHANGES_ALONE, EFFECT_TRIGGERS_ALONE);


    // first flatten the JSON tracks into a single array
    // then make it an array of arrays, ordered by Time
    let notesFlatArray = SongParser.flattenTrackNotesToSingleArray(songJSON.tracks, trackIndices);
    tNotes = SongParser.convertFlatArrayToTimedArray(notesFlatArray, GCF);

    if (DO_THE_CORN) {
      CORN_NOTES_LEFT = songJSON.tracks[3];
      let cornNotesLeftFlat = SongParser.flattenTrackNotesToSingleArray([CORN_NOTES_LEFT], [0]);
      tNotesCornLeft = SongParser.convertFlatArrayToTimedArray(cornNotesLeftFlat, GCF);

      CORN_NOTES_RIGHT = songJSON.tracks[4];
      let cornNotesRightFlat = SongParser.flattenTrackNotesToSingleArray([CORN_NOTES_RIGHT], [0]);
      tNotesCornRight = SongParser.convertFlatArrayToTimedArray(cornNotesRightFlat, GCF);

      console.log(cornNotesLeftFlat);
      console.log(tNotesCornLeft);
      console.log(CORN_NOTES_RIGHT);
    }

    console.log(notesFlatArray);

    noteDisplay = new NoteDisplay();

    let maxTracksAtOnce = SongParser.calcMaxOutputsNeeded(tNotes);

    console.log(`there are: ${notesFlatArray.length} notes total`);
    console.log(`max of ${maxTracksAtOnce} tracks will be needed`);

    // -- set up the Oscillators and Envelopes
    organ.setupSound(maxTracksAtOnce);

    // -- TRACK - parse out the range of notes in each track
    // -- could be moved to a different
    for (let i = 0; i < songJSON.tracks.length; i++) {
      let T = songJSON.tracks[i];
      // FIXME: this doesn't filter out unused tracks
      if (trackIndices.indexOf(i) >= 0) {
        trackMinMax.push(SongParser.calculateNoteRange(T.notes));
      }
    }

    organ.setupPipes(trackMinMax, songSettings.penisParams, songSettings.calcTrackOrganXY);

    // CORN: set up corn guys
    cornDicks = new CornDicks(CW, CH);
    cornDicks.setupCorn(5);
    setupCornSound();

    miscEffects = new MiscEffects(organ);
    miscEffects.setupRockets();

    sceneManager.bindMiscEffects(miscEffects);

}


function draw() {
    
    background(SongAlone.backgroundColor);

    // --- 🐛 DEBUG 🐛 NOTES BACKGROUND
    if (SHOW_NOTES_BACKGROUND) {
      noteDisplay.drawTimeNotes(tNotes, songSettings.noteColorsByTrack);

      // CORN:
      if (DO_THE_CORN) {
        noteDisplay.drawTimeNotes(tNotesCornLeft, ['#444400']);
        noteDisplay.drawTimeNotes(tNotesCornRight, ['black']);
      }
    }

    if (DISPLAY_TIME_INDEX) {
      displayTimeIndex();
    }

    // 💥 💥 EFFECTS 💥 💥
    if (miscEffects.ROCKETS_LAUNCHED) {
      for (let R of miscEffects.SURPRISE_ROCKETS) {
        R.run();
      }
    }
    
    if (DRAW_SPECIAL_CURSOR) {
      MiscEffects.drawSpecialCursor(frameCount);
    }


    let __clock__ = millis();

    if (organ.playing) {  
        // frameCount works well when all frames take consistent drawing
        // but if there are a variable number of particles running, some frames take longer
        
        //if (frameCount % 5 === 0) {
        if (__clock__ - __clock_last__ > NOTE_DELAY) {
            organ.playNextNote(tNotes, trackMinMax);

            if (DO_THE_CORN) {
              playNextCornNotes(tNotesCornLeft, organ.timeIndex);
              playNextCornNotes(tNotesCornRight, organ.timeIndex);
            }
            __clock_last__ = __clock__;

            /// check for scene changes
            sceneManager.checkForSceneChanges();
        }
        //}
    }


    // 💥 💥 EFFECTS 💥 💥
    // --- only Sprinkler for Side Rhythms
    if (miscEffects.SPRINKLER_EFFECT) {
      miscEffects.applySwayEffect(__clock__, songSettings.RHYTHM);
      //miscEffects.applySwayEffect(__clock__, songSettings.BASS);
      //miscEffects.applySwayEffect(__clock__, songSettings.MELODY);
    }

    // 🍆  🍆 DICK 🍆  🍆  


    organ.drawPipes();

    // CORN: draw special corn guys
    if (cornDicks.CORN_UP) {
      cornDicks.upCorn();
    }
    if (cornDicks.CORN_DOWN) {
      cornDicks.downCorn();
    }
    if (cornDicks.CORN_DISPLAY) {
      cornDicks.drawCorn();
    }



    if (DRAW_SPECIAL_CURSOR && DRAW_SPECIAL_CURSOR_LIGHTNING) {
      //MiscEffects.drawSpecialCursorLightningFingersTo({x: 800, y: 400});
      let dickRow = organ.pipeAnchors[LIGHTNING_TARGET[0]];
      let target = dickRow[floor(random(dickRow.length))];
      MiscEffects.drawSpecialCursorLightningFingersTo(target);
    }


    if (DISPLAY_KEY_MAPPINGS) keyHandler.displayKeyMappings(width, height);
}

function displayTimeIndex() {
  textSize(100);
  fill('white');
  stroke('black');
  textAlign(CENTER, CENTER);
  text(organ.timeIndex, CW/2, 300);
}

function keyPressed() {
    if (keyCode === KEY_LETTERS.j || keyCode === KEY_LETTERS.f) {
        organ.playNextNote(tNotes, trackMinMax);

        sceneManager.checkForSceneChanges();
    }
    if (keyCode === KEY_LETTERS.p) {
      organ.playing = !organ.playing;
    }
    if (keyCode === KEY_LETTERS.a) {
      DISPLAY_TIME_INDEX = !DISPLAY_TIME_INDEX;
    }

    if (keyCode === KEY_LETTERS.m) {
      DRAW_SPECIAL_CURSOR = !DRAW_SPECIAL_CURSOR;
    }
    if (keyCode === KEY_LETTERS.l) {
      DRAW_SPECIAL_CURSOR_LIGHTNING = !DRAW_SPECIAL_CURSOR_LIGHTNING;
    }
    if (keyCode === KEY_LETTERS.t) {
      DISPLAY_KEY_MAPPINGS = !DISPLAY_KEY_MAPPINGS;
    }

    if (keyCode === KEY_LETTERS.c) {
      // CORN: go up
      cornDicks.CORN_DOWN = false;
      cornDicks.CORN_UP = true;
      cornDicks.CORN_DISPLAY = true;
    }
    if (keyCode === KEY_LETTERS.v) {
      // CORN: go down
      cornDicks.CORN_UP = false;
      cornDicks.CORN_DOWN = true;
      cornDicks.CORN_DISPLAY = true;
    }
    if (keyCode === KEY_LETTERS.b) {
      cornDicks.CORN_DISPLAY = !cornDicks.CORN_DISPLAY;
      if (!cornDicks.CORN_DISPLAY) {
        cornDicks.CORN_UP = false;
        cornDicks.CORN_DOWN = false;
      }
    }


    // ⏳  ⏳ TIMER ⏳  ⏳
    if (keyCode === KEY_LETTERS.z) {
      organ.timeIndex = 0;
      organ.playing = false;
    }

    if (keyCode === KEY_LETTERS.k) {
      SHOW_NOTES_BACKGROUND = !SHOW_NOTES_BACKGROUND;
    }

    if (keyCode === UP_ARROW) {
      if (++LIGHTNING_TARGET[0] >= organ.pipes.length) LIGHTNING_TARGET[0] = 0;

      console.log(LIGHTNING_TARGET[0]);
      console.log(organ.pipes.length);

    } else if (keyCode === DOWN_ARROW) {
      LIGHTNING_TARGET[0]--;
      if (LIGHTNING_TARGET[0] < 0) LIGHTNING_TARGET[0] = organ.pipes.length - 1;
    } else if (keyCode === RIGHT_ARROW) {

    } else if (keyCode === LEFT_ARROW) {

    }


    keyHandler.checkForEffects(keyCode, miscEffects);
    keyHandler.checkForTimeJumps(keyCode);
}


function keyReleased() {
  if (keyCode === KEY_LETTERS.j || keyCode === KEY_LETTERS.f) {
      organ.playNextNote(tNotes, trackMinMax);

      sceneManager.checkForSceneChanges();
  }
}



let SONG = SONGS.FISH;
//let SONG = SONGS.ALONEP2;
//let SONG = SONGS.CASCADA;

let songSettings = SongFishes;
//let songSettings = SongAlone;
//let songSettings = SongCascada;

let songJSON, trackIndices, trackMinMax = [], globalMinMax;

let notesByTrack;

function preload() {

  let url = SONG.url;
  trackIndices = SONG.trackIndices;
  songJSON = loadJSON(url);
}

function setup() {
  createCanvas(1200, 800);

  for (let i = 0; i < songJSON.tracks.length; i++) {
    let T = songJSON.tracks[i];

    if (!trackIndices || trackIndices.indexOf(i) >= 0) {
      trackMinMax.push(SongParser.calculateNoteRange(T.notes));
    } else {
      trackMinMax.push({min: 1000, max: 0});
    }
  }

  let gMin = 1000, gMax = 0;
  console.log(`iterating through ${trackMinMax.length} minmaxes`);
  let i = 0;
  for (let mm of trackMinMax) {
    console.log(`${++i}: ${mm.min}, ${mm.max}`);
    if (mm.min < gMin) gMin = mm.min;
    if (mm.max > gMax) gMax = mm.max;
  }
  globalMinMax = {min: gMin, max: gMax};

  console.log(`min=${globalMinMax.min}; max=${globalMinMax.max}`);

  notesByTrack = songJSON.tracks.map(track => {
    return uniqueMidiVals(track.notes);
  });
}

/**
 * get an array of the unique midi vals for a track
 */
function uniqueMidiVals(notes) {

  let vals = [];

  for (let note of notes) {
    let midiVal = note.midi;
    if (!vals.includes(midiVal)) vals.push(midiVal);
  }

  return vals;
}


function draw() {

  background(songSettings.backgroundColor);

  console.log(`there are ${notesByTrack.length} tracks`);

  const NOTE_SIZE = 10;
  const X_START = 200;

  let y0 = 100 - 5;
  let y1 = 100 + (notesByTrack.length * 30) - 15;

  stroke('white');
  for (let xi = globalMinMax.min; xi <= globalMinMax.max; xi += 1) {

    if (xi % 5 === 0) {
      let x = X_START + 30 + (xi - globalMinMax.min) * NOTE_SIZE + NOTE_SIZE/2;
      stroke('white');
      line(x, y0, x, y1);

      fill('white');
      noStroke();
      textAlign(CENTER, BOTTOM);
      text(xi, x, y1 + 20);
    }
  }

  let xb = X_START + 30 + (0) * NOTE_SIZE + NOTE_SIZE/2;
  let xe = X_START + 30 + (globalMinMax.max - globalMinMax.min) * NOTE_SIZE + NOTE_SIZE/2;
  
  for (let tId = 0; tId < notesByTrack.length; tId++) {

    let track = notesByTrack[tId];

    fill('white');
    noStroke();
    textSize(20);
    textAlign(RIGHT, TOP);
    text(songJSON.tracks[tId].instrument.name, X_START, 100 + tId * 30);

    //noStroke();
    stroke('black');
    fill(songSettings.noteColorsByTrack[tId]);

    for (let mIndex = 0; mIndex < track.length; mIndex++) {

      rect(
        X_START + 30 + (track[mIndex] - globalMinMax.min) * NOTE_SIZE,
        100 + tId * 30,
        NOTE_SIZE, NOTE_SIZE
      );
    }
  }


  stroke('white');
  line(xb, y1, xe, y1);

  noLoop();

}
// ==== SONG DB ====
// this one looks great with different colored stuff

const SONGS = {
  ALONE: {
    url: '../json/Alone-original.json',
    GCF: 24,
    trackIndices: [0]
  },

  ALONEP: {
    url: '../json/Alone-parsed.json',
    GCF: 24,
    trackIndices: [0, 1, 2, 3]
  },

  // has only one melody
  ALONEP2: {
    url: '../json/Alone-parsed-2.json',
    GCF: 24,
    trackIndices: [0, 1, 2],
    drawOrder: [0, 2, 1]
  },

  ALONE_CORN: {
    url: '../json/Alone-parsed-corn.json',
    GCF: 24,
    trackIndices: [0, 1, 2], // -- leave these as is, parse the corn separately
    drawOrder: [0, 2, 1]
  },
  
  /* this one works with the current code! */
  DISORDER: {
    url: '../json/Disorder.json',
    GCF: 240,
    // trackIndices: 16, // bass
    // trackIndices: 21 // guitar
    //trackIndices: [16, 18, 21, 23, 25], // vocals,
    trackIndices: [16, 21, 25],
    drawOrder: [0, 1, 2],
    min: 31,
    max: 65
  },

  FISH: {
    url: '../json/WeirdFishes-cleaned.json',
    GCF: 480,
    trackIndices: null, //[1, 3, 5]
  },

  LAMOUR: {
    url: '../json/Lamour-Toujours.json',
    GCF: 480, // or 240
    trackIndices: [16,23],
    drawOrder: [0, 1]
  },

  // this one works but doesn't work if we switch the bass
  CASCADA: {
    url: '../json/EverytimeWeTouch.json',
    GCF: 120,
    //trackIndices: [0, 1, 2, 3, /*4,*/ 5, 6, 7, 8, /*9, */10],
    trackIndices: null, //[0, 1, 2], // FIXME: the order here matters?

    drawOrder: [0, 1, 2],
  },

  // BORING
  ADAGIO: {
    url: '../json/adagio.json',
    GCF: 24,
    trackIndices: [1, 2, 3, 5, 8, 9]
  },

//-- OH FUCK YEAH BABY
  MTNKING: {
    url: '../json/mtn-king.json',
    GCF: 80,
    trackIndices: [4, 5, 6, 18, 19, /* */0, 1, 2, 3, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17]
  }
}

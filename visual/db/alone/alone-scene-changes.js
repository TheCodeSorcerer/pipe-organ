
let SCENE_CHANGES_ALONE = [
  
  // --- intro. all white.
  {
    ticks: 1,
    dicks: SongAlone.MELODY,
    action: 'cumColor',
    value: 'white'
  },
  {
    ticks: 1,
    dicks: SongAlone.BASS,
    action: 'cumColor',
    value: 'white'
  },
  {
    ticks: 1,
    dicks: SongAlone.RHYTHM,
    action: 'cumColor',
    value: 'white'
  },

  // --- intro 2. colored melody with hearts as rhythm
  {
    ticks: 384,
    dicks: SongAlone.MELODY,
    action: 'cumColor',
    value: CUM_COLORS.lightLime, // -- change this green
  },
  {
    ticks: 384,
    dicks: SongAlone.RHYTHM,
    action: 'cumImageArray',
    value: 'HEARTS_BKG'
  },

  // --- vox
  
  {
    ticks: 640,
    dicks: SongAlone.BASS,
    action: 'vSpread',
    value: VELOCITIES.V2
  },
  {
    ticks: 640,
    dicks: SongAlone.BASS,
    action: 'cumColor',
    value: CUM_COLORS.bubbleBlue
  },
  {
    ticks: 640,
    dicks: SongAlone.MELODY,
    action: 'cumColor',
    value: CUM_COLORS.creamsicle
  },

  // -- solo
  {
    ticks: 1024,
    dicks: SongAlone.MELODY,
    action: 'cumColor',
    value: CUM_COLORS.pink
  },
  // -- keep normal velocity
  /*{
    ticks: 1024,
    dicks: SongAlone.MELODY,
    action: 'vSpread',
    value: VELOCITIES.V1
  },*/
  {
    ticks: 1024,
    dicks: SongAlone.BASS,
    action: 'vSpread',
    value: VELOCITIES.V0
  },
  {
    ticks: 1024,
    dicks: SongAlone.BASS,
    action: 'cumColor',
    value: CUM_COLORS.bubbleBlue
  },
  {
    ticks: 1024,
    dicks: SongAlone.BASS,
    action: 'numCum',
    value: 3
  },
  {
    ticks: 1024,
    dicks: SongAlone.BASS,
    action: 'cumRadius',
    value: 40
  },


  // -- another verse
  {
    ticks: 1280,
    dicks: SongAlone.MELODY,
    action: 'cumColor',
    value: CUM_COLORS.creamsicle
  },
  {
    ticks: 1280,
    dicks: SongAlone.BASS,
    action: 'vSpread',
    value: VELOCITIES.V1
  },
  {
    ticks: 1280,
    dicks: SongAlone.BASS,
    action: 'cumColor',
    value: CUM_COLORS.bubbleBlue
  },
  {
    ticks: 1280,
    dicks: SongAlone.BASS,
    action: 'numCum',
    value: 10
  },
  {
    ticks: 1280,
    dicks: SongAlone.BASS,
    action: 'cumRadius',
    value: 30
  },

  {
    ticks: 1280,
    dicks: SongAlone.RHYTHM,
    action: 'cumColorArray',
    value: PASTEL
  },
  

  // -- another verse
  /*{
    ticks: 1534,
    dicks: SongAlone.MELODY,
    action: 'cumImageArray',
    value: 'HEARTS_FORE'
  },*/
  {
    ticks: 1534,
    dicks: SongAlone.MELODY,
    action: 'cumColor',
    value: CUM_COLORS.pink
  },
  {
    ticks: 1534,
    dicks: SongAlone.RHYTHM,
    action: 'cumImageArray',
    value: 'FLOWERS'
  },


  // --- ending verse, I think. looks good √√√
  /*{
    ticks: 1794,
    dicks: SongAlone.MELODY,
    action: 'cumColor',
    value: CUM_COLORS.creamsicle
  },*/
  {
    ticks: 1792,
    dicks: SongAlone.MELODY,
    action: 'cumImageArray',
    value: 'HEART_ORANGE'
  },
  {
    ticks: 1792,
    dicks: SongAlone.BASS,
    action: 'vSpread',
    value: VELOCITIES.V2
  },
  {
    ticks: 1792,
    dicks: SongAlone.BASS,
    action: 'cumColor',
    value: CUM_COLORS.bubbleBlue
  },

  /*{
    ticks: 2048,
    dicks: SongAlone.MELODY,
    action: 'cumColor',
    value: CUM_COLORS.lightLime
  },*/
  {
    ticks: 2048,
    dicks: SongAlone.MELODY,
    action: 'cumImageArray',
    value: 'HEART_YELLOW'
  },
  {
    ticks: 2048,
    dicks: SongAlone.BASS,
    action: 'cumColorArray',
    value: CONFETTI_TRANSLUCENT
  },
  {
    ticks: 2048,
    dicks: SongAlone.BASS,
    action: 'vSpread',
    value: VELOCITIES.V1
  },

  // ---- ending duet
  {
    ticks: 2176,
    dicks: SongAlone.MELODY,
    action: 'cumColor',
    value: 'white',
  },
  {
    ticks: 2176,
    dicks: SongAlone.BASS,
    action: 'cumColor',
    value: 'white',
  },
  {
    ticks: 2176,
    dicks: SongAlone.BASS,
    action: 'vSpread',
    value: VELOCITIES.V0,
  },
];

// --- next: trigger things like dancing and rocket launches
let EFFECT_TRIGGERS_ALONE = [
  /*{
    ticks: 1280,
    action: 'rockets'
  },*/
  {
    ticks: 1280,
    action: 'swayOn'
  },
  {
    ticks: 1526,
    action: 'swayOff'
  },

  {
    ticks: 1796,
    action: 'rockets'
  }

  /*{
    ticks: 1796,
    action: 'swayOn'
  },
  {
    ticks: 2048,
    action: 'swayOff'
  }*/
]

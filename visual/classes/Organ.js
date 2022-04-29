/**
 * === ideally this would have more things in it ===
 */
 class PipeOrgan {

  constructor(trackDrawOrder) {
    this.timeIndex = 0;

    this.playing = false;

    // 🍆  🍆 DICK 🍆  🍆
    this.pipes = [];

    // the initial positions of the pipes.
    // important for applying movement effects
    // e.g. waving or moving
    this.pipeAnchors = [];


    // oscillators and envelopes
    this.osc = [];
    this.env = [];

    this.soundIndex = 0;

    // --- ALONE-specific
    /// PENIS DRAWING ORDER: bass, rhythm, melody
    this.trackDrawOrder = trackDrawOrder; // ALONE: [0, 2, 1];
    //this.trackDrawOrder = LAMOUR: [0,1];
  }

  setupSound(maxTracksAtOnce) {
    let doubleMax = 2 * maxTracksAtOnce;
    for (let i = 0; i < doubleMax; i++) {
      // https://p5js.org/reference/#/p5.Oscillator
      this.osc.push(new p5.TriOsc()); // also try: SinOsc, SqrOsc, SawOsc
      this.env.push(new p5.Envelope()); 
    }
  }

  playNextNote(timedNotes, trackMinMax) {
    let notesToPlay = timedNotes[this.timeIndex];

    // there will be rests
    if (!notesToPlay) {
        this.timeIndex++;
        return;
    }

    for (let note of notesToPlay) {

        let si = this.soundIndex;

        this.osc[si].start();
        let midiVal = note.midi;
        let freq = midiToFreq(midiVal);
        this.osc[si].freq(freq);
        this.env[si].ramp(this.osc[si], 0, 1.0, 0);

        // FIXME: we haven't filtered out the bullshit tracks
        let penisIndex = midiVal - trackMinMax[note.realIndex].min;
        console.log(trackMinMax);

        console.log(`looking up track ${note.realIndex} and playing penis ${penisIndex}`);
        let penis = this.pipes[note.realIndex][penisIndex];
        penis.cum();

        if (++this.soundIndex >= this.osc.length) this.soundIndex = 0;
        
    }

    this.timeIndex++;
  }

  setupPipes(trackMinMax, pipeConfig, positionFunction) {
    // each track will have its own row of organs
    for (let trackId = 0; trackId < SONG.trackIndices.length; trackId++) {
      this.pipes.push([]);
      this.pipeAnchors.push([]);

      let minmax = trackMinMax[trackId];

      for (let j = minmax.min; j <= minmax.max; j++) {
        let info = this._newPenisByTrack(trackId, j, pipeConfig, positionFunction);
        this.pipes[trackId].push(info.penis);
        this.pipeAnchors[trackId].push(info.position);
      }
    }
  }

  _newPenisByTrack(trackId, j, pipeConfig, positionFunction) {
    let D = pipeConfig[trackId];

    let minmax = trackMinMax[trackId];
    let xytht = positionFunction(minmax, trackId, j);
    let p = new Penis(ImageManager.HUE_DICKS[D.img], xytht.x, xytht.y, xytht.tht);
    p.setGirth(D.girth);
    p.setHeight(D.height);
    p.setInitialDisplacement(D.initDisp);
    p.cumSystem.setDefaultRadius(D.cumRadius);
    p.cumSystem.setDefaultLifespan(D.lifespan);
    p.setVelocityRange(D.vRange);

    if (D.numCum) {
      console.log(`setting pipeConfig.numCum = ${D.numCum}`);
      p.setNumCum(D.numCum)
    };
    if (D.cumDelay) p.setCumDelay(D.cumDelay);

    return {penis: p, position: xytht};
  }

  drawPipes() {
    for (let tId of this.trackDrawOrder) {
      let dickRow = this.pipes[tId];

      for (let P of dickRow) P.update();
    }
  }
}
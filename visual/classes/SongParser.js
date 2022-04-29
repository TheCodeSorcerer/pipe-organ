

class SongParser {

  /**
   * 
   * @param {track[]} tracks array of tracks, each with array of notes
   * @param {int[]} trackIndices array of indices to select for
   * @returns note[]
   */
  static flattenTrackNotesToSingleArray(tracks, trackIndices) {
    let notes = [];

    for (let i = 0; i < trackIndices.length; i++) {
      let trackIndex = trackIndices[i];
      let currentTrack = tracks[trackIndex];

      for (let note of currentTrack.notes) {
        note.trackIndex = trackIndex;
        note.realIndex = i;
        notes.push(note);
      }
    }

    return notes;
  }

  /**
   * 
   * @param {note[]} noteArray 
   * @param {int} divisor convert to time index
   * @returns 
   */
  static convertFlatArrayToTimedArray(noteArray, divisor) {
    let timedNotes = [];

    for (let i = 0; i < noteArray.length; i++) {
      let note = noteArray[i];
      let time = note.ticks / divisor;

      // debug notes that don't fit
      if (time % 2 === 1) console.log(`offbeat-note at ${time}`);
      let remainder = note.ticks % divisor;
      if (remainder > 0) console.log(`GCF ${divisor} failed at: ${time}`);

      // if there's already an array, push note
      // otherwise, make new array
      if (timedNotes[time]) {
        timedNotes[time].push(note);
      } else {
        timedNotes[time] = [note];
      }
    }

    return timedNotes;
  }

  /**
   * 
   * @param {note[]} notes array of notes
   * @returns 
   */
  static calculateNoteRange(notes) {
    let max = 0;
    let min = 1000;
    
    for (let i = 0; i < notes.length; i++) {
        let n = notes[i];
        if (n.midi > max) max = n.midi;
        if (n.midi < min) min = n.midi;
    }

    return {min, max};
  }

  /**
   * 
   * @param {TimedArray} tNotes array of time-indexed notes
   * @returns 
   */
  static calcMaxOutputsNeeded(tNotes) {
    let max = 0;
    for (let i = 0; i < tNotes.length; i++) {
        let current = tNotes[i];
        if (current && current.length > max) max = current.length;
    }

    return max;
  }

}

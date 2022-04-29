
// ---- NOTE DRAWER
class NoteDisplay {

  static topMeasureLineY = 0;
  static MEASURE_HEIGHT = 200;
  static X_MARGIN = 150;
  static NOTE_SIZE = 3;

  constructor() {
  }

  drawTimeNotes(timeNoteArray, noteColorsByTrack) {

    // how are these computed? I think it was just tweaking
    // -- ALONE-specific?
    let segments = [{
        begin: 0,
        end: 500,
    }, {
        begin: 500,
        end: 1000,
    }, {
        begin: 1000,
        end: 1500,
    }, {
        begin: 1500,
        end: 2000,
    }, {
        begin: 2000,
        end: timeNoteArray.length,
    }];
  
    let leftmostTimeIndex = 0;
    NoteDisplay.topMeasureLineY = 0;

    rectMode(CENTER);
    for (let segment of segments) {
        for (let timeToDraw = segment.begin; timeToDraw < segment.end; timeToDraw++) {
          // -- draw the notes for this segment
          let mynotes = timeNoteArray[timeToDraw];
          noStroke();

          // -- there will not always be notes
          if (mynotes) {
            for (let k = 0; k < mynotes.length; k++) {
              let noteNow = mynotes[k];

              this.drawNote(timeToDraw, noteNow, leftmostTimeIndex, noteColorsByTrack);
            }
          }

          // --- draw the current time
          if (timeToDraw === organ.timeIndex) {
            this.drawTimeLine(organ.timeIndex, leftmostTimeIndex, {weight: 2, color: 'yellow'});
          }

          // -- draw scene lines
          for (let scene of SCENE_CHANGES_ALONE) {
            if (timeToDraw === scene.ticks) {
              this.drawTimeLine(scene.ticks, leftmostTimeIndex, {weight: 1, color: 'cyan'});
            }
          }
        }

        leftmostTimeIndex = segment.end;

        strokeWeight(1);
        stroke('#222222');
        line(
          0, NoteDisplay.topMeasureLineY + NoteDisplay.MEASURE_HEIGHT,
          width, NoteDisplay.topMeasureLineY + NoteDisplay.MEASURE_HEIGHT
        );

        NoteDisplay.topMeasureLineY += 250;

    }
  }

  drawNote(timeToDraw, noteNow, leftmostTimeIndex, noteColorsByTrack) {
    let x = (timeToDraw - leftmostTimeIndex) * NoteDisplay.NOTE_SIZE + 150;
    let y = 0 + NoteDisplay.topMeasureLineY + noteNow.midi * NoteDisplay.NOTE_SIZE - 100;

    /// emphasize the current note played
    let em = (timeToDraw === organ.timeIndex) ? 3 : 1;

    // ==== TODO: important stuff here
    fill(noteColorsByTrack[noteNow.realIndex]);
    rect(
      x, y,
      NoteDisplay.NOTE_SIZE * em, NoteDisplay.NOTE_SIZE * em
    );
  }

  // ---- NOTE DRAWER
  drawTimeLine(timeValue, leftmostTimeIndex, lineStyle) {
    let timex = (timeValue - leftmostTimeIndex) * NoteDisplay.NOTE_SIZE + NoteDisplay.X_MARGIN;

    strokeWeight(lineStyle.weight);
    stroke(lineStyle.color);
    line(
      timex, NoteDisplay.topMeasureLineY - 50,
      timex, NoteDisplay.topMeasureLineY + NoteDisplay.MEASURE_HEIGHT
    );
  }
}

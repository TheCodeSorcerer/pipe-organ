var args = require('optimist').argv; // for reading in command line arguments

const fs = require('fs');

//const infile = "./json/Disorder.json";
//const infile = "./json/adagio.json";
//const infile = "./json/mtn-king.json";
const infile = args.i; // "./json/EverytimeWeTouch.json";

fs.readFile(infile, 'utf8', (err, data) => {

    const stuff = JSON.parse(data);

    // console.log(stuff);

    const myTracks = [];
    for (let i = 0; i < stuff.tracks.length; i++) {

        let myTrackInfo = {
        };
        let track = stuff.tracks[i];

        let trackMidiVals = [];

        if (track.notes.length > 0) {
            // console.log(`found a good track at index ${i}`);
            
            /*console.log(track.instrument);
            console.log(track.notes[0])*/

            myTrackInfo.index = i;
            myTrackInfo.instrument = track.instrument;
            myTrackInfo.name = track.name;

            let min = 1000; let max = 0;

            for (let j = 0; j < track.notes.length; j++) {
                let note = track.notes[j];
                let midiVal = note.midi;
                if (!trackMidiVals.includes(midiVal)) {
                    trackMidiVals.push(midiVal);
                }
                if (midiVal > max) max = midiVal;
                if (midiVal < min) min = midiVal;
            }

            myTrackInfo.midiRange = {min, max};
            trackMidiVals.sort();
            myTrackInfo.midiVals = trackMidiVals;

            myTrackInfo.noteCount = track.notes.length;

            myTrackInfo.timeRange = [track.notes[0].ticks, track.notes[track.notes.length-1].ticks];

            myTracks.push(myTrackInfo);
        }
    }

    console.log(myTracks);
});

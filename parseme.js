
/**
 * Marshmello - Alone: https://www.nonstop2k.com/midi-files/11949-marshmello-alone-midi.html
 * Aphex Twin: https://www.reddit.com/r/aphextwin/comments/3ae5i9/a_few_aphex_twin_midis_ive_made_for_yall/
 */
var args = require('optimist').argv; // for reading in command line args

const { Midi } = require('@tonejs/midi');
const fs = require('fs');

//const infile ="Aphex/4bit/4bit.mid"
// const infile = "Concrete-Angel.mid";
//const infile = "mountain-king.mid";
// const infile = "./midi/Lamour-Toujours.mid"
//const infile = "./midi/Disorder.mid";
// const infile = "Aphex/flim/flim.mid";
const infile = args.i; //"./midi/EverytimeWeTouch.mid";

//const outfile = './flim.json';//
//const outfile = "./4bit.json";
// const outfile = "./concrete-angel.json";
//const outfile = "./json/EverytimeWeTouch.json";
const outfile = args.o;
    
//const filename = "Alone.mid"
const midiData = fs.readFileSync(infile);

const midi = new Midi(midiData);
console.log(midi);
console.log(midi.header.tempos);
console.log(midi.header.timeSignatures);

//console.log(JSON.stringify(midi, true, 2));

const outputData = JSON.stringify(midi, true, 2);
fs.writeFile(outfile, outputData, 'utf8', err => {
    if (err) {
        console.log(`Error writing file: ${err}`);
    } else {
        console.log(`File is written successfully!`);
    }
});

return;
midi.tracks.forEach(track => {

    const notes = track.notes;

    let max = 10;
    notes.forEach((note, i) => {
        if (i < max) {
            console.log(`${note.time}: ${note.ticks} ${note.name}, ${note.midi}`);
        }
    });


    //fs.writeFile('./alone.json', 


    track.controlChanges[64]
    /*track.controlChanges.sustain.forEach(cc => {
        console.log(cc);
    });*/

});


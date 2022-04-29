
const fs = require('fs');

/// read in the file
const infile = './json/Alone-original.json';
const outfile = './json/Alone-parsed-2.json';

const BASS = 'BASS';
const MELODY = 'MELODY';
const RHYTHM = 'RHYTHM';
const MELODY2 = 'MELODY2';
const UNID = 'UNID';

const TRACKNAMES = [BASS, MELODY, RHYTHM, MELODY2, UNID];

fs.readFile(infile, 'utf8', (err, data) => {

    const stuff = JSON.parse(data);

    let ogNotes = stuff.tracks[0].notes;

    let newGuy = {
        header: stuff.header,
        tracks: []
    };

    for (let T of TRACKNAMES) {
        newGuy.tracks.push(newTrack(T));
    }

    // console.log(newGuy.tracks);


    for (let i = 0; i < ogNotes.length; i++) {
        let note = ogNotes[i];

        let track = whichTrack(note);
        let tIndex;

        switch(track) {
            
        case 'BASS':
            tIndex = 0;
            break;
        case 'MELODY':
            tIndex = 1;
            break;
        case 'RHYTHM':
            tIndex = 2;
            break;
        case 'MELODY2':
            tIndex = 3;
            tIndex = 1; //// --- option to remove MELODY2
            break;
        default:
            tIndex = 4
            break;
        }

        newGuy.tracks[tIndex].notes.push(note);
            
    }
    
    let output = JSON.stringify(newGuy, true, 2);
    fs.writeFile(outfile, output, err => {
        if (err) console.log(err);
        else {
            console.log('file written successfully');
        }
    });
    
});

function newTrack(name) {
    return {
        channel: 0,
        controlChanges: {},
        pitchBends: [],
        instrument: {
            family: "piano",
            number: 0,
            name
        },
        name,
        notes: []
    }
}


function whichTrack(note) {

    const ticks = note.ticks;
    const midi = note.midi;

    if (ticks < 6216) {
        return whichTrackIntro1(midi);

    } else if (ticks < 9000) {
        return whichTrackIntro2(midi);

    } else if (ticks < 15300) {
        return whichTrackIntro3(midi);

    } else if (ticks < 24500) {
        return whichTrackVerse(midi);
        
    } else if (ticks < 30700) {
        return whichTrackIntro1(midi);
        
    } else if (ticks < 36500) {
        return whichTrackIntro2(midi);
        
    } else if (ticks < 43000) {
        return whichTrackIntro3(midi);

    } else if (ticks < 52200) {
        return whichTrackVerse(midi);

    } else if (ticks < 55000) {
        return whichTrackIntro1(midi);

    } else {
        if (midi <= 54) return BASS;

        if (midi <= 72) return MELODY2;

        return MELODY;
        //return whichTrackIntro2(midi);
        //if () {

        //}
    }

    return UNID;
}

function whichTrackIntro1(midi) {
    // BASS INTRO
    if (midi <= 54) {
        return BASS;
    } else {
        return MELODY;
    }
}

function whichTrackIntro2(midi) {
    /// INTRO WITH MELODY
    if  (midi <= 54) {
        return BASS;
    } else if (midi <= 78) {
        return RHYTHM;
    } else if (midi <= 100) {
        return MELODY;
    }
}

function whichTrackIntro3(midi) {
    // INTRO RHYTHM
    if (midi < 73) {
        return RHYTHM;
    } else {
        return MELODY;
    }
}

function whichTrackVerse(midi) {
    // VERSE 1 w/ VOX
    if (midi <= 54) {
        return BASS;
    } else {
        return MELODY2;
    }
    
}
    


/// write out the new file

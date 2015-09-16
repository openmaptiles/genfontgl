#!/usr/bin/env node

var fs = require('fs');
var fontnik = require('fontnik');
var queue = require('queue-async');

    try {
        var fname = process.argv[2];
	
	var fontstack = fs.readFileSync(fname);
        console.log('Process '+fname);
        
        var folder=fname.slice(0, -4).replace('-','');
    } catch (e) {
        console.error('error: could not read font '+e)
        return;
    }

    if(!fs.existsSync(folder)){
       fs.mkdirSync(folder, 0766, function(err){
         if(err){ 
            console.log(err);
            response.send("ERROR! Can't make the directory! \n");
         }
       });   
    }

     var q = queue(Math.max(4, require('os').cpus()));
     var queue = [];
     for (var i = 0; i < 65536; (i = i + 256)) {
         q.defer(writeGlyphs, {
            font: fontstack,
            start: i,
            end: Math.min(i + 255, 65535)
         });
     }


function writeGlyphs(opts, done) {
    fontnik.range(opts, function(err, zdata) {
        if (err) {
            console.warn(err.toString());
            process.exit(1);
        }
        fs.writeFileSync(folder + '/' + opts.start + '-' + opts.end + '.pbf', zdata);
        done();
    });
}

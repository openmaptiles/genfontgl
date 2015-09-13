#!/usr/bin/env node

var fs = require('fs');
var fm = require('fontmachine');

	try {
        var fname=process.argv[2];
		var data = fs.readFileSync(fname);
		console.log('Process '+fname);
        fm.makeGlyphs({font: data, fileType: 'ttf'}, function p(error,result){
            var folder=result.name;

             if(!fs.existsSync(folder)){
                 fs.mkdirSync(folder, 0766, function(err){
                   if(err){ 
                     console.log(err);
                     response.send("ERROR! Can't make the directory! \n");
                   }
                 });   
             }

            for(var index in result.stack) { 
                var font=result.stack[index].name;
                var fontData=result.stack[index].data;

                fs.writeFile(folder+'/'+font, fontData, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                }); 
            }

        });
	} catch (e) {
		console.error('error: could not read font '+e)
		return;
	}

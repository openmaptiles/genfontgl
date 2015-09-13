#!/usr/bin/env node

var fs = require('fs');
var fm = require('fontmachine');

	try {
        var fname=process.argv[2];
		var data = fs.readFileSync(fname);
		console.log('Process '+fname);
        fm.makeGlyphs({font: data, fileType: 'ttf'}, function p(error,result){
            //console.log(result);
            var folder=result.name;

             if(!fs.existsSync(folder)){
                 fs.mkdirSync(folder, 0766, function(err){
                   if(err){ 
                     console.log(err);
                     response.send("ERROR! Can't make the directory! \n");    // echo the result back
                   }
                 });   
             }

            for(var index in result.stack) { 
                var font=result.stack[index].name;
                var fontData=result.stack[index].name;

                fs.writeFile(folder+'/'+font, data, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    //console.log("The file was saved!");
                }); 
            }

        });
	} catch (e) {
		console.error('error: could not read font '+e)
		return;
	}

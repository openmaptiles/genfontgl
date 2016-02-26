genfontgl
-----
A simple command line tool to generate fonts for Mapbox GL via fontnik without gzipping the result.

Usage: ```genfontgl OpenSans-Regular.ttf [output location]```

Or if not installed globally: ```npm run genfontgl -- OpenSans-Regular.ttf [output location]```

Based on:
* [Fontmachine](https://github.com/mapbox/fontmachine)
* [build-glyphs](https://github.com/mapbox/node-fontnik/blob/master/bin/build-glyphs)

"use strict";
var ogr2ogr = require('ogr2ogr');
var ogr = ogr2ogr('/geoJSON/sido/source.sido');
console.log(ogr2ogr);
console.log(ogr);
ogr.exec(function(er, data) {
    if (er) console.error(er);
    console.log(data);
});
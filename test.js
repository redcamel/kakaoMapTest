"use strict";
var ogr2ogr = require('ogr2ogr')
var ogr = ogr2ogr('/geoJSON/shp/test.shp')

ogr.exec(function(er, data) {
    if (er) console.error(er)
    console.log(data)
})
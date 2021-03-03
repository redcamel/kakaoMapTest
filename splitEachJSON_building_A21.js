"use strict";
var fs = require("fs");
var shpPath = `geoJSON_building/result_100.json`;

function splitGeojson() {
  console.log("\n *START* \n");
  console.log('참조체계연계키 A21 기반 개별 파일화')

  var fileName = shpPath;
  var contents = fs.readFileSync(fileName);
  var features = {};
  var jsonContent = JSON.parse(contents);
  let num = 0;
  for (var key in jsonContent.features) {
    let feature = jsonContent.features[key];
    features[feature['properties']['A21']] = feature;
  }
  // console.log('features',features)
  for (var key in features) {
    // console.log(key)
    var jsonStr = JSON.stringify({...features[key]['properties'], geometry: features[key]['geometry']});
    // split json파일 생성
    console.log(num++, `c:/result/${key}.json`);
    fs.writeFileSync(`c:/result/${key}.json`, jsonStr);
  }

  console.log("\n *EXIT* \n");
}

splitGeojson();

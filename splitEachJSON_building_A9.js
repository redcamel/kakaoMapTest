"use strict";
var fs = require("fs");
var shpPath = `geoJSON_building/result_100.json`;

function splitGeojson() {
  console.log("\n *START* \n");
  console.log('공동주택만 A9 기반 개별 파일화')
  console.log('「건축법」에서는 공동주택의 종류와 범위를 아파트, 연립주택, 다세대주택 및 기숙사')

  var fileName = shpPath;
  var contents = fs.readFileSync(fileName);
  var features = {};
  var jsonContent = JSON.parse(contents);
  let num = 0;
  for (var key in jsonContent.features) {
    let feature = jsonContent.features[key];
    if(feature['properties']['A9']==='공동주택') features[feature['properties']['A21']] = feature;
  }
  // console.log('features',features)
  for (var key in features) {
    // console.log(key)
    var jsonStr = JSON.stringify({...features[key]['properties'], geometry: features[key]['geometry']});
    // split json파일 생성
    console.log(num++, `c:/result_A9/${key}.json`);
    fs.writeFileSync(`c:/result_A9/${key}.json`, jsonStr);
  }

  console.log("\n *EXIT* \n");
}

splitGeojson();

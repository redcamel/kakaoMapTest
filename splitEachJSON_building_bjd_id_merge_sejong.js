"use strict";
var fs = require("fs");
var shpPath = `geoJSON_building/result_100.json`;

function splitGeojson() {
  console.log("\n *START* \n");
  console.log('공동주택만 bjd_id 기반 멀티 병합 1개 파일로 머징');
  console.log('「건축법」에서는 공동주택의 종류와 범위를 아파트, 연립주택, 다세대주택 및 기숙사');

  var fileName = shpPath;
  var contents = fs.readFileSync(fileName);
  var features = {};
  var jsonContent = JSON.parse(contents);
  let num = 0;
  for (var key in jsonContent.features) {
    let feature = jsonContent.features[key];
    if (feature['properties']['A9'] === '공동주택') {
      let bjd_id = feature['properties']['A3'].substr(0,5)+'-'+feature['properties']['A19']

      if (!features[bjd_id]) features[bjd_id] = [];
      features[bjd_id].push({
        ...feature['properties'],
        geometry: feature['geometry']
      });
    }
  }

  let result = {
    list : []
  }
  for (var key in features) {
    // console.log(key)
    result.list.push(features[key]);
    // split json파일 생성

  }

  console.log(num++, `c:/result_bjd_id_merge/sejong.json`);
  fs.writeFileSync(`c:/result_bjd_id_merge/sejong.json`, JSON.stringify(result));

  console.log("\n *EXIT* \n");
}

splitGeojson();

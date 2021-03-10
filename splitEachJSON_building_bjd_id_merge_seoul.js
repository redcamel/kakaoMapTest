"use strict";
let fs = require("fs");
let shpPath = `geoJSON_building/result_seoul.json`;
let JSONStream = require('JSONStream');

function splitGeojson() {
  console.log("\n *START* \n");
  console.log('서울 공동주택만 bjd_id 기반 멀티 병합 1개 파일로 머징');
  console.log('「건축법」에서는 공동주택의 종류와 범위를 아파트, 연립주택, 다세대주택 및 기숙사');
  let transformStream = JSONStream.parse("*");
  let inputStream = fs.createReadStream(shpPath);
  let features = {}
  let jsonContent ={}
  inputStream
    .pipe(transformStream)
    .on(
      "data",
      function handleRecord(data) {
        if(data instanceof Array) {
          jsonContent = data

        }
      }
    )
    .on(
      "end",
      function handleEnd() {
        console.log("- - - - - - - - - - - - - - - - - - - - - - -");
        console.log(jsonContent)
        let num = 0;
        for (let key in jsonContent) {
          let feature = jsonContent[key];
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
        for (let key in features) {
          // console.log(key)
          result.list.push(features[key]);
          // split json파일 생성

        }

        console.log(num++, `c:/result_bjd_id_merge/seoul.json`);
        fs.writeFileSync(`c:/result_bjd_id_merge/seoul.json`, JSON.stringify(result));

        console.log("\n *EXIT* \n");
      }
    );
}

splitGeojson();

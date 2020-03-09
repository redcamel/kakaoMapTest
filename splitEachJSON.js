"use strict";
var fs = require("fs");
var _ = require('lodash');
var shpPath = {
    sido: {
        json: 'geoJSON/sido/result.json'
    },
    sigungu: {
        json: 'geoJSON/sigungu/result.json'
    },
    dong: {
        json: 'geoJSON/dong/result.json'
    }
}
var resultFileInfo = [];
var resultFileInfo2 = [];
function splitGeojson(type) {
    console.log("\n *Split geoJSON START* \n");
    console.log(type);

    var fileName = shpPath[type].json;
    //var exception = [ "47940" ];
    var exception = [];

    // 시군구 데이터 sido 별로 자르기
    var contents = fs.readFileSync(fileName);
    var features = {};

    var jsonContent = JSON.parse(contents);

    for (var key in jsonContent.features) {
        let feature = jsonContent.features[key];
        let subKey, cd, name;

        if (type === 'sigungu') {
            cd = feature.properties.SIG_CD;
            name = feature.properties.SIG_KOR_NM;
            subKey = feature.properties.SIG_CD.substr(0, 2);
        } else if (type === 'dong') {
            cd = feature.properties.EMD_CD;
            name = feature.properties.EMD_KOR_NM;
            subKey = feature.properties.EMD_CD.substr(0, 5);
        } else if (type === 'sido') {
            cd = feature.properties.CTPRVN_CD;
            name = feature.properties.CTP_KOR_NM;
            subKey = feature.properties.CTPRVN_CD;
        }

        console.log(subKey, `feature.properties.cd: ${cd}, feature.properties.name: ${name}`);
        if(!resultFileInfo.includes(subKey)) {
            resultFileInfo.push(subKey)
            resultFileInfo2.push(JSON.stringify({
                name : name,
                fileName : subKey+'.json'
            }))
        }
        if (features.hasOwnProperty(subKey)) {
            if (!_.has(exception, cd)) {
                features[subKey].push(feature);
            }
        } else {
            features[subKey] = [];
            if (!_.has(exception, cd)) {
                features[subKey].push(feature);
            }
        }
    }

    for (var key in features) {
        var featuresCollection = _.template('{"type": "FeatureCollection", "features": [ \
                <% _.forEach(iterator, function(val, index, list) { %> \
                \n  <%= JSON.stringify(val) %><% \
                if (index < list.length - 1) { \
                %>, <% \
                } \
                }); %> \
            \n]}');

        var jsonStr = featuresCollection({
            'iterator': features[key]
        });

        // split json파일 생성
        fs.writeFileSync("geoJSON/result/" + key + ".json", jsonStr);
        fs.writeFileSync("geoJSON/result/list.json", `{ "list" : [${resultFileInfo2}]}`);
    }

    console.log("\n *EXIT* \n");
}

splitGeojson('sido');
splitGeojson('sigungu');
splitGeojson('dong');
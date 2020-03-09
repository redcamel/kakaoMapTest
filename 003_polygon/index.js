Rich.init(

).then(_ => {
    console.log('test')
    //지도를 담을 영역의 DOM 레퍼런스
    let maptContainer;
    Rich.Dom('div').S(
        '>', maptContainer = Rich.Dom('div').S(
            '@id', 'map',
            'width', 1024, 'height', 1024,
            'position', 'fixed',
            'top', 0
        ),
        '<', 'body'
    );


    let callMap = (options = {}) => {
        return new kakao.maps.Map(maptContainer.dom, options)
    }

    //지도 생성 및 객체 리턴
    let map = callMap(
        { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 12 // 지도의 확대 레벨
        }
    );
    let customOverlay = new kakao.maps.CustomOverlay({
        xAnchor: 0,
        yAnchor: 2
    });
    let infowindow = new kakao.maps.InfoWindow({removable: true});


    var areas = [];
    // map.setProjectionId(kakao.maps.ProjectionId.NONE);

    // Rich.ajaxJsonGet('../geoJSON/sido/result.json')
    // Rich.ajaxJsonGet('../geoJSON/sigungu/result.json')
    Rich.Dom('div').S(
        'position', 'fixed',
        'top', 0, 'right', 0,
        '<', 'body',
        '>', Rich.Dom('button').S(
            'html', '도,시',
            'down', function () {
                loadPolygon('../geoJSON/sido/result.json')
            }
        ),
        '>', Rich.Dom('button').S(
            'html', '시군구',
            'down', function () {
                loadPolygon('../geoJSON/sigungu/result.json')
            }
        ),
        '>', Rich.Dom('button').S(
            'html', '동면읍',
            'down', function () {
                loadPolygon('../geoJSON/dong/result.json')
            }
        ),
        '>', (function () {
            var t0 = Rich.Dom('select').S(
                'change', function (v) {
                    loadPolygon('../geoJSON/result/' + this.S('@value'))
                }
            )
            Rich.ajaxJsonGet('../geoJSON/result/list.json').then(res => res.json()).then(v => {
                v.list.forEach(info => {
                    Rich.Dom('option').S(
                        '<', t0,
                        '@value', info.fileName,
                        'html', info.name
                    )
                })
            })

            // 'down',function(){
            //     loadPolygon('../geoJSON/dong/result.json')
            // }
            return t0
        })()
    )
    let currentPolygons = []
    let loadPolygon = function (src) {
        let t0 = Rich.Dom('button').S(
            'position', 'fixed',
            'top', 0, 'left', 0, 'right', 0, 'bottom', 0,
            'width', '100%',
            'border', 0,
            'outline', 'none',
            'background', 'rgba(0,0,0,0.6)',
            'z-index', 1,
            'html', 'Loading....',
            'color','#fff',
            'font-size', 150,
            'text-shadow','0 0 10px rgba(0,0,0,0.5)',
            '<', 'body'
        )
        areas.length = 0
        currentPolygons.forEach(v => v.setMap(null))
        currentPolygons.length = 0
        Rich.ajaxJsonGet(src)
            .then(v => v.json()).then(v => {
            console.log(v)
            t0.remove()
            let path = []
            v.features.forEach(data => {
                // console.log(data)
                // console.log(data.coordinates)

                // if(data.properties.CTPRVN_CD==='28'){
                if (data.geometry) {
                    let tName = data.properties.CTP_ENG_NM || data.properties.SIG_ENG_NM || data.properties.EMD_ENG_NM
                    let tNameKO = data.properties.CTP_KOR_NM || data.properties.SIG_KOR_NM || data.properties.EMD_KOR_NM
                    if (data.geometry.type === 'MultiPolygon') {
                        data.geometry.coordinates.forEach((latLngList, index) => {
                            let root = {
                                name: tName,
                                nameK: tNameKO,
                                path: []
                            };
                            latLngList.forEach((latLngList2) => {
                                let newPath = []
                                latLngList2.forEach(unit => {
                                    let a = unit[1]
                                    let b = unit[0]
                                    // console.log(a,b)
                                    newPath.push(new kakao.maps.LatLng(a, b))
                                })
                                // console.log(root)
                                root.path.push(newPath)
                            })
                            areas.push(root)

                        })

                    } else {
                        let root = {
                            name: tName,
                            nameK: tNameKO,
                            path: []
                        };
                        data.geometry.coordinates.forEach(latLngList => {
                            latLngList.forEach(unit => {
                                let a = unit[1]
                                let b = unit[0]
                                // console.log(a,b)
                                root.path.push(new kakao.maps.LatLng(a, b))
                            })
                        })
                        areas.push(root)
                    }
                }


                // }

            })
            console.log(areas)
            // 지도에 영역데이터를 폴리곤으로 표시합니다
            for (var i = 0, len = areas.length; i < len; i++) {
                displayArea(areas[i]);
            }

// 다각형을 생상하고 이벤트를 등록하는 함수입니다
            function displayArea(area) {

                // 다각형을 생성합니다
                var polygon = new kakao.maps.Polygon({
                    map: map, // 다각형을 표시할 지도 객체
                    path: area.path,
                    strokeWeight: 1,
                    strokeColor: '#000f80',
                    strokeOpacity: 0.3,
                    fillColor: '#fff',
                    fillOpacity: 0.7
                });

                currentPolygons.push(polygon)
                // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
                // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
                kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
                    polygon.setOptions({fillColor: '#09f'});
                    customOverlay.setPosition(mouseEvent.latLng);
                    customOverlay.setContent('<div class="area">' + area.nameK + '(' + area.name + ')</div>');
                    customOverlay.setMap(map);
                });

                // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
                kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {

                    customOverlay.setPosition(mouseEvent.latLng);
                });

                // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
                // 커스텀 오버레이를 지도에서 제거합니다
                kakao.maps.event.addListener(polygon, 'mouseout', function () {
                    polygon.setOptions({fillColor: '#fff'});
                    customOverlay.setMap(null);
                });

                // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
                kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
                    console.log(polygon)
                    var content = '<div class="info">' +
                        '   <div class="title">' + area.nameK + '(' + area.name + ')</div>' +
                        '   <div class="size">총 면적 : 약 ' + Math.floor(polygon.getArea()).toLocaleString() + ' m<sup>2</sup></area>' +
                        '</div>';

                    infowindow.setContent(content);
                    infowindow.setPosition(mouseEvent.latLng);
                    infowindow.setMap(map);
                });
            }
        })
    }


})
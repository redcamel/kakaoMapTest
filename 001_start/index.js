Rich.init(

).then(_ => {
    console.log('test')
    //지도를 담을 영역의 DOM 레퍼런스
    let maptContainer;
    let currentInfo;
    Rich.Dom('div').S(
        '>', maptContainer = Rich.Dom('div').S(
            '@id', 'map',
            'width', 500, 'height', 400,
            'position','fixed',
            'top',0
        ),
        '<', 'body'
    );
    currentInfo = Rich.Dom('div').S(
        'margin-top',400,
        '<','body'
    )

    let callMap = (options = {}) => {
        return new kakao.maps.Map(maptContainer.dom, options)
    }

    //지도 생성 및 객체 리턴
    let map = callMap(
        { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        }
    );

    let getCurrentInfo = function () {
        // 지도의 현재 중심좌표를 얻어옵니다
        var center = map.getCenter();
        // 지도의 현재 레벨을 얻어옵니다
        var level = map.getLevel();
        // 지도타입을 얻어옵니다
        var mapTypeId = map.getMapTypeId();
        // 지도의 현재 영역을 얻어옵니다
        var bounds = map.getBounds();
        // 영역의 남서쪽 좌표를 얻어옵니다
        var swLatLng = bounds.getSouthWest();
        // 영역의 북동쪽 좌표를 얻어옵니다
        var neLatLng = bounds.getNorthEast();
        // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
        var boundsStr = bounds.toString();
        // 드래그 상태정보
        var dragState = map.getDraggable()
        // 줌 가능 상태정보
        var zoomable = map.getZoomable()
        var message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
        message += '경도 ' + center.getLng() + ' 이고 <br>';
        message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
        message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
        message += '지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng() + ' 이고 <br>';
        message += '북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다<br>';
        message += `드래그 가능 상태 : ${dragState}<br>`;
        message += `줌 가능 상태 : ${zoomable}<br>`;
        currentInfo.S(
            'font-size', 12,
            'html', message
        )
    };
    getCurrentInfo()


    Rich.Dom('div').S(

        '<', 'body',
        '>', Rich.Dom('h3').S('html', '이동매서드'),
        '>', Rich.Dom('button').S(
            'html', 'setCenter - 단순 중심 이동',
            'down', function () {
                let moveLatLon = new kakao.maps.LatLng(33.452613 + Math.random() * 0.001, 126.570888 + Math.random() * 0.001);
                // 지도 중심을 이동 시킵니다
                map.setCenter(moveLatLon);
                getCurrentInfo();
            }
        ),
        '>', Rich.Dom('button').S(
            'html', 'panTo - 트윈 기반 중심 이동',
            'down', function () {
                // 이동할 위도 경도 위치를 생성합니다
                let moveLatLon = new kakao.maps.LatLng(33.450580 + Math.random() * 0.001, 126.574942 + Math.random() * 0.001);
                // 지도 중심을 부드럽게 이동시킵니다
                // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
                map.panTo(moveLatLon);
                getCurrentInfo();
            }
        )
    );
    (function () {
        let containerLevel;
        Rich.Dom('div').S(
            '<', 'body',
            '>', containerLevel = Rich.Dom('h3').S('html', '레벨변경' + '(현재레벨 : ' + map.getLevel() + ')'),
            '>', Rich.Dom('button').S(
                'html', 'zoomIn',
                'down', function () {
                    map.setLevel(map.getLevel() - 1);
                    containerLevel.S('html', '레벨변경' + '(현재레벨 : ' + map.getLevel() + ')')
                    getCurrentInfo();
                }
            ),
            '>', Rich.Dom('button').S(
                'html', 'zoomOut',
                'down', function () {
                    map.setLevel(map.getLevel() + 1);
                    containerLevel.S('html', '레벨변경' + '(현재레벨 : ' + map.getLevel() + ')')
                    getCurrentInfo();
                }
            )
        )
    })();
    (function () {
        var mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl);
        console.log(mapTypeControl)
        let container = Rich.Dom('div').S(
            '<', 'body',
            '>', Rich.Dom('h3').S('html', '지도타입 컨트롤러')
        )
        const POSITION = kakao.maps.ControlPosition
        console.log(POSITION)
        for (let k in POSITION) {

            if (k === k.toUpperCase()) {
                console.log(k)
                Rich.Dom('button').S(
                    'html', `${k}에 등록하기`,
                    '<', container,
                    'down', (function () {
                        const tKey = k;
                        return function () {
                            console.log(tKey)
                            map.removeControl(mapTypeControl)
                            map.addControl(mapTypeControl, POSITION[tKey]);
                        }
                    })()
                )
            }
        }
    })();
    (function () {
        var ZoomControl = new kakao.maps.ZoomControl();
        map.addControl(ZoomControl);
        console.log(ZoomControl)
        let container = Rich.Dom('div').S(
            '<', 'body',
            '>', Rich.Dom('h3').S('html', '줌 컨트롤러')
        )
        const POSITION = kakao.maps.ControlPosition
        console.log(POSITION)
        for (let k in POSITION) {

            if (k === k.toUpperCase()) {
                console.log(k)
                Rich.Dom('button').S(
                    'html', `${k}에 등록하기`,
                    '<', container,
                    'down', (function () {
                        const tKey = k;
                        return function () {
                            console.log(tKey)
                            map.removeControl(ZoomControl)
                            map.addControl(ZoomControl, POSITION[tKey]);
                        }
                    })()
                )
            }
        }
    })();
    Rich.Dom('div').S(
        '<', 'body',
        '>', Rich.Dom('h3').S('html', 'TODO - 컨트럴러 스킨')
    );
    (function () {
        Rich.Dom('div').S(
            '<', 'body',
            '>', containerLevel = Rich.Dom('h3').S('html', '드래그상태처리'),
            '>', Rich.Dom('button').S(
                'html', '드래그가능하게',
                'down', function () {
                    map.setDraggable(true);
                    getCurrentInfo();
                }
            ),
            '>', Rich.Dom('button').S(
                'html', '드래그방어',
                'down', function () {
                    map.setDraggable(false);
                    getCurrentInfo();
                }
            )
        )
    })();
    (function () {
        Rich.Dom('div').S(
            '<', 'body',
            '>', containerLevel = Rich.Dom('h3').S('html', '줌가능여부 처리'),
            '>', Rich.Dom('button').S(
                'html', '줌가능하게',
                'down', function () {
                    map.setZoomable(true);
                    getCurrentInfo();
                }
            ),
            '>', Rich.Dom('button').S(
                'html', '줌 방어',
                'down', function () {
                    map.setZoomable(false);
                    getCurrentInfo();
                }
            )
        )
    })();
    console.log(map.getMap())


    // 지도 바로가기
    // /link/map/위도,경도	https://map.kakao.com/link/map/37.402056,127.108212
    // /link/map/이름,위도,경도	https://map.kakao.com/link/map/우리회사,37.402056,127.108212
    // /link/map/장소ID	https://map.kakao.com/link/map/18577297

    // 길찾기 바로가기
    // /link/to/이름,위도,경도	https://map.kakao.com/link/to/카카오판교오피스,37.402056,127.108212
    // /link/to/장소ID	https://map.kakao.com/link/to/18577297

    // 로드뷰 바로가기
    // /link/roadview/위도,경도	https://map.kakao.com/link/roadview/37.402056,127.108212
    // /link/roadview/장소ID	https://map.kakao.com/link/roadview/18577297

    // 지도 검색결과 바로가기
    // /link/search/검색어	https://map.kakao.com/link/search/카카오

})
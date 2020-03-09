Rich.init(

).then(_ => {
    console.log('test')
    //지도를 담을 영역의 DOM 레퍼런스
    let maptContainer;
    Rich.Dom('div').S(
        '>', maptContainer = Rich.Dom('div').S(
            '@id', 'map',
            'width', 500, 'height', 400,
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
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        }
    );
    (function () {
        Rich.Dom('div').S(
            'margin-top', 400,
            '<', 'body',
            '>', Rich.Dom('h3').S('html', 'marker'),
            '>', Rich.Dom('button').S(
                'html', '기본 마커추가',
                'down', function () {
                    let markerPosition = new kakao.maps.LatLng(33.450701 + Math.random() * 0.002 - 0.001, 126.570667 + Math.random() * 0.002 - 0.001);
                    console.log(markerPosition)
                    new kakao.maps.Marker({
                        map: map,
                        position: markerPosition
                    });
                }
            ),
            '>', Rich.Dom('button').S(
                'html', '커스텀 이미지 마커추가',
                'down', function () {
                    let markerPosition = new kakao.maps.LatLng(33.450701 + Math.random() * 0.002 - 0.001, 126.570667 + Math.random() * 0.002 - 0.001);
                    console.log(markerPosition)
                    new kakao.maps.Marker({
                        map: map,
                        position: markerPosition,
                        image: new kakao.maps.MarkerImage(
                            'http://bitcdn.bit-play.com/unibox/2018/03/04/13/f2b0aebcb566af2d7b386c281eabc2b6_10967415_450.jpg',
                            new kakao.maps.Size(31, 35)
                        )
                    });
                }
            ),
            '>', Rich.Dom('button').S(
                'html', '드래그 가능한 마커추가',
                'down', function () {
                    let markerPosition = new kakao.maps.LatLng(33.450701 + Math.random() * 0.002 - 0.001, 126.570667 + Math.random() * 0.002 - 0.001);
                    console.log(markerPosition)
                    let marker = new kakao.maps.Marker({
                        map: map,
                        position: markerPosition,
                        image: new kakao.maps.MarkerImage(
                            'http://bitcdn.bit-play.com/unibox/2018/03/04/13/f2b0aebcb566af2d7b386c281eabc2b6_10967415_450.jpg',
                            new kakao.maps.Size(31, 35)
                        )
                    });
                    marker.setDraggable(true);
                }
            )
        );
    })();
    (function () {
        Rich.Dom('div').S(
            '<', 'body',
            '>', Rich.Dom('h3').S('html', '인포윈도우'),
            '>', Rich.Dom('button').S(
                'html', '인포 그래픽 있는 마커추가 ( 삭제불가 )',
                'down', function () {
                    let tPosition = new kakao.maps.LatLng(33.450701 + Math.random() * 0.002 - 0.001, 126.570667 + Math.random() * 0.002 - 0.001);
                    let content = Rich.Dom('div').S(
                        '>', Rich.Dom('div').S(
                            'width', '100%',
                            'background', 'red',
                            'html', 'test2'
                        )
                    ).dom
                    new kakao.maps.InfoWindow({
                        map: map, // 인포윈도우가 표시될 지도
                        position: tPosition,
                        content: content,
                        removable: false
                    });
                }
            ),
            '>', Rich.Dom('button').S(
                'html', '인포 그래픽 있는 마커추가 ( 삭제가능 )',
                'down', function () {
                    let tPosition = new kakao.maps.LatLng(33.450701 + Math.random() * 0.002 - 0.001, 126.570667 + Math.random() * 0.002 - 0.001);
                    let content = Rich.Dom('div').S(
                        '>', Rich.Dom('div').S(
                            'width', 150,
                            'height', 30,
                            'background', 'blue',
                            'color', '#fff',
                            'html', 'test2'
                        )
                    ).dom
                    new kakao.maps.InfoWindow({
                        map: map, // 인포윈도우가 표시될 지도
                        position: tPosition,
                        content: content,
                        removable: true
                    });
                }
            ),
            '>', Rich.Dom('button').S(
                'html', '마커 위에 인포 그래픽',
                'down', function () {
                    let markerPosition = new kakao.maps.LatLng(33.450701 + Math.random() * 0.002 - 0.001, 126.570667 + Math.random() * 0.002 - 0.001);
                    console.log(markerPosition)
                    let marker = new kakao.maps.Marker({
                        map: map,
                        position: markerPosition,
                        image: new kakao.maps.MarkerImage(
                            'http://bitcdn.bit-play.com/unibox/2018/03/04/13/f2b0aebcb566af2d7b386c281eabc2b6_10967415_450.jpg',
                            new kakao.maps.Size(31, 35)
                        )
                    });

                    let content = Rich.Dom('div').S(
                        '>', Rich.Dom('div').S(
                            'width', 300,
                            'background', 'red',
                            'text-align', 'center',
                            'html', 'test2',
                            '>', Rich.Dom('div').S(
                                'text-align', 'center',
                                'html', 'test2222'
                            )
                        )
                    ).dom
                    let infowindow = new kakao.maps.InfoWindow({
                        position: markerPosition,
                        content: content,
                        removable: true
                    });
                    infowindow.open(map, marker);
                }
            )
        );
    })();
    (function () {
        Rich.Dom('div').S(
            '<', 'body',
            '>', Rich.Dom('h3').S('html', '인포윈도우'),
            '>', Rich.Dom('button').S(
                'html', '인터렉션 이벤트가 등록된 마커',
                'down', function () {
                    let markerPosition = new kakao.maps.LatLng(33.450701 + Math.random() * 0.002 - 0.001, 126.570667 + Math.random() * 0.002 - 0.001);
                    console.log(markerPosition)
                    let marker = new kakao.maps.Marker({
                        map: map,
                        position: markerPosition,
                        image: new kakao.maps.MarkerImage(
                            'https://pbs.twimg.com/profile_images/1587364641/new-tw004_400x400.jpg',
                            new kakao.maps.Size(31, 35)
                        )
                    });
                    marker.setDraggable(true);
                    let content = Rich.Dom('div').S(
                        '>', Rich.Dom('div').S(
                            'width', 300,
                            'background', 'red',
                            'text-align', 'center',
                            'html', 'test2',
                            '>', Rich.Dom('div').S(
                                'text-align', 'center',
                                'html', 'test2222'
                            )
                        )
                    ).dom
                    let infowindow = new kakao.maps.InfoWindow({
                        position: markerPosition,
                        content: content
                    });
                    kakao.maps.event.addListener(marker, 'mouseover', v => infowindow.open(map, marker));
                    kakao.maps.event.addListener(marker, 'mouseout', v => infowindow.close());
                    kakao.maps.event.addListener(marker, 'dragstart', v => infowindow.close());
                    kakao.maps.event.addListener(marker, 'dragend', v => {
                        Rich.Dom(content).S(
                            '>', Rich.Dom('div').S(
                                'font-size', 10,
                                'html', 'overPosition : ' + marker.getPosition()
                            )
                        )
                        marker.setPosition(marker.getPosition())
                        // infowindow.open(map, marker)
                    });
                }
            )
        );
    })();
    (function () {
        Rich.Dom('div').S(
            '<', 'body',
            '>', Rich.Dom('h3').S('html', 'customOverlay'),
            '>', Rich.Dom('button').S(
                'html', '커스텀 오버레이',
                'down', function () {
                    let markerPosition = new kakao.maps.LatLng(33.450701 + Math.random() * 0.002 - 0.001, 126.570667 + Math.random() * 0.002 - 0.001);
                    let content = Rich.Dom('div').S(
                        '>', Rich.Dom('div').S(
                            'position','relative',
                            'padding',10,
                            'width',200,
                            'background', '#fff',
                            'border', '1px solid #333',
                            '>', Rich.Dom('div').S(
                                'border-radius', '50%',
                                'width', 50, 'height', 50,
                                'background', 'url(http://bitcdn.bit-play.com/unibox/2018/03/04/13/f2b0aebcb566af2d7b386c281eabc2b6_10967415_450.jpg)',
                                'background-size', 'cover',
                            ),
                            '>',Rich.Dom('div').S(
                                'position','absolute',
                                'top',10,
                                'left',70,
                                'font-size', 12,
                                'html', '커스텀이닷!',
                                'over',function(){
                                    this.S('color','red')
                                },
                                'out',function(){
                                    this.S('color','#000')
                                },
                                'down',function(){
                                    console.log(cstomOverlay.getPosition())
                                    cstomOverlay.setMap(null);
                                }
                            ),
                            '>',Rich.Dom('iframe').S(
                                'position','absolute',
                                'top',0,
                                'right',-100,
                                'width',100,
                                'height',200,
                                'border',0,
                                '@src','https://redcamel.github.io/RedGL-Examples-test/test/'
                            )
                        )
                    )
                    let cstomOverlay = new kakao.maps.CustomOverlay({
                        position: markerPosition,
                        content: content.dom
                    });
                    // marker.setDraggable(true);
                    cstomOverlay.setMap(map);
                }
            )
        );
    })();
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
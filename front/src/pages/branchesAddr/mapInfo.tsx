import * as React from 'react';
import './index.css'

declare global {
  interface Window {
    kakao: any;
  }
}

export default function BranchesAddr() {


  React.useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(37.586272, 127.029005), //지도의 중심좌표
      level: 1 //지도의 레벨(확대, 축소 정도)
    };
    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
//---> 기본 맵 container, options, map 설정.
const positions = [
  {
    title: "카카오",
    lat: 33.450705, lng: 126.570677,
  },
  {
    title: "생태연못",
    lat: 33.450936, lng: 126.569477,
  },
  {
    title: "텃밭",
    lat: 33.450879, lng: 126.56994,
  },
  {
    title: "근린공원",
    lat: 33.451393, lng: 126.570738,
  },
]
    for (let i=0; i< positions.length; i++){
      displayMarker(positions[i],i);
    }
    
    function displayMarker<T extends {title: string, lat: number, lng: number}>(data: T, i: number) {
      // 인포윈도우 표시될 위치(좌표) 
      let iwPosition  = new window.kakao.maps.LatLng(data.lat, data.lng); 

       // 인포윈도우에 표출될 내용. HTML 문자열이나 document element 등이 가능하다.
      var inactiveInfoWindow = `<div class="inactive infowindow""><span>${data.title}</span></div>`;

      //인포윈도우
      let infowindow;

      infowindow = new window.kakao.maps.InfoWindow({
          zIndex: 1,
          position: iwPosition,
          content: inactiveInfoWindow,
          disableAutoPan: false,
          map: map //map에 해당 인포윈도우를 적용한다.
        });
        

  //중심좌표 재설정
      var position = new window.kakao.maps.LatLng(37.586272, 127.029005);
      map.setCenter(position); 

    
    }
  }, [])

    return (
      <>
        <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </>
      );
    }
// import React from 'react';
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";

//  const MapWithAMarker = withScriptjs(
//    withGoogleMap((props) => (
//      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//        <Marker position={{ lat: -34.397, lng: 150.644 }} />
//      </GoogleMap>
//    ))
//  );

// const MyMapComponent = () => {
//   return (
//     <div style={{width='100vh', height='100vh'}}>
//       <MapWithAMarker
//         googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `400px` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />

//     </div>
//   );
// };

// export default MyMapComponent;

import React from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = () => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  ></GoogleMap>
);

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MyMapComponent = () => {
  return (
    <div>
      <WrappedMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA11xOFo5bnqMERmHYutpnAIglA20kXuxM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default MyMapComponent;

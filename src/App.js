import logo from './logo.svg';
import './App.css';
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import {locations} from './locations'
import { useCallback, useRef, useState } from 'react';

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};


function App() {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: ""
  })

  const [map, setMap] = useState(null)
  console.warn("🚀 ~ file: App.js:25 ~ App ~ map", map)
  const onLoad = useCallback((map) => setMap(map), []);


  const handleMapPosition = () => {
    // const newass = new window.google.maps.LatLngBounds().getNorthEast().lat()
    // console.warn("🚀 ~ file: App.js:31 ~ handleMapPosition ~ newass", newass)
    // console.log(mapRef.current)
    const ass = new window.google.maps.LatLngBounds();
    // const bigAss = window.google.maps.ControlPosition.BOTTOM_LEFT;
    // console.warn("🚀 ~ file: App.js:28 ~ handleMapPosition ~ bigAss", bigAss)
    // console.warn("🚀 ~ file: App.js:28 ~ handleMapPosition ~ ass", ass)
    const ne = new window.google.maps.LatLngBounds().getNorthEast();
    // console.warn("🚀 ~ file: App.js:28 ~ handleMapPosition ~ ne", ne)
    const sw = new window.google.maps.LatLngBounds().getSouthWest();
    console.log(3.745 >= sw.lat() && 3.745<= ne.lat());
    // console.warn("🚀 ~ file: App.js:30 ~ handleMapPosition ~ sw", sw)
    // console.warn("🚀 ~ file: App.js:28 ~ handleMapPosition ~ bounds", bounds)
    // const map = new window.google.maps.
    // console.warn("🚀 ~ file: App.js:28 ~ handleMapPosition ~ map", map)
  }
  if (!isLoaded) return 
  return (
    <div className="App">
    <GoogleMap 
      center={center}
      onLoad={onLoad}
      // onBoundsChanged={handleMapPosition}
      onDragEnd={handleMapPosition}
      mapContainerStyle={containerStyle} zoom={5}>
    </GoogleMap>
    </div>
  );
}


export default App;

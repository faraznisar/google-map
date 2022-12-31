import logo from "./logo.svg";
import "./App.css";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { locations } from "./locations";
import { useCallback, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  console.warn("🚀 ~ file: App.js:25 ~ App ~ map", map);
  const onLoad = useCallback((map) => setMap(map), []);

  const handleMapPosition = () => {
    if (!map) return;
    const ne = map.getBounds().getNorthEast(),
      sw = map.getBounds().getSouthWest();

    console.log(ne, sw);
  };
  if (!isLoaded) return;
  return (
    <div className="App">
      <GoogleMap
        center={center}
        onLoad={onLoad}
        onBoundsChanged={handleMapPosition}
        mapContainerStyle={containerStyle}
        zoom={5}
      ></GoogleMap>
    </div>
  );
}

export default App;

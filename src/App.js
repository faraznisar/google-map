import "./App.css";
import { Autocomplete, GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

import { locations } from "./locations";
import { useCallback, useState } from "react";


const containerStyle = {
  width: "100%",
  height: "500px",
};
function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: ['places']
  });

  const [searchResult, setSearchResult] = useState("Result: none");
  const [list, setList]  = useState(null);
  const [center, setCenter] = useState({
  lat: 65.250856,
  lng: -76.776675,
});
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => {
    setMap(map)
  }, []);

  const onPlaceChanged = () => {
      if (searchResult != null) {
        const place = searchResult.getPlace();
        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        alert("Please enter text");
      }
  }

  const onPlaceLoad= (autocomplete) => {
    setSearchResult(autocomplete);
  }
  const handleMapPosition = () => {
    if (!map) return;
    const ne = map.getBounds().getNorthEast(),
      sw = map.getBounds().getSouthWest();

    setList(
      locations.filter(
        (item) =>
          item.latitude >= sw?.lat() &&
          item.latitude <= ne?.lat() &&
          item.longitude >= sw?.lng() &&
          item.longitude <= ne?.lng()
      )
    );
      console.log(ne.lat())
      console.log(ne.lng())
      console.log(sw.lat())
      console.log(sw.lng())
      
    // console.log(ne, sw);
  };
  console.log({list})
  if (!isLoaded) return;
  return (
    <div className="App">
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onPlaceLoad}>
        <input
          type="text"
          placeholder="Search for Tide Information"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </Autocomplete>
      <GoogleMap
        center={center}
        onLoad={onLoad}
        onBoundsChanged={handleMapPosition}
        mapContainerStyle={containerStyle}
        zoom={5}
      >
        {locations?.map((item, index) => {
          return (
            <MarkerF
              key={index}
              position={{
                lat: parseInt(item.latitude),
                lng: parseInt(item.longitude),
              }}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}

export default App;
  
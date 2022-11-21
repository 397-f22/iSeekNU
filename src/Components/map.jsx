import {
  GoogleMap,
  Circle,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { useDbUpdate, useDbData } from "../utilities/firebase";

function submitLoc(setLat, setLong, updateDb, data) {
  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
    let l = 0;
    if (data) {
      l = Object.entries(data).length + 1;
    }

    updateDb({
      [l]: `${position.coords.latitude},${position.coords.longitude}`,
    });
    console.log(position.coords.latitude, position.coords.longitude);
  });
}

function getLoc(setLat, setLong, updateDb, data) {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

  function showPosition(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
    console.log(position.coords.latitude, position.coords.longitude);
  }
  // navigator.geolocation.getCurrentPosition((position) => {
  //   setLat(position.coords.latitude);
  //   setLong(position.coords.longitude);
  //   console.log(position.coords.latitude, position.coords.longitude);
  // });
}

export default function Map({ roomID, setHomepage, seeker }) {
  const [longitude, setLongitude] = useState(-87.6753);
  const [latitude, setLatitude] = useState(42.0565);
  // Get position of user
  const [updateDb, result] = useDbUpdate(`user/${roomID}/hider`);
  const [data, error] = useDbData(`user/${roomID}/hider`);

  const [updateDb2, result2] = useDbUpdate(`user/${roomID}/`);

  const [vis, setVis] = useState(true);

  // if (error) return <h1>Error loading data: {error.toString()}</h1>;
  // if (data === undefined) return <h1>Loading data...</h1>;
  // if (!data) return <h1>No data found</h1>;

  const refresh = () => {
    updateDb2({ hider: "" });
  };

  const options = {
    styles: [
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#444444",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "poi.attraction",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.business",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "all",
        stylers: [
          {
            saturation: -50,
          },
        ],
      },
      {
        featureType: "poi.sports_complex",
        elementType: "all",
        stylers: [
          {
            saturation: -50,
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#dde6e8",
          },
          {
            visibility: "on",
          },
        ],
      },
    ],
  };
  // Loads the map using API KEY
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDeXZKR-iOaI6CverJZt4pcxKD4p-oJydA",
  });

  return isLoaded ? (
    <div>
      <div style={{ display: "flex", justifyContent: "center"}} >
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "50vw", backgroundColor: "#1a1a1a", borderRadius: "10px", zIndex: "1", marginTop: "10px"}}>
          <span>Join code: {roomID}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center"}} >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "50vw", backgroundColor: "#1a1a1a", borderRadius: "10px", zIndex: "1", marginTop: "10px"}}>
          <span>Your role: {seeker ? "Seeker" : "Hider"}</span>
        </div>
      </div>
      <div style={{ marginTop: "-80px" }}>
        <GoogleMap
          zoom={16}
          center={{ lat: 42.0565, lng: -87.6753 }}
          mapContainerClassName="map-container"
          mapTypeId="terrain"
          options={options}
          visible={vis}
        >
          <MarkerF
            icon={{
              url: "https://cdn-icons-png.flaticon.com/512/5591/5591708.png",
              scaledSize: new google.maps.Size(70, 70),
            }}
            opacity={0.9}
            position={{ lat: latitude, lng: longitude }}
          />
          {data?.map((loc) => {
            const location = loc.split(",");
            return (
              <Circle
                visible={vis}
                id={location}
                center={{
                  lat: parseFloat(location[0]),
                  lng: parseFloat(location[1]),
                }}
                radius={80}
                onClick={() => {
                  setVis(false);
                  console.log(vis);
                }}
              />
            );
          })}
          {/* <Circle center = {{ lat: 42.0565, lng: -87.6753 }} radius = {80} /> */}

          {/* <Circle center = {{ lat: latitude, lng: longitude }} radius = {50} /> */}
        </GoogleMap>
      </div>

      

      <div style={{ display: "flex", justifyContent: "center", marginTop: "-80px" }} >
        {!seeker && (
          <button
            style={{ zIndex: "1" }}
            onClick={() => submitLoc(setLatitude, setLongitude, updateDb, data)}
          >
            Done hiding
          </button>
        )}
        {/* <button style={{zIndex: "1"}} onClick = {refresh} >Refresh</button> */}
        <button
          style={{ zIndex: "1", marginLeft: "15px" }}
          onClick={() => getLoc(setLatitude, setLongitude, updateDb, data)}
        >
          Locate Me
        </button>
        {/* <button style={{ zIndex: "1" }} onClick={() => setHomepage(true)}>
          Home
        </button> */}
      </div>

      {/* <div style={{ marginTop: "50px", zIndex: "1" }}>
        <h2 style={{ zIndex: "1" }}>Room ID: {roomID}</h2>
        <h2>Role: {seeker ? "Seeker" : "Hider"} </h2>
      </div> */}
    </div>
  ) : (
    <></>
  );
  //42.0451° N, 87.6877°W
}

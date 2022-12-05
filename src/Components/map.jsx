import {
  GoogleMap,
  Circle,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { useDbUpdate, useDbData, useDbDelete, useDbRead, useDbDeleteRoom } from "../utilities/firebase";
import CountDownTimer from './Timer';


function submitLoc(setLat, setLong, updateDb, data) {
  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
    let latStr = position.coords.latitude.toString().replace(".", "").replace("-","");
    let lonStr = position.coords.longitude.toString().replace(".", "").replace("-","");
    let l = 0;
    if (data) {
      l = `${latStr}${lonStr}`;
    }
    

    updateDb({
      [l]: `${position.coords.latitude},${position.coords.longitude}`,
    });
    // console.log(position.coords.latitude, position.coords.longitude);
    // console.log(data);
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
    // console.log(position.coords.latitude, position.coords.longitude);
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
  const [hidden, sethidden] = useState(false);
  const [noHider, setNoHider] = useState(true);

  
  const [msg, etR] = useDbData(`user/${roomID}`);

  // if (error) return <h1>Error loading data: {error.toString()}</h1>;
  // if (data === undefined) return <h1>Loading data...</h1>;
  // if (!data) return <h1>No data found</h1>;

  const refresh = () => {
    updateDb2({ hider: "" });
  };
  const startHidertime = () => {
    if(!msg["state"])
    updateDb2({"endTime": new Date(Date.now()+20*60000),
                "state": 1})
  }
  
  const restart = () => {
    updateDb2({ "hider": {"1": "0,0"}, ["state"]: 0, "endTime": new Date(2055, 3, 24, 10, 33, 30)});
    window.location.href = `/${roomID}/${seeker?"seeker":"hider"}`;
    // window.location.href = "/";
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
    googleMapsApiKey:"AIzaSyC9aaZI6eMd_4ivQXZQexs2rJy4NJ7YUv4",
    // AIzaSyDeXZKR-iOaI6CverJZt4pcxKD4p-oJydA
  });


 const GameOver = () =>{
  if(msg["state"]>0 && !(Object.keys(data).length > 1 || noHider) ){
    updateDb2({["state"]: 4 }); // find all the hiders
  }else if (new Date() >= new Date(msg["endTime"]) && msg["state"]==1) {
    updateDb2({"endTime": new Date(Date.now()+60*60000),
                "state": 2})
  }else if(new Date() >= new Date(msg["endTime"]) && msg["state"]==2){
    updateDb2({["state"]: 3 }); // time is up
  }
 
}

React.useEffect(() => {
  const timerId = setInterval(() => GameOver(), 800);
  return () => clearInterval(timerId);
});

const Result = () => {
  switch(msg["state"]) {
    case 3: // time is up
      return (
        <div style={{position: "absolute", height: "calc(100vh - 65px)", width: "100vw", backgroundColor: "rgba(128,128,128,0.6)", zIndex: "2"}}>
        <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
          <div style={{backgroundColor: "black", "opacity": 0.8, padding: "45px", borderRadius: "15px", display: "flex", alignContent: "center", marginTop: "-65px"}}>
            {
            seeker ? <span style={{fontSize: "70px"}}>Sorry, you lose.</span> : <span style={{fontSize: "70px"}}>Congrats, you win.</span> 
            }
          </div>
          <br></br>
          <div style={{backgroundColor: "black", "opacity": 0.8, padding: "15px", borderRadius: "15px", display: "flex", alignContent: "center"}}>
          {
            seeker ? <span style={{fontSize: "25px"}}>You failed to find all of the hiders within the given time. Please note that clicking on go home will disband the group.</span> 
            : <span style={{fontSize: "25px"}}>Congratulations, you stayed hidden for the whole game!</span>
          }
          </div>
          <br></br>
          <br></br>
          {<button style={{zIndex: "1"}} onClick = {restart} >RESTART</button>}
        </div>
      </div>
      );
      case 4: // Find all the hiders
      return (
        <div style={{position: "absolute", height: "calc(100vh - 65px)", width: "100vw", backgroundColor: "rgba(128,128,128,0.6)", zIndex: "2"}}>
        <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
          <div style={{backgroundColor: "black", "opacity": 0.8, padding: "45px", borderRadius: "15px", display: "flex", alignContent: "center", marginTop: "-65px"}}>
            {
            seeker ? <span style={{fontSize: "70px"}}>Congrats, you win.</span> : <span style={{fontSize: "70px"}}>Sorry, you lose.</span> 
            }
          </div>
          <br></br>
          <div style={{backgroundColor: "black", "opacity": 0.8, padding: "15px", borderRadius: "15px", display: "flex", alignContent: "center"}}>
          {
            seeker ? <span style={{fontSize: "25px"}}>You found all of the hiders. Please note that clicking on go home will disband the group.</span> 
            : <span style={{fontSize: "25px"}}>Find a better spot next time</span>
          }
          </div>
          <br></br>
          <br></br>
          {<button style={{zIndex: "1"}} onClick = {restart} >RESTART</button>}
        </div>
      </div>
      );
    default:
      return '';
  }
}


  return (

    <div>      
      {<Result/>}

      <div>

       {/* {console.log(data)} */}

        <div style={{ display: "flex", justifyContent: "center"}} >
          <div className="map-float" style={{display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "50vw", borderRadius: "10px", zIndex: "1", marginTop: "10px"}}>
          <CountDownTimer hoursMinSecs={msg["endTime"]} state={msg["state"]}/>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center"}} >
          <div className="map-float" style={{display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "50vw", borderRadius: "10px", zIndex: "1", marginTop: "10px"}}>
            <span>Join code: {roomID}</span>
          </div>
        </div>

        
        <div style={{ display: "flex", justifyContent: "center"}} >
          <div className="map-float" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "50vw", borderRadius: "10px", zIndex: "1", marginTop: "10px"}}>
            <span>Your role: {seeker ? "Seeker" : "Hider"}</span>
          </div>
        </div>

        
        <div style={{ marginTop: "-120px" }}>
          <GoogleMap
            zoom={16}
            center={{ lat: 42.0565, lng: -87.6753 }}
            mapContainerClassName="map-container"
            mapTypeId="terrain"
            options={options}
          >
            <MarkerF
              icon={{
                url: "https://cdn-icons-png.flaticon.com/512/5591/5591708.png",
                scaledSize: new google.maps.Size(70, 70),
              }}
              opacity={0.9}
              position={{ lat: latitude, lng: longitude }}
            />
            {data && Object.entries(data).map((loc) => {
              // console.log(loc)
              if (loc[0] != 0 && loc[0] != 1 && noHider) {
                setNoHider(false);
              }
              const location = loc[1].split(",");
              return (
                <Circle
                  id={location}
                  center={{
                    lat: parseFloat(location[0]),
                    lng: parseFloat(location[1]),
                  }}
                  radius={80}
                  onClick={() => {
                    // Remove these coordinates from the firebase, this will result in the circle also dissapearing from the map.
                    if (seeker) { // Only allow seeker to delete
                      useDbDelete(roomID, loc[0]);
                    }
                  }}
                />
              );
            })}
          </GoogleMap>
        </div>

        

        <div style={{ display: "flex", justifyContent: "center", marginTop: "-80px" }} >
          {!seeker && (
            <button
              style={{ zIndex: "1" }}
              disabled={hidden}
              onClick={() => { submitLoc(setLatitude, setLongitude, updateDb, data); 
                              sethidden(true); }}
            >
              DONE HIDING
            </button>
          )}
          {seeker && <button style={{zIndex: "1"}} onClick = {startHidertime} >START GAME</button>}
          {/* <button style={{zIndex: "1"}} onClick = {refresh} >Refresh</button> */}
          <button
            style={{ zIndex: "1", marginLeft: "15px" }}
            onClick={() => getLoc(setLatitude, setLongitude, updateDb, data)}
          >
            LOCATE ME
          </button>
        </div>
      </div>
    </div>
  )
  //42.0451° N, 87.6877°W
}

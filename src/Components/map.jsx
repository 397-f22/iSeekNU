import { GoogleMap, Circle, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';
import { useDbUpdate, useDbData } from '../utilities/firebase';

function getLoc(setLat, setLong, updateDb) {
    navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        updateDb({1 : `${position.coords.latitude},${position.coords.longitude}`})
        console.log(position.coords.latitude, position.coords.longitude);
    });
}

export default function Map() {
    const [longitude, setLongitude] = useState(-87.6753);
    const [latitude, setLatitude] = useState(42.0565);

    const [updateDb, result] = useDbUpdate("user/8888/hider")
    const [data, error] = useDbData("user/8888/hider")
    
    // if (error) return <h1>Error loading data: {error.toString()}</h1>;
    // if (data === undefined) return <h1>Loading data...</h1>;
    // if (!data) return <h1>No data found</h1>;

    const options = {
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -50
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -50
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#dde6e8"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    }
    // Loads the map using API KEY
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "",
    });

    return isLoaded ? (
        <div>
            <GoogleMap 
                zoom={16}
                center={{ lat: 42.0565, lng: -87.6753 }} 
                mapContainerClassName='map-container'
                mapTypeId= 'terrain'
                options={options}
            >
                <MarkerF icon = {{ url: "https://cdn-icons-png.flaticon.com/512/5591/5591708.png",
                        scaledSize:  new google.maps.Size(70,70) }}
                        opacity = {.9} 
                        position={{ lat: latitude, lng: longitude }} />
                {data?.map(loc => 
                    {   
                        const location = loc.split(',');
                        return <Circle center = {{ lat: parseFloat(location[0]), lng: parseFloat(location[1]) }} radius = {80} />
                    }
                )}
                {/* <Circle center = {{ lat: 42.0565, lng: -87.6753 }} radius = {80} /> */}
                
                {/* <Circle center = {{ lat: latitude, lng: longitude }} radius = {50} /> */}
            </GoogleMap>
            <div style={{display: "flex", justifyContent: "center", marginTop: "-70px"}}>
                <button style={{zIndex: "1"}} onClick = {()=> getLoc(setLatitude, setLongitude, updateDb)} >Done hiding</button>
                <button style={{zIndex: "1"}} onClick = {()=> getLoc(setLatitude, setLongitude, updateDb)} >Locate Me</button>
            </div>
        </div>
        ) : <></>
        //42.0451° N, 87.6877°W
}



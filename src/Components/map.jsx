import { GoogleMap, Circle, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

export default function Map() {
    // Loads the map using API KEY
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "",
    });

    return isLoaded ? (
        <GoogleMap 
            zoom={17}
            center={{ lat: 42.0565, lng: -87.6753 }} 
            mapContainerClassName='map-container'
        >
            {/* <MarkerF icon = {{ url: "https://cdn-icons-png.flaticon.com/512/5591/5591708.png",
                     scaledSize:  new google.maps.Size(50,50) }}
                     opacity = {.5} 
                     position={{ lat: 42.0565, lng: -87.6753 }} /> */}
            <Circle center = {{ lat: 42.0565, lng: -87.6753 }} radius = {100} />
        </GoogleMap>
        ) : <></>
        //42.0451° N, 87.6877°W
}



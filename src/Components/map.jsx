import { GoogleMap, Circle, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

export default function Map() {
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
        <GoogleMap 
            zoom={17}
            center={{ lat: 42.0565, lng: -87.6753 }} 
            mapContainerClassName='map-container'
            mapTypeId= 'terrain'
            options={options}
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



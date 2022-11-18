import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import "./map.css"

const libraries = ["places"]

export default function Map() {
    // Loads the map using API KEY
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "",
        libraries
    });
    // This returns while map is being loaded
    if (!isLoaded) return <div>Loading...</div>
    return (
        <GoogleMap 
            zoom={17}
            center={{lat: 42.0565, lng: -87.6753}} 
            mapContainerClassName='map-container'
        ></GoogleMap>
        )
        //42.0451° N, 87.6877°W
}

import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
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
            center={{ lat: 42.0565, lng: -87.6753 }} 
            mapContainerClassName='map-container'
        >
            <MarkerF icon = "https://toppng.com/uploads/preview/red-circle-1155276042606ekqvli9k.png" shape = {"circle"} opacity = {.5} position={{ lat: 42.0565, lng: -87.6753 }} />
            {/* <Circle visible = {true} center = {{ lat: 42.0565, lng: -87.6753 }} radius = {100} /> */}
        </GoogleMap>
        )
        //42.0451° N, 87.6877°W
}



import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Map from './Components/map'

import './App.css'

function App() {
    return (
      <div>
        <Map/>
        <button onClick = {()=> getLoc()} >coordinates</button>
      </div>
    )

}
const getLoc = () =>{
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });
}

export default App

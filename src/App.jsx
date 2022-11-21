import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Map from './Components/map'
import Homepage from './Components/Homepage'
import './App.css'



function App() {
    const [roomID, setRoomID] = useState(0);
    const [isHomepage, setHomepage] = useState(true);
    return (
      <div>
        {isHomepage ? <Homepage setRoomID = {setRoomID} setHomepage={setHomepage}/> : <Map roomID = {roomID} setHomepage={setHomepage}/>}
      </div>  
    )

}


export default App

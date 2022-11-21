import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Map from "./Components/map";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import "./App.css";

function App() {
  const [roomID, setRoomID] = useState(0);
  const [isHomepage, setHomepage] = useState(true);
  const [seeker, setSeeker] = useState(false);
  return (
    <div>
      <Navbar isHomepage={isHomepage} setHomepage={setHomepage} />
      {isHomepage ? (
        <Homepage
          setRoomID={setRoomID}
          setHomepage={setHomepage}
          seeker={seeker}
          setSeeker={setSeeker}
        />
      ) : (
        <Map roomID={roomID} setHomepage={setHomepage} seeker={seeker} />
      )}
    </div>
  );
}

export default App;

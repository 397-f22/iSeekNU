import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Map from "./Components/map";
import CountDownTimer from "./Components/Timer";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useDbUpdate, useDbData } from "./utilities/firebase";
import "./App.css";

function App() {
  const [seeker, setSeeker] = useState(false);

  const [data, error] = useDbData("user/");
  if (!data) return <h1>No user data found</h1>;

  console.log(Object.keys(data))
  

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes> 
          {/* adding routes */}
          <Route path="/" element={
            <Homepage seeker={seeker}/>
          }></Route>

          {Object.keys(data).map(id => (
            <Route path={`/${id}/seeker`} element={<Map roomID={id} seeker={true} />}></Route>
          ))}

          {Object.keys(data).map(id => (
            <Route path={`/${id}/hider`} element={<Map roomID={id} seeker={false} />}></Route>
          ))}

        </Routes>
      </BrowserRouter>

      {/* <Navbar isHomepage={isHomepage} setHomepage={setHomepage} />
      {isHomepage ? (
        <Homepage
          setRoomID={setRoomID}
          setHomepage={setHomepage}
          seeker={seeker}
          setSeeker={setSeeker}
        />
      ) : (
        <Map roomID={roomID} setHomepage={setHomepage} seeker={seeker} />
      )} */}
    </div>
    
  );
}

export default App;

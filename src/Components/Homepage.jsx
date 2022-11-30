import { useDbUpdate, useDbData } from "../utilities/firebase";
import React, { useState } from "react";
import RandomNum from "./RandomNum";
import { HowToPlayPopup } from "./HowToPlayPopUp";


const Homepage = ({ setRoomID, setHomepage, seeker, setSeeker }) => {
  const [submitGroup, result] = useDbUpdate("user/");
  const [data, error] = useDbData("user/");

  const enterGroup = (evt) => {
    const group = document.getElementById("group").value;
    // console.log(Object.keys(data));
    console.log(!data);
    if (data) {
      // console.log(Object.keys(data));
      if (group && Object.keys(data).includes(group)) {
        // console.log(group);
        setRoomID(group);
        setHomepage(false);
      }
    }
  };

  const createGroup = () => {
    let random = document.getElementById("randomNum").innerText;
    setRoomID(random);
    submitGroup({
      [random]: {
        ["hider"]: { "1": "0,0" },
      },
    });
    setHomepage(false);
  };
  
  const random = <RandomNum data={data}/>
  // const random = getRandomNum(data)

  const [open, setOpen] = useState(false);


  return (
    
    <div style={{ marginTop: "50px" }}>
      <div style={{ textAlign: "center"}}>
        <p style={{fontSize: "20px"}}>Your Group Number</p>
        <div style={{marginTop: "50px"}}>{random}</div>
        <div style={{marginTop: "20px"}}>
          <button id="create" className="btn btn-dark" onClick={() => createGroup()}>
            <span>Create Group</span>
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <p style={{fontSize: "20px"}}>Already have a group? </p>
        <div><input type="text" id="group" placeholder="# Enter code here" style={{height: "30px", width: "60vw", textAlign: "center", fontSize: "20px", borderRadius: "10px", border: "0.5px solid black"}}></input></div>
        <div style={{marginTop: "20px"}}>
          <button type="submit" className="btn btn-dark" onClick={enterGroup}>
            <span>Join Group</span>
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <p style={{fontSize: "20px"}}>I want to be a: </p>
        <button
          style={{ backgroundColor: seeker ?  "#4E2A84" : "#f9f9f9",  width: "30vw" }}
          type="submit"
          className="btn btn-dark"
          onClick={() => {
            setSeeker(true);
          }}
        >
          <span style={{color: seeker ? "white" : "#213547"}}>Seeker</span>
        </button>
        <button
          style={{ backgroundColor: seeker ? "#f9f9f9" : "#4E2A84", width: "30vw" }}
          type="submit"
          className="btn btn-dark"
          onClick={() => {
            setSeeker(false);
          }}
        >
          <span style={{color: seeker ? "#213547":  "white" }}>Hider</span>
        </button>
        <div>
        <br></br>
        <button onClick={() => setOpen(true)}>How to Play?</button>
        {open ? <HowToPlayPopup closePopup={() => setOpen(false)} /> : null}
        </div>
        <br></br>

      </div> 
    </div>
  );
};

export default Homepage;

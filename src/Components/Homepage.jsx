import { useDbUpdate, useDbData } from "../utilities/firebase";
import React, { useState } from "react";
import RandomNum from "./RandomNum";

const Homepage = ({ setRoomID, setHomepage, seeker, setSeeker }) => {
  const [submitGroup, result] = useDbUpdate("user/");
  const [data, error] = useDbData("user/");
  const [instruction, setInstruction] = useState(false);

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

  const getRandomNum = () => {
    let random = Math.floor(Math.random() * 9000 + 1000);
    if (data) {
      while (Object.keys(data).includes(random)) {
        random = Math.floor(Math.random() * 9000 + 1000);
      }
    }
    return random;
  }

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
      </div>

      <div style={{display: "flex", justifyContent: "center"}}>
      {instruction && <div style={{position: "absolute", transform: "translateY(-100%)"}}>
        <div style={{textAlign: "left", width: "75vw", border: "0.5px solid black", borderRadius: "5px", padding: "10px 20px 10px 20px", backgroundColor: "white"}}>
          <ul>
            <li style={{fontSize: "17px"}}> Allow location services to be on and give permission to this app.</li>
            <li style={{fontSize: "17px"}}> Choose a seeker from your group of players. The seeker will choose the seeker role and click on the Create Group button.</li>
            <li style={{fontSize: "17px"}}> Share the group number with your group of players to use to join group. Simply enter the given code and join the room.</li>
            <li style={{fontSize: "17px"}}> For the next 20 minutes, the seeker will stay in one place while the hiders move around campus to find a hiding spot. Use the Locate Me to help navigate around the campus.</li>
            <li style={{fontSize: "17px"}}> When the hiders have found a hiding spot, the hider will click on the Done Hiding Button to create a circle around their location.</li>
            <li style={{fontSize: "17px"}}> The hiders may not move away from their designated circle.</li>
            <li style={{fontSize: "17px"}}> At the end of 20 minutes, the seeker will go find the hiders using the circles as a guide.</li>
            <li style={{fontSize: "17px"}}> When the seeker finds a person, the seeker will click on the circle to remove it from play. Once all circles have been removed, the game ends.</li>
          </ul>
        </div>
      </div>}
      </div>
      
      <div className="question" style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px"}}>
        <span style={{fontSize: "20px"}}>How to play&nbsp;</span>
          <img 
              src="https://cdn-icons-png.flaticon.com/512/18/18436.png" 
              style={{height: "30px", zIndex: "100"}}
              onClick={() => setInstruction(!instruction)}/>
      </div>

      
    </div>
  );
};

export default Homepage;

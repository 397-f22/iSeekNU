import { useDbUpdate, useDbData } from "../utilities/firebase";
import React, { useState } from "react";

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

  const getRandomNum = () => {
    let random = Math.floor(Math.random() * 9000 + 1000);
    if (data) {
      while (Object.keys(data).includes(random)) {
        random = Math.floor(Math.random() * 9000 + 1000);
      }
    }
    return random;
  }

  const createGroup = (random) => {
    setRoomID(random);
    submitGroup({
      [random]: {
        ["hider"]: { 1: "0,0" },
      },
    });
    setHomepage(false);
  };
  
  const random = getRandomNum();

  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ textAlign: "center"}}>
        <p style={{fontSize: "20px"}}>Your Group Number</p>
        <div style={{marginTop: "50px"}}><span style={{fontSize: "100px"}}>{random}</span></div>
        <div style={{marginTop: "20px"}}>
          <button id="create" className="btn btn-dark" onClick={() => createGroup(random)}>
            <span>Create Group</span>
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <p style={{fontSize: "20px"}}>Already have a group? </p>
        <div><input type="text" id="group" style={{height: "30px", width: "60vw", textAlign: "center", fontSize: "20px"}}></input></div>
        <div style={{marginTop: "20px"}}>
          <button type="submit" className="btn btn-dark" onClick={enterGroup}>
            <span>Join Group</span>
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <p style={{fontSize: "20px"}}>I want to be a: </p>
        <button
          style={{ backgroundColor: seeker ?  "#4E2A84" : "grey",  width: "30vw" }}
          type="submit"
          className="btn btn-dark"
          onClick={() => {
            setSeeker(true);
          }}
        >
          <span>Seeker</span>
        </button>
        <button
          style={{ backgroundColor: seeker ? "grey" : "#4E2A84", width: "30vw" }}
          type="submit"
          className="btn btn-dark"
          onClick={() => {
            setSeeker(false);
          }}
        >
          <span>Hider</span>
        </button>
      </div>
    </div>
  );
};

export default Homepage;

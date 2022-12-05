import React from "react";
import "./PopUp.css";
export const HowToPlayPopup = ({closePopup }) => {
  return (
      <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{position: "absolute", transform: "translateY(-75%)"}}>
        <div style={{textAlign: "center", width: "80vw", border: "0.5px solid black", borderRadius: "5px", padding: "5px 10px 5px 10px", backgroundColor: "black", opacity:0.95}}>
        <div style={{display: "flex", justifyContent: "right"}}>
        <button data-testid = "close" onClick={closePopup}>Close X</button>
        </div>
            <h1>Steps on how to play the game:</h1>
            <ul style={{textAlign: "center", listStylePosition: "inside"}}>
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
     </div>
    </div>
  );
};

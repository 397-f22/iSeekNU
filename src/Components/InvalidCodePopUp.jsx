import React from "react";
import "./PopUp.css";
export const InvalidCodePopUp = ({ closePopup }) => {
  return (
      <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{position: "absolute", transform: "translateY(-75%)"}}>
        <div style={{textAlign: "center", width: "80vw", border: "0.5px solid black", borderRadius: "5px", padding: "5px 10px 5px 10px", backgroundColor: "black", opacity:0.95}}>
        <div style={{display: "flex", justifyContent: "right"}}>
        <button onClick={closePopup}>Close X</button>
        </div>
            <h1>Oops..</h1>
            <h2>The code you entered does not exist in the system.</h2>
            <h3>Make sure you entered the correct group or create a new group to start.</h3>
      </div>
     </div>
    </div>
  );
};
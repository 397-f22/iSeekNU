import React from "react";

const RandomNum = (data) => {
    let random = Math.floor(Math.random() * 9000 + 1000);
    if (data) {
      while (Object.keys(data).includes(random)) {
        random = Math.floor(Math.random() * 9000 + 1000);
      }
    }
    return (<span id="randomNum" style={{fontSize: "100px"}}>{random}</span>)
}

export default React.memo(RandomNum);
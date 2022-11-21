import { useDbUpdate, useDbData } from '../utilities/firebase';
import React, { useState } from 'react';


const Homepage = ({setRoomID, setHomepage}) =>{

    const [submitGroup, result] = useDbUpdate("user/")
    const [data, error] = useDbData("user/")

    const enterGroup = (evt) =>{
        const group = document.getElementById("group").value;
        // console.log(Object.keys(data));
        console.log(!data);
        if(data) {
            console.log(Object.keys(data));
            if (group && Object.keys(data).includes(group)){
                console.log(group)
                setRoomID(group);
                setHomepage(false);
            }
        }
    }

    const createGroup = (evt) =>{
        
        let random = Math.floor(Math.random() * 9000 + 1000);
        if(!data)while(Object.keys(data).includes(random)){
            random = Math.floor(Math.random() * 9000 + 1000);
        }
        setRoomID(random);
        submitGroup({[random]:{
            ["hider"]:{1:"42.0531526,-87.678285"}
        }});
        setHomepage(false);

    }
    
    return (
        <div style={{display: "display"}}>
            <button id="create" className='btn btn-dark' onClick={createGroup}> Create Group </button>
            
            <input type="text" id="group"></input>
            <button type="submit" className='btn btn-dark' onClick={enterGroup}> Enter Group </button>
        </div>
    )
        
}

export default Homepage;
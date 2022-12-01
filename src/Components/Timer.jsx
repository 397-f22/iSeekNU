import React from 'react';

const CountDownTimer = ({hoursMinSecs, state}) => {

    //Future Date
    var dateFuture = new Date(hoursMinSecs);
    var dateNow = new Date();

    var seconds = Math.floor((dateFuture - (dateNow))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);

    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);


    /*
    console.log('hoursMinSecs: ----> ' + hoursMinSecs);
    console.log('hours: ----> ' + hours);
    console.log('minutes: ----> ' + minutes);
    console.log('seconds: ----> ' + seconds);    
    */

    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);


    const tick = () => {
   
        if (hrs === 0 && mins === 0 && secs === 0) {
           reset();
        }
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };


    const reset = () => setTime([parseInt(0), parseInt(0), parseInt(0)]);

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    // if (dateNow >= dateFuture){
    //     return (<div><h3>Time is Up!</h3> </div>);
    // }
    if (state == 0){
        return (<div><h4>Time Left: 00:20:00</h4> </div>);
    }
    return (
        <div>
            <h4>Time Left: {`${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h4> 
        </div>
        
    );
}

export default CountDownTimer;
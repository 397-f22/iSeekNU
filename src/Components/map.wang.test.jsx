import { it, vi, expect } from 'vitest';
import Map from './map';
import { render, screen } from '@testing-library/react';
import { getLoc } from './map';
import App from '../App';
import {useDbData, useDbUpdate} from '../utilities/firebase';
import {
    useJsApiLoader,
    GoogleMap,
    Circle,
    MarkerF,
  } from "@react-google-maps/api";
import CountDownTimer from './Timer';
/**
* @vitest-environment jsdom
*/

vi.mock('../utilities/firebase');
vi.mock("@react-google-maps/api");
vi.mock('./Timer');
vi.mock('./map');
const mockHide = {
    "endTime" : "2055-04-24T15:33:30.000Z",
    "hider" : {1 : "0, 0"},
    "state" : 0
}
const loc = {
    getLoc: () => null,

}
it('when locate me button is clicked, marker is moved', async () => {
    useDbData.mockReturnValue([mockHide, false]);
    useJsApiLoader.mockReturnValue(true);
    useDbUpdate.mockReturnValue([null, mockHide]);
    GoogleMap.mockReturnValue(null);
    Circle.mockReturnValue(null);
    CountDownTimer.mockReturnValue(<div>
        <h4>Hide Time Left: 20:00</h4> 
    </div>);
    Map.mockReturnValue(<div>      
        <div>
  
         {/* {console.log(data)} */}
  
          <div style={{ display: "flex", justifyContent: "center"}} >
            <div className="map-float" style={{display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "50vw", borderRadius: "10px", zIndex: "1", marginTop: "10px"}}>
            <CountDownTimer />
            </div>
          </div>
  
          <div style={{ display: "flex", justifyContent: "center"}} >
            <div className="map-float" style={{display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "50vw", borderRadius: "10px", zIndex: "1", marginTop: "10px"}}>
              <span>Join code: 1173</span>
            </div>
          </div>
  
          
          <div style={{ display: "flex", justifyContent: "center"}} >
            <div className="map-float" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "50vw", borderRadius: "10px", zIndex: "1", marginTop: "10px"}}>
              <span>Your role: Seeker</span>
            </div>
          </div>
  
          
          <div style={{ marginTop: "-120px" }}>
            <GoogleMap

            >
              <MarkerF
                icon={{
                  url: "https://cdn-icons-png.flaticon.com/512/5591/5591708.png",
                }}
                opacity={0.9}
                position={{ lat: 47, lng: 47 }}
              />
              {/* {data && Object.entries(data).map((loc) => {
                // console.log(loc)
                if (loc[0] != 0 && loc[0] != 1 && noHider) {
                  setNoHider(false);
                }
                const location = loc[1].split(",");
                return (
                  <Circle
                    id={location}
                    center={{
                      lat: parseFloat(location[0]),
                      lng: parseFloat(location[1]),
                    }}
                    radius={80}
                    onClick={() => {
                      // Remove these coordinates from the firebase, this will result in the circle also dissapearing from the map.
                      if (seeker) { // Only allow seeker to delete
                        useDbDelete(roomID, loc[0]);
                      }
                    }}
                  />
                );
              })} */}
            </GoogleMap>
          </div>
  
          
  
          <div style={{ display: "flex", justifyContent: "center", marginTop: "-80px" }} >
            {/* {!seeker && (
              <button
                style={{ zIndex: "1" }}
                disabled={hidden}
                onClick={() => { submitLoc(setLatitude, setLongitude, updateDb, data); 
                                sethidden(true); }}
              >
                DONE HIDING
              </button>
            )} */}
            {/* {seeker && <button style={{zIndex: "1"}} onClick = {startHidertime} >START GAME</button>} */}
            {/* <button style={{zIndex: "1"}} onClick = {refresh} >Refresh</button> */}
            <button
              style={{ zIndex: "1", marginLeft: "15px" }}
              onClick={() => getLoc(1, 1, 1, 1)}
            >
              LOCATE ME
            </button>
          </div>
        </div>
      </div>);
    // const spy = vi.spyOn(loc, 'getLoc');
    getLoc.mockReturnValue(null);
    // expect(useDbData).toHaveBeenCalled();
    render(<Map id={9573} seeker={false} />);

    const button =  screen.getByText(/LOCATE ME/);
    await button.click();
    await expect(getLoc).toHaveBeenCalledOnce();
    await expect(getLoc).toHaveBeenCalledWith(1, 1, 1, 1);
  });
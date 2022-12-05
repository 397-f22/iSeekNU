import {beforeEach, describe, vi, it, expect } from 'vitest';
import { getAllByText,getByText, render, screen} from '@testing-library/react';
import App from "./App"
import { endBefore } from 'firebase/database';
import {useAuthState, useDbData, useDbUpdate } from './utilities/firebase'
import Map from './Components/map';

const mockData ={
    "user": {
        "1335": {
          "endTime": "2055-04-24T15:33:30.000Z",
          "hider": [
            null,
            "0,0"
          ],
          "state": 0
        },
    }
}

vi.mock('./utilities/firebase');

beforeEach(() =>{
    useDbData.mockReturnValue([mockData, null]);
    useDbUpdate.mockReturnValue([null, mockData])
});

describe("how to play", ()=>{
    it("should open a modal and allow you to close the page", async()=>{
        render(<App/>)
        const how = await screen.findByTestId("how");
        const array0 = await screen.queryAllByText(/Steps on how to play the game/)
        expect(array0.length == 0).toBeTruthy();
        how.click();
        await screen.findByText(/Steps on how to play the game/);

        const close = await screen.findByTestId("close");
        await close.click();
        const array = await screen.queryAllByText(/Steps on how to play the game/)
        expect(array.length == 0).toBeTruthy();
        
        const input = await screen.findByTestId("input");
        input.value = 1335;
        const button = await screen.findByTestId("join");
        button.click();
        // render(<Map roomID = {Object.entries(mockData.user)[0][0]} setHomepage = {null} seeker = {"seeker"}/>)
        // await screen.findByText(/Join code/i);
    })
})
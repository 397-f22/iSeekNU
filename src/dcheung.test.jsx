import { describe, it } from 'vitest';
import { getAllByText,getByText, render, screen } from '@testing-library/react';
import App from "./App"
import Homepage from "./Components/Homepage"
import Map from "./Components/map"

describe("selection", ()=>{
    it("shows the correct role", async()=>{
        render(<App />);
        await screen.findByText(/I am a Hider/)
        })
    }
)

describe("selection", ()=>{
    it("changes to the correct role when clicked", async()=>{
        const button = await screen.getByTestId("seeker");
        button.click();
        await screen.findByText("I am a Seeker");
       })
    }
)

// describe("enter room" , ()=>{
//     it("should change the room to the entered room", async()=>{
//         const input = await screen.getByTestId("input");
//         input.innerHTML = 1335;
//         input.value = 1335;

//         await screen.findByText(/1335/);
//         const button = await screen.getByTestId("join");
//         button.click();
//         console.log(button.value)
//         await screen.findByText(/LOCATE/);
//     })
// })
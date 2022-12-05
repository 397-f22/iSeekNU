import { describe, it } from 'vitest';
import { getAllByText,getByText, render, screen, expect } from '@testing-library/react';
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
    it("changes to the correct role when clicked (Success)", async()=>{
        const button = await screen.getByTestId("seeker");
        button.click();
        await screen.findByText("I am a Seeker");
       })
    }
)


describe("selection", ()=>{
    it("changes to the correct role when clicked (Fail)", async()=>{
        const button = await screen.getByTestId("seeker");
        button.click();
        await screen.findByText("I am a Hider")
       })
    }
)

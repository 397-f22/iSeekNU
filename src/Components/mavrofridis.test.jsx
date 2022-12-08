import { beforeEach, describe, vi, it, expect } from "vitest";
import { getAllByText,getByText, render, screen } from '@testing-library/react';
import Homepage from "./Homepage";
import App from "../App"


describe("selection", ()=>{
    it("If the Join Group button is pressed with an invalid or empty code, then the user should be alerted and the map should not be loaded.(Success)", async()=>{
        const button = await screen.getByTestId("join");
        button.click();
        await screen.findByText("Oops..");
       })
    }
)

describe("selection", ()=>{
    it("If the Join Group button is pressed with an invalid or empty code, then the user should be alerted and the map should not be loaded.(Fail)", async()=>{
        const button = await screen.getByTestId("join");
        button.click();
        await screen.findByText("LOCATE ME");
       })
    }
)
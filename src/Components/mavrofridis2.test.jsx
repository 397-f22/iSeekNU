import { beforeEach, describe, vi, it, expect } from "vitest";
import { getAllByText,getByText, render, screen } from '@testing-library/react';
import Homepage from "./Homepage";
import App from "../App"
import Map from "./map";


describe("selection", ()=>{
    it("If the game timer runs out, then the players should be appropriately alerted that the game is over.(SUCCESS)", async()=>{
        await screen.getByTestId("LOCATE ME");
        await screen.findByText("timeUp");
       })
    }
)

describe("selection", ()=>{
    it("If the game timer runs out, then the players should be appropriately alerted that the game is over.(Fail)", async()=>{
        await screen.getByTestId("LOCATE ME");
        await screen.findByText("wonUp");
       })
    }
)
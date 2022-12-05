import { describe, expect, it } from 'vitest';
import { getAllByText,getByText, render, screen } from '@testing-library/react';
import App from "./App"

// describe("selection", ()=>{
//     it("shows the correct role", async()=>{
//         render(<App />);
//         await screen.findByText(/I am a Hider/)
//         })
//     }
// )

// describe("selection", ()=>{
//     it("changes to the correct role when clicked (Success)", async()=>{
//         const button = await screen.getByTestId("seeker");
//         button.click();
//         await screen.findByText("I am a Seeker");
//        })
//     }
// )


// describe("selection", ()=>{
//     it("changes to the correct role when clicked (Fail)", async()=>{
//         const button = await screen.getByTestId("seeker");
//         button.click();
//         const texts = await screen.queryAllByText("I am a Hider");
//         //there shouldn't be such string because seeker is clicked
//         expect(texts.length == 0).toBeTruthy();
//        })
//     }
// )

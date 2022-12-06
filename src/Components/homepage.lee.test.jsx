import { beforeEach, describe, vi, it, expect } from "vitest";
import {
  getAllByText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import Hompage from "./Homepage";

describe("how to play", () => {
  it("should open a modal and allow you to close the page", async () => {
    render(<Hompage />);
    const btn = await screen.findByTestId("instructions");
    btn.click();
    await screen.queryAllByText(/Steps on how to play the game/);

    // render(<Map roomID = {Object.entries(mockData.user)[0][0]} setHomepage = {null} seeker = {"seeker"}/>)
    // await screen.findByText(/Join code/i);
  });
});

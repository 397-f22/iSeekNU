import { beforeEach, describe, vi, it, expect } from "vitest";
import {
  getAllByText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import Hompage from "./Homepage";

describe("Homepage unit test", () => {
  it("click on entergroup, pop up failure if it not valid", async () => {
    render(<Hompage />);
    const input = await screen.findByTestId("entergroup");
    input.value = '0000';
    const btn = await screen.findByTestId("entergroup");
    btn.click();
    await screen.queryAllByText(/does not exist/);
  });

  it("click on create, move to map", async () => {
    render(<Hompage />);
    const btn = await screen.findAllByTestId("createtest");
    console.log(btn[0])
    const bb = btn[0]
    bb.click()
    await screen.queryAllByText(/time/);
  });

});

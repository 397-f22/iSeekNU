import { it, vi, expect, describe } from "vitest";
import Map from "./map";
import { render, screen } from "@testing-library/react";
import { getLoc } from "./map";
import App from "../App";
import { useDbData, useDbUpdate, useDbDelete } from "../utilities/firebase";
import {
  useJsApiLoader,
  GoogleMap,
  Circle,
  MarkerF,
} from "@react-google-maps/api";

vi.mock("../utilities/firebase");
vi.mock("@react-google-maps/api");
vi.mock("./Timer");
vi.mock("./map");

const mockData = {
  user: {
    9573: {
      endTime: "2055-04-24T15:33:30.000Z",
      hider: [null, "0,0"],
      state: 0,
    },
  },
};

describe("how to play", () => {
  it("should open a modal and allow you to close the page", async () => {
    render(<Map id={9573} seeker={true} />);
    await screen.queryAllByText(/9573/);

    render(
      <Circle
        id={0}
        center={{
          lat: 0,
          lng: 0,
        }}
        radius={80}
        onClick={() => {
          // Remove these coordinates from the firebase, this will result in the circle also dissapearing from the map.
          if (seeker) {
            // Only allow seeker to delete
            useDbDelete(9573, "0,0");
          }
        }}
      />
    );

    const circle = document.getElementById("circle1");
    await circle.click();
    await expect(useDbDelete).toHaveBeenCalledOnce();
  });
});

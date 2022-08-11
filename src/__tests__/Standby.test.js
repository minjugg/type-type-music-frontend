import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import Standby from "../pages/Standby/Standby";

describe("The Standby page component", () => {
  test("renders a studio button", () => {
    render(
      <RecoilRoot>
        <Router>
          <Standby />
        </Router>
      </RecoilRoot>
    );
    const studioButton = screen.getByRole("button", { name: /studio/i });
    expect(studioButton).toBeInTheDocument();

    const mymusicButton = screen.getByRole("button", { name: /my music/i });
    expect(mymusicButton).toBeInTheDocument();
  });

  test("renders a logout button", () => {
    render(
      <RecoilRoot>
        <Router>
          <Standby />
        </Router>
      </RecoilRoot>
    );
    const logoutButton = screen.getByAltText("logout");
    expect(logoutButton).toBeInTheDocument();
  });
});

import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import HomePage from "../pages/Home/HomePage";
import LoginButton from "../pages/Home/LoginButton";

describe("The Home page component", () => {
  test("renders a title", () => {
    render(
      <RecoilRoot>
        <Router>
          <HomePage />
        </Router>
      </RecoilRoot>
    );
    const title = screen.getByText("TYPE TYPE MUSIC");
    expect(title).toBeInTheDocument();
  });

  test("renders a login button", () => {
    render(
      <RecoilRoot>
        <Router>
          <LoginButton />
        </Router>
      </RecoilRoot>
    );
    const loginButton = screen.getByAltText("google login button");
    expect(loginButton).toBeInTheDocument();
  });
});

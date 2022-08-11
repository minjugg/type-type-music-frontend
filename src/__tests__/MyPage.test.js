import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import MyPage from "../pages/MyPage/MyPage";

describe("The Home page component", () => {
  test("renders a title", () => {
    render(
      <RecoilRoot>
        <Router>
          <MyPage />
        </Router>
      </RecoilRoot>
    );
    const title = screen.getByText("Music Library");
    expect(title).toBeInTheDocument();
  });

  test("a hook", () => {});
});

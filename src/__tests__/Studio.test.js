import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import StudioPage from "../pages/Studio/StudioPage";

document.createRange = () => {
  const range = new Range();

  range.getBoundingClientRect = jest.fn();

  range.getClientRects = jest.fn(() => ({
    item: () => null,
    length: 0,
  }));

  return range;
};

describe("The Studio page component", () => {
  test("renders a code editor", () => {
    render(
      <RecoilRoot>
        <Router>
          <StudioPage />
        </Router>
      </RecoilRoot>
    );
  });
});

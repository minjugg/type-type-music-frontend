import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user";
import LogoutButton from "../../components/LogoutButton";
import Button from "../../components/ButtonLayout";
import styled from "styled-components";

export default function StandBy() {
  const currentUser = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleStandbyButton = (e) => {
    e.preventDefault();

    if (e.target.name === "studio") {
      navigate(`/users/${currentUser}/code`);
    } else {
      navigate(`/users/${currentUser}/my-page`);
    }
  };

  return (
    <>
      <LogoutButton />
      <StandbyButtonsWrapper>
        <Button
          icon="studio.png"
          type="button"
          name="studio"
          onClick={handleStandbyButton}
          text="Studio"
        />
        <Button
          icon="my-music.png"
          type="button"
          name="my-page"
          onClick={handleStandbyButton}
          text="My Music"
        />
      </StandbyButtonsWrapper>
    </>
  );
}

const StandbyButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

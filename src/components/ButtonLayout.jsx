import React from "react";
import styled from "styled-components";

export default function Button(props) {
  return (
    <StyledButton>
      {props.icon && (
        <img src={`/images/button/${props.icon}`} alt={`${props.icon}`} />
      )}
      <button
        type={props.type}
        name={props.name}
        style={{ ...props.style }}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </StyledButton>
  );
}

const StyledButton = styled.div`
  position: relative;

  img {
    position: absolute;
    width: 40px;
    top: 50%;
    left: 30%;
    transform: translate(-90%, -50%);
  }
`;

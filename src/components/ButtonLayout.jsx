import React from "react";
import styled from "styled-components";

export default function Button(props) {
  return (
    <Layout>
      <button
        type={props.type}
        name={props.name}
        style={{ ...props.style }}
        onClick={props.onClick}
      >
        {props.icon && (
          <img src={`/images/button/${props.icon}`} alt={`${props.icon}`} />
        )}
        {props.text}
      </button>
    </Layout>
  );
}

const Layout = styled.div`
  img {
    position: relative;
    top: 5%;
    transform: translateY(-5%);
    margin-right: 3rem;
  }
`;

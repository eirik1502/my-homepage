import React from "react";
import styled from "styled-components";
import Timeline from './Timeline'

const Wrapper = styled.div`
  width: 100%;
  
  background-color: #EBEBEB;
  
  display: flex;
  justify-content: center;
`

export default () => (
    <Wrapper>
        <Timeline />
    </Wrapper>
)
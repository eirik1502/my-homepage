import React from "react";
import styled from "styled-components";
import TopSection from "./TopSection";
import NavBar from "./NavBar";
import TimelineSection from "./TimelineSection";
import ProjectSection from "./ProjectSection";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow-x: hidden;
`

const StyledNavBar = styled(NavBar)`
  position: fixed;
  height: 64px;
`

export default () => (
    <Wrapper>
        <StyledNavBar />
        <TopSection/>
        <TimelineSection />
        <ProjectSection/>
    </Wrapper>
)
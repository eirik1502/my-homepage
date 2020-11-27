import React from 'react'
import styled from 'styled-components'
import TopSection from './TopSection'
import NavBar from './NavBar'
import ProjectsSection from './ProjectsSection'
import TriangleArea from './TriangleArea'
import LandingSection from './LandingSection'
import Timeline from './Timeline'
import TimelineSection from './TimelineSection'

const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: start;
    overflow-x: hidden;
`

const StyledNavBar = styled(NavBar)`
    position: fixed;
    z-index: 1000;
    height: 64px;
`

export default () => (
    <Wrapper>
        {/*<StyledNavBar />*/}
        <LandingSection />
        {/*<TopSection />*/}
        {/*<TriangleArea />*/}
        {/*<ProjectsSection />*/}
        <TimelineSection />
        {/*<ProjectSection />*/}
    </Wrapper>
)

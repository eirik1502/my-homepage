import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Timeline from "./Timeline";
import ProjectBox from "./ProjectBox";
import {getAllProjects, Project} from "../services/ContentService";


const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  
  box-sizing: border-box;
  padding: 0 10%;
  display: flex;
  justify-content: center;
`

const ProjectsWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: center;
`

const StyledProjectBox = styled(ProjectBox)`
  margin: 10px 0;
  height: 182px;
`

export default () => {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        getAllProjects().then(setProjects)
    }, [])

    return (
    <Wrapper>
        <ProjectsWrapper>
        {projects.map(p => <StyledProjectBox contentBlock={p}/>)}
        </ProjectsWrapper>
    </Wrapper>
    )
}
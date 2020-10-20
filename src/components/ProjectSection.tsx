import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProjectBox from './ProjectBox'
import { Project } from '../services/ContentService/types'
import { getAllProjects } from '../services/ContentService/api'

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
                {projects.map((p) => (
                    <StyledProjectBox key={p.id} contentBlock={p} />
                ))}
            </ProjectsWrapper>
        </Wrapper>
    )
}

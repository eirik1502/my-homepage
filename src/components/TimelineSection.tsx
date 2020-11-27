import React, { useEffect, useRef, useState } from 'react'
import { Project } from '../services/ContentService/types'
import { getAllProjects } from '../services/ContentService/api'
import styled from 'styled-components'
import Timeline from './Timeline'
import useViewportIntersection from '../hooks/useViewportIntersection'

const Wrapper = styled.div`
    width: 100%;
    height: 80vh;
`

const TimelineSection = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getAllProjects().then(setProjects)
    }, [])

    const viewportIntersection = useViewportIntersection(wrapperRef)

    return (
        <Wrapper ref={wrapperRef}>
            {viewportIntersection && <Timeline timeline={projects} />}
        </Wrapper>
    )
}

export default TimelineSection

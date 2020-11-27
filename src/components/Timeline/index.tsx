import React, { useEffect, useRef, useState } from 'react'
import { Project, Timeline } from '../../services/ContentService/types'
import { Visualization } from './visualization/visualization'
import { BackgroundImg, TimelineRoot, Wrapper } from './elements'

type Props = {
    timeline: Timeline
}

export default ({ timeline }: Props) => {
    const rootNodeRef = useRef<HTMLDivElement>(null)
    const [visRef, setVisRef] = useState<Visualization | null>(null)
    const [prevBackgroundUrl, setPrevBackgroundUrl] = useState<
        string | undefined
    >(undefined)
    const [focusProject, setFocusProject] = useState<Project | null>(null)

    useEffect(() => {
        if (visRef) {
            visRef.update(timeline)
        }
    }, [visRef, timeline])

    useEffect(() => {
        if (visRef) {
            return () => setVisRef(null)
        } else if (!visRef && rootNodeRef.current) {
            const visualization = new Visualization(rootNodeRef.current)
            visualization.onBranchMouseover = setFocusProject
            visualization.onBranchMouseout = () => setFocusProject(null)
            setVisRef(visualization)
        }
    }, [visRef])

    useEffect(() => {
        if (visRef) {
            if (focusProject) {
                setPrevBackgroundUrl(focusProject.backgroundUrl)
                visRef.focusSingleProject(focusProject.id)
            } else {
                visRef.unfocusAllProjects()
            }
        }
    }, [visRef, focusProject])

    return (
        <Wrapper>
            <BackgroundImg
                url={prevBackgroundUrl || ''}
                opacity={focusProject ? 1 : 0}
            />
            <TimelineRoot ref={rootNodeRef} />
        </Wrapper>
    )
}

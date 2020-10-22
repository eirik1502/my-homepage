import React, { useEffect, useRef, useState } from 'react'
import { Project, Timeline } from '../../services/ContentService/types'
import { Visualization } from './visualization/visualization'
import { BackgroundImg, TimelineRoot, Wrapper } from './elements'

type Props = {
    timeline: Timeline
}

export default ({ timeline }: Props) => {
    const rootNodeRef = useRef<HTMLDivElement>(null)
    const visRef = useRef<Visualization>(null)
    const [prevBackgroundUrl, setPrevBackgroundUrl] = useState<
        string | undefined
    >(undefined)
    const [focusProject, setFocusProject] = useState<Project | null>(null)

    useEffect(() => {
        if (visRef.current) {
            visRef.current.update(timeline)
        }
    }, [visRef, timeline])

    useEffect(() => {
        if (!visRef.current && rootNodeRef.current) {
            // @ts-ignore
            visRef.current = new Visualization(rootNodeRef.current)
        }
    }, [rootNodeRef, visRef])

    useEffect(() => {
        if (visRef.current) {
            visRef.current.onBranchMouseover = setFocusProject
            visRef.current.onBranchMouseout = () => setFocusProject(null)
        }
    }, [visRef])

    useEffect(() => {
        if (visRef.current) {
            if (focusProject) {
                setPrevBackgroundUrl(focusProject.backgroundUrl)
                visRef.current.focusSingleProject(focusProject.id)
            } else {
                visRef.current.unfocusAllProjects()
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

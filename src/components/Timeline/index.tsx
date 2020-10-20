import React, { useEffect, useRef, useState } from 'react'
import { Timeline } from '../../services/ContentService/types'
import { Visualization } from './visualization/visualization'
import { getAllProjects } from '../../services/ContentService/api'

type Props = {
    timeline: Timeline
}

export default ({ timeline }: Props) => {
    const rootNodeRef = useRef<HTMLDivElement>(null)
    const visRef = useRef<Visualization>(null)

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

    return (
        <div ref={rootNodeRef} style={{ width: '100%', height: '600px' }}></div>
    )
}

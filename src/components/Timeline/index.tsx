import React, { useEffect, useRef, useState } from 'react'
import { Timeline } from '../../services/ContentService/types'
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
    const [showBackgrounImage, setShowBackgroundImage] = useState<boolean>(
        false
    )

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
            visRef.current.onBranchMouseover = (p) => {
                setPrevBackgroundUrl(p.backgroundUrl)
                setShowBackgroundImage(true)
            }
            visRef.current.onBranchMouseout = () => {
                setShowBackgroundImage(false)
            }
        }
    }, [visRef])

    useEffect(() => {
        if (visRef.current) {
            visRef.current.hideAllButIcons(showBackgrounImage)
        }
    }, [visRef, showBackgrounImage])

    return (
        <Wrapper>
            <BackgroundImg
                url={prevBackgroundUrl || ''}
                opacity={showBackgrounImage ? 1 : 0}
            />
            <TimelineRoot ref={rootNodeRef} />
        </Wrapper>
    )
}

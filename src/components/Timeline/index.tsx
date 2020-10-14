import React, {useEffect, useRef, useState} from "react";
import {getAllProjects} from "../../services/ContentService";
import {Timeline} from "../../services/ContentService/types";
import {Visualization} from "./visualization";


export default () => {
    const [timeline, setTimeline] = useState<Timeline>([])
    const rootNodeRef = useRef<SVGSVGElement>(null)
    const visRef = useRef<Visualization>(null)

    useEffect(() => {
        getAllProjects()
            .then(cbs => setTimeline(cbs))
    })

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
        <svg ref={rootNodeRef} style={{width: "100%", height: "600px"}}>
        </svg>
    )
}
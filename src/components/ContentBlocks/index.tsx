import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Layout} from "./layout";

import {getAllProjects, Project} from "../../services/ContentService";

type Props = {
    onContentBlockClicked?: (contentBlock: Project) => void
}


const RootNode = styled.div`
  width: 100%;
  height: 100vh;
`

export default ({onContentBlockClicked}: Props) => {
    const [contentBlocks, setContentBlocks] = useState<Project[]>([])
    const rootNodeRef = useRef<HTMLDivElement>(null)
    const layoutRef = useRef<Layout>(null)

    useEffect(() => {
        getAllProjects()
            .then(cbs => setContentBlocks(cbs))
    })

    useEffect(() => {
        if (layoutRef.current) {
            layoutRef.current.update(contentBlocks)
        }
    }, [layoutRef, contentBlocks])

    useEffect(() => {
        if (!layoutRef.current && rootNodeRef.current  && contentBlocks.length > 0) {
            // @ts-ignore
            layoutRef.current = new Layout(rootNodeRef.current, (c) => console.log(c))
        }
    }, [rootNodeRef, contentBlocks, layoutRef])

    return (
        <RootNode ref={rootNodeRef} style={{position: "relative"}}/>
    )
}
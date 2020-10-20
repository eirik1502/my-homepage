import React, { useEffect, useState } from 'react'
import { Wrapper } from './elements'
import OptionsBar from './OptionsBar'
import Timeline from '../Timeline'
import {
    getAllProjects,
    getTopFiveProjects,
} from '../../services/ContentService/api'
import { Project } from '../../services/ContentService/types'

export enum ProjectsViewType {
    TOP_5 = 'top 5',
    WORK_EXPERIENCE = 'work experience',
    HOBBIES = 'hobbies',
    LIFE_STORY = 'life story',
}

const projectsByViewType: {
    [k in ProjectsViewType]: () => Promise<Project[]>
} = {
    [ProjectsViewType.TOP_5]: getTopFiveProjects,
    [ProjectsViewType.LIFE_STORY]: getAllProjects,
    [ProjectsViewType.HOBBIES]: () => Promise.resolve([]),
    [ProjectsViewType.WORK_EXPERIENCE]: () => Promise.resolve([]),
}

const ProjectsSection = () => {
    const [viewType, setViewType] = useState<ProjectsViewType>(
        ProjectsViewType.TOP_5
    )
    const [projects, setProjects] = useState<Project[]>([])
    useEffect(() => {
        projectsByViewType[viewType]().then(setProjects)
    }, [viewType])

    return (
        <Wrapper>
            <Timeline timeline={projects} />
            <OptionsBar
                activeViewType={viewType}
                onViewTypeClick={(type) => setViewType(type)}
            />
        </Wrapper>
    )
}

export default ProjectsSection

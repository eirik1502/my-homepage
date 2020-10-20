import { FrontContent, Project, Technology } from './types'
import { frontContent } from './data/frontContent'
import { allTechnologies } from './data/technologies'
import { allProjects } from './data/projects'
import { top5Projects } from './data/projectsFiltering'

export const getFrontContent = (): Promise<FrontContent> =>
    Promise.resolve(frontContent)

export const getAllTechnologies = (): Promise<Technology[]> =>
    Promise.resolve(allTechnologies)

export const getAllProjects = (): Promise<Project[]> =>
    Promise.resolve(allProjects)

export const getTopFiveProjects = (): Promise<Project[]> =>
    getAllProjects().then((projects) =>
        projects.filter((p) => top5Projects.includes(p.id))
    )

export type FrontContent = {
    title: string
    subtitle: string
    imageUrl: string
}

export enum TechnologyType {
    LANGUAGE = 'LANGUAGE',
    WEB_FRONTEND = 'WEB_FRONTEND',
    WEB_BACKEND = 'WEB_BACKEND',
    GRAPHICS_VISUALIZATION = 'GRAPHICS_VISUALIZATION',
    DEV_OPS = 'DEV_OPS',
}

export type Technology = {
    name: string
    type: TechnologyType
}

export type ProjectId = string

export type BaseProject = {
    id: ProjectId
    title: string
    shortTitle: string
    description: string
    shortDescription: string
    iconUrl: string
    backgroundUrl: string
    timestamp: string
}

export type CodeProject = BaseProject & {
    technologies: string[]
}

export type Project = BaseProject | CodeProject

export type Timeline = Project[]


export type HeaderContent = {
    title: string,
    subtitle: string
    imageUrl: string
}

export const getHeaderContent = (): Promise<HeaderContent> => Promise.resolve({
    title: "Eirik Høgdahl Skjærseth",
    subtitle: "- Master in computer science, NTNU",
    imageUrl: "https://media-exp1.licdn.com/dms/image/C4D03AQGk2kqjW4z5rg/profile-displayphoto-shrink_200_200/0?e=1607558400&v=beta&t=Ycs6VJor8LSYzwFV81V5WM-i_rBAjVM7_rYCmvRL8sg"
})

export enum TechnologyType {
    LANGUAGE = "LANGUAGE",
    WEB_FRONTEND = "WEB_FRONTEND",
    WEB_BACKEND = "WEB_BACKEND",
    GRAPHICS_VISUALIZATION = "GRAPHICS_VISUALIZATION",
    DEV_OPS = "DEV_OPS"
}

export type Technology = {
    name: string,
    type: TechnologyType
}


export const getAllTechnologies = (): Promise<Technology[]> => Promise.resolve([
    {name: "Java", type: TechnologyType.LANGUAGE},
    {name: "Kotlin", type: TechnologyType.LANGUAGE},
    {name: "Python", type: TechnologyType.LANGUAGE},
    {name: "JavaScript", type: TechnologyType.LANGUAGE},
    {name: "TypeScript", type: TechnologyType.LANGUAGE},

    {name: "React", type: TechnologyType.WEB_FRONTEND},
    {name: "Redux", type: TechnologyType.WEB_FRONTEND},

    {name: "Docker", type: TechnologyType.DEV_OPS},
])

export type Project = {
    id: string
    title: string
    shortTitle: string,
    description: string
    shortDescription: string
    iconUrl: string,
    backgroundUrl: string,
}

export type CodeProject = Project & {
    technologies: string[]
}

export const getAllProjects = (): Promise<Project[]> => Promise.resolve([
    {
        id: "0",
        title: "Norwegian university of science and technology",
        shortTitle: "NTNU",
        description: "Master degree in computer science, specializing in artificial intelligence",
        shortDescription: "Master degree",
        iconUrl: "https://pbs.twimg.com/profile_images/1643456860/NTNU_logo.jpg",
        backgroundUrl: "https://trd.by/incoming/article20986239.ece/syypyx/ALTERNATES/w980-square/f783b671-25e3-416c-9aa8-1cf5a20b50ed",
        technologies: []
    },
    {
        id: "1",
        title: "Magnetron: Web game",
        shortTitle: "Magnetron",
        description: "Web game",
        shortDescription: "Master degree",
        iconUrl: "https://pbs.twimg.com/profile_images/1643456860/NTNU_logo.jpg",
        backgroundUrl: "https://pbs.twimg.com/profile_images/1643456860/NTNU_logo.jpg",
        technologies: []
    },
    {
        id: "2",
        title: "Norwegian university of science and technology",
        shortTitle: "NTNU",
        description: "Master degree in computer science, specializing in artificial intelligence",
        shortDescription: "Master degree",
        iconUrl: "https://pbs.twimg.com/profile_images/1643456860/NTNU_logo.jpg",
        backgroundUrl: "https://pbs.twimg.com/profile_images/1643456860/NTNU_logo.jpg",
        technologies: []
    },
    {
        id: "3",
        title: "Norwegian university of science and technology",
        shortTitle: "NTNU",
        description: "Master degree in computer science, specializing in artificial intelligence",
        shortDescription: "Master degree",
        iconUrl: "https://pbs.twimg.com/profile_images/1643456860/NTNU_logo.jpg",
        backgroundUrl: "https://pbs.twimg.com/profile_images/1643456860/NTNU_logo.jpg",
        technologies: []
    },
    {
        id: "4",
        title: "Norwegian university of science and technology",
        shortTitle: "NTNU",
        description: "Master degree in computer science, specializing in artificial intelligence",
        shortDescription: "Master degree",
        iconUrl: "https://pbs.twimg.com/profile_images/1643456860/NTNU_logo.jpg",
        backgroundUrl: "https://pbs.twimg.com/profile_images/1643456860/NTNU_logo.jpg",
        technologies: []
    }
])
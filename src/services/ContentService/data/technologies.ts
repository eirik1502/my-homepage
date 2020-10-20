import { Technology, TechnologyType } from '../types'

export const allTechnologies: Technology[] = [
    { name: 'Java', type: TechnologyType.LANGUAGE },
    { name: 'Kotlin', type: TechnologyType.LANGUAGE },
    { name: 'Python', type: TechnologyType.LANGUAGE },

    { name: 'JavaScript', type: TechnologyType.LANGUAGE },
    { name: 'TypeScript', type: TechnologyType.LANGUAGE },

    { name: 'React', type: TechnologyType.WEB_FRONTEND },
    { name: 'Redux', type: TechnologyType.WEB_FRONTEND },

    { name: 'Docker', type: TechnologyType.DEV_OPS },
]

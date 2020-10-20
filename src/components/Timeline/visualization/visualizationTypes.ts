import { Project } from '../../../services/ContentService/types'

export type Vec2I = { x: number; y: number }
export type Pos = Vec2I
export type Size = { w: number; h: number }
export type AllSidesValues = {
    left: number
    right: number
    top: number
    bottom: number
}

export type AvailableSpace = {
    size: Size
    upperLeftPos: Pos
    centerPos: Pos
}

export type MappedProject = {
    project: Project
    branchSize: Size
    branchPos: Pos
    branchAnchor: 'left' | 'right'
}

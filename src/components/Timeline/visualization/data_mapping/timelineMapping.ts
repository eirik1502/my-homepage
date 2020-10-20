import { Project } from '../../../../services/ContentService/types'
import { AvailableSpace, MappedProject } from '../visualizationTypes'
import * as d3 from 'd3'

const randRange = (min: number, max: number) =>
    Math.random() * (max - min) + min

export const mapProjects = (
    projects: Project[],
    availableSpace: AvailableSpace
): MappedProject[] => {
    const projectsCount = projects.length

    const branchHeight = 48 * 2
    const iconRadius = branchHeight / 2
    const maxBranchWidth = availableSpace.size.w / 2 - iconRadius
    const minBranchWidth = maxBranchWidth * 0.7

    const branchAnchor = (i: number) => (i % 2 === 0 ? 'right' : 'left')
    const branchSideSign = (i: number) => (branchAnchor(i) === 'left' ? -1 : 1)

    const generateBranchWidth = () => randRange(minBranchWidth, maxBranchWidth) // must only be called once per branch

    // const xPos = (i: number, branchWidth: number) =>
    //     availableSpace.centerPos.x + branchWidth * branchSideSign(i)
    const yPos = d3.scaleLinear(
        [0, projectsCount - 1],
        [
            availableSpace.upperLeftPos.y + iconRadius,
            availableSpace.upperLeftPos.y + availableSpace.size.h - iconRadius,
        ]
    )

    return projects.map<MappedProject>((project, i) => {
        const width = generateBranchWidth()
        return {
            project,
            branchSize: {
                w: width,
                h: branchHeight,
            },
            branchPos: {
                x: availableSpace.centerPos.x + width * branchSideSign(i),
                y: yPos(i) || 0,
            },
            branchAnchor: branchAnchor(i),
        }
    })
}

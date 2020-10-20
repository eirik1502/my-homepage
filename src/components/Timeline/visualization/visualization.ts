import * as d3 from 'd3'
import {
    Project,
    Timeline as TimelineType,
} from '../../../services/ContentService/types'
import { Theme } from '../../../theme'
import './viualization.css'
import { appendCicleImagePatter } from './svgPattern'
import appendBranchIcon from './appendBranchIcon'
import appendBranchContent from './appendBranchContent'

type Vec2I = { x: number; y: number }
type Pos = Vec2I
type Size = { w: number; h: number }
type AllSidesValues = {
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

const randRange = (min: number, max: number) =>
    Math.random() * (max - min) + min

const calcAvailableSpace = (
    displaySize: Size,
    padding: AllSidesValues
): AvailableSpace => {
    const size: Size = {
        w: displaySize.w - padding.left - padding.right,
        h: displaySize.h - padding.top - padding.bottom,
    }
    const upperLeftPos = { x: padding.left, y: padding.top }
    const centerPos = {
        x: size.w / 2 + upperLeftPos.x,
        y: size.h / 2 + upperLeftPos.y,
    }

    return { size, upperLeftPos, centerPos }
}

const mapProjects = (
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

export class Visualization {
    rootNode: Element
    svgRoot: d3.Selection<SVGSVGElement, unknown, null, undefined>

    padding: AllSidesValues = {
        top: 50,
        bottom: 50,
        left: 20,
        right: 20,
    }

    constructor(rootNode: Element) {
        this.rootNode = rootNode

        this.svgRoot = d3
            .select(this.rootNode)
            .append('svg')
            .attr('width', this.width())
            .attr('height', this.height())
    }

    width = () => this.rootNode.clientWidth
    height = () => this.rootNode.clientHeight

    update = (timeline: TimelineType) => {
        const sortedProjects = [...timeline].sort((a, b) =>
            a.timestamp < b.timestamp ? -1 : 1
        )

        const availableSpace: AvailableSpace = calcAvailableSpace(
            { w: this.width(), h: this.height() },
            this.padding
        )

        const mappedProjects = mapProjects(sortedProjects, availableSpace)

        const root = this.svgRoot

        root.select('#mainLine').remove()
        root.append('line')
            .attr('id', 'mainLine')
            .attr('x1', availableSpace.centerPos.x)
            .attr('y1', 0)
            .attr('x2', availableSpace.centerPos.x)
            .attr('y2', this.height())
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .lower()

        // const pattern = this.svgDefs.selectAll('pattern').data(sortedProjects)
        //
        // const iconRadius = this.iconRadius
        // pattern.enter().each(function (p) {
        //     appendCicleImagePatter(
        //         d3.select(this),
        //         iconRadius,
        //         p.iconUrl,
        //         'icon_img' + p.id
        //     )
        // })
        // pattern.exit().remove()

        const updateBranches = root
            .selectAll('g.branches')
            // @ts-ignore
            .data(mappedProjects, (p) => p.project.id)

        const enterBranches = updateBranches
            .enter()
            .append('g')
            .attr('class', 'branches')

        // @ts-ignore
        const allBranches = enterBranches.merge(updateBranches)

        const exitBranches = updateBranches.exit()

        this.handleEnterBranches(enterBranches, availableSpace)
        this.handleUpdateBranches(updateBranches)
        this.handleAllBranches(allBranches, availableSpace)
        this.handleExitBranches(exitBranches)
    }

    private handleEnterBranches(
        enterBranches: d3.Selection<any, MappedProject, any, any>,
        availableSpace: AvailableSpace
    ) {
        enterBranches.attr(
            'transform',
            () =>
                `translate(${availableSpace.centerPos.x},${availableSpace.centerPos.y})`
        )
        enterBranches.each(function () {
            d3.select(this)
                .interrupt('branches-fade-out-remove')
                .selectAll('g.branch-content')
                .interrupt('branch-content-fade-in')
                // .interrupt('remove-branch-content')
                .remove()
        })
        appendBranchIcon(enterBranches, 'branch-icon')
    }

    public handleUpdateBranches(
        updateBranches: d3.Selection<any, MappedProject, any, any>
    ) {
        updateBranches
            .selectAll('g.branch-content')
            .transition('remove-branch-content')
            .duration(200)
            .attr('opacity', 0)
            .remove()
    }

    private handleAllBranches(
        allBranches: d3.Selection<any, MappedProject, any, any>,
        availableSpace: AvailableSpace
    ) {
        const transitionBranchToPositionY = allBranches
            .transition('branch-move-to-position')
            .duration(400)
            .attr(
                'transform',
                (d) =>
                    `translate(${availableSpace.centerPos.x},${d.branchPos.y})`
            )

        transitionBranchToPositionY
            .transition()
            .delay((_, i) => i * 100)
            .duration(400)
            .attr(
                'transform',
                (d) => `translate(${d.branchPos.x},${d.branchPos.y})`
            )

        transitionBranchToPositionY.end().then(() => {
            appendBranchContent(allBranches, 'branch-content')
                .lower()
                .attr('opacity', 0)
                .transition('branch-content-fade-in')
                .delay((_, i) => i * 100 + 100)
                .duration(200)
                .attr('opacity', 1)
        })
    }

    private handleExitBranches(exitBranches: d3.Selection<any, any, any, any>) {
        exitBranches
            // .selectAll('.branch-content')
            // .transition('branches-fade-out-remove')
            // .duration(200)
            // .attr('opacity', 0)
            // .attr('fill-opacity', 0)
            .remove()

        // exitBranches.transition().duration(200).attr('fill', 'white').remove()
    }
}

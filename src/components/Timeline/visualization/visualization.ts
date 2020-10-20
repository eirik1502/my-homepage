import * as d3 from 'd3'
import {
    Project,
    Timeline as TimelineType,
} from '../../../services/ContentService/types'
import './viualization.css'
import { AllSidesValues, AvailableSpace } from './visualizationTypes'
import { calcAvailableSpace } from './helpers/spacePartitioning'
import { mapProjects } from './data_mapping/timelineMapping'
import handleEnterBranchs from './visualization_lifecycle/handleEnterBranchs'
import handleExitBranches from './visualization_lifecycle/handleExitBranches'
import handleAllBranches from './visualization_lifecycle/handleAllBranches'
import handleUpdateBranches from './visualization_lifecycle/handleUpdateBranches'

export class Visualization {
    rootNode: Element
    svgRoot: d3.Selection<SVGSVGElement, unknown, null, undefined>

    onBranchMouseover: ((project: Project) => void) | undefined
    onBranchMouseout: ((project: Project) => void) | undefined

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

    private handleResize() {}

    public update(timeline: TimelineType) {
        const sortedProjects = [...timeline].sort((a, b) =>
            a.timestamp < b.timestamp ? -1 : 1
        )

        const elementSize = { w: this.width(), h: this.height() }
        const preferredWidth = 800
        const remainingWidth = Math.max(elementSize.w - preferredWidth, 0)

        const minimumPadding: AllSidesValues = {
            top: 10,
            bottom: 10,
            left: 20,
            right: 20,
        }

        const padding = {
            ...minimumPadding,
            left: remainingWidth / 2,
            right: remainingWidth / 2,
        }

        const availableSpace: AvailableSpace = calcAvailableSpace(
            elementSize,
            padding
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

        const updateBranches = root
            .selectAll('g.branches')
            // @ts-ignore
            .data(mappedProjects, (p) => p.project.id)

        const enterBranches = updateBranches
            .enter()
            .append('g')
            .classed('branches', true)

        // @ts-ignore
        const allBranches = enterBranches.merge(updateBranches)

        const exitBranches = updateBranches.exit()

        handleEnterBranchs(
            enterBranches,
            availableSpace,
            this.onBranchMouseover,
            this.onBranchMouseout
        )
        handleUpdateBranches(updateBranches)
        handleAllBranches(allBranches, availableSpace)
        handleExitBranches(exitBranches)
    }

    public hideAllButIcons(hide: boolean) {
        this.svgRoot
            .selectAll('g.branch-content, #mainLine')
            .transition()
            .duration(200)
            .attr('opacity', hide ? 0 : 1)
    }
}

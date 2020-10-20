import * as d3 from 'd3'
import { Timeline as TimelineType } from '../../../services/ContentService/types'
import { Theme } from '../../../theme'
import './viualization.css'
import { appendCicleImagePatter } from './svgPattern'

type Vec2I = { x: number; y: number }

export class Visualization {
    rootNode: Element
    svgRoot: d3.Selection<SVGSVGElement, unknown, null, undefined>
    centerPosition: Vec2I
    iconRadius: number
    branchOffsetX = 300
    svgDefs: d3.Selection<SVGDefsElement, unknown, null, undefined>
    padding = {
        top: 50,
        bottom: 50,
        left: 20,
        right: 20,
    }

    constructor(rootNode: Element) {
        this.rootNode = rootNode
        this.centerPosition = {
            x: this.width() / 2,
            y: this.height() / 2,
        }
        this.iconRadius = 48

        this.svgRoot = d3
            .select(this.rootNode)
            .append('svg')
            .attr('width', this.width())
            .attr('height', this.height())
        this.svgDefs = this.svgRoot.append('svg:defs')
    }

    width = () => this.rootNode.clientWidth
    height = () => this.rootNode.clientHeight

    update = (timeline: TimelineType) => {
        const nodeCount = timeline.length
        const sortedProjects = [...timeline].sort((a, b) =>
            a.timestamp < b.timestamp ? -1 : 1
        )

        const y = d3.scaleLinear(
            [0, nodeCount - 1],
            [
                this.padding.top + this.iconRadius,
                this.height() - this.padding.bottom - this.iconRadius,
            ]
        )
        const extraOffsetByIndex: number[] = []
        const xOffset = (i: number) => {
            const base = i % 2 === 0 ? -this.branchOffsetX : this.branchOffsetX
            if (!extraOffsetByIndex[i]) {
                extraOffsetByIndex[i] = (Math.random() * 2 - 1) * 40
            }
            return base + extraOffsetByIndex[i]
        }

        const xCenter = () => this.centerPosition.x
        const x = (i: number) => this.centerPosition.x + xOffset(i)
        const branchSide = (i: number) => (xOffset(i) <= 0 ? 'left' : 'right')

        const relBranchLine = (i: number) =>
            d3.line()([
                [0, 0],
                [-xOffset(i), 0],
            ])

        const root = this.svgRoot

        root.select('#mainLine').remove()
        root.append('line')
            .attr('id', 'mainLine')
            .attr('x1', xCenter)
            .attr('y1', 10)
            .attr('x2', xCenter)
            .attr('y2', this.height() - 10)
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .lower()

        const pattern = this.svgDefs.selectAll('pattern').data(sortedProjects)

        const iconRadius = this.iconRadius
        pattern.enter().each(function (p) {
            appendCicleImagePatter(
                d3.select(this),
                iconRadius,
                p.iconUrl,
                'icon_img' + p.id
            )
        })
        pattern.exit().remove()

        const updateBranches = root
            .selectAll('g.branches')
            // @ts-ignore
            .data(sortedProjects, (p) => p.id)

        const enterBranches = updateBranches
            .enter()
            .append('g')
            .attr('class', 'branches')
            .attr('transform', (_, i) => `translate(${xCenter()},${y(0)})`)

        enterBranches
            .append('circle')
            .attr('class', 'branch-icon')
            .attr('cx', this.iconRadius)
            .attr('cy', this.iconRadius)
            .attr('r', this.iconRadius)
            .attr('fill', (p) => `url(#icon_img${p.id})`)
            .style('cursor', 'pointer')
            .attr(
                'transform',
                (_, i) => `translate(${-this.iconRadius},${-this.iconRadius})`
            )

        // @ts-ignore
        const allBranches = enterBranches.merge(updateBranches)
        allBranches
            .selectAll('g.branch-content')
            .transition()
            .duration(500)
            .attr('opacity', 0)
            .remove()

        allBranches
            .transition()
            .duration(1000)
            .attr('transform', (_, i) => `translate(${xCenter()},${y(i)})`)
            .transition()
            .delay((_, i) => i * 100)
            .duration(500)
            .attr('transform', (_, i) => `translate(${x(i)},${y(i)})`)

        const branchContentGroup = allBranches
            .append('g')
            .attr('class', 'branch-content')
            .lower()
        branchContentGroup
            .append('path')
            .attr('d', (_, i) => relBranchLine(i))
            .attr('stroke', '#606060')

        branchContentGroup
            .append('text')
            .text((p) => p.timestamp)
            .attr('fill', '#606060')
            .attr('text-anchor', (_, i) =>
                branchSide(i) === 'right' ? 'end' : 'start'
            )
            .attr('x', (_, i) => -xOffset(i) - Math.sign(xOffset(i)) * 4)

        const branchText = branchContentGroup
            .append('foreignObject')
            .attr('width', (_, i) => Math.abs(xOffset(i)) - this.iconRadius)
            .attr('height', this.iconRadius * 2)
            .attr('x', (_, i) =>
                xOffset(i) > 0 ? -xOffset(i) : this.iconRadius
            )
            .attr('y', -this.iconRadius)
            .style('padding', '4px')

        branchText
            .append('xhtml:h3')
            .attr('class', 'branch-title')
            .style('font-family', Theme.font.main)
            .style('font-size', '16px')
            .text((p) => p.shortTitle)
            .style('text-align', (_, i) => branchSide(i))
        branchText
            .append('xhtml:p')
            .attr('class', 'branch-description')
            .style('padding-top', '.5em')
            .style('font-family', Theme.font.main)
            .style('font-size', '12px')
            .style('text-align', (_, i) => branchSide(i))
            .text((p) => p.shortDescription)
        branchContentGroup
            .attr('opacity', 0)
            .transition('fade-in')
            .delay((_, i) => 1000 + 200 + i * 100)
            .duration(300)
            .attr('opacity', 1)

        const exitBranches = updateBranches.exit()
        exitBranches
            .selectAll('.branch-content')
            .transition()
            .duration(200)
            .attr('opacity', 0)

        exitBranches.transition().duration(200).attr('fill', 'white').remove()
    }

    private handleEnterBranches(
        enterBranches: d3.Selection<any, any, any, any>
    ) {}

    private handleAllBranches(
        updateBranches: d3.Selection<any, any, any, any>
    ) {}

    private handleExitBranches(
        updateBranches: d3.Selection<any, any, any, any>
    ) {}
}

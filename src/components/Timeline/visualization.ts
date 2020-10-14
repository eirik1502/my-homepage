import * as d3 from 'd3'
import {Timeline as TimelineType} from '../../services/ContentService/types'
import {Project} from "../../services/ContentService";

type Vec2I = {x: number, y: number}

export class Visualization {
    rootNode: Element
    centerPosition: Vec2I
    iconRadius: number
    svgDefs: d3.Selection<SVGDefsElement, unknown, null, undefined>;

    constructor(rootNode: Element) {
        this.rootNode = rootNode
        this.centerPosition = {
            x: this.width() / 2,
            y: this.height() / 2
        }
        this.iconRadius = 32

        this.svgDefs = d3.select(this.rootNode).append("svg:defs")
    }

    width = () => this.rootNode.clientWidth
    height = () => this.rootNode.clientHeight

    getNodeX = (i: number) => this.centerPosition.x + (i % 2 === 0 ? -100 : 100)

    update = (timeline: TimelineType) => {
        const nodeCount = timeline.length
        const nodeYScale = d3.scaleLinear([0, nodeCount], [0, this.height()])

        const root = d3.select(this.rootNode)


        const pattern = this.svgDefs.selectAll("pattern")
            .data(timeline)

        pattern
            .enter()
            .append("pattern")
            .attr("id", (_, i) => "icon_img" + i)
            .attr("width", this.iconRadius * 2)
            .attr("height", this.iconRadius * 2)
            .attr("patternUnits", "userSpaceOnUse")
            .append("image")
            .attr("xlink:href", p => p.iconUrl)
            .attr("width", this.iconRadius * 2)
            .attr("height", this.iconRadius * 2)
            .attr("x", 0)
            .attr("y", 0)

        pattern.exit().remove()

        const node = root
            .selectAll('g')
            .data(timeline)

        const enterNodes = node.enter()
            .append("g")

        const enterNodeIcon = enterNodes
            .append("circle")
            .attr("cx", this.iconRadius)
            .attr("cy", this.iconRadius)
            .attr("r", this.iconRadius)
            .attr("transform", (_, i) =>
                `translate(${this.getNodeX(i)},${nodeYScale(i)})`
            )
            .style("fill", (_, i) => `url(#icon_img${i})`)

        node.exit().remove()
    }

}
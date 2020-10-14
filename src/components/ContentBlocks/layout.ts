import * as d3 from 'd3'
import {Project} from "../../services/ContentService";


type Vec2I = {x: number, y: number}

export class Layout {
    rootNode: Element
    centerPosition: Vec2I
    contentOffset: Vec2I
    svgRoot: d3.Selection<SVGSVGElement, unknown, null, undefined>
    startAngle = 0
    endAngle = Math.PI / 2
    contentHeight = 60
    contentBoxWidth = 100
    onContentBlockClick: undefined | ((contentBlock: Project, i: number) => void)

    constructor(rootNode: Element, onContentBlockClick: (contentBlock: Project, i: number) => void) {
        this.rootNode = rootNode
        this.onContentBlockClick = onContentBlockClick
        const width = this.rootNode.clientWidth
        const height = this.rootNode.clientHeight
        this.svgRoot = d3.select(this.rootNode)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
        this.centerPosition = {
            x: width * 0.1,
            y: height / 2
        }
        this.contentOffset = {
            x: width * 0.3,
            y: height / 2 * 0.8
        }
        console.log(this.centerPosition)
    }

    contentPosition = (contentBlock: Project, i: number, blockCount: number): {x: number, y: number} => {
        const deltaAngle = (this.endAngle - this.startAngle) / blockCount
        return {
            x: this.centerPosition.x + Math.cos(deltaAngle * i) * this.contentOffset.x,
            // y: this.centerPosition.y + Math.sin(deltaAngle * i ) * this.contentOffset.y
            y: this.centerPosition.y + this.contentHeight * 1.2 * i
        }
    }


        update = (contentBlocks: Project[]) => {
        const data = this.svgRoot
            .selectAll('g')
            .data(contentBlocks)

        const contentGroups = data.enter()
            .append("g")
        const contentPoints = contentGroups.append("circle")
            .attr("cx", (d, i) => this.centerPosition.x)
            .attr("cy", (d, i) => this.centerPosition.y)
            .attr("r", this.contentHeight / 2)
        const contentBoxes = d3.select(this.rootNode).selectAll("div")
            .data(contentBlocks)
            .enter()
            .append("div")
            .style("position", "absolute")
            .style("left", (d, i, all) => this.contentPosition(d, i, all.length).x + "px")
            .style("top", (d, i, all) => this.contentPosition(d, i, all.length).y - this.contentHeight * 0.5 + "px")
            .style("color", "#00000000")
            .style("max-width", this.contentBoxWidth + "px")
            .style("max-height", this.contentHeight + "px")
            .on("click", (d, i) => this.onContentBlockClick && this.onContentBlockClick(d, i))

        contentBoxes
            .append("p")
            .text(d => d.title)
        contentBoxes
            .transition()
            .delay((_, i) => 1000 + i * 100 - 100)
            .duration(100)
            .style("color", "#000000")
            .style("background-color", "#00000055")


        contentPoints.transition()
                .duration(1000)
                .delay((_, i) => i * 100)
                .attr("cx", (d, i, all) => this.contentPosition(d, i, all.length).x)
                .attr("cy", (d, i, all) => this.contentPosition(d, i, all.length).y)


        data.exit().remove()
    }

}
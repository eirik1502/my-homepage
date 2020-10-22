import * as d3 from 'd3'
import { Theme } from '../../../../theme'
import { MappedProject } from '../visualizationTypes'

export default (
    branchGroup: d3.Selection<SVGGElement, MappedProject, any, any>,
    className: string
): d3.Selection<SVGGElement, MappedProject, any, any> => {
    const branchContentGroup = branchGroup.append('g').attr('class', className)
    const branchOffsetX = (d: MappedProject) =>
        d.branchAnchor === 'left' ? d.branchSize.w : -d.branchSize.w

    branchContentGroup
        .append('rect')
        .attr('class', `${className}-background`)
        .attr('height', (d) => d.branchSize.h)
        .attr('width', (d) => `calc(${d.branchSize.w}px + 4em)`)
        .attr('y', (d) => -d.branchSize.h / 2)
        .attr('rx', '10')
        .attr('ry', '100%')
        .style(
            'transform',
            (d) => `scaleX(${d.branchAnchor === 'left' ? 1 : -1})`
        )
        .attr('fill', '#ffffff')
        .attr('opacity', 0)

    branchContentGroup
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', branchOffsetX)
        .attr('y2', 0)
        .attr('stroke', '#606060')

    branchContentGroup
        .append('text')
        .text((p) => p.project.timestamp)
        .attr('fill', '#606060')
        .attr('text-anchor', (p) =>
            p.branchAnchor === 'left' ? 'start' : 'end'
        )
        .attr('x', (d) => branchOffsetX(d) + Math.sign(branchOffsetX(d)) * 4)

    const branchText = branchContentGroup
        .append('foreignObject')
        .attr('width', (d) => d.branchSize.w - d.branchSize.h / 2)
        .attr('height', (d) => d.branchSize.h)
        .attr('x', (d) =>
            d.branchAnchor === 'left' ? d.branchSize.h / 2 : -d.branchSize.w
        )
        .attr('y', (d) => -d.branchSize.h / 2)
        .style('padding', '4px')

    branchText
        .append('xhtml:h3')
        .attr('class', 'branch-title')
        .style('font-family', Theme.font.main)
        .style('font-size', '16px')
        .text((p) => p.project.shortTitle)
        .style('text-align', (d) => d.branchAnchor)
    branchText
        .append('xhtml:p')
        .attr('class', 'branch-description')
        .style('padding-top', '.5em')
        .style('font-family', Theme.font.main)
        .style('font-size', '12px')
        .style('text-align', (d) => d.branchAnchor)
        .text((d) => d.project.shortDescription)

    return branchContentGroup
}

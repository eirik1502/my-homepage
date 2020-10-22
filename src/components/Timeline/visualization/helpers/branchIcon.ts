import * as d3 from 'd3'
import {
    appendCircleImagePattern,
    updateCircleImagePattern,
} from './cirleImagePattern'
import { MappedProject } from '../visualizationTypes'

export function appendBranchIcon(
    branchGroup: d3.Selection<any, MappedProject, any, any>,
    className: string
): d3.Selection<SVGCircleElement, MappedProject, any, any> {
    branchGroup.append('defs').each(function (p) {
        appendCircleImagePattern(
            d3.select(this),
            p.branchSize.h / 2,
            p.project.iconUrl,
            'icon_img' + p.project.id
        )
    })

    const iconSelection = branchGroup
        .append('circle')
        .classed(className, true)
        .attr('fill', (d) => `url(#icon_img${d.project.id})`)
        .style('cursor', 'pointer')

    return iconSelection
}

export function updateBranchIcon(
    branchGroup: d3.Selection<any, MappedProject, any, any>,
    className: string
) {
    const transitionDuration = 500
    branchGroup.select('defs').each(function (p) {
        updateCircleImagePattern(
            d3
                .select(this)
                .transition()
                .duration(transitionDuration * 0.85),
            p.branchSize.h / 2
        )
    })

    branchGroup
        .select(`circle.${className}`)
        .transition()
        .duration(transitionDuration)
        .attr('cx', (d) => d.branchSize.h / 2)
        .attr('cy', (d) => d.branchSize.h / 2)
        .attr('r', (d) => d.branchSize.h / 2)
        .attr(
            'transform',
            (d) => `translate(${-d.branchSize.h / 2}, ${-d.branchSize.h / 2})`
        )
}

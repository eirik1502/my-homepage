import * as d3 from 'd3'
import { MappedProject } from './visualization'
import { appendCicleImagePatter } from './svgPattern'

export default (
    branchGroup: d3.Selection<any, MappedProject, any, any>,
    className: string
): d3.Selection<SVGCircleElement, MappedProject, any, any> => {
    branchGroup.append('defs').each(function (p) {
        appendCicleImagePatter(
            d3.select(this),
            p.branchSize.h / 2,
            p.project.iconUrl,
            'icon_img' + p.project.id
        )
    })

    const iconSelection = branchGroup
        .append('circle')
        .attr('class', className)
        .attr('cx', (d) => d.branchSize.h / 2)
        .attr('cy', (d) => d.branchSize.h / 2)
        .attr('r', (d) => d.branchSize.h / 2)
        .attr('fill', (d) => `url(#icon_img${d.project.id})`)
        .attr(
            'transform',
            (d) => `translate(${-d.branchSize.h / 2}, ${-d.branchSize.h / 2})`
        )
    // .style('cursor', 'pointer')

    return iconSelection
}

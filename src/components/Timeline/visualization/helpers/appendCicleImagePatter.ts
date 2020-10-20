import * as d3 from 'd3'

export default (
    selection: d3.Selection<any, any, any, any>,
    radius: number,
    imgUrl: string,
    id: string
) => {
    const pattern = selection
        .append('pattern')
        .attr('id', id)
        .attr('width', radius * 2)
        .attr('height', radius * 2)
        .attr('patternUnits', 'userSpaceOnUse')
    pattern
        .append('circle')
        .attr('width', radius * 2)
        .attr('height', radius * 2)
        .attr('r', radius)
        .attr('cx', radius)
        .attr('cy', radius)
        .attr('fill', 'white')
    pattern
        .append('image')
        .attr('xlink:href', imgUrl)
        .attr('width', radius * 2)
        .attr('height', radius * 2)
        .attr('x', 0)
        .attr('y', 0)
}

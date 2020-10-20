import * as d3 from 'd3'

export function appendCircleImagePattern(
    selection: d3.Selection<any, any, any, any>,
    radius: number,
    imgUrl: string,
    id: string
) {
    const pattern = selection
        .append('pattern')
        .attr('id', id)
        .attr('patternUnits', 'userSpaceOnUse')
    pattern.append('circle').attr('fill', 'white')
    pattern.append('image').attr('xlink:href', imgUrl)

    // updateCircleImagePattern(selection, radius)
}

export function updateCircleImagePattern(
    selection: d3.Selection<any, any, any, any>,
    radius: number
) {
    const pattern = selection
        .select('pattern')
        .attr('width', radius * 2)
        .attr('height', radius * 2)
    console.log(pattern.select('circle'))
    pattern
        .select('circle')
        .attr('width', radius * 2)
        .attr('height', radius * 2)
        .attr('r', radius)
        .attr('cx', radius)
        .attr('cy', radius)
    pattern
        .select('image')
        .attr('width', radius * 2)
        .attr('height', radius * 2)
        .attr('x', 0)
        .attr('y', 0)
}

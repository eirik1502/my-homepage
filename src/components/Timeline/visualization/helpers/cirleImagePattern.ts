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

type DefsSelection = d3.Selection<SVGDefsElement, any, d3.BaseType, any>
type DefsSelectionOrTransition =
    | DefsSelection
    | d3.Transition<d3.BaseType, any, d3.BaseType, any>

export function updateCircleImagePattern(
    defsSelection: DefsSelectionOrTransition,
    radius: number
) {
    const pattern = (defsSelection as DefsSelection)
        .select('pattern')
        .attr('width', radius * 2)
        .attr('height', radius * 2)
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

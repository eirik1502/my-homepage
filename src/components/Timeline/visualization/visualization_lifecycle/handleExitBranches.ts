import * as d3 from 'd3'

export default function (exitBranches: d3.Selection<any, any, any, any>) {
    exitBranches
        // .selectAll('.branch-content')
        // .transition('branches-fade-out-remove')
        // .duration(200)
        // .attr('opacity', 0)
        // .attr('fill-opacity', 0)
        .remove()

    // exitBranches.transition().duration(200).attr('fill', 'white').remove()
}

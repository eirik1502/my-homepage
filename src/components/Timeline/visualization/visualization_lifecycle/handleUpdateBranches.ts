import * as d3 from 'd3'
import { MappedProject } from '../visualizationTypes'

export default function (
    updateBranches: d3.Selection<any, MappedProject, any, any>
) {
    updateBranches
        .selectAll('g.branch-content')
        // .transition('remove-branch-content')
        // .duration(200)
        // .attr('opacity', 0)
        .remove()
}

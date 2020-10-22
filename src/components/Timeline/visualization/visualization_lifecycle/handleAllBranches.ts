import * as d3 from 'd3'
import { AvailableSpace, MappedProject } from '../visualizationTypes'
import appendBranchContent from '../helpers/appendBranchContent'
import { updateBranchIcon } from '../helpers/branchIcon'

export default function (
    allBranches: d3.Selection<any, MappedProject, any, any>,
    availableSpace: AvailableSpace
) {
    updateBranchIcon(allBranches, 'branch-icon')

    const transitionBranchToPositionY = allBranches
        .transition('branch-move-to-position')
        .duration(400)
        .attr(
            'transform',
            (d) => `translate(${availableSpace.centerPos.x},${d.branchPos.y})`
        )

    transitionBranchToPositionY
        .transition()
        .delay((_, i) => i * 50)
        .duration(400)
        .attr(
            'transform',
            (d) => `translate(${d.branchPos.x},${d.branchPos.y})`
        )

    transitionBranchToPositionY.end().then(() => {
        appendBranchContent(allBranches, 'branch-content')
            .lower()
            .attr('opacity', 0)
            .transition('branch-content-fade-in')
            .delay((_, i) => i * 50 + 200)
            .duration(200)
            .attr('opacity', 1)
    })
}

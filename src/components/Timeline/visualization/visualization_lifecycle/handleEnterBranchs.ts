import * as d3 from 'd3'
import { AvailableSpace, MappedProject } from '../visualizationTypes'
import appendBranchIcon from '../helpers/appendBranchIcon'
import { Project } from '../../../../services/ContentService/types'

export default function (
    enterBranches: d3.Selection<any, MappedProject, any, any>,
    availableSpace: AvailableSpace,
    onBranchMouseover?: (project: Project) => void,
    onBranchMouseout?: (project: Project) => void
) {
    enterBranches.attr(
        'transform',
        () =>
            `translate(${availableSpace.centerPos.x},${availableSpace.centerPos.y})`
    )
    appendBranchIcon(enterBranches, 'branch-icon')
        .on(
            'mouseover',
            // @ts-ignore the callback is incorrectly typed
            (e, d) => onBranchMouseover && onBranchMouseover(d.project)
        )
        .on(
            'mouseout',
            // @ts-ignore the callback is incorrectly typed
            (e, d) => onBranchMouseout && onBranchMouseout(d.project)
        )
}

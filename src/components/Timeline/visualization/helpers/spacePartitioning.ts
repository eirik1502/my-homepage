import { AllSidesValues, AvailableSpace, Size } from '../visualizationTypes'

export const calcAvailableSpace = (
    displaySize: Size,
    padding: AllSidesValues
): AvailableSpace => {
    const size: Size = {
        w: displaySize.w - padding.left - padding.right,
        h: displaySize.h - padding.top - padding.bottom,
    }
    const upperLeftPos = { x: padding.left, y: padding.top }
    const centerPos = {
        x: size.w / 2 + upperLeftPos.x,
        y: size.h / 2 + upperLeftPos.y,
    }

    return { size, upperLeftPos, centerPos }
}

import { useCallback, useEffect, useLayoutEffect } from 'react'
import elementResizeDetectorMaker from 'element-resize-detector'
import React from 'react'

export type ElementResizeListener = (
    clientSize: { width: number; height: number },
    element: Element
) => void

const elementResizeDetector = elementResizeDetectorMaker({ strategy: 'scroll' })

export default <T extends HTMLElement>(
    elementRef: React.RefObject<T>,
    listener: ElementResizeListener
) => {
    const intermediateListener = useCallback(
        (element: Element) => {
            const clientSize = {
                width: element.clientWidth,
                height: element.clientHeight,
            }
            listener(clientSize, element)
        },
        [listener]
    )

    useEffect(() => {
        const element = elementRef.current
        if (element) {
            elementResizeDetector.listenTo(element, intermediateListener)
            return () =>
                elementResizeDetector.removeListener(
                    element,
                    intermediateListener
                )
        }
    }, [elementRef, intermediateListener])
}

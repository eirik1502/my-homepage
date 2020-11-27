import React, { useCallback, useEffect, useState } from 'react'

export type ViewportIntersection = {
    readonly boundingClientRect: DOMRectReadOnly
    readonly intersectionRatio: number
    readonly intersectionRect: DOMRectReadOnly
}

type InternalViewportIntersectionListener = (
    entry: IntersectionObserverEntry
) => void

const callbackByTarget = new Map<
    Element,
    InternalViewportIntersectionListener
>()

const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries
        .filter((entry) => callbackByTarget.has(entry.target))
        .forEach((entry) => {
            const callback = callbackByTarget.get(entry.target)!
            callback(entry)
        })
}
const viewportIntersectionObserver = new IntersectionObserver(
    observerCallback,
    {
        root: null, // browser viewport
        rootMargin: '0px',
        threshold: 0.3,
    }
)

export default <T extends Element>(
    targetRef: React.RefObject<T>
): ViewportIntersection | null => {
    const [
        viewportIntersection,
        setViewportIntersection,
    ] = useState<ViewportIntersection | null>(null)

    const listener = useCallback((entry: IntersectionObserverEntry) => {
        // console.log('viewport intersection!', entry)
        if (entry.isIntersecting) {
            setViewportIntersection(entry)
        } else {
            setViewportIntersection(null)
        }
    }, [])

    useEffect(() => {
        const targetElement = targetRef.current
        if (targetElement) {
            callbackByTarget.set(targetElement, listener)
            viewportIntersectionObserver.observe(targetElement)
            return () => {
                viewportIntersectionObserver.unobserve(targetElement)
                callbackByTarget.delete(targetElement)
            }
        }
    }, [targetRef, listener])

    return viewportIntersection
}

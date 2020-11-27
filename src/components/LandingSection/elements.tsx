import React, { useEffect, useLayoutEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useRef } from 'react'
import TriangleDisplay from '../TriangleArea'
import useResizeListener from '../../hooks/useResizeListener'

export const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 64px);

    background: linear-gradient(#319448, black 20%);
    position: relative;
    z-index: -1000;

    display: grid;
    grid-template:
        '. . .' 1fr
        '. triangle .' minmax(360px, 70%)
        '. . .' 1fr
        / 1fr minmax(360px, 70%) 1fr;
`

const TriangleAreaWrapper = styled.div`
    grid-area: triangle;
    display: flex;
    justify-content: center;
`

const TriangleAreaChild = styled.div<{ size: number }>`
    //width: 600px;
    //min-width: 80%;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
`

export const TriangleArea: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState<number>(0)
    useResizeListener(ref, (clientSize) => {
        const { width, height } = clientSize
        setSize(Math.min(width, height))
    })

    return (
        <TriangleAreaWrapper ref={ref}>
            <TriangleAreaChild size={size}>{children}</TriangleAreaChild>
        </TriangleAreaWrapper>
    )
}

const TriangleDisplayAnim = keyframes`
  from {
    transform: translateZ(-2000px) rotateX(80deg);
  }
  50% {
    transform: translateZ(-150px) rotateX(60deg);
  }
  85% {
    transform: translateZ(-100px) rotateX(40deg);
  }
  to {
    transform: rotateX(0);
  }
`

export const TriangleDisplayWrapper = styled.div`
    width: 100%;
    height: 100%;
    perspective: 200px;
`

export const StyledTriangleDisplay = styled(TriangleDisplay)`
    animation: 0.8s ${TriangleDisplayAnim} ease-in;
`

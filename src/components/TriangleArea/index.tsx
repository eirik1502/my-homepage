import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    BackgroundWrapper,
    IconTriangleWrapper,
    TriangleBackground,
    Wrapper,
} from './elements'
import TextBounds from './TextBounds'
import useResizeListener, {
    ElementResizeListener,
} from '../../hooks/useResizeListener'
import Triangle from '../Triangle'

type Props = {
    className?: string
}

const TriangleArea: React.FC<Props> = ({ className }) => {
    const [fontSize, setFontSize] = useState<number>(32)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleWrapperResize = useCallback<ElementResizeListener>(
        (clientSize) => {
            const { width } = clientSize
            setFontSize(width * 0.05)
        },
        []
    )

    useResizeListener(wrapperRef, handleWrapperResize)

    return (
        <Wrapper className={className} ref={wrapperRef}>
            <BackgroundWrapper>
                <TriangleBackground fillColor={'#4AE06D'} />
                <IconTriangleWrapper>
                    <Triangle
                        fillImage={{
                            url: '/images/eirik_profile_pic.png',
                            scale: 1.6,
                            offsetY: 15,
                        }}
                    />
                </IconTriangleWrapper>
            </BackgroundWrapper>
            <div
                style={{
                    height: '100%',
                }}
            >
                <TextBounds />
                <p
                    style={{
                        padding: '10% 0',
                        color: 'black',
                        margin: '0px',
                        fontSize: `${fontSize}px`,
                    }}
                >
                    With a <span style={{ color: 'blue' }}>master</span> in
                    <br />
                    computer science
                    <br />
                    <br />
                    and a <span style={{ color: 'red' }}>love</span> for
                    <br />
                    creations
                </p>
            </div>
        </Wrapper>
    )
}

export default TriangleArea

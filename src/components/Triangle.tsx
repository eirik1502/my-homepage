import React, { RefObject, useState } from 'react'
import styled from 'styled-components'

type FillImage = {
    url: string
    offsetX?: number
    offsetY?: number
    scale?: number
}

export type Props = {
    className?: string
    fillColor?: string
    fillImage?: FillImage
    stroke?: string
    strokeWidth?: number
}

const Svg = styled.svg`
    width: 100%;
    height: 100%;
`
const Polygon = styled.polygon<{
    color: string
    stroke: string
    strokeWidth: number
}>`
    fill: ${(props) => props.color};
    stroke: ${(props) => props.stroke};
    stroke-width: ${(props) => props.strokeWidth};
`
const Triangle = React.forwardRef<SVGSVGElement, Props>(
    (
        {
            className,
            fillColor = 'black',
            fillImage,
            stroke = 'none',
            strokeWidth = 0,
        },
        ref
    ) => {
        const [polygonPath] = useState([
            [0, 0],
            [100, 0],
            [50, 86.6],
        ])
        const polygonPathStr = polygonPath
            .map((point) => point.join(','))
            .join(' ')

        const svgDefs = fillImage && generateSvgDefs(fillImage)

        return (
            <Svg
                ref={ref}
                className={className}
                width={100}
                height={100}
                viewBox={'0 0 100 100'}
                preserveAspectRatio={'xMinYMin'} // xMinYMin
                xmlns={'http://www.w3.org/2000/svg'}
            >
                {svgDefs}
                <polygon
                    fill={fillImage ? `url(#${fillImage.url})` : fillColor}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    points={polygonPathStr}
                />
            </Svg>
        )
    }
)

const generateSvgDefs = ({
    url,
    scale = 1,
    offsetX = 0,
    offsetY = 0,
}: FillImage) => {
    const patternWidth = 100
    const patternHeight = 100
    return (
        <defs>
            <pattern
                id={url}
                patternUnits="userSpaceOnUse"
                width={patternWidth}
                height={patternHeight}
            >
                <image
                    href={url}
                    x={-(scale - 1) * (patternWidth / 2) + offsetX}
                    y={-(scale - 1) * (patternHeight / 2) + offsetY}
                    width={patternWidth * scale}
                    height={patternWidth * scale}
                />
            </pattern>
        </defs>
    )
}

export default Triangle

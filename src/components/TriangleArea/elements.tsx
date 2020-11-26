import styled from 'styled-components'
import Triangle from '../Triangle'

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

export const BackgroundWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
`

export const TriangleBackground = styled(Triangle)`
    position: absolute;
    top: 0;
    left: 0;
`

export const IconTriangleWrapper = styled.div`
    position: absolute;
    width: 50%;
    height: 50%;
    top: 0;
    left: 0;
`

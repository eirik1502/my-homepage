import styled from 'styled-components'

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

export const TimelineRoot = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

export const BackgroundImg = styled.div<{ url: string; opacity: number }>`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: ${(props) => props.opacity};
    transition: opacity 0.5s;
`

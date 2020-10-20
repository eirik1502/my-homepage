import React from 'react'
import styled from 'styled-components'

type Props = {
    className?: string
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #363636;
    display: flex;
    justify-content: space-between;
`

const Segment = styled.div``

export default ({ className }: Props) => (
    <Wrapper className={className}>
        <Segment></Segment>
        <Segment>top | timeline | projects | tech</Segment>
        <Segment>Get in touch</Segment>
    </Wrapper>
)

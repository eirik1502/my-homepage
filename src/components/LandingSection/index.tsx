import React from 'react'
import {
    StyledTriangleDisplay,
    TriangleDisplayWrapper,
    Wrapper,
} from './elements'
import { TriangleArea } from './elements'

const LandingSection = () => {
    return (
        <Wrapper>
            <TriangleArea>
                <TriangleDisplayWrapper>
                    <StyledTriangleDisplay />
                </TriangleDisplayWrapper>
            </TriangleArea>
        </Wrapper>
    )
}

export default LandingSection

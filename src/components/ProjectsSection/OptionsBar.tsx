import React from 'react'
import styled from 'styled-components'
import { ProjectsViewType } from './index'

const Wrapper = styled.div`
    padding: 0 10%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    //border-top: 1px solid black;
`

const OptionButton = styled.button<{ active?: boolean }>`
    box-sizing: border-box;
    outline: none;
    border: none;
    width: 96px;
    height: 64px;
    background-color: ${(props) =>
        props.active ? 'red' : 'rgb(239, 239, 239)'};
    transition: background-color 0.1s;

    &:hover {
        ${(props) =>
            props.active ? null : `background-color: rgb(207, 207, 207)`};
    }
`

type Props = {
    activeViewType: ProjectsViewType
    onViewTypeClick?: (type: ProjectsViewType) => void
}

export default ({ activeViewType, onViewTypeClick }: Props) => {
    return (
        <Wrapper>
            {Object.values(ProjectsViewType).map((type) => (
                <OptionButton
                    key={type}
                    type={'button'}
                    active={activeViewType === type}
                    onClick={(e) => onViewTypeClick && onViewTypeClick(type)}
                >
                    {type}
                </OptionButton>
            ))}
        </Wrapper>
    )
}

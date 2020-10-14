import React from "react";
import styled from "styled-components";
import {Theme} from "../theme";
import {Project} from "../services/ContentService";

type Props = {
    className?: string
    contentBlock: Project
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #fff, #00000012 40%);

  display: flex;
`;

const Icon = styled.img`
  height: 100%;
  border-radius: 100%;
`

const Content = styled.div`
  padding-left: 2em;
  padding-right: 2em;
  display: flex;
  flex-direction: column;
`

const ProjectTitle = styled.h3`
  margin: 0;
  padding-top: 20px;
  padding-bottom: 10px;
  font-size: 24px;
  font-family: ${Theme.font.main};
`

const ProjectDescription = styled.p`
  margin: 0;
  font-size: 18px;
   font-family: ${Theme.font.main};
`

export default ({className, contentBlock}: Props) => (
    <Wrapper className={className}  >
        <Icon src={contentBlock.iconUrl} />
        <Content>
            <ProjectTitle>{contentBlock.title}</ProjectTitle>
            <ProjectDescription>{contentBlock.description}</ProjectDescription>
        </Content>
    </Wrapper>
)
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getHeaderContent, HeaderContent} from "../services/ContentService";

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  
  background-image: url("/background_top.png");
  background-size: cover;
  
  display: flex;
  justify-content: center;
`

const ContentWrapper = styled.div`
    display: flex;
  flex-direction: column;
  justify-content: center;
`

const TitleLogo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleWrapper = styled.div`
  padding-left: 2em;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Title = styled.h1`
  margin: 0;
`
const Subtitle = styled.h3`
  margin: 0;
`

const BoxesArea = styled.div`
  display: flex;
  padding-top: 10%;
  justify-content: space-around;
`

const Box = styled.div`
  border: aquamarine dashed 3px;
`

const ImageOfMe = styled.img`
  border-radius: 100%;
`

export default () => {
    const [titleContent, setTitleContent] = useState<HeaderContent | undefined>(undefined)

    useEffect(() => {
        getHeaderContent().then(setTitleContent)
    }, [])

    return (
        <Wrapper>
            <ContentWrapper>
                <TitleLogo>
                    { titleContent && <ImageOfMe src={titleContent?.imageUrl} /> }
                    <TitleWrapper>
                        <Title>{titleContent && titleContent.title}</Title>
                        <Subtitle>{titleContent && titleContent.subtitle}</Subtitle>
                    </TitleWrapper>
                </TitleLogo>
                <BoxesArea>
                    <Box>
                        Right now
                    </Box>
                    <Box>
                        Collaborate?
                    </Box>
                </BoxesArea>
            </ContentWrapper>
        </Wrapper>
    )
}
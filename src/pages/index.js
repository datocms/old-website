import React from 'react'
import { Wrap, Space, Button, Text } from '../components/common'
import Flex, { FlexItem } from 'styled-flex-component'
import styled from 'styled-components'

import Browser from '../components/Browser'

import firstWave from '../images/first-wave.svg'
import screenshot from '../images/screen.png'
import arrowDown from '../images/arrow-down-dropdown.svg'

const Container = styled.div`
  background: url(${firstWave});
  background-position: bottom center;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
`

const MyBrowser = styled(Browser)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  margin-left: 90px;
`

const ScreenshotImage = styled.img`
  display: block;
  width: 50vw;
`

const TextContainer = styled(Flex)`
  width: 50%;
  height: 80vh;
`

const OrDiscover = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px;

  img {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
  }
`

const IndexPage = () => (
  <Container>
    <Wrap>
      <TextContainer alignCenter>
        <FlexItem>
          <Space bottom={2}>
            <Text tag="h1" size="hero" weight="bold">
              The API-based CMS for agencies
            </Text>
          </Space>
          <Space bottom={4}>
            <Text tag="p" size="big">
              Let your clients publish new content independently. Go headless!
            </Text>
          </Space>
          <Space bottom={2}>
            <Button>Try it free</Button>
            <OrDiscover>
              or discover more <img src={arrowDown} />
            </OrDiscover>
          </Space>
          <Text tag="p" size="small">
            No credit card required, 30 seconds sign-up
          </Text>
        </FlexItem>
      </TextContainer>
    </Wrap>
    <MyBrowser>
      <ScreenshotImage src={screenshot} />
    </MyBrowser>
  </Container>
)

export default IndexPage

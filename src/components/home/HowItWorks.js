import React from 'react'
import { Wrap, Space, Button, Text } from '../../components/common'
import Flex, { FlexItem } from 'styled-flex-component'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Browser from '../../components/Browser'

const ColLeft = styled(FlexItem)`
  width: 35%;
`

const ColRight = styled(FlexItem)`
  width: 60%;
`

const Title = styled.div`
  text-transform: uppercase;
  color: ${props => props.theme.color.lightBody};
  font-weight: ${props => props.theme.weight.bold};
  font-size: ${props => props.theme.size.small}px;
  text-align: center;
`

const Label = styled.div`
  color: ${props => props.theme.color.ultraLightBody};
  font-size: ${props => props.theme.size.small}px;
  margin-bottom: 10px;
`

const Input = styled.div`
  border-radius: 10px;
  background: ${props => props.theme.color.smoke};
  padding: 13px;
`

const Code = styled.pre`
  font-family: "Roboto Mono";
  color: white;
  opacity: 0.6;
  font-size: 14px;
`

const HowItWorks = () => (
  <Space both={10}>
    <Wrap>
      <Flex alignStretch justifyBetween>
        <ColLeft>
          <Space bottom={2}>
            <Title>What your editors see:</Title>
          </Space>
          <Browser padded>
            <Space bottom={2}>
              <Label>Title</Label>
              <Input>Harry Potter</Input>
            </Space>
            <Space bottom={2}>
              <Label>Description</Label>
              <Input>A super wizard</Input>
            </Space>
            <Label>Image</Label>
            <Input>Image upload</Input>
          </Browser>
        </ColLeft>
        <ColRight>
          <Space bottom={2}>
            <Title>What developers get:</Title>
          </Space>
          <Browser padded inverse>
            <Space bottom={1}>
              <Code>► curl https://api.datocms.com/site/items/123</Code>
            </Space>
            <Code>
              {
                JSON.stringify({
                  "title": "Harry Potter",
                  "description": "A super wizard",
                  "image": "https://www.datocms-assets.com/harry-potter.png"
                }, null, 4)
              }
            </Code>
          </Browser>
        </ColRight>
      </Flex>
    </Wrap>
  </Space>
)

export default HowItWorks



import React from 'react'
import { Wrap, Space, Button, Text } from '../../components/common'
import Flex, { FlexItem } from 'styled-flex-component'
import styled from 'styled-components'
import Link from 'gatsby-link'

import sidney from '../../images/client-cityofsidney.png'
import flywire from '../../images/client-flywire.png'
import hashicorp from '../../images/client-hashicorp.png'
import policyGenius from '../../images/client-policygenius.png'
import vice from '../../images/client-vice.png'

const Title = styled.div`
  text-transform: uppercase;
  color: ${props => props.theme.color.lightBody};
  font-weight: ${props => props.theme.weight.bold};
  font-size: ${props => props.theme.size.small}px;
  text-align: center;
`

const WhoIsUsing = () => (
  <Wrap>
    <Space both={4}>
      <Space bottom={3}>
        <Title>Who is using DatoCMS</Title>
      </Space>
      <Flex alignCenter justifyBetween>
        {
          [hashicorp, sidney, policyGenius, vice, flywire].map((img, i) => (
            <FlexItem key={i}><img src={img} /></FlexItem>
          ))
        }
      </Flex>
    </Space>
  </Wrap>
)

export default WhoIsUsing


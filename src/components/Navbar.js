import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Flex, { FlexItem } from 'styled-flex-component'
import logo from '../images/logo.svg'
import { Wrap, Space, Button } from '../components/common'

const TextLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  display: block;
  color: ${props => props.theme.color.baseBody};
  padding: 0.8em 1.2em;

  &:hover {
    text-decoration: underline;
  }
`

const Logo = styled(Link)`
  display: inline-block;
  vertical-align: middle;
  width: 56px;
`

const Navbar = () => (
  <Space both={3}>
    <Wrap>
      <Flex alignCenter justifyBetween>
        <FlexItem>
          <Logo to="/"><img src={logo} alt="DatoCMS" /></Logo>
        </FlexItem>
        <FlexItem>
          <Flex justifyAround>
            <FlexItem><TextLink to="/features">Features</TextLink></FlexItem>
            <FlexItem><TextLink to="/use-cases">Use cases</TextLink></FlexItem>
            <FlexItem><TextLink to="/pricing">Pricing</TextLink></FlexItem>
            <FlexItem><TextLink to="/learn">Learn</TextLink></FlexItem>
            <FlexItem><TextLink to="/support">Support</TextLink></FlexItem>
          </Flex>
        </FlexItem>
        <FlexItem>
          <Flex alignCenter>
            <FlexItem><TextLink to="/login">Login</TextLink></FlexItem>
            <FlexItem><Button to="/register">Try it free</Button></FlexItem>
          </Flex>
        </FlexItem>
      </Flex>
    </Wrap>
  </Space>
)

export default Navbar


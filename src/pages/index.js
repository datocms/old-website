import React from 'react'
import { Wrap, Space, Button, Text } from '../components/common'
import Flex, { FlexItem } from 'styled-flex-component'
import styled from 'styled-components'
import Link from 'gatsby-link'

import Hero from '../components/home/Hero'
import WhoIsUsing from '../components/home/WhoIsUsing'
import HowItWorks from '../components/home/HowItWorks'

const IndexPage = () => (
  <div>
    <Hero />
    <WhoIsUsing />
    <HowItWorks />
  </div>
)

export default IndexPage

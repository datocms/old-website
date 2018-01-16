import React from 'react'
import Flex, { FlexItem } from 'styled-flex-component'
import styled from 'styled-components'

const Container = styled.div`
  box-shadow: 0px 14px 25px 0 rgba(0, 0, 0, 0.12);
`

const TitleBar = styled.div`
  background: linear-gradient(244.13deg, #F3F3F3 0%, #F9F9F9 100%);
  border-radius: 10px 10px 0 0;
  padding: 10px 20px;
`

const Button = styled.div`
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: #DFDFDF;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`

const Content = styled.div`
  border-radius: 0 0 3px 3px;
  overflow: hidden;
`

export default ({ children, ...props }) => (
  <Container {...props}>
    <TitleBar>
      <Button />
      <Button />
      <Button />
    </TitleBar>
    <Content>
      { children }
    </Content>
  </Container>
)


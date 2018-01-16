import React from 'react'
import Flex, { FlexItem } from 'styled-flex-component'
import styled from 'styled-components'
import is from 'styled-is'

const Container = styled.div`
  box-shadow: 0px 14px 25px 0 rgba(0, 0, 0, 0.12);
  border-radius: 10px;
`

const TitleBar = styled.div`
  background: ${
    props => (
      props.inverse ?
        props.theme.color.violet :
        'linear-gradient(244.13deg, #F3F3F3 0%, #F9F9F9 100%)'
    )
  };
  border-radius: 10px 10px 0 0;
  padding: 10px 25px;
`

const Button = styled.div`
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: ${
    props => (
      props.inverse ?
        props.theme.color.azure :
        '#DFDFDF'
    )
  };
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`

const Content = styled.div`
  border-radius: 0 0 10px 10px;
  overflow: hidden;

  background: ${
    props => (
      props.inverse ?
        props.theme.color.darkViolet :
        'linear-gradient(180deg, #FCFCFC 0%, #FFFFFF 100%)'
    )
  };

  ${
    is('padded')`
      padding: 25px;
    `
  };
`

export default ({ children, className, ...props }) => (
  <Container className={className} {...props}>
    <TitleBar {...props}>
      <Button {...props} />
      <Button {...props} />
      <Button {...props} />
    </TitleBar>
    <Content {...props}>
      { children }
    </Content>
  </Container>
)


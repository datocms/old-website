import React from 'react'
import { Wrap, Space, Button, Text } from '../../components/common'
import Flex, { FlexItem } from 'styled-flex-component'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Browser from '../../components/Browser'
import Waypoint from 'react-waypoint'
import Typist from 'react-typist'

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
  height: 22px;
  line-height: 24px;
`

const Code = styled.pre`
  font-family: "Roboto Mono";
  color: white;
  opacity: 0.6;
  font-size: 14px;
`

class HowItWorks extends React.Component {
  constructor(props) {
    super(...props);
    this.state = {
      title: false,
      description: false,
      image: false,
      json: {
        id: '123',
        title: '',
        description: ''
      }
    };
  }

  render() {

    const opts = (attr) => ({
      startDelay: 1000,
      avgTypingDelay: 150,
      stdTypingDelay: 80,
      cursor: {
        show: true,
        blink: true,
        element: '|',
        hideWhenDone: true,
        hideWhenDoneDelay: 0,
      },
      onCharacterTyped: (char) => {
        this.setState({
          json: {
            ...this.state.json,
            [attr]: this.state.json[attr] + char,
          }
        })
      }
    })

    return (
      <Space both={10}>
        <Waypoint onEnter={() => this.setState({ title: true })}>
          <Wrap>
            <Flex alignStretch justifyBetween>
              <ColLeft>
                <Space bottom={2}>
                  <Title>What your editors see:</Title>
                </Space>
                <Browser padded>
                  <Space bottom={2}>
                    <Label>Title</Label>
                    <Input>
                      {
                        this.state.title &&
                          <Typist {...opts('title')} onTypingDone={() => this.setState({ description: true })}>
                            Harry Potter
                          </Typist>
                      }
                    </Input>
                  </Space>
                  <Label>Description</Label>
                  <Input>
                    {
                      this.state.description &&
                        <Typist {...opts('description')}>
                          A super wizard
                        </Typist>
                    }
                  </Input>
                </Browser>
              </ColLeft>
              <ColRight>
                <Space bottom={2}>
                  <Title>What developers get:</Title>
                </Space>
                <Browser padded inverse>
                  <Space bottom={1}>
                    <Code>► curl https://site-api.datocms.com/items</Code>
                  </Space>
                  <Code>
                    {
                      JSON.stringify([this.state.json], null, 4)
                    }
                  </Code>
                </Browser>
              </ColRight>
            </Flex>
          </Wrap>
        </Waypoint>
      </Space>
    );
  }
}

export default HowItWorks



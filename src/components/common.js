import React from 'react'
import Link from 'gatsby-link'
import theme from '../utils/theme'

export const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 25px;
`

export const Space = styled.div`
  ${
    is('bottom')`
      margin-bottom: ${props => props.bottom * 15}px;
    `
  };

  ${
    is('top')`
      margin-top: ${props => props.bottom * 15}px;
    `
  };

  ${
    is('both')`
      margin-top: ${props => props.both * 15}px;
      margin-bottom: ${props => props.both * 15}px;
    `
  };
`

export const Button = styled(Link)`
  display: inline-block;
  background: linear-gradient(221.82deg, #FF7059 0%, #FF664E 63.02%, #F2543A 100%);
  box-shadow: 0px 14px 25px 0 rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  color: white;
  text-decoration: none;
  padding: 1.1em 1.2em 1em;
  transition: opacity 200ms ease-in-out;
  font-weight: ${theme.weight.bold};
  vertical-align: middle;
  line-height: 1;

  &:hover {
    opacity: 0.8;
  }
`

const CustomTag = ({ tag = 'p', children, ...otherProps }) => (
  React.createElement(tag, otherProps, children)
)

export const Text = styled(CustomTag)`
  ${
    is('size')`
      font-size: ${props => theme.size[props.size]}px;
      line-height: ${props => theme.lineHeight[props.size]};
    `
  };

  ${
    is('weight')`
      font-weight: ${props => theme.weight[props.weight]};
    `
  };
`


import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import Features from '../components/home/Features'

import './use-cases.sass'

const b = bem.lock('UseCasesPage')

class UseCasesPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Space both="10">
          <div className={b()}>
            <div className={b('title')}>
              Use Cases
            </div>
            <div className={b('content')}>
            </div>
          </div>
        </Space>
      </div>
    );
  }
}

export default UseCasesPage


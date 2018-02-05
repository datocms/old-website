import React from 'react'
import Waypoint from 'react-waypoint'
import Typist from 'react-typist'
import bem from 'utils/bem'

import { wrap, button, Space, text } from 'blocks'
import './style.sass'

import Browser from 'components/Browser'

const wait = (time) => new Promise(resolve => setTimeout(resolve, time))

const b = bem.lock('HomeHowItWorks')

class HomeHowItWorks extends React.Component {
  constructor(props) {
    super(...props)

    this.state = {
      title: false,
      description: false,
      image: false,
      json: {
        id: '123',
        title: '',
        description: '',
        image: ''
      }
    }
  }

  handleStartUpload() {
    this.setState({
      title: false,
      description: false,
      image: false,
      json: {
        id: '123',
        title: '',
        description: '',
        image: ''
      }
    })

    wait(500)
    .then(() => this.setState({ image: 'drop' }))
    .then(() => wait(1500))
    .then(() => this.setState({ image: 'progress' }))
    .then(() => wait(600))
    .then(() => this.setState({ title: true }))
    .then(() => wait(1400))
    .then(() => this.setState({
      image: 'done',
      json: {
        ...this.state.json,
        image: 'https://datocms-assets.com/harry.png'
      }
    }))
  }

  render() {
    const opts = (attr) => ({
      startDelay: 500,
      avgTypingDelay: 30,
      stdTypingDelay: 15,
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
      <Space top={10}>
        <Waypoint onEnter={this.handleStartUpload.bind(this)}>
          <div className={wrap()}>
            <div className={b()}>
              <div className={b('col-left')}>
                <Space bottom="2">
                  <h6 className={b('title')}>
                    What your editors see
                  </h6>
                </Space>
                <Browser padded>
                  <Space bottom="2">
                    <div className={b('label')}>Image</div>
                    <div className={b('image-upload')}>
                      {
                        !this.state.image &&
                          <div className={b('image-upload__placeholder')}>
                            No image uploaded
                          </div>
                      }
                      {
                        this.state.image === 'drop' &&
                          <div className={b('image-upload__placeholder')}>
                            No image uploaded
                            <div className={b('image-upload__file')} />
                          </div>
                      }
                      {
                        this.state.image === 'progress' &&
                          <div className={b('image-upload__placeholder')}>
                            <div className={b('image-upload__progress')} />
                          </div>
                      }
                      {
                        this.state.image === 'done' &&
                          <div className={b('image-upload__placeholder')}>
                            harry.png (524 KB)
                          </div>
                      }
                    </div>
                  </Space>
                  <Space bottom="2">
                    <div className={b('label')}>Title</div>
                    <div className={b('input')}>
                      {
                        this.state.title &&
                          <Typist {...opts('title')} onTypingDone={() => this.setState({ description: true })}>
                            Harry Potter
                          </Typist>
                      }
                    </div>
                  </Space>
                  <div className={b('label')}>Description</div>
                  <div className={b('input')}>
                    {
                      this.state.description &&
                        <Typist {...opts('description')}>
                          A super wizard
                        </Typist>
                    }
                  </div>
                </Browser>
            </div>
              <div className={b('col-right')}>
                <Space bottom="2">
                  <h6 className={b('title')}>
                    What developers get
                  </h6>
                </Space>
                <Browser padded inverse>
                  <Space bottom="1">
                    <div className={b('code')}>
                      ► curl https://site-api.datocms.com/items
                    </div>
                  </Space>
                  <pre className={b('code')}>
                    {
                      JSON.stringify([this.state.json], null, 2)
                    }
                  </pre>
                </Browser>
              </div>
            </div>
          </div>
        </Waypoint>
      </Space>
    );
  }
}

export default HomeHowItWorks



import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Link as ScrollLink, Element } from 'react-scroll'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import slackLogo from 'images/slack.svg'
import Layout from 'components/Layout';

import './slack.sass'

const b = bem.lock('SlackPage')

class SlackPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: null,
      success: null,
      error: null,
      submitting: false,
    };
  }

  componentDidMount() {
    fetch('https://internal.datocms.com/slack/stats')
      .then(r => r.json())
      .then(stats => this.setState({ stats }));

    if (document.getElementById('recaptcha-script')) {
      return Promise.resolve();
    }

    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = 1;
      window.onRecaptchaLoad = () => {
        resolve();
      }
      script.onerror = reject;

      document.body.appendChild(script);
    })
    .then(this.initRecaptcha.bind(this));
  }

  initRecaptcha() {
    this.widget = window.grecaptcha.render(
      'g-recaptcha',
      {
        sitekey: "6LfYOFUUAAAAALO-ClvqdaiXmTfzxpcOkDzlYrHH",
        size: "invisible",
        callback: this.recaptchaCallback.bind(this),
      }
    );
  }

  recaptchaCallback(response) {
    fetch(
      'https://internal.datocms.com/slack/invite',
      {
        method: 'POST',
        body: new FormData(this.form),
      },
    )
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({ success: true, submitting: false });
        } else {
          this.setState({ error: res.error, submitting: false });
        }
      })
      .catch(() => this.setState({ submitting: false }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, error: null });
    window.grecaptcha.reset(this.widget);
    window.grecaptcha.execute(this.widget);
  }

  render() {
    const { data } = this.props;
    const { stats, error, success, submitting } = this.state;

    return (
      <Layout>
        <Space both="8">
          <Wrap>
            <div className={b()}>
              <div className={b('logo')}>
                <img src={slackLogo} alt="Slack" />
              </div>
              <div className={b('title')}>
                Join DatoCMS on Slack
              </div>
              <div className={b('content')}>
                Become a part of DatoCMS community, try out new product updates
                before they're widely released, help us test and improve the product!
              </div>
              <div className={b('form')}>
                {
                  success &&
                    <div className={b('success')}>
                      <div className={b('success__title')}>
                        Awesome, welcome on board! 🎉
                      </div>
                       Check your email for the invitation!
                    </div>
                }
                {
                  error &&
                    <div className={b('error')}>
                      {
                        error === 'already_invited' ?
                          <span>
                            You have already been invited to Slack! Check for an email from feedback@slack.com.
                          </span>
                          :
                          <span>
                            {error}
                          </span>
                      }
                    </div>
                }
                {
                  success === null &&
                    <div>
                      <form ref={el => this.form = el} onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                          <input name="email" type="email" placeholder="you@yourdomain.com" />
                        </div>
                        <div>
                          <button
                            className="button button--red button--normal-big button--expand"
                            disabled={submitting}
                          >
                            Get my invite
                          </button>
                          <div id="g-recaptcha" />
                        </div>
                      </form>
                      {
                        stats &&
                          <div className={b('stats')}>
                            <strong>{stats.active}</strong> users online now of <strong>{stats.total}</strong> registered
                          </div>
                      }
                    </div>
                }
              </div>
            </div>
          </Wrap>
        </Space>
      </Layout>
    );
  }
}

export default SlackPage

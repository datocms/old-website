import React from 'react';
import Slider from 'react-slick';
import Img from 'gatsby-image';

import './style.sass';
import 'slick-carousel/slick/slick.css';

import bem from 'utils/bem';

const b = bem.lock('HomeQuotes');

const settings = {
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '20px',
  infinite: true,
  responsive: [
    {
      breakpoint: 500,
      settings: {
        centerPadding: '30px',
      },
    },
    {
      breakpoint: 600,
      settings: {
        centerPadding: '100px',
      },
    },
    {
      breakpoint: 750,
      settings: {
        centerPadding: '130px',
      },
    },
    {
      breakpoint: 950,
      settings: {
        centerPadding: '170px',
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        centerPadding: '30px',
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        centerPadding: '70px',
      },
    },
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 5,
        centerPadding: '30px',
      },
    },
    {
      breakpoint: 9600,
      settings: {
        slidesToShow: 5,
        centerPadding: '160px',
      },
    },
  ],
};

const HomeQuotes = ({ data }) => (
  <div className={b()}>
    <h6 className={b('title')}>People are saying</h6>
    <div className={b('slider')}>
      <Slider {...settings}>
        {data.map(card => (
          <div key={card.id} className={b('card')}>
            <div className={b('card-inner')}>
              <div className={b('card-header')}>
                <div className={b('card-avatar')}>
                  {card.image && <Img fluid={card.image.fluid} />}
                </div>
                <div className={b('card-header-body')}>
                  <div className={b('card-header-name')}>{card.name}</div>
                  <a href={card.website} className={b('card-header-role')}>
                    {card.role}
                  </a>
                </div>
              </div>
              <div
                className={b('card-body')}
                dangerouslySetInnerHTML={{ __html: card.quote.markdown.html }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
);

export default HomeQuotes;

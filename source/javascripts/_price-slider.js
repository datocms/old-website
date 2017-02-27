var rangeSlider = require("rangeslider-pure");
var Tween = require( "properjs-tween" );

var slider = document.querySelector('input[type="range"]');

function refresh(value) {
  document.querySelector(".pricing__range__sites").innerText = value + " site" + (value > 1 ? "s" : "");
  var discount = parseInt(easeOutCubic((value - 1) / 99.0) * 100.0 * 0.6);
  document.querySelector(".pricing__range__discount").innerText = discount + "% discount";
  [].forEach.call(document.querySelectorAll("[data-price]"), function(el) {
    var newPrice = parseInt(el.getAttribute('data-price') * (1.0 - discount / 100.0));
    if (newPrice === 0) {
    } else {
      el.innerText = newPrice;
    }
  });
}

rangeSlider.create(
  slider,
  {
    polyfill: true,     // Boolean, if true, custom markup will be created
    rangeClass: 'range-slider',
    disabledClass: 'range-slider--disabled',
    fillClass: 'range-slider__fill',
    bufferClass: 'range-slider__buffer',
    handleClass: 'range-slider__handle',
    startEvent: ['mousedown', 'touchstart', 'pointerdown'],
    moveEvent: ['mousemove', 'touchmove', 'pointermove'],
    endEvent: ['mouseup', 'touchend', 'pointerup'],
    min: 1,
    max: 100,
    value: 1,
    borderRadius: 10,
    onSlide: refresh
  }
);

function easing(pos) {
  if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
  return -0.5 * ((pos-=2)*pos - 2);
}

function easeOutCubic(t) {
  return (--t)*t*t+1;
}

new Tween({
  from: 1,
  to: 50,
  update: function (t) {
    slider.rangeSlider.update({ value: parseInt(t) });
    refresh(parseInt(t));
  },
  complete: function ( t ) {
    new Tween({
      from: 50,
      to: 1,
      update: function (t) {
        slider.rangeSlider.update({ value: parseInt(t) });
        refresh(parseInt(t));
      },
      complete: function ( t ) {
      },
      ease: easing,
      delay: 0
    });
  },
  ease: easing,
  delay: 1000
});

refresh(1);

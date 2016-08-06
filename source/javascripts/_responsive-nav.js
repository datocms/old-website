var offside = require("offside-js");

window.offside = offside;

offside('.canvas-nav', {
  slidingElementsSelector: '#sliding-content',
  buttonsSelector: "[data-behaviour='hamburger-handle']",
});

document.querySelector('.side-overlay').addEventListener(
  'click',
  window.offside.factory.closeOpenOffside
);


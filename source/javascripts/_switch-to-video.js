[].forEach.call(document.querySelectorAll("[data-behaviour='switch-to-video']"), function(el) {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    var id = el.getAttribute('data-youtube-id');
    el.innerHTML = '<iframe width="' + el.offsetWidth + '" height="' + el.offsetHeight + '" src="https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>';
  });
});


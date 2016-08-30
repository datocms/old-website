var elementsToShow = document.cookie.match(/isSignedIn/) ?
  "[role=dashboard-link]" :
  "[role=sign-in-link], [role=register-link]";

[].forEach.call(document.querySelectorAll(elementsToShow), function(el) {
  el.removeAttribute("style");
});

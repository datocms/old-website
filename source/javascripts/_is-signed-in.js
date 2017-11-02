var getCookie = function(name) {
  match = document.cookie.match(new RegExp(name + '=([^;]+)'));
  if (match) return match[1];
}

var accountEmail = getCookie('datoAccountEmail');

var elementsToShow = accountEmail ?
  "[role=dashboard-link], [role=account-email]" :
  "[role=sign-in-link], [role=register-link]";

[].forEach.call(document.querySelectorAll(elementsToShow), function(el) {
  el.removeAttribute("style");
});

if (accountEmail) {
  [].forEach.call(document.querySelectorAll("[role=account-email]"), function(el) {
    el.innerText = accountEmail;
  });
}

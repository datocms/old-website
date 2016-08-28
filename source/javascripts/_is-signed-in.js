var iframe = document.createElement("iframe");
var dashboardBaseUrl = "https://dashboard.datocms.com";

iframe.setAttribute("src", "http://127.0.0.1:3000/");
iframe.style.width = "1px";
iframe.style.height = "1px";
iframe.style.opacity = "0";
document.body.appendChild(iframe);

iframe.onload = function() {
  iframe.contentWindow.postMessage(
    JSON.stringify({ "command": "isSignedIn" }),
    dashboardBaseUrl
  );
};

window.addEventListener("message", function(e) {
  var origin = e.origin || e.originalEvent.origin;

  if (origin !== dashboardBaseUrl) {
    return;
  }

  var message = JSON.parse(e.data);

  if (message.command === "isSignedInReply") {
    console.log(message.value);

    var elementsToShow = message.value ?
      "[role=dashboard-link]" :
      "[role=sign-in-link], [role=register-link]";

    [].forEach.call(document.querySelectorAll(elementsToShow), function(el) {
      el.removeAttribute("style");
    });
  }

  iframe.parentNode.removeChild(iframe);
}, false);

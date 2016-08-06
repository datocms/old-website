var configurator = document.querySelector("[data-behaviour='configurator']");

if (configurator) {
  var configuration = {};
  var options = {};

  [].forEach.call(configurator.querySelectorAll("[data-behaviour='change-stack']"), function(el) {
    var key = el.getAttribute("data-key");
    var value = JSON.parse(el.getAttribute("data-value"));
    options[key] = options[key] || {};
    options[key][value.name] = value;

    if (el.classList.contains("is-selected")) {
      configuration[key] = value.name;
    }
  });

  function apply() {
    for (var key in configuration) {
      [].forEach.call(configurator.querySelectorAll("[data-role='" + key + "']"), function(el) {
        var valueKey = el.getAttribute("data-key") || "name";
        var inject = el.getAttribute("data-inject") || "innerHTML";
        if (inject === "innerHTML") {
          el.innerHTML = options[key][configuration[key]][valueKey];
        } else {
          el.setAttribute(inject, options[key][configuration[key]][valueKey]);
        }
      });
      [].forEach.call(configurator.querySelectorAll("[data-behaviour='change-stack'][data-key='" + key + "']"), function(el) {
        var value = JSON.parse(el.getAttribute("data-value")).name;
        el.classList.remove("is-selected");
        if (value === configuration[key]) {
          el.classList.add("is-selected");
        }
      });
    }
  }

  [].forEach.call(configurator.querySelectorAll("[data-behaviour='change-stack']"), function(el) {
    el.addEventListener("click", function(e) {
      e.preventDefault();
      var key = el.getAttribute("data-key");
      var value = JSON.parse(el.getAttribute("data-value")).name;
      configuration[key] = value;
      apply();
    });
  });

  apply();
}


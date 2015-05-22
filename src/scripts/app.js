(function () {
  "use strict";

  var qs = document.querySelector.bind(document);

  qs('.start-pomodoro').addEventListener('click', function () {
    alert("pomodoro started!");
  });

  qs('.start-short-break').addEventListener('click', function () {
    alert("short break started!");
  });

  qs('.start-long-break').addEventListener('click', function () {
    alert("long break started!");
  });

})();

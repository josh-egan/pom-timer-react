(function(){
    "use strict";

    var app = {};

    app.startPomodoro = function(){
        alert("pomodoro started!");
    };

    app.startShortBreak = function(){
        alert("short break");
    };

    app.startLongBreak = function(){
        alert("long break");
    };

    window.app = app;
})();


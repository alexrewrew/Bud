/**
 * Created by alexrewrew on 09.09.17.
 */

$(document).ready(function () {
    "use strict";

    var clock = $('#counter').FlipClock(1, {
        clockFace: 'Counter',
        countdown: true,
        minimumDigits: 6
    });

    setTimeout(function() {
        setInterval(function() {
            clock.increment();
        }, 3000);
    })

});
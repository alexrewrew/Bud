/**
 * Created by alexrewrew on 09.09.17.
 */

$(document).ready(function () {
    "use strict";

    var url = "https://script.google.com/macros/s/AKfycbwfhBk8oMHAn5Vrjcje6t5HI0raeNs05VqvybEkN0TmUqypuRI/exec",
        clock,
        current = 0;

    FB.init({
        appId: '2253326001359487',
        version: 'v2.3'
    });

    $.ajax({
        type: "POST",
        data: {},
        url: url,
        dataType: "json",
        success: function (data) {
            if (data) {
                var real = data['Реальна кількість'],
                    total = data['Додана кількість'],
                    all = real + total;

                current = all;

                clock = $('#counter').FlipClock(all, {
                    clockFace: 'Counter',
                    countdown: true,
                    minimumDigits: 6
                });
            }
        }
    });

    setInterval(function () {
        $.ajax({
            type: "POST",
            data: {},
            url: url,
            dataType: "json",
            success: function (data) {
                if (data) {
                    var real = data['Реальна кількість'],
                        total = data['Додана кількість'],
                        all = real + total;

                    if (all > current) {
                        var diff = all - current;

                        current = all;

                        for (var i = 0; i < diff; i++) {
                            clock.increment();
                        }
                    }
                }
            }
        });
    }, 15000);

    $(".button").on('click', function (event) {
        FB.ui({
                method: 'share',
                mobile_iframe: false,
                display: 'popup',
                href: window.location.href,
            },
            function (response) {
                if (response && !response.error_code) {
                    clock.increment();

                    current++;

                    $.ajax({
                        type: "GET",
                        data: {},
                        url: url,
                        dataType: "json",
                        success: function () {
                            //success function
                        }
                    });
                }
            });
        event.preventDefault();
    });
});
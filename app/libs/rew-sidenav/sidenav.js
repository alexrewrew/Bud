$(window).on("load resize", function () {
    "use strict";
    if (window.matchMedia("(max-width: 767px)").matches) {
        $("nav").prependTo("body");
        $(".nav-panel").prependTo("body");
    } else {
        $("nav").prependTo("header");
        $(".nav-panel").appendTo("nav .container .row");
    }
});

$(document).ready(function () {
    "use strict";
    $('#menu-trigger').click(function (e) {
        e.preventDefault();
        $(this).toggleClass("open");
        $("body").toggleClass("open");

        if ($(this).hasClass('open')) {
            disableScroll();
        } else {
            enableScroll();
        }
    });

    $("main").click(function () {
        if ($('body').hasClass("open")) {
            $('body').toggleClass("open");
            $("#menu-trigger").toggleClass("open");
            enableScroll();
        }
    });

    $(".dropdown-link").click(function (e) {
        e.preventDefault();
    });

    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) { // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    if (window.matchMedia("(max-width: 767px)").matches) {

        $(".smooth").click(function () {
            $("body").toggleClass("open");
            $("#menu-trigger").toggleClass("open");
            enableScroll();
        });

        //new
        $(".dropdown").click(function (e) {
            if ($(this).hasClass('active')) {
                $('.dropdown').removeClass('active');
            } else {
                $('.dropdown').removeClass('active');
                $(this).addClass('active');
            }
        });

    } else if (window.matchMedia("(min-width: 768px)").matches) {
        //new
        $(".dropdown").hover(function () {
            $(this).toggleClass('active');
        });
    }
});
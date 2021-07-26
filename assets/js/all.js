(function ($) {
    ("use strict");

    //закрывает меню боковой панели
    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
        $(this).toggleClass("active");
    });

    //Плавная прокрутка с помощью jQuery и ослабления
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });
    $("#sidebar-wrapper .js-scroll-trigger").click(function () {
        $("#sidebar-wrapper").removeClass("active");
        $("menu-toggle").removeClass("active");
        $(".menu-toggle > fa.bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    });

    $(document).scroll(function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $(".scroll-to-top").fadeIn();
        } else {
            $(".scroll-to-top").fadeOut();
        }
    });
})(jQuery);

year = new Date().getFullYear();
anyear = year - 1;
document.getElementById("mentions").innerHTML = "&copy; " + anyear + " - " + year + " par Mickey01";

function Uptime() {
    var start = new Date("June 27, 2021 16:35:00");
    var uptime = new Date() - start;
    document.getElementById("uptime").innerHTML =
        '<a class="js-scroll-trigger" id="uptime" style="color: #dc3545!important;" href="pages/search/">--- Uptime : ' +
        Math.floor(uptime / (1000 * 60 * 60 * 24)) +
        ":" +
        Math.floor((uptime / (1000 * 60 * 60)) % 24) +
        ":" +
        Math.floor((uptime / 1000 / 60) % 60) +
        ":" +
        Math.floor((uptime / 1000) % 60) +
        " ---</a>";
    setTimeout("Uptime()", 1000);
}

Uptime();

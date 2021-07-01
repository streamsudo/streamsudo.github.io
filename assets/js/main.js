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

const baseurl = "https://streamsudo.github.io/";

const Info = async () => {
    url = "assets/index.json";
    if (typeof url === "undefined") {
        console.log("Aucune url définie...");
    } else {
        var response = await window.fetch(url);
        if (response.ok) {
            var data = await response.json();
            return data;
        } else {
            console.error("503 timeout ???");
            console.log("Impossible d'obtenir des infos sur le film : (" + response.url + ")...");
        }
    }
};

function loadInfo() {
    (async () => {
        const info = await Info();
        for (var i = 0; i < info.data.length; i++) {
            var data = info.data[i];
            var g = i + 1;
            if (g % 2 != 0) {
                document.getElementById("newsposter").innerHTML += '<div class="col-lg-4 col-md-6"> <div class="row" id="news-' + String(i) + '"> </div> </div>';
            }
            if (g % 2 === 0) {
                document.getElementById("news-" + String(i - 1)).innerHTML += '<div class="col-6"> <a href="' + baseurl + "pages/video/#" + String(i) + '"><img src="' + baseurl + data.poster + '" /></a> </div>';
            } else {
                document.getElementById("news-" + String(i)).innerHTML += '<div class="col-6"> <a href="' + baseurl + "pages/video/#" + String(i) + '"><img src="' + baseurl + data.poster + '" /></a> </div>';
            }
        }
    })();
}

function loadPop() {
    (async () => {
        const info = await Info();
        for (var i = 0; i < info.data.length; i++) {
            var xhr = new XMLHttpRequest();
            var current = baseurl + String(i);
            if (current.includes("http://") == true) {
                current = current.replace("http://", "");
            }
            if (current.includes("https://") == true) {
                current = current.replace("https://", "");
            }
            var current = current.replace("/", "");
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", "https://api.countapi.xyz/hit/" + current + "/visits", false);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        var allText = rawFile.responseText;
                        var data = allText.split("\n");
                        data = JSON.parse(data[0]);
                        localStorage.setItem("film-" + i, data.value + "#" + String(i));
                    }
                }
            };
            rawFile.send(null);
        }
        var score = "";
        for (var i = 0; i < info.data.length; i++) {
            score += localStorage.getItem("film-" + i);
            score += ",";
        }
        score = score.split(",", info.data.length);
        score = score.sort();
        score = String(score);
        score = String(score.split("#"));
        score = score.split(",");
        var pop = "";
        for (var i = 0; i < score.length; i++) {
            if (i % 2) {
                pop += score[i];
                pop += ",";
                localStorage.setItem("popularity", pop);
            }
        }
        for (var i = 0; i < 12; i++) {
            var sscore = localStorage.getItem("popularity");
            sscore = sscore.split(",", info.data.length);
            var data = info.data[sscore[i]];
            var g = i + 1;
            if (g % 2 != 0) {
                document.getElementById("popposter").innerHTML += '<div class="col-lg-4 col-md-6"> <div class="row" id="pop-' + String(i) + '"> </div> </div>';
            }
            if (g % 2 === 0) {
                document.getElementById("pop-" + String(i - 1)).innerHTML += '<div class="col-6"> <a href="' + baseurl + "pages/video/#" + String(sscore[i]) + '"><img src="' + baseurl + data.poster + '" /></a> </div>';
            } else {
                document.getElementById("pop-" + String(i)).innerHTML += '<div class="col-6"> <a href="' + baseurl + "pages/video/#" + String(sscore[i]) + '"><img src="' + baseurl + data.poster + '" /></a> </div>';
            }
            localStorage.removeItem("film-" + i);
        }
        localStorage.removeItem("popularity");
    })();
}

loadPop();

function loadHistory() {
    (async () => {
        const info = await Info();
        for (var i = 0; i < info.data.length; i++) {
            var data = info.data[i];
            var g = i + 1;
            var history = localStorage.getItem("history-" + i);
            if (history != undefined) {
                if (g % 2 != 0) {
                    document.getElementById("mesfilms").innerHTML += '<div class="col-lg-4 col-md-6"> <div class="row" id="history-' + String(i) + '"> </div> </div>';
                }
                if (g % 2 === 0) {
                    document.getElementById("history-" + String(i - 1)).innerHTML += '<div class="col-6"> <a href="' + baseurl + "pages/video/" + String(history) + '"><img src="' + baseurl + data.poster + '" /></a> </div>';
                } else {
                    document.getElementById("history-" + String(i)).innerHTML += '<div class="col-6"> <a href="' + baseurl + "pages/video/" + String(history) + '"><img src="' + baseurl + data.poster + '" /></a> </div>';
                }
            }
        }
    })();
}

loadHistory();

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

function pause() {
    var playing = document.getElementsByClassName("vjs-play-control vjs-control vjs-button vjs-playing")["0"];
    if (playing != undefined) {
        playing.click();
    }
}

function trailer() {
    var trailer = document.querySelector(".trailer");
    trailer.classList.toggle("active");
}

function closetrailer() {
    var trailer = document.querySelector(".trailer");
    trailer.classList.toggle("active");
    pause();
}

function film() {
    var trailer = document.querySelector(".film");
    trailer.classList.toggle("active");
}

function closefilm() {
    var trailer = document.querySelector(".film");
    trailer.classList.toggle("active");
}

const baseurl = "https://streamsudo.github.io/";
const baseytb = "https://www.youtube.com/watch?v=";
const baseplayer = "https://ninjastream.to/watch/";

const Info = async () => {
    url =  "../../assets/index.json";
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
        var i = location.hash.replace("#", "");
        var i = parseInt(i);
        var data = info.data[i];
        document.title = data.name + " - StreamSudo";
        document.querySelector('meta[name="description"]').setAttribute("content", data.synopsis);
        document.getElementsByClassName("banner")[0].style.background = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(" + baseurl + data.background + ")";
        document.getElementById("film_name").innerHTML = data.name;
        document.getElementById("synopsis").innerHTML = data.synopsis;
        videojs("trailer", { techOrder: ["youtube"], plugins: { videoJsResolutionSwitcher: { default: "hight" } }, poster: baseurl + data.background, sources: [{ type: "video/youtube", src: baseytb + data.trailer_url }] });
        document.getElementById("filmplayer").setAttribute("src", baseplayer + data.film_url);
    })();
}

function clicked() {
    var xhr = new XMLHttpRequest();
    var num = window.location.href.split("#")[1];
    var current = baseurl + num;
    if (current.includes("http://") == true) {
        var current = current.replace("http://", "");
    }
    if (current.includes("https://") == true) {
        var current = current.replace("https://", "");
    }
    var current = current.replace("/", "");
    xhr.open("GET", "https://api.countapi.xyz/hit/" + current + "/visits");
    xhr.responseType = "json";
    xhr.send();
}

clicked();

function history() {
    var url = baseurl + location.hash;
    var film = location.hash.replace("#", "");
    localStorage.setItem("history-" + film, location.hash);
}

history();

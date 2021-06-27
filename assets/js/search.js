const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

const baseurl = "https://streamsudo.github.io/pages/video/";

const Info = async () => {
    url = "../../assets/index.json";
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

function loadSuggests() {
    (async () => {
        const info = await Info();
        //Если пользователь нажимает любую клавишу и отпустите
        inputBox.onkeyup = (e) => {
            let userData = e.target.value; //Пользователь введен данные
            let emptyArray = [];
            if (userData) {
                icon.onclick = () => {
                    var search = document.getElementById("searchfilms").value;
                    for (var i = 0; i < 1; i++) {
                        var li = document.getElementById("autocom-box").getElementsByTagName("li")[i].outerText;
                        if (search === li) {
                            var filmurl = document.getElementById("autocom-box").getElementsByTagName("li")[i].getAttribute("onclick");
                            linkTag.setAttribute("onclick", filmurl);
                            linkTag.click();
                        }
                    }
                };
                var name = "";
                for (var i = 0; i < info.data.length; i++) {
                    var data = info.data[i];
                    name += data.name;
                    name += ",";
                }
                name = name.split(",", info.data.length);
                let suggestions = name;
                emptyArray = suggestions.filter((data) => {
                    //Фильтрация значений массива и пользовательских символов в нижний регистр и возврат только те слова, которые начнутся с элементов Eneted Chars
                    return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                });
                emptyArray = emptyArray.map((data) => {
                    //Передача данных возврата внутри li tag
                    return (data = `<li style="cursor: pointer;">${data}</li>`);
                });
                searchWrapper.classList.add("active"); //Показать автозаполную коробку
                showSuggestions(emptyArray);
                let allList = suggBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    //Добавление атрибута onclick во всех li tag
                    var li = document.getElementById("autocom-box").getElementsByTagName("li")[i].outerText;
                    var newurl = baseurl + "#" + suggestions.indexOf(li);
                    allList[i].setAttribute("onclick", "window.location.replace('" + newurl + "');");
                }
            } else {
                searchWrapper.classList.remove("active"); //Скрыть автозаполную коробку
            }
        };
    })();
}

loadSuggests();

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        listData = "<li>Aucun résultat trouvé</li>";
    } else {
        listData = list.join("");
    }
    suggBox.innerHTML = listData;
}

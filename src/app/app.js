"use strict";
// global variables
let paletteData;
let nasaImageUrl;
let europeanaImageUrl;
const nasaImage = document.getElementById("nasaImage");
const europeanaImage = document.getElementById("europeanaImage")
const searchInput = document.getElementById("newdate");


// code to restrict datepicker to right dates
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
}
if(mm<10){
    mm='0'+mm
}

today = yyyy+'-'+mm+'-'+dd;
// document.getElementById("newdate").setAttribute("max", today);



// nasa callback
async function nasaCallback (
    url="https://api.nasa.gov/planetary/apod?api_key=noKEd19KRPwQHM1gyHcNkpMviSw2xmzlOfH1TXvP&count=1")
{
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });
    nasaImageUrl =  await response.json();
    if (nasaImageUrl[0].media_type == "video") {
        nasaImageUrl = nasaCallback();
    }
    nasaImageUrl = nasaImageUrl[0].url;
    nasaImage.src = nasaImageUrl;
}

async function europeanaCallback (
    url="https://api.europeana.eu/record/v2/search.json?&media=true&profile=standard&query=*&rows=1000&start=1&wskey=orystoplin&colourpalette=%23FFE4C4") {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });
    europeanaImageUrl = (await response.json())
    europeanaImageUrl = europeanaImageUrl["items"][5]["edmIsShownBy"];
    europeanaImage.src = europeanaImageUrl;
};

// nasa after date picking
async function nasaDATE (
    url="https://api.nasa.gov/planetary/apod?api_key=noKEd19KRPwQHM1gyHcNkpMviSw2xmzlOfH1TXvP&count=1")
{
    let datum = searchInput;
    let realurl = "https://api.nasa.gov/planetary/apod?api_key=noKEd19KRPwQHM1gyHcNkpMviSw2xmzlOfH1TXvP&date=" + datum;
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });
    nasaImageUrl =  await response.json();
    if (nasaImageUrl[0].media_type == "video") {
        nasaImageUrl = nasaCallback();
    }
    nasaImageUrl = nasaImageUrl[0].url;
    nasaImage.src = nasaImageUrl;
}



// Backend button logic

// backend callback
// --- define logic ---
async function postJson (url="", data={}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data) // from JSON to string
    });
    return await response.json();
};

const getPaletteButtonCallback = () => {
    postJson("http://127.0.0.1:8000/", {
        "nasaImageUrl": nasaImageUrl
    })
    .then(data => paletteData = data);
};



// --- cast logic ---
document.getElementById("test").onclick = getPaletteButtonCallback;

//---colors---
color1= '#ee82ee'

let boxOne = document.getElementById("square1");
boxOne.style.background = color1

let boxTwo = document.getElementById("square2");
boxTwo.style.background = '#000000'


let box3 = document.getElementById("square3");
box3.style.background = '#989898'

let boxFour = document.getElementById("square4");
boxFour.style.background = '#838996'

let boxFive = document.getElementById("square5");
boxFive.style.background = '#838996'

let boxSix = document.getElementById("square6");
boxSix.style.background = '#838996'


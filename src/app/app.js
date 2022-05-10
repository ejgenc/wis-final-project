"use strict";

// --- NASA image card ---  //
// handling date picker logic
(() => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd<10) {
        dd='0'+dd
    };
    if (mm<10) {
        mm='0'+mm
    };

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("datePicker").setAttribute("max", today); // set max
    document.getElementById("datePicker").setAttribute("value", today); // set today
})();

// get nasa image
const getParameters = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
};

async function getNasaImage (date) {
    let nasaImageUrl;
    const button = document.getElementById('getcolorbutton') //this will help enable the next button
    button.disabled = false;
    const nasaImage = document.getElementById("nasaImage");

    let baseUrl = "https://api.nasa.gov/planetary/apod?api_key=noKEd19KRPwQHM1gyHcNkpMviSw2xmzlOfH1TXvP";
    let addition;

    if (date === "random") {
        addition =  "&count=1";
    } else {
        addition = ("&date=" + date);
    }
    let url = baseUrl + addition;

    const response = await fetch(url, getParameters);
    nasaImageUrl =  await response.json();
    
    if (Array.isArray(nasaImageUrl)) {
        nasaImageUrl = nasaImageUrl[0];
    }

    if (nasaImageUrl.media_type == "video") {
        nasaImageUrl = getNasaImage();
    }
    nasaImageUrl = nasaImageUrl.url;
    nasaImage.src = nasaImageUrl;
};

async function randomButtonCallback () {
    getNasaImage("random");
};

async function searchButtonCallback () {
    const searchDate = document.getElementById("datePicker").value; // dynamically get date
    getNasaImage(searchDate);
};

// get palette data 
let paletteData;
const getPaletteButtonCallback = async () => {
    const buttoncolor = document.getElementById('colorbutton') //this will help enable the next button
    buttoncolor.disabled = false;
    const button = document.getElementById('europeanabutton') //this will help enable the next button
    button.disabled = false;
    await getPalette();
    await updatePaletteSquares();
};

const getPalette = async () => {
    const nasaImageUrl = document.getElementById("nasaImage").src;
    const response = await fetch ("https://wis-final-project.herokuapp.com/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({"nasaImageUrl": nasaImageUrl})
    });
    // paletteData = JSON.parse((await response.json()).replaceAll("\'", "\""));
    paletteData = JSON.parse(await response.json())
};


// --- Palette row --- //
const updatePaletteSquares = async () => {
    const paletteSquares = document.getElementsByClassName("paletteSquare");
    for (let i = 0; i < paletteData["raw_palette"].length; i++) {
        paletteSquares[i].style.background = paletteData["raw_palette"][i];
    }
};


// --- Europeana image card --- //
async function getEuropeanaImage () {
    let searchUrl = "https://api.europeana.eu/record/v2/search.json?&media=true&profile=standard&query=painting&rows=1000&start=1&wskey=orystoplin&colourpalette="
    for (let color of paletteData["europeana_palette"]) {
        searchUrl += "%23" + color.substring(1, color.length);
    }

    const response = await fetch(searchUrl, getParameters);
    let europeanaImageUrl = await response.json()
    europeanaImageUrl = europeanaImageUrl["items"][Math.round(Math.random(0, 100)*100)]["edmIsShownBy"];

    const europeanaImage = document.getElementById("europeanaImage");
    europeanaImage.src = europeanaImageUrl;
};

async function europeanaButtonCallback () {
    getEuropeanaImage();
};

// --- what happens onload? --- //


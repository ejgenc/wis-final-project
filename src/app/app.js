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
    let nasaImageMetadata;
    document.getElementById('getPaletteButton').disabled = false ;//this will help enable the next button
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
    nasaImageMetadata =  await response.json();
    
    if (Array.isArray(nasaImageMetadata)) {
        nasaImageMetadata = nasaImageMetadata[0];
    }

    if (nasaImageMetadata.media_type !== "image") {
        nasaImageMetadata = getNasaImage("random");
    }
    nasaImage.src = nasaImageMetadata.url;
    document.getElementById("datePicker").value = nasaImageMetadata.date;
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
    await getPalette();
    await updatePaletteSquares(paletteData["raw_palette"]);
};

const getPalette = async () => {
    const nasaImageUrl = document.getElementById("nasaImage").src;
    // const response = await fetch ("https://wis-final-project.herokuapp.com/", {
    const response = await fetch("http://127.0.0.1:8000/", {
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
    paletteData = JSON.parse((await response.json()).replaceAll("\'", "\""));
};


const updatePaletteSquares = async (palette) => {
    const paletteSquares = document.getElementsByClassName("paletteSquare");
    for (let i = 0; i < palette.length; i++) {
        paletteSquares[i].style.background = palette[i];
        paletteSquares[i].title = palette[i];
    }
};


// --- copy to clipboard --- //
async function copyToClipboard() {
    let content;
    if (!paletteData) {
        content = initialPalette;
    } else {
        content = paletteData["raw_palette"];
    }
    navigator.clipboard.writeText(content)
        .then(() => {
            console.log("Text copied to clipboard...")
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })
}

// --- Europeana image card --- //
window.onclick = e => {
    if (e.target.className === "paletteSquare") {
        getEuropeanaImage(e.target.title);
    }
} 
async function getEuropeanaImage (color) {
    let searchUrl = 'https://api.europeana.eu/record/v2/search.json?media=true&profile=rich&query=painting&qf=DATA_PROVIDER%3A"Rijksmuseum"&rows=100&start=1&sort=random+asc&theme=art&wskey=orystoplin'
    searchUrl += "&colourpalette=%23" + color;

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
const initialPalette = ["#444140", "#27262b", "#aea68e", "#777aa9", "#535568", "#6f6247"];
updatePaletteSquares(initialPalette);

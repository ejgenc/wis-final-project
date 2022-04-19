console.log("app.js imported!");

// global variables
let paletteData;
let nasaImageUrl;
const nasaImage = document.getElementById("nasaImage");

// nasa callback
async function nasaCallback (
    url="https://api.nasa.gov/planetary/apod?api_key=noKEd19KRPwQHM1gyHcNkpMviSw2xmzlOfH1TXvP&count=1") {
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
    postJson("https://wis-final-project.herokuapp.com", {
        "nasaImageUrl": nasaImageUrl
    })
    .then(data => paletteData = data);
};

// --- cast logic ---
document.getElementById("test").onclick = getPaletteButtonCallback;

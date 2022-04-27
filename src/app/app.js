console.log("app.js imported!");
const searchInput = document.getElementById("newdate");
console.log(searchInput);


// global variables
let paletteData;
let nasaImageUrl;
const nasaImage = document.getElementById("nasaImage");

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



// nasa after date picked
async function nasaDATE (
    url="https://api.nasa.gov/planetary/apod?api_key=noKEd19KRPwQHM1gyHcNkpMviSw2xmzlOfH1TXvP&count=1") {
    console.log(searchInput);
    console.log("yes");
    let searcheddate = searchInput.value;
    const realurl = url + String(searcheddate)
    realurl = url+ str
    const response = await fetch(realurl, {
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




async function seperatecolors (data) {


}


// --- cast logic ---
document.getElementById("test").onclick = getPaletteButtonCallback;




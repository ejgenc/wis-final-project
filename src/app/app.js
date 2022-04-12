console.log("app.js imported!");

let testPaletteData;

// I am using this section to test out some stuff, please do not erase :) 
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
        "nasaUrl":"https://apod.nasa.gov/apod/image/1310/velafilaments_jadescope_960.jpg"
    })
    .then(data => testPaletteData = data);
};

// --- cast logic ---
document.getElementById("test").onclick = getPaletteButtonCallback;

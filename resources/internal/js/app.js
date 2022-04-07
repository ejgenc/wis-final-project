console.log("app.js imported!");

let testPaletteData;

// I am using this section to test out some stuff, please do not erase :) 
// define logic
async function postData (url="", data={}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
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
    postData("http://127.0.0.1:8000", {"url":"test"})
    .then(data => testPaletteData = data);
};

// cast logic
document.getElementById("test").onclick = getPaletteButtonCallback;

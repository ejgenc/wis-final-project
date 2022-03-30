console.log("sketch.js imported!");

// --- Sketch setup & canvas behavior --//
function setup () {
    let canvas_width = document.getElementById("canvas").clientWidth;
    let cnv = createCanvas(canvas_width, 520, P2D);
    cnv.parent("canvas");
    cnv.style("display", "block");

}

function windowResized() {
    // --- Canvas resizing & responsiveness ---
    var canvas_width = document.getElementById("canvas").clientWidth;
    resizeCanvas(canvas_width, 500);
}

// --- Actual sketch ---//
function draw() {
    background(0, 0, 0);
    circle(width/2, height/2, 50)
}


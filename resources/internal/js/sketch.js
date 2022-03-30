console.log("sketch.js imported!");

// Hey AC!
// So, what I've done here is I have written some code so that you have a responsive
// canvas over which you can draw the starfield animation. If you leave the code snippet
// below undisturbed while writing your own code, you can draw whatever you want on the
// canvas and the drawing will be responsive: it will scale to your screen size.
// You can check that this behavior holds by opening up index.html in a browser window
// and resizing it.

// --- Sketch setup & canvas behavior --//
function setup () {
    let canvas_width = document.getElementById("canvas").clientWidth;
    const cnv = createCanvas(canvas_width, 520, P2D);
    cnv.parent("canvas");
    cnv.style("display", "block");

}

function windowResized() {
    // --- Canvas resizing & responsiveness ---
    let canvas_width = document.getElementById("canvas").clientWidth;
    resizeCanvas(canvas_width, 500);
}

// --- Actual sketch ---//
function draw() {
    background(0, 0, 0);
    // to AC: the circle is always centered because its x is bound to width/2 and
    // height is bound to height/2. 'width' and 'height changes as screen size changes,
    // but since we are using them as relative measures instead of straight out coordinates
    // the circle stays centered.
    circle(width/2, height/2, 50)
}


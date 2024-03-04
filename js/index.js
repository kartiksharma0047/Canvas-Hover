let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x
    mouse.y = event.y
})
window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function createCircle() {
    let maxRadius = 50;
    let minRadius = 10;
    let radius = Math.random() * (minRadius - 1) + 1;
    let originalRadius = radius; // Store the original radius
    let xCircle = Math.random() * (innerWidth - radius * 2) + radius;
    let yCircle = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 5; // Adjust speed as needed
    let dy = (Math.random() - 0.5) * 5; // Adjust speed as needed
    let randomColor = Math.floor(Math.random() * 3) + 1;
    let color1 = "red";
    let color2 = "grey"
    let color3 = "black"

    function draw() {
        if (randomColor === 1) {
            c.fillStyle = color1;
        } else if (randomColor === 2) {
            c.fillStyle = color2;
        } else {
            c.fillStyle = color3;
        }
        c.beginPath();
        c.arc(xCircle, yCircle, radius, 0, Math.PI * 2, false);
        c.fill();
    }

    function update() {
        xCircle += dx;
        yCircle += dy;

        if (xCircle + radius >= window.innerWidth || xCircle - radius < 0) {
            dx = -dx;
        }
        if (yCircle + radius >= window.innerHeight || yCircle - radius < 0) {
            dy = -dy;
        }
        if (mouse.x - xCircle < 100 && mouse.x - xCircle > -100 && mouse.y - yCircle < 100 && mouse.y - yCircle > -100) {
            if (radius < maxRadius) {
                radius += 3;
            }
        } else if (radius > originalRadius) { // Check against originalRadius
            radius -= 1;
        }

        draw();
    }

    return {
        draw: draw,
        update: update
    };
}

let circles = [];
for (let i = 0; i < 350; i++) {
    circles.push(createCircle());
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

animate();

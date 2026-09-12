let speed = 0.5;
let scale = 0.10;
let canvas;
let ctx;
let logoColor = '#ffffff';

let dvd = {
    x: 200,
    y: 300,
    xspeed: 1.5,
    yspeed: 1.4,
    img: new Image()
};

(function main(){
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");

    dvd.img.onload = () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        // Keep the logo fully on screen at spawn
        dvd.x = Math.random() * (canvas.width  - dvd.img.width  * scale);
        dvd.y = Math.random() * (canvas.height - dvd.img.height * scale);

        pickColor();
        update();
    };

    dvd.img.onerror = () => console.error("Failed to load dvd-logo.png");

    dvd.img.src = 'dvd-logo.png';
})();

function update() {
    setTimeout(() => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const w = dvd.img.width  * scale;
        const h = dvd.img.height * scale;

        ctx.fillStyle = logoColor;
        ctx.fillRect(dvd.x, dvd.y, w, h);
        ctx.drawImage(dvd.img, dvd.x, dvd.y, w, h);

        dvd.x += dvd.xspeed;
        dvd.y += dvd.yspeed;

        checkHitBox();
        update();
    }, speed);
}

function checkHitBox(){
    const w = dvd.img.width  * scale;
    const h = dvd.img.height * scale;

    if (dvd.x + w >= canvas.width) {
        dvd.x = canvas.width - w;
        dvd.xspeed = -Math.abs(dvd.xspeed);
        pickColor();
    } else if (dvd.x <= 0) {
        dvd.x = 0;
        dvd.xspeed = Math.abs(dvd.xspeed);
        pickColor();
    }

    if (dvd.y + h >= canvas.height) {
        dvd.y = canvas.height - h;
        dvd.yspeed = -Math.abs(dvd.yspeed);
        pickColor();
    } else if (dvd.y <= 0) {
        dvd.y = 0;
        dvd.yspeed = Math.abs(dvd.yspeed);
        pickColor();
    }
}

function pickColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    logoColor = `rgb(${r},${g},${b})`;
}

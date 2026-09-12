// Speed in PIXELS PER SECOND. 120 = lazy drift. 400 = normal. 1000 = frantic.
const speed = 120;
const scale = 0.10;

let canvas;
let ctx;
let logoColor = '#ffffff';
let lastTime = 0;

const dvd = {
    x: 200,
    y: 300,
    vx: speed,
    vy: speed * 0.98,
    img: new Image()
};

(function main() {
    canvas = document.getElementById('tv-screen');
    ctx = canvas.getContext('2d');

    dvd.img.onload = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const w = dvd.img.width * scale;
        const h = dvd.img.height * scale;

        dvd.x = Math.random() * Math.max(1, canvas.width - w);
        dvd.y = Math.random() * Math.max(1, canvas.height - h);

        pickColor();
        lastTime = performance.now();
        requestAnimationFrame(update);
    };

    dvd.img.onerror = () => console.error('Failed to load dvd-logo.png');
    dvd.img.src = 'dvd-logo.png';
})();

function update(now) {
    const dt = (now - lastTime) / 1000; // seconds since last frame
    lastTime = now;

    const w = dvd.img.width * scale;
    const h = dvd.img.height * scale;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = logoColor;
    ctx.fillRect(dvd.x, dvd.y, w, h);
    ctx.drawImage(dvd.img, dvd.x, dvd.y, w, h);

    dvd.x += dvd.vx * dt;
    dvd.y += dvd.vy * dt;

    checkHitBox(w, h);
    requestAnimationFrame(update);
}

function checkHitBox(w, h) {
    if (dvd.x + w >= canvas.width) {
        dvd.x = canvas.width - w;
        dvd.vx = -Math.abs(dvd.vx);
        pickColor();
    } else if (dvd.x <= 0) {
        dvd.x = 0;
        dvd.vx = Math.abs(dvd.vx);
        pickColor();
    }

    if (dvd.y + h >= canvas.height) {
        dvd.y = canvas.height - h;
        dvd.vy = -Math.abs(dvd.vy);
        pickColor();
    } else if (dvd.y <= 0) {
        dvd.y = 0;
        dvd.vy = Math.abs(dvd.vy);
        pickColor();
    }
}

function pickColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    logoColor = `rgb(${r},${g},${b})`;
}

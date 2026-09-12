const RENDER_W = 480;
const RENDER_H = 270;
const speed = RENDER_W * 0.12;
const scale = 0.10;
const fadeAlpha = 0.12;
const targetFPS = 30;
const frameInterval = 1000 / targetFPS;

let canvas;
let ctx;
let logoColor = '#ffffff';
let lastTime = 0;
let lastFrame = 0;

const dvd = {
    x: 100,
    y: 100,
    vx: speed,
    vy: speed * 0.98,
    img: new Image()
};

(function main() {
    canvas = document.getElementById('tv-screen');
    ctx = canvas.getContext('2d');
    canvas.width = RENDER_W;
    canvas.height = RENDER_H;

    dvd.img.onload = () => {
        const w = dvd.img.width * scale;
        const h = dvd.img.height * scale;
        dvd.x = Math.random() * Math.max(1, RENDER_W - w);
        dvd.y = Math.random() * Math.max(1, RENDER_H - h);
        pickColor();
        lastTime = performance.now();
        lastFrame = lastTime;
        requestAnimationFrame(update);
    };

    dvd.img.onerror = () => console.error('Failed to load dvd-logo.png');
    dvd.img.src = 'dvd-logo.png';
})();

function update(now) {
    requestAnimationFrame(update);
    if (now - lastFrame < frameInterval) return;

    const dt = (now - lastTime) / 1000;
    lastTime = now;
    lastFrame = now;

    const w = dvd.img.width * scale;
    const h = dvd.img.height * scale;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
    ctx.fillRect(0, 0, RENDER_W, RENDER_H);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = logoColor;
    ctx.fillRect(dvd.x, dvd.y, w, h);
    ctx.drawImage(dvd.img, dvd.x, dvd.y, w, h);

    dvd.x += dvd.vx * dt;
    dvd.y += dvd.vy * dt;

    checkHitBox(w, h);
}

function checkHitBox(w, h) {
    if (dvd.x + w >= RENDER_W) {
        dvd.x = RENDER_W - w;
        dvd.vx = -Math.abs(dvd.vx);
        pickColor();
    } else if (dvd.x <= 0) {
        dvd.x = 0;
        dvd.vx = Math.abs(dvd.vx);
        pickColor();
    }
    if (dvd.y + h >= RENDER_H) {
        dvd.y = RENDER_H - h;
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

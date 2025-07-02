// script.js
const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const playPauseButton = document.getElementById('playPauseButton');

let animationFrameId;
let startTime;
let isPlaying = false;

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Animation properties
let circleX = canvas.width / 2;
let circleY = canvas.height / 2;
let circleRadius = 50;
let circleColor = 'red';
let dx = 2; // X velocity
let dy = 2; // Y velocity

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update circle position
    circleX += dx;
    circleY += dy;

    // Bounce off walls
    if (circleX + circleRadius > canvas.width || circleX - circleRadius < 0) {
        dx = -dx;
    }
    if (circleY + circleRadius > canvas.height || circleY - circleRadius < 0) {
        dy = -dy;
    }

    // Draw circle
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = circleColor;
    ctx.fill();
    ctx.closePath();
}

function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsedTime = (currentTime - startTime) / 1000; // in seconds

    if (elapsedTime < 10) { // Animate for 10 seconds
        // Change color based on time
        const r = Math.floor(255 * (elapsedTime / 10));
        const g = Math.floor(255 * (1 - elapsedTime / 10));
        const b = Math.floor(255 * Math.abs(Math.sin(elapsedTime)));
        circleColor = `rgb(${r}, ${g}, ${b})`;

        draw();
        animationFrameId = requestAnimationFrame(animate);
    } else {
        // Animation finished
        stopAnimation();
        playPauseButton.textContent = 'Play';
        alert('Animation finished!');
    }
}

function startAnimation() {
    if (!isPlaying) {
        isPlaying = true;
        playPauseButton.textContent = 'Pause';
        startTime = null; // Reset start time for new animation cycle
        animationFrameId = requestAnimationFrame(animate);
    }
}

function stopAnimation() {
    if (isPlaying) {
        isPlaying = false;
        playPauseButton.textContent = 'Play';
        cancelAnimationFrame(animationFrameId);
    }
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        stopAnimation();
    } else {
        startAnimation();
    }
});

// Initial draw
draw();

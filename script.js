// script.js
const panels = document.querySelectorAll('.comic-panel');
const playPauseButton = document.getElementById('playPauseButton');

let currentPanelIndex = 0;
let animationInterval;
let isPlaying = false;
const totalDuration = 10000; // 10 seconds
const panelDuration = totalDuration / panels.length; // Duration per panel

function showPanel(index) {
    panels.forEach((panel, i) => {
        panel.classList.remove('active');
        // Reset specific panel animations
        if (panel.querySelector('.pixel-hero.hero-charge')) {
            panel.querySelector('.pixel-hero.hero-charge').style.transform = '';
        }
        if (panel.querySelector('.action-lines')) {
            panel.querySelector('.action-lines').style.opacity = '0';
        }
        if (panel.querySelector('.explosion')) {
            panel.querySelector('.explosion').style.opacity = '0';
            panel.querySelector('.explosion').style.transform = 'scale(0)';
        }
        if (panel.querySelector('.pixel-hero.hero-victorious')) {
            panel.querySelector('.pixel-hero.hero-victorious').style.transform = '';
        }
    });
    panels[index].classList.add('active');

    // Trigger specific panel animations
    if (index === 1) { // Panel 2
        setTimeout(() => {
            panels[index].querySelector('.pixel-hero.hero-charge').style.transform = 'translateX(100px) scale(2.2)';
            panels[index].querySelector('.action-lines').style.opacity = '1';
        }, 100);
    } else if (index === 2) { // Panel 3
        setTimeout(() => {
            panels[index].querySelector('.explosion').style.opacity = '1';
            panels[index].querySelector('.explosion').style.transform = 'scale(1)';
        }, 100);
    } else if (index === 3) { // Panel 4
        setTimeout(() => {
            panels[index].querySelector('.pixel-hero.hero-victorious').style.transform = 'translateY(-20px) scale(2.1)';
        }, 100);
    }
}

function startAnimation() {
    if (isPlaying) return;
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
    currentPanelIndex = 0;
    showPanel(currentPanelIndex);

    animationInterval = setInterval(() => {
        currentPanelIndex++;
        if (currentPanelIndex < panels.length) {
            showPanel(currentPanelIndex);
        } else {
            stopAnimation();
            playPauseButton.textContent = 'Play';
            alert('Comic animation finished!');
        }
    }, panelDuration);
}

function stopAnimation() {
    if (!isPlaying) return;
    isPlaying = false;
    playPauseButton.textContent = 'Play';
    clearInterval(animationInterval);
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        stopAnimation();
    } else {
        startAnimation();
    }
});

// Initial state
showPanel(0);


    const AUTO_ROTATE = true;        // change to false to disable auto rotation
    const ROTATE_INTERVAL_MS = 5000; // time between automatic switches

    let rotateTimer = null;
    let currentIndex = 0;
    let buttons = [];

    function showFeature(index, {stopAuto = false} = {}) {
    if (!buttons.length) return;
    index = index % buttons.length;
    if (index < 0) index = 0;

    buttons.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
});

    const targetBtn = buttons[index];
    const imgUrl = targetBtn.getAttribute('data-img');
    const caption = targetBtn.getAttribute('data-caption') || '';

    const mainImage = document.getElementById('mainImage');
    const imgCaption = document.getElementById('imgCaption');

    mainImage.style.opacity = 0;
    setTimeout(() => {
    mainImage.src = imgUrl;
    imgCaption.textContent = caption;
    mainImage.onload = () => {
    mainImage.style.opacity = 1;
};
}, 220);

    currentIndex = index;

    if (stopAuto) {
    restartAutoRotate(true);
}
}

    function restartAutoRotate(pauseOnce = false) {
    if (!AUTO_ROTATE) return;
    clearInterval(rotateTimer);
    if (pauseOnce) {
    rotateTimer = setInterval(() => {
    showFeature((currentIndex + 1) % buttons.length);
}, ROTATE_INTERVAL_MS);
    // reset timer by clearing and restarting after one interval
    clearInterval(rotateTimer);
    rotateTimer = setTimeout(() => {
    clearTimeout(rotateTimer);
    rotateTimer = setInterval(() => {
    showFeature((currentIndex + 1) % buttons.length);
}, ROTATE_INTERVAL_MS);
}, ROTATE_INTERVAL_MS * 1.2);
} else {
    rotateTimer = setInterval(() => {
    showFeature((currentIndex + 1) % buttons.length);
}, ROTATE_INTERVAL_MS);
}
}

    document.addEventListener('DOMContentLoaded', () => {
    buttons = Array.from(document.querySelectorAll('.feature-btn'));

    // Attach click handlers
    buttons.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
    showFeature(i, {stopAuto: true});
});
});

    showFeature(0);

    if (AUTO_ROTATE) {
    restartAutoRotate(false);
}
});



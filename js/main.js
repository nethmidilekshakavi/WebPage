
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


// section 6

    $(document).ready(function () {

        const slider = $("#section6-carousel");

        slider.owlCarousel({
            loop: true,
            margin: 18,
            nav: false,
            dots: false,
            autoplay: false,
            responsive: {
                0: { items: 1.2 },
                576: { items: 2 },
                992: { items: 3 },
                1200: { items: 3.2 }
            }
        });

        $("#section6-prev").click(() => slider.trigger("prev.owl.carousel"));
        $("#section6-next").click(() => slider.trigger("next.owl.carousel"));
    });

    //section 11

    document.addEventListener('DOMContentLoaded', function () {
        const accordion = document.getElementById('faqAccordion');
        const triggers = Array.from(accordion.querySelectorAll('.accordion-trigger'));

        function panelFor(btn) {
            return document.getElementById(btn.getAttribute('aria-controls'));
        }

        function closePanel(btn) {
            const panel = panelFor(btn);
            if (!panel) return;
            btn.setAttribute('aria-expanded', 'false');
            panel.style.maxHeight = panel.scrollHeight + 'px'; // ensure start value
            void panel.offsetHeight;
            panel.style.transition = 'max-height 300ms ease, opacity 200ms ease';
            panel.style.maxHeight = '0px';
            panel.style.opacity = '0';
            panel.dataset.open = 'false';
            panel.addEventListener('transitionend', function handler(e) {
                if (e.propertyName === 'max-height') {
                    panel.hidden = true;
                    panel.removeEventListener('transitionend', handler);
                }
            });
        }

        function openPanel(btn) {
            triggers.forEach(t => {
                if (t !== btn && t.getAttribute('aria-expanded') === 'true') closePanel(t);
            });

            const panel = panelFor(btn);
            if (!panel) return;
            btn.setAttribute('aria-expanded', 'true');
            panel.hidden = false;
            panel.style.transition = 'none';
            panel.style.maxHeight = '0px';
            panel.style.opacity = '0';
            void panel.offsetHeight;
            panel.style.transition = 'max-height 300ms ease, opacity 200ms ease';
            panel.style.maxHeight = panel.scrollHeight + 'px';
            panel.style.opacity = '1';
            panel.dataset.open = 'true';

            panel.addEventListener('transitionend', function handler(e) {
                if (e.propertyName === 'max-height') {
                    panel.style.maxHeight = 'none';
                    panel.removeEventListener('transitionend', handler);
                }
            });
        }

        triggers.forEach((btn, index) => {
            const panel = panelFor(btn);
            if (!panel) return;

            if (btn.getAttribute('aria-expanded') === 'true') {
                panel.hidden = false;
                panel.style.maxHeight = 'none';
                panel.style.opacity = '1';
                panel.dataset.open = 'true';
            } else {
                panel.hidden = true;
                panel.style.maxHeight = '0px';
                panel.style.opacity = '0';
                panel.dataset.open = 'false';
            }

            btn.addEventListener('click', () => {
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                if (expanded) {
                    closePanel(btn);
                } else {
                    openPanel(btn);
                }
            });

            btn.addEventListener('keydown', (e) => {
                const key = e.key;
                if (key === 'ArrowDown') {
                    e.preventDefault();
                    const next = triggers[(index + 1) % triggers.length];
                    next.focus();
                } else if (key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = triggers[(index - 1 + triggers.length) % triggers.length];
                    prev.focus();
                } else if (key === 'Home') {
                    e.preventDefault();
                    triggers[0].focus();
                } else if (key === 'End') {
                    e.preventDefault();
                    triggers[triggers.length - 1].focus();
                } else if (key === 'Enter' || key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });
    });


    // Counter animation on scroll (section 5)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
        element.textContent = target + (element.dataset.suffix || '');
        clearInterval(timer);
    } else {
        if (element.dataset.suffix === '%') {
        element.textContent = Math.floor(current) + '%';
    } else {
        element.textContent = Math.floor(current) + 'km';
    }
    }
    }, 16);
    }

        const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

        const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
            }
        });
    }, observerOptions);

        document.addEventListener('DOMContentLoaded', () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => observer.observe(counter));
    });

        function observeWithReset() {
        const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
    }
    });
    }, observerOptions);

        document.querySelectorAll('.counter').forEach(counter => observer.observe(counter));
    }

// Smooth fade-in on scroll
window.addEventListener('scroll', () => {
    document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.style.opacity = 1;
        }
    });
});

// Optional GSAP for parallax and transitions
gsap.to('.parallax-bg', { y: '50%', ease: 'none', scrollTrigger: { trigger: '.hero', scrub: true } });

// 3D tilt (vanilla, no lib needed beyond CSS)
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
        const { width, height, left, top } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        card.style.transform = `rotateY(${x * 20}deg) rotateX(${y * -20}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'rotateY(0) rotateX(0)'; });
});
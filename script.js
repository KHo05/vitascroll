// Section visibility and nav active
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.section').forEach(section => {
    ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        onEnter: () => {
            section.classList.add('visible');
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            document.querySelector(`nav a[href="#${section.id}"]`).classList.add('active');
        }
    });
});

// Staggered fade for solution boxes
gsap.from('.solution-boxes .box', { opacity: 0, y: 50, stagger: 0.2, duration: 0.8, scrollTrigger: { trigger: '#solution', start: 'top 80%' } });

// Parallax on logo
gsap.to('[data-parallax]', { y: '20%', ease: 'none', scrollTrigger: { trigger: '#hero', scrub: true } });

// 3D tilt
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
        const { width, height, left, top } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        card.style.transform = `rotateY(${x * 30}deg) rotateX(${y * -30}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'rotateY(0) rotateX(0)'; });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const close = document.querySelector('.close');
document.querySelectorAll('.clickable').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});
close.addEventListener('click', () => { lightbox.style.display = 'none'; });
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.style.display = 'none'; });

// Particles (teal, slower for live feel)
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let particles = [];
for (let i = 0; i < 150; i++) { // More particles for density
    particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 2 + 1, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 }); // Slower speed
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,168,150,0.4)'; ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
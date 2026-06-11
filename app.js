// Bij Roel — interactive bits

// Reveal-on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Cards intro stagger
const cardIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      cardIO.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.card-fancy').forEach(el => cardIO.observe(el));

// Subtle 3D tilt on the featured card
const featCard = document.querySelector('.card-feature');
if (featCard) {
  featCard.addEventListener('mousemove', (e) => {
    const r = featCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const lift = parseFloat(getComputedStyle(featCard).getPropertyValue('--card-lift')) || -64;
    const scale = parseFloat(getComputedStyle(featCard).getPropertyValue('--card-scale')) || 1.03;
    featCard.style.transform = `translateY(${lift}px) scale(${scale}) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3.5).toFixed(2)}deg)`;
  });
  featCard.addEventListener('mouseleave', () => {
    featCard.style.transform = '';
  });
}

// Fallback: if anything is in viewport already at load, force visible.
function forceRevealsInView() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
  });
}
window.addEventListener('load', forceRevealsInView);
window.addEventListener('scroll', forceRevealsInView, { passive: true });

// Hero loaded class for ken-burns
window.addEventListener('load', () => {
  document.querySelector('.hero')?.classList.add('loaded');
});

// Nav scrolled state
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) nav?.classList.add('scrolled');
  else nav?.classList.remove('scrolled');
});

// Smooth scroll for anchor nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Cup story scroll progress
let cupRaf = null;
function updateCup() {
  const cupTrack = document.querySelector('.cup-track');
  const cupStage = document.querySelector('.cup-stage');
  const cupLabels = document.querySelectorAll('.cup-label');
  const cupNum = document.querySelector('[data-cup-progress]');
  if (!cupTrack || !cupStage) { cupRaf = null; return; }
  const rect = cupTrack.getBoundingClientRect();
  const total = rect.height - window.innerHeight;
  const scrolled = -rect.top;
  let p = total > 0 ? scrolled / total : 0;
  p = Math.max(0, Math.min(1, p));

  cupStage.style.setProperty('--cup-progress', p.toFixed(3));
  cupStage.style.setProperty('--cup-rot', (p * 540).toFixed(2) + 'deg');
  cupStage.style.setProperty('--cup-scale', (0.6 + p * 0.6).toFixed(3));
  cupStage.style.setProperty('--cup-img-scale', (0.7 + p * 0.35).toFixed(3));

  const thresholds = [0.10, 0.32, 0.55, 0.78];
  cupLabels.forEach((el, i) => {
    if (p >= thresholds[i]) el.classList.add('is-on');
    else el.classList.remove('is-on');
  });

  if (cupNum) cupNum.textContent = Math.round(p * 100);
  cupRaf = null;
}
function scheduleCup() {
  if (cupRaf) return;
  cupRaf = requestAnimationFrame(updateCup);
}
window.addEventListener('scroll', scheduleCup, { passive: true });
window.addEventListener('resize', scheduleCup);
updateCup();

const nl = document.querySelector('.footer-newsletter');
nl?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = nl.querySelector('button');
  if (btn) {
    btn.textContent = 'Bedankt!';
    setTimeout(() => { btn.textContent = 'Aanmelden'; nl.querySelector('input').value = ''; }, 2000);
  }
});

// Feature cards: cycle a focus state
const features = document.querySelectorAll('.feature');
let activeFeature = 0;
setInterval(() => {
  features.forEach(f => f.classList.remove('auto-focus'));
  if (features[activeFeature]) features[activeFeature].classList.add('auto-focus');
  activeFeature = (activeFeature + 1) % features.length;
}, 2400);

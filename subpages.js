// Bij Roel — subpages: FAQ accordion + simple form handler

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    item.classList.toggle('open');
  });
});

const signupForm = document.querySelector('.signup-form form');
signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = signupForm.querySelector('button[type="submit"]');
  if (btn) {
    const old = btn.textContent;
    btn.textContent = 'Bedankt voor je aanmelding!';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = old; btn.disabled = false; signupForm.reset(); }, 2400);
  }
});

// Footer newsletter (same as home)
const nl = document.querySelector('.footer-newsletter');
nl?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = nl.querySelector('button');
  if (btn) {
    btn.textContent = 'Bedankt!';
    setTimeout(() => { btn.textContent = 'Aanmelden'; nl.querySelector('input').value = ''; }, 2000);
  }
});

// Nav: keep cream pill always on subpages (don't toggle scrolled state)
const nav = document.querySelector('.nav');
nav?.classList.add('scrolled-static');

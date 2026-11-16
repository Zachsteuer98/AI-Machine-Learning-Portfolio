const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('open');
  });
});

const projectCards = document.querySelectorAll('.project-card');

// Alternate screenshot sides among visible rows only, so filtering keeps the zig-zag intact.
function alternateVisibleRows() {
  [...projectCards]
    .filter((card) => !card.classList.contains('hidden'))
    .forEach((card, index) => card.classList.toggle('flip', index % 2 === 1));
}

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active');
    button.classList.add('active');
    const selected = button.dataset.filter;
    projectCards.forEach((card) => {
      const shouldShow = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !shouldShow);
      card.setAttribute('aria-hidden', String(!shouldShow));
    });
    alternateVisibleRows();
  });
});

alternateVisibleRows();

// Fade project rows in as they scroll into view; skipped when motion is reduced or unsupported.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const REVEAL_THRESHOLD = 0.15;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: REVEAL_THRESHOLD });
  projectCards.forEach((card) => {
    card.classList.add('reveal');
    observer.observe(card);
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();

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

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active');
    button.classList.add('active');
    const selected = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => {
      const shouldShow = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !shouldShow);
      card.setAttribute('aria-hidden', String(!shouldShow));
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

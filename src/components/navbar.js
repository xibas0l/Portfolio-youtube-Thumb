/**
 * Inicializa a navbar: menu mobile (#menuToggle, #navMenu) e indicador ativo por scroll via IntersectionObserver.
 */
export function initNavbar() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  if (sections.length === 0 || !('IntersectionObserver' in window)) return;

  const setActiveLink = (sectionId) => {
    const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (!targetLink) return;

    navLinks.forEach((link) => link.classList.remove('active'));
    targetLink.classList.add('active');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.getAttribute('id'));
        }
      });
    },
    {
      root: null,
      rootMargin: '-120px 0px -55% 0px',
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
}

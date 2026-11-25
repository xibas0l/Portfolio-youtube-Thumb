import { initNavbar } from './components/navbar.js';
import { initHeroShowcase, initThumbsSection } from './sections/thumbs.js';
import { initVideosSection } from './sections/videos.js';
import { initScriptsSection } from './sections/scripts.js';

function initFooterYear() {
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
}

function initDiscordCopy() {
  const copyDiscordBtn = document.getElementById('copyDiscordBtn');
  const toastNotification = document.getElementById('toastNotification');
  let toastTimeout;

  if (!copyDiscordBtn) return;

  copyDiscordBtn.addEventListener('click', async () => {
    const textToCopy = copyDiscordBtn.getAttribute('data-copy') || 'g6vgmdatmf63';
    const btnText = copyDiscordBtn.querySelector('.btn-text');

    try {
      await navigator.clipboard.writeText(textToCopy);

      if (btnText) {
        const originalText = btnText.textContent;
        btnText.textContent = 'Copiado! ✓';
        setTimeout(() => {
          btnText.textContent = originalText;
        }, 2000);
      }

      if (toastNotification) {
        clearTimeout(toastTimeout);
        toastNotification.classList.add('show');
        toastTimeout = setTimeout(() => {
          toastNotification.classList.remove('show');
        }, 3200);
      }
    } catch (err) {
      prompt('Copie o usuário do Discord abaixo:', textToCopy);
    }
  });
}

function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const answer = parent.querySelector('.faq-answer');
      const isOpen = parent.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach((item) => {
        if (item !== parent) {
          item.classList.remove('open');
          const otherAnswer = item.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        parent.classList.add('open');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        parent.classList.remove('open');
        if (answer) answer.style.maxHeight = null;
      }
    });
  });
}

function bootstrap() {
  initNavbar();
  initHeroShowcase();
  initThumbsSection();
  initVideosSection();
  initScriptsSection();
  initFooterYear();
  initDiscordCopy();
  initFaqAccordion();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

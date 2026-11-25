/**
 * Controlador reutilizável de modal (abertura, fechamento, backdrop, botão × e tecla Escape).
 * @param {Object} options
 * @param {HTMLElement|null} options.modalEl
 * @param {HTMLElement|null} [options.closeEl]
 * @param {HTMLElement|null} [options.backdropEl]
 * @param {(payload?: any) => void} [options.onOpen]
 * @param {() => void} [options.onClose]
 */
export function createModalController({ modalEl, closeEl, backdropEl, onOpen, onClose } = {}) {
  if (!modalEl) {
    return {
      open: () => {},
      close: () => {},
      isOpen: () => false
    };
  }

  const isOpen = () => modalEl.classList.contains('active');

  const open = (payload) => {
    if (typeof onOpen === 'function') {
      onOpen(payload);
    }
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    if (!isOpen()) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  if (closeEl) {
    closeEl.addEventListener('click', close);
  }

  if (backdropEl) {
    backdropEl.addEventListener('click', close);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      close();
    }
  });

  return { open, close, isOpen };
}

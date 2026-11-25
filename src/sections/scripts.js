import { scriptsData } from '../data/scripts.js';
import { createModalController } from '../components/modal.js';

/**
 * Renderiza o conteúdo completo das 4 etapas do roteiro dentro do modal.
 * @param {HTMLElement} modalBodyEl
 * @param {typeof scriptsData[number]} script
 */
function renderScriptModalContent(modalBodyEl, script) {
  const segmentsMarkup = script.formatoSegmentos
    .map(
      (item, index) => `
        <li class="script-segment-item">
          <div class="script-segment-header">
            <span class="script-segment-index">${String(index + 1).padStart(2, '0')}</span>
            <strong class="script-segment-name">${item.segment}</strong>
          </div>
          <p class="script-segment-summary">${item.summary}</p>
        </li>
      `
    )
    .join('');

  const commentsMarkup = script.comentarios
    .map((comment) => `<li class="script-comment-item">${comment}</li>`)
    .join('');

  const roteiroBlocks = Array.isArray(script.roteiro)
    ? script.roteiro
        .map(
          (block) => `
            <div class="script-roteiro-block">
              <h5 class="script-roteiro-label">${block.label}</h5>
              <p class="script-roteiro-text">${block.text}</p>
            </div>
          `
        )
        .join('')
    : `<p class="script-roteiro-text">${script.roteiro}</p>`;

  modalBodyEl.innerHTML = `
    <div class="script-modal-header">
      <div class="script-modal-badges">
        <span class="script-badge-niche">${script.niche}</span>
        <span class="script-badge-duration">${script.duration}</span>
      </div>
      <h3 class="script-modal-title">${script.title}</h3>
    </div>

    <div class="script-stages">
      <section class="script-stage-block">
        <h4 class="script-stage-heading">
          <span class="script-stage-num">1</span>
          <span>Ideias</span>
        </h4>
        <p class="script-stage-text">${script.ideias}</p>
      </section>

      <section class="script-stage-block">
        <h4 class="script-stage-heading">
          <span class="script-stage-num">2</span>
          <span>Formato e Segmentos</span>
        </h4>
        <ol class="script-segments-list">
          ${segmentsMarkup}
        </ol>
      </section>

      <section class="script-stage-block">
        <h4 class="script-stage-heading">
          <span class="script-stage-num">3</span>
          <span>Comentários (Edição &amp; Direção)</span>
        </h4>
        <ul class="script-comments-list">
          ${commentsMarkup}
        </ul>
      </section>

      <section class="script-stage-block">
        <h4 class="script-stage-heading">
          <span class="script-stage-num">4</span>
          <span>Roteiro</span>
        </h4>
        <div class="script-roteiro-container">
          ${roteiroBlocks}
        </div>
      </section>
    </div>
  `;
}

/**
 * Cria o card de resumo de um roteiro para o grid da seção #roteiros.
 * @param {typeof scriptsData[number]} script
 * @param {(script: typeof scriptsData[number]) => void} onOpenScript
 * @returns {HTMLElement}
 */
function createScriptCard(script, onOpenScript) {
  const card = document.createElement('article');
  card.className = 'script-card';
  card.setAttribute('data-script-id', script.id);

  const timelineMarkup = script.formatoSegmentos
    .map(
      (item, index) => `
        <li class="script-timeline-step">
          <span class="script-timeline-dot">${index + 1}</span>
          <span class="script-timeline-label">${item.segment}</span>
        </li>
      `
    )
    .join('');

  card.innerHTML = `
    <div class="script-card-top">
      <span class="script-card-niche">${script.niche}</span>
      <span class="script-card-duration">${script.duration}</span>
    </div>

    <h3 class="script-card-title">${script.title}</h3>
    <p class="script-card-idea">${script.ideias}</p>

    <div class="script-timeline-wrapper">
      <span class="script-timeline-heading">Estrutura de 7 Segmentos</span>
      <ol class="script-timeline">
        ${timelineMarkup}
      </ol>
    </div>

    <div class="script-card-footer">
      <button type="button" class="btn-script-open">
        <span>Ver Estrutura &amp; Roteiro</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  `;

  const openBtn = card.querySelector('.btn-script-open');
  if (openBtn) {
    openBtn.addEventListener('click', () => onOpenScript(script));
  }

  return card;
}

/**
 * Inicializa a seção de Roteiros & Storytelling (#roteiros) e seu modal.
 */
export function initScriptsSection() {
  const scriptsGrid = document.getElementById('scriptsGrid');
  const scriptModal = document.getElementById('scriptModal');
  const scriptModalBackdrop = document.getElementById('scriptModalBackdrop');
  const scriptModalClose = document.getElementById('scriptModalClose');
  const scriptModalBody = document.getElementById('scriptModalBody');

  if (!scriptsGrid) return;

  const modalController = createModalController({
    modalEl: scriptModal,
    closeEl: scriptModalClose,
    backdropEl: scriptModalBackdrop,
    onOpen: (script) => {
      if (scriptModalBody && script) {
        renderScriptModalContent(scriptModalBody, script);
        const contentEl = scriptModal?.querySelector('.script-modal-content');
        if (contentEl) {
          contentEl.scrollTop = 0;
        }
      }
    }
  });

  scriptsGrid.innerHTML = '';
  scriptsData.forEach((script) => {
    const card = createScriptCard(script, (selected) => {
      modalController.open(selected);
    });
    scriptsGrid.appendChild(card);
  });
}

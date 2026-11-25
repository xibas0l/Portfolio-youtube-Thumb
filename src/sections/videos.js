import { videosData } from '../data/videos.js';

/**
 * Cria o elemento DOM de um card de vídeo utilizando o padrão YouTube Facade.
 * Nenhum <iframe> é inserido no DOM inicial.
 * @param {typeof videosData[number]} video
 * @returns {HTMLElement}
 */
function createVideoCard(video) {
  const card = document.createElement('article');
  card.className = 'video-card';
  card.setAttribute('data-video-card-id', video.id);

  const tagsMarkup = video.tags
    .map((tag) => `<span class="video-tag">${tag}</span>`)
    .join('');

  const creditMarkup = video.credit
    ? `
      <p class="video-credit-note">
        ${video.credit.prefix}<a href="${video.credit.authorUrl}" target="_blank" rel="noopener noreferrer">${video.credit.authorName}</a>${video.credit.suffix}
      </p>
    `
    : '';

  card.innerHTML = `
    <div class="video-facade" data-video-id="${video.videoId}">
      <img
        src="https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg"
        alt="Capa do vídeo: ${video.title}"
        loading="lazy"
        class="video-facade-thumb"
      />
      <div class="video-facade-overlay"></div>
      <button
        type="button"
        class="video-play-btn"
        aria-label="Reproduzir vídeo: ${video.title}"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>

    <div class="video-card-body">
      <div class="video-card-meta">
        <span class="video-niche">${video.channelOrNiche}</span>
        <a
          href="${video.videoUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="video-external-link"
          aria-label="Abrir ${video.title} no YouTube"
        >
          <span>YouTube</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </div>

      <h3 class="video-title">${video.title}</h3>

      <div class="video-tags">${tagsMarkup}</div>

      <p class="video-desc">${video.desc}</p>

      ${creditMarkup}
    </div>
  `;

  const imgEl = card.querySelector('.video-facade-thumb');
  if (imgEl) {
    imgEl.addEventListener(
      'error',
      () => {
        imgEl.src = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
      },
      { once: true }
    );
  }

  const facadeEl = card.querySelector('.video-facade');
  if (facadeEl) {
    const activateEmbed = () => {
      if (facadeEl.dataset.loaded === 'true') return;
      facadeEl.dataset.loaded = 'true';
      facadeEl.classList.add('is-playing');

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`;
      iframe.title = video.title;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      );
      iframe.setAttribute('allowfullscreen', '');

      facadeEl.innerHTML = '';
      facadeEl.appendChild(iframe);
    };

    facadeEl.addEventListener('click', activateEmbed);
  }

  return card;
}

/**
 * Inicializa a seção de Edições de Vídeo (#edicoes).
 */
export function initVideosSection() {
  const videosGrid = document.getElementById('videosGrid');
  if (!videosGrid) return;

  videosGrid.innerHTML = '';
  videosData.forEach((video) => {
    videosGrid.appendChild(createVideoCard(video));
  });
}

import { heroShowcaseList, thumbsData } from '../data/thumbs.js';
import { createModalController } from '../components/modal.js';

/**
 * Randomiza a thumbnail em destaque no mockup do Hero.
 */
export function initHeroShowcase() {
  const heroPreviewImg = document.getElementById('heroPreviewImg');
  const heroPreviewTitle = document.querySelector('.preview-title');
  const heroPillCtr = document.querySelector('.pill-ctr');
  const heroPillQuality = document.querySelector('.pill-quality');

  if (!heroPreviewImg || heroShowcaseList.length === 0) return;

  const randomIndex = Math.floor(Math.random() * heroShowcaseList.length);
  const chosen = heroShowcaseList[randomIndex];

  heroPreviewImg.src = chosen.src;
  heroPreviewImg.alt = chosen.alt;

  if (heroPreviewTitle) {
    heroPreviewTitle.textContent = chosen.title;
  }
  if (heroPillCtr) {
    heroPillCtr.innerHTML = `<span class="pill-icon">${chosen.pill1Icon}</span> <span>${chosen.pill1Text}</span>`;
  }
  if (heroPillQuality) {
    heroPillQuality.innerHTML = `<span class="pill-icon">${chosen.pill2Icon}</span> <span>${chosen.pill2Text}</span>`;
  }
}

/**
 * Cria o elemento DOM de um card de thumbnail preservando a estrutura esperada pelo CSS.
 * @param {typeof thumbsData[number]} thumb
 * @returns {HTMLDivElement}
 */
function createThumbCard(thumb) {
  const card = document.createElement('div');
  card.className = 'thumb-card carousel-slide';
  card.setAttribute('data-category', thumb.category);
  card.setAttribute('data-id', thumb.id);
  if (thumb.videoUrl) {
    card.setAttribute('data-video', thumb.videoUrl);
  }

  card.innerHTML = `
    <div class="thumb-media">
      <img
        src="${thumb.image}"
        alt="${thumb.alt}"
        loading="lazy"
      />
      <div class="thumb-overlay">
        <button class="btn-inspect" aria-label="Ver em tela cheia">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          <span>Expandir</span>
        </button>
      </div>
      <div class="thumb-tag">${thumb.tag}</div>
      <div class="thumb-ctr-tag">${thumb.ctrTag}</div>
    </div>
    <div class="thumb-info">
      <h3 class="thumb-title">${thumb.title}</h3>
      <p class="thumb-desc">${thumb.desc}</p>
    </div>
  `;

  if (thumb.fallbackImage) {
    const imgEl = card.querySelector('.thumb-media img');
    if (imgEl) {
      imgEl.addEventListener(
        'error',
        () => {
          imgEl.src = thumb.fallbackImage;
        },
        { once: true }
      );
    }
  }

  return card;
}

/**
 * Inicializa a seção de Thumbnails: renderização dos cards, filtros, carrossel e lightbox modal.
 */
export function initThumbsSection() {
  const carouselWrapper = document.getElementById('portfolioCarouselWrapper');
  const carouselViewport = document.getElementById('carouselViewport');
  const carouselTrack = document.getElementById('portfolioTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const totalSlidesNum = document.getElementById('totalSlidesNum');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!carouselTrack) return;

  // Renderiza cards dinamicamente a partir de thumbsData
  carouselTrack.innerHTML = '';
  const thumbCards = thumbsData.map((thumb) => {
    const card = createThumbCard(thumb);
    carouselTrack.appendChild(card);
    return card;
  });

  if (totalSlidesNum) {
    totalSlidesNum.textContent = String(thumbCards.length).padStart(2, '0');
  }

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxCtr = document.getElementById('lightboxCtr');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxVideoBtn = document.getElementById('lightboxVideoBtn');
  const lightboxAction = document.getElementById('lightboxAction');

  const lightboxController = createModalController({
    modalEl: lightboxModal,
    closeEl: lightboxClose,
    backdropEl: lightboxBackdrop,
    onOpen: (card) => {
      if (!card) return;
      const imgEl = card.querySelector('.thumb-media img');
      const tagEl = card.querySelector('.thumb-tag');
      const ctrEl = card.querySelector('.thumb-ctr-tag');
      const titleEl = card.querySelector('.thumb-title');
      const descEl = card.querySelector('.thumb-desc');
      const videoUrl = card.getAttribute('data-video');

      if (imgEl && lightboxImg) {
        lightboxImg.src = imgEl.src;
        lightboxImg.alt = imgEl.alt;
      }
      if (tagEl && lightboxTag) lightboxTag.textContent = tagEl.textContent;
      if (ctrEl && lightboxCtr) lightboxCtr.textContent = ctrEl.textContent;
      if (titleEl && lightboxTitle) lightboxTitle.textContent = titleEl.textContent;
      if (descEl && lightboxDesc) lightboxDesc.textContent = descEl.textContent;

      if (lightboxVideoBtn) {
        if (videoUrl) {
          lightboxVideoBtn.href = videoUrl;
          lightboxVideoBtn.style.display = 'inline-flex';
          if (lightboxAction) lightboxAction.style.display = 'flex';
        } else {
          lightboxVideoBtn.removeAttribute('href');
          lightboxVideoBtn.style.display = 'none';
          if (lightboxAction) lightboxAction.style.display = 'none';
        }
      }
    }
  });

  // Estado do Carrossel
  let currentIndex = 0;
  let activeFilter = 'all';
  let visibleCards = [...thumbCards];
  let maxIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let movedDistance = 0;
  let autoplayTimer = null;
  let isHovered = false;

  function getStepSize() {
    if (visibleCards.length === 0) return 0;
    const cardWidth = visibleCards[0].offsetWidth;
    const style = window.getComputedStyle(carouselTrack);
    const gap = parseFloat(style.columnGap || style.gap) || 32;
    return cardWidth + gap;
  }

  function getSlidesPerView() {
    if (visibleCards.length === 0 || !carouselViewport) return 1;
    const step = getStepSize();
    if (step <= 0) return 1;
    return Math.max(1, Math.round(carouselViewport.clientWidth / step));
  }

  function updateButtonsAndCounter() {
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex >= maxIndex;
    }

    if (currentSlideNum && totalSlidesNum) {
      const current = Math.min(currentIndex + 1, Math.max(1, maxIndex + 1));
      const total = Math.max(1, maxIndex + 1);
      currentSlideNum.textContent = String(current).padStart(2, '0');
      totalSlidesNum.textContent = String(total).padStart(2, '0');
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
        dot.setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
      });
    }
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalDots = maxIndex + 1;
    if (totalDots <= 1) return;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlidePosition(smooth = true) {
    const step = getStepSize();
    const targetX = -(currentIndex * step);
    prevTranslate = targetX;
    currentTranslate = targetX;

    if (!smooth) {
      carouselTrack.classList.add('no-transition');
    } else {
      carouselTrack.classList.remove('no-transition');
    }

    carouselTrack.style.transform = `translateX(${targetX}px)`;

    if (!smooth) {
      void carouselTrack.offsetWidth;
      carouselTrack.classList.remove('no-transition');
    }
  }

  function updateCarouselState() {
    const slidesPerView = getSlidesPerView();
    maxIndex = Math.max(0, visibleCards.length - slidesPerView);
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    renderDots();
    updateSlidePosition(true);
    updateButtonsAndCounter();
  }

  function goToSlide(index, smooth = true) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateSlidePosition(smooth);
    updateButtonsAndCounter();
  }

  function nextSlide() {
    if (currentIndex >= maxIndex) {
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex <= 0) {
      goToSlide(maxIndex);
    } else {
      goToSlide(currentIndex - 1);
    }
  }

  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (!isHovered && !isDragging && maxIndex > 0) {
        nextSlide();
      }
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  // Filtros da Galeria com Carrossel
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      activeFilter = btn.getAttribute('data-category');

      thumbCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (activeFilter === 'all' || cardCategory === activeFilter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      visibleCards = thumbCards.filter((card) => card.style.display !== 'none');
      currentIndex = 0;
      updateCarouselState();
      resetAutoplay();
    });
  });

  // Gestos de Arrastar (Drag) e Toque (Swipe)
  function getClientX(e) {
    return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  }

  function dragStart(e) {
    if (visibleCards.length <= 1) return;
    if (e.type === 'mousedown' && e.button !== 0) return;

    isDragging = true;
    startX = getClientX(e);
    movedDistance = 0;
    carouselTrack.classList.add('no-transition');
    carouselViewport.classList.add('is-dragging');
    stopAutoplay();
  }

  function dragMove(e) {
    if (!isDragging) return;
    const currentX = getClientX(e);
    const diff = currentX - startX;
    movedDistance = Math.abs(diff);

    const step = getStepSize();
    const baseTranslate = -(currentIndex * step);
    let targetTranslate = baseTranslate + diff;

    if (targetTranslate > 0) {
      targetTranslate = diff * 0.25;
    } else if (targetTranslate < -(maxIndex * step)) {
      const excess = targetTranslate - -(maxIndex * step);
      targetTranslate = -(maxIndex * step) + excess * 0.25;
    }

    currentTranslate = targetTranslate;
    carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    carouselTrack.classList.remove('no-transition');
    carouselViewport.classList.remove('is-dragging');

    const diff = currentTranslate - prevTranslate;

    if (diff < -45 && currentIndex < maxIndex) {
      goToSlide(currentIndex + 1);
    } else if (diff > 45 && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex);
    }

    resetAutoplay();
  }

  if (carouselViewport) {
    carouselViewport.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', dragEnd);

    carouselViewport.addEventListener('touchstart', dragStart, { passive: true });
    window.addEventListener('touchmove', dragMove, { passive: true });
    window.addEventListener('touchend', dragEnd);
  }

  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    carouselWrapper.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    window.addEventListener('keydown', (e) => {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (lightboxController.isOpen()) return;

      const rect = carouselWrapper.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          resetAutoplay();
        }
      }
    });
  }

  // Click nos cards para abrir Lightbox
  thumbCards.forEach((card) => {
    card.addEventListener('click', () => {
      if (movedDistance > 8) return;
      lightboxController.open(card);
    });
  });

  // Redimensionamento de Tela
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarouselState();
    }, 100);
  });

  // Inicialização do Carrossel
  setTimeout(() => {
    updateCarouselState();
    startAutoplay();
  }, 50);
}

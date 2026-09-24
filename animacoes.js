/**
 * VIVIT EDUCA — ANIMACOES.JS
 * Efeitos Visuais, Cursor Spotlight, Tilt 3D e Contadores
 */

document.addEventListener('DOMContentLoaded', () => {
  initSpotlightEffect();
  initTiltEffect();
  initStatCounters();
});

/**
 * 1. Cursor Spotlight Effect em Cards
 * Cria o brilho interativo adaptado para fundos claros
 */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 2. Perspective 3D Tilt
 * Aplica inclinação paramétrica no mockup do Dashboard
 */
function initTiltEffect() {
  const wrapper = document.querySelector('.hero-mockup-wrapper');
  const card = document.querySelector('.mockup-mac-frame');

  if (!wrapper || !card) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

/**
 * 3. Animated Number Counters
 * Animação contínua ao rolar a página
 */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(element) {
  const target = parseFloat(element.getAttribute('data-counter'));
  const prefix = element.getAttribute('data-prefix') || '';
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 1500;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing suave (easeOutExpo)
    const current = progress === 1 ? target : (1 - Math.pow(2, -10 * progress)) * target;
    
    element.textContent = `${prefix}${current.toFixed(target % 1 === 0 ? 0 : 1)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = `${prefix}${target}${suffix}`;
    }
  }

  requestAnimationFrame(step);
}
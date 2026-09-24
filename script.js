/**
 * LMS Platform White-Label - Scripts de Interatividade (script.js)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MENU MOBILE (TOGGLE & NAVEGAÇÃO)
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      const isClickInside = navMenu.contains(event.target) || mobileToggle.contains(event.target);
      if (!isClickInside && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     2. TROCA DE ABAS NO PREVIEW DE RECURSOS (FEATURE TABS)
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-pane');

  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        tabButtons.forEach((btn) => btn.classList.remove('active'));
        tabPanels.forEach((panel) => panel.classList.remove('active'));

        button.add('active');
        button.classList.add('active');

        const targetPanel = document.getElementById(`tab-${targetTab}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  /* ==========================================================================
     3. ANIMAÇÃO DE ENTRADA (SCROLL REVEAL)
     ========================================================================== */
  const revealTargets = document.querySelectorAll('section, .hero-content, .hero-preview, .target-card, .pricing-card, .step-card');

  revealTargets.forEach((el) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('visible'));
  }

  /* ==========================================================================
     4. ENVIO DO FORMULÁRIO DE CONTATO / CAPTURA DE LEADS
     ========================================================================== */
  const leadForm = document.getElementById('lead-form');

  if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(leadForm);
      const name = formData.get('name') || 'Cliente';
      const email = formData.get('email');
      const submitBtn = leadForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando solicitação...';
      }

      setTimeout(() => {
        const existingMessage = leadForm.querySelector('.form-feedback');
        if (existingMessage) {
          existingMessage.remove();
        }

        const feedbackMessage = document.createElement('div');
        feedbackMessage.className = 'form-feedback success';
        feedbackMessage.innerHTML = `
          <div style="background-color: #e8f5e9; border: 1px solid var(--color-primary); border-radius: var(--radius-sm); padding: 1rem; margin-top: 1rem; text-align: center; color: var(--color-dark);">
            <p style="font-weight: 700; font-family: var(--font-heading); margin-bottom: 0.25rem;">🚀 Solicitação enviada com sucesso!</p>
            <p style="font-size: 0.875rem; color: var(--color-text-muted);">Obrigado, <strong>${name}</strong>. Enviamos os detalhes de acesso à demonstração para o e-mail <em>${email}</em>.</p>
          </div>
        `;

        leadForm.appendChild(feedbackMessage);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Solicitar Demonstração Gratuita';
        }
        leadForm.reset();

        setTimeout(() => {
          feedbackMessage.remove();
        }, 8000);
      }, 1000);
    });
  }

  /* ==========================================================================
     5. SOMBRA DINÂMICA NO CABEÇALHO AO ROLAR (HEADER SHADOW)
     ========================================================================== */
  const header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
});
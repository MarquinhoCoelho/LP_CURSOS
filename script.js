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
    // Alterna a exibição do menu mobile
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Fecha o menu ao clicar em qualquer link de navegação
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fecha o menu ao clicar fora dele
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
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove a classe 'active' de todas as abas e painéis
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        tabPanels.forEach((panel) => panel.classList.remove('active'));

        // Ativa o botão selecionado
        button.classList.add('active');

        // Ativa o painel correspondente ao id "tab-{data-tab}"
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
  // Seleciona seções e elementos para aplicar a animação de entrada
  const revealTargets = document.querySelectorAll('section, .hero-content, .hero-preview, .feature-card, .price-card, .step-card');

  // Adiciona a classe base 'reveal' caso ainda não possuam
  revealTargets.forEach((el) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  // Utiliza IntersectionObserver para detecção de rolagem
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Anima apenas uma vez
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
    // Fallback imediato para navegadores sem suporte ao IntersectionObserver
    revealTargets.forEach((el) => el.classList.add('visible'));
  }

  /* ==========================================================================
     4. ENVIO DO FORMULÁRIO DE CONTATO / CAPTURA DE LEADS
     ========================================================================== */
  const leadForm = document.getElementById('lead-form');

  if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Coleta dos dados do formulário
      const formData = new FormData(leadForm);
      const name = formData.get('name') || 'Cliente';
      const email = formData.get('email');
      const submitBtn = leadForm.querySelector('button[type="submit"]');

      // Estado de carregamento do botão
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando solicitação...';
      }

      // Simulação de envio assíncrono (ex: API / Webhook)
      setTimeout(() => {
        // Remove mensagem anterior se existir
        const existingMessage = leadForm.querySelector('.form-feedback');
        if (existingMessage) {
          existingMessage.remove();
        }

        // Cria elemento de feedback dinâmico
        const feedbackMessage = document.createElement('div');
        feedbackMessage.className = 'form-feedback success';
        feedbackMessage.innerHTML = `
          <div style="background-color: #e8f5e9; border: 1px solid var(--color-primary); border-radius: var(--radius-sm); padding: 1rem; margin-top: 1rem; text-align: center; color: var(--color-dark);">
            <p style="font-weight: 700; font-family: var(--font-heading); margin-bottom: 0.25rem;">🚀 Solicitação enviada com sucesso!</p>
            <p style="font-size: 0.875rem; color: var(--color-text-muted);">Obrigado, <strong>${name}</strong>. Enviamos os detalhes de acesso à demonstração para o e-mail <em>${email}</em>.</p>
          </div>
        `;

        leadForm.appendChild(feedbackMessage);

        // Restaura o botão e limpa os campos
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Solicitar Demonstração Gratuita';
        }
        leadForm.reset();

        // Oculta a mensagem após 8 segundos
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
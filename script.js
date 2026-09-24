// Toggle do Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Fechar' : 'Menu';
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = 'Menu';
  });
});

// Animação de entrada (Reveal) com suporte para IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach((element) => revealObserver.observe(element));

// Fallback automático para garantir visibilidade da página
setTimeout(() => {
  revealElements.forEach((element) => element.classList.add('visible'));
}, 400);

// Troca interativa de conteúdo na seção de Recursos
const featureContent = {
  marca: {
    label: 'experiência white-label',
    title: 'Aprender com a<br><em>sua identidade.</em>',
    row: 'Fundamentos da sua metodologia',
    progress: '72%',
    background: 'linear-gradient(135deg, #eff8e7, #fff)'
  },
  conteudo: {
    label: 'gestão de conteúdo',
    title: 'Seu método em<br><em>cada etapa.</em>',
    row: 'Módulo 03 · Avaliação prática',
    progress: '46%',
    background: 'linear-gradient(135deg, #e6f1ff, #fff)'
  },
  negocio: {
    label: 'modelo de acesso',
    title: 'Conhecimento que<br><em>vira recorrência.</em>',
    row: 'Assinatura mensal ativa',
    progress: '89%',
    background: 'linear-gradient(135deg, #fff1e9, #fff)'
  },
  certificado: {
    label: 'conclusão reconhecida',
    title: 'Aprendizado que<br><em>deixa marca.</em>',
    row: 'Certificado Vivit Cursos',
    progress: '100%',
    background: 'linear-gradient(135deg, #f4edff, #fff)'
  }
};

const preview = document.querySelector('#feature-preview');
document.querySelectorAll('.feature-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.feature-tab').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const content = featureContent[tab.dataset.feature];
    if (preview && content) {
      preview.style.background = content.background;
      preview.innerHTML = `
        <p class="preview-label">${content.label}</p>
        <h3>${content.title}</h3>
        <div class="preview-course-row">
          <span class="preview-circle">01</span>
          <span>${content.row}</span>
          <b>${content.progress}</b>
        </div>
        <div class="preview-line"></div>
        <div class="preview-line short"></div>
      `;
    }
  });
});

// Formulário de contato/interesse
document.querySelector('#interest-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.querySelector('.form-message');
  const name = new FormData(form).get('name');
  if (message) {
    message.textContent = `Obrigado, ${name}. Recebemos seu contato e um especialista falará com você.`;
  }
  form.reset();
});
/**
 * VIVIT EDUCA — SCRIPT.JS
 * Lógica da Aplicação, Eventos, Calculadora de ROI e Interatividade
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initRoiCalculator();
  initPricingToggle();
  initComparisonAccordion();
  initFaqAccordion();
  initTerezaWidget();
});

/* 1. Header Sticky com Mudança de Estilo ao Rolar */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* 2. Menu Mobile Navigation Drawer */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const links = document.querySelectorAll('.mobile-drawer-links a');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const close = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  links.forEach(l => l.addEventListener('click', close));
}

/* 3. Calculadora Interativa de Economia (ROI) */
function initRoiCalculator() {
  const slider = document.getElementById('revenueSlider');
  const revenueDisplay = document.getElementById('revenueDisplay');
  const annualLossDisplay = document.getElementById('annualLossDisplay');
  const annualSavingsDisplay = document.getElementById('annualSavingsDisplay');
  const calcCtaBtn = document.getElementById('calcCtaBtn');

  if (!slider || !revenueDisplay) return;

  function updateRoi() {
    const revenue = parseFloat(slider.value);
    revenueDisplay.textContent = formatBRL(revenue);

    // Taxa Média de Marketplaces (10.8%)
    const annualLoss = revenue * 0.108 * 12;
    // Custo estimado do plano Vivit
    const vivitCost = 9560;
    const netSavings = Math.max(0, annualLoss - vivitCost);

    if (annualLossDisplay) annualLossDisplay.textContent = formatBRL(annualLoss);
    if (annualSavingsDisplay) annualSavingsDisplay.textContent = formatBRL(netSavings);

    if (calcCtaBtn) {
      const msg = encodeURIComponent(
        `Olá! Simulei faturar ${formatBRL(revenue)}/mês no site da Vivit Educa e vi que posso economizar ${formatBRL(netSavings)}/ano em taxas. Quero criar minha plataforma!`
      );
      calcCtaBtn.href = `https://wa.me/5548996506443?text=${msg}`;
    }
  }

  slider.addEventListener('input', updateRoi);
  updateRoi();
}

function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}

/* 4. Alternador de Preços (Mensal / Anual) */
function initPricingToggle() {
  const toggleBtn = document.getElementById('pricingToggleBtn');
  const starterPrice = document.getElementById('priceStarter');
  const proPrice = document.getElementById('pricePro');

  if (!toggleBtn) return;

  let isAnnual = true;

  toggleBtn.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggleBtn.classList.toggle('annual', isAnnual);

    if (starterPrice) starterPrice.textContent = isAnnual ? '197' : '247';
    if (proPrice) proPrice.textContent = isAnnual ? '797' : '997';
  });
}

/* 5. Accordion da Tabela Comparativa Completa */
function initComparisonAccordion() {
  const toggleBtn = document.getElementById('btnToggleComparisonTable');
  const container = document.getElementById('plansTableContainer');

  if (!toggleBtn || !container) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = container.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });
}

/* 6. FAQ Accordion Accessible */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach(other => other.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* 7. Gerenciador do Widget Flutuante Tereza IA */
function initTerezaWidget() {
  const triggerBtn = document.getElementById('terezaTriggerBtn');
  const bubble = document.getElementById('terezaSpeechBubble');
  const modal = document.getElementById('terezaChatModal');
  const closeBtn = document.getElementById('terezaModalClose');

  if (!triggerBtn) return;

  // Exibir balão de fala após 2.5s
  setTimeout(() => {
    if (bubble && !sessionStorage.getItem('tereza_dismissed')) {
      bubble.classList.add('show');
    }
  }, 2500);

  triggerBtn.addEventListener('click', () => {
    if (bubble) bubble.classList.remove('show');
    sessionStorage.setItem('tereza_dismissed', 'true');
    if (modal) modal.classList.toggle('open');
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
}
const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
let calDate = new Date();
let selectedDate = null;
calDate.setDate(1);

function toggleCal() {
  const d = document.getElementById('calDropdown');
  if (!d) return;
  d.classList.toggle('open');
  if (d.classList.contains('open')) renderCal();
}

document.addEventListener('click', function(e) {
  const d = document.getElementById('calDropdown');
  if (!d) return;
  if (!e.target.closest('.calendar-wrap')) {
    d.classList.remove('open');
  }
});

function changeMonth(dir) {
  calDate.setMonth(calDate.getMonth() + dir);
  renderCal();
}

function renderCal() {
  const grid = document.getElementById('calGrid');
  const monthLabel = document.getElementById('calMonthLabel');
  if (!grid || !monthLabel) return;

  const y = calDate.getFullYear();
  const m = calDate.getMonth();
  monthLabel.textContent = MONTHS[m] + ' ' + y;

  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today = new Date(); today.setHours(0,0,0,0);

  grid.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(y, m, d);
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;

    if (dayDate < today) el.classList.add('past');
    if (dayDate.toDateString() === today.toDateString()) el.classList.add('today');
    if (selectedDate && dayDate.toDateString() === selectedDate.toDateString()) el.classList.add('selected');

    if (dayDate >= today) {
      el.addEventListener('click', () => selectDay(dayDate, d, m, y));
    }
    grid.appendChild(el);
  }
}

function selectDay(date, d, m, y) {
  selectedDate = date;
  const fmt = String(d).padStart(2,'0') + '/' + String(m + 1).padStart(2,'0') + '/' + y;
  const display = document.getElementById('calDisplay');
  const dropdown = document.getElementById('calDropdown');
  if (display) display.textContent = fmt;
  if (dropdown) dropdown.classList.remove('open');
  renderCal();
}

function calcular() {
  const nome = document.getElementById('nome')?.value.trim();
  const horas = parseInt(document.getElementById('horas')?.value, 10);
  const pessoas = parseInt(document.getElementById('pessoas')?.value, 10) || 0;
  const pacoteSelect = document.getElementById('pacote');
  const pacoteVal = parseInt(pacoteSelect?.value, 10);
  const pacoteLabel = pacoteSelect?.options[pacoteSelect.selectedIndex]?.text;

  if (!nome) { alert('Por favor, informe seu nome.'); return; }
  if (!selectedDate) { alert('Por favor, selecione a data do evento.'); return; }
  if (!horas || horas < 1) { alert('Por favor, informe a duração do evento.'); return; }
  if (!pessoas || pessoas < 1) { alert('Por favor, informe o número de pessoas.'); return; }

  const total = pacoteVal * pessoas;
  const dataFmt = document.getElementById('calDisplay')?.textContent || '';

  document.getElementById('rNome')?.textContent = nome;
  document.getElementById('rData')?.textContent = dataFmt;
  document.getElementById('rHoras')?.textContent = horas + ' horas';
  document.getElementById('rPacote')?.textContent = pacoteLabel;
  document.getElementById('rPessoas')?.textContent = pessoas + ' pessoas';
  document.getElementById('rTotal')?.textContent = 'R$ ' + total.toLocaleString('pt-BR');

  const msg = `Olá! Gostaria de um orçamento para a Loba Drinks 🐺\n\n` +
    `*Nome:* ${nome}\n` +
    `*Data do evento:* ${dataFmt}\n` +
    `*Duração:* ${horas} horas\n` +
    `*Plano:* ${pacoteLabel}\n` +
    `*Convidados:* ${pessoas} pessoas\n` +
    `*Estimativa:* R$ ${total.toLocaleString('pt-BR')}\n\n` +
    `Aguardo confirmação e mais detalhes!`;
  const whatsLink = document.getElementById('whatsLink');
  if (whatsLink) {
    whatsLink.href = 'https://wa.me/5511951253897?text=' + encodeURIComponent(msg);
  }

  document.getElementById('resultPanel')?.classList.add('visible');
  const placeholder = document.getElementById('resultPlaceholder');
  if (placeholder) placeholder.style.display = 'none';

  if (window.innerWidth < 860) {
    document.getElementById('resultPanel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function toggle(btn) {
  const body = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  document.querySelectorAll('.accordion-btn.open').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling?.classList.remove('open');
  });

  if (!isOpen) {
    btn.classList.add('open');
    body?.classList.add('open');
  }
}

function initPageScripts() {
  if (document.getElementById('calGrid')) {
    renderCal();
  }
}

document.addEventListener('DOMContentLoaded', initPageScripts);

function initMobileNav() {
  const navToggleBtn = document.getElementById('navToggle');
  const navLinksMenu = document.getElementById('navLinks');

  if (!navToggleBtn || !navLinksMenu) return;

  navToggleBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    this.classList.toggle('active');
    navLinksMenu.classList.toggle('open');
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('nav')) {
      navToggleBtn.classList.remove('active');
      navLinksMenu.classList.remove('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', initMobileNav);

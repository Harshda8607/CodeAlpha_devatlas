'use strict';
/* ============ EDIT THIS SECTION ============ */
const CONFIG = {
  FORM_ENDPOINT: '',                       // Paste your Formspree URL, e.g. 'https://formspree.io/f/xxxxxxx'
  CONTACT_EMAIL: 'sutarhasrhda007@gmail.com',
  ROLES: ['AI & ML Enthusiast', 'Mobile App Developer', 'Data Analytics Learner', 'Problem Solver']
};
// Add `level: 0-100` to an item ONLY if you want a progress bar. No levels are shown by default.
const SKILLS = [
  { title: 'AI & Data', items: [{ name: 'Machine Learning' }, { name: 'Artificial Intelligence' }, { name: 'Python' }, { name: 'Data Analytics' }, { name: 'SQL' }] },
  { title: 'Programming', items: [{ name: 'C' }, { name: 'C++' }, { name: 'Java' }, { name: 'JavaScript' }, { name: 'PHP' }, { name: 'Data Structures' }] },
  { title: 'Mobile & Web', items: [{ name: 'Android' }, { name: 'Mobile App Development' }, { name: 'Angular' }, { name: 'XML' }, { name: 'HTML' }, { name: 'XAMPP' }] },
  { title: 'Tools', items: [{ name: 'MS Office' }, { name: 'Advanced Excel' }, { name: 'PowerPoint' }, { name: 'MS-CIT' }] },
  { title: 'Soft skills', items: [{ name: 'Communication' }, { name: 'Teamwork' }, { name: 'Problem solving' }, { name: 'Creativity' }, { name: 'Time management' }, { name: 'Attentiveness' }] }
];
// Add `github` and `demo` URLs to a project when you have them; buttons appear automatically.
const PROJECTS = [
  { title: 'Internship & Placement Management System', category: 'Mobile App', image: 'assets/projects/p1.svg', tech: ['Android', 'Mobile Application'],
    description: 'An Android app to manage internship and placement activities in one place.',
    details: 'A mobile application designed to bring internship and placement activities together in one easy-to-use app.', github: '', demo: '' },
  { title: 'Fit Life Fit Health', category: 'Mobile App', image: 'assets/projects/p2.svg', tech: ['Android', 'Mobile Application'],
    description: 'A mobile application focused on fitness and healthy living.',
    details: 'A mobile application that supports a fit and healthy lifestyle.', github: '', demo: '' },
  { title: 'Student Predictor', category: 'Machine Learning', image: 'assets/projects/p3.svg', tech: ['Machine Learning', 'Python'],
    description: 'A machine learning project that analyses student data to make predictions.',
    details: 'A machine learning project that learns from student data to make predictions.', github: '', demo: '' }
];
/* ============ END EDIT SECTION ============ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isPlaceholder = u => /YOUR-USERNAME|your\.email@example\.com/i.test(u || '');
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } }
};
function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
let toastTimer;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3200); }

document.documentElement.classList.add('js');
$('#year').textContent = new Date().getFullYear();

/* ---- theme ---- */
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  $('#themeIcon').setAttribute('href', t === 'dark' ? '#i-sun' : '#i-moon');
  $('#themeBtn').setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  $('meta[name=theme-color]').content = t === 'dark' ? '#070b1a' : '#f4f7ff';
  store.set('devatlas-theme', t);
}
setTheme(store.get('devatlas-theme') || 'dark');
$('#themeBtn').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

/* ---- mobile menu ---- */
const burger = $('#burger'), menu = $('#menu');
function toggleMenu(open) {
  menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) toggleMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { toggleMenu(false); burger.focus(); } });

/* ---- active section ---- */
const links = $$('.menu a');
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.toggleAttribute('aria-current', a.hash === '#' + en.target.id) && a.setAttribute('aria-current', 'true'));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));
}

/* ---- scroll reveal + back to top ---- */
const revealEls = $$('.reveal');
if ('IntersectionObserver' in window && !reduced) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  revealEls.forEach(r => io.observe(r));
} else revealEls.forEach(r => r.classList.add('in'));
const toTop = $('#toTop');
addEventListener('scroll', () => { toTop.hidden = scrollY < 600; }, { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

/* ---- typing animation ---- */
const typed = $('#typed');
if (reduced) { typed.textContent = CONFIG.ROLES.join(' · '); $('.caret').hidden = true; }
else {
  let r = 0, c = 0, del = false;
  (function tick() {
    const word = CONFIG.ROLES[r];
    typed.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && c === 0) { del = false; r = (r + 1) % CONFIG.ROLES.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 85);
  })();
}

/* ---- skills ---- */
const skillGrid = $('#skillGrid');
SKILLS.forEach(g => {
  const card = el('article', 'card reveal in'); card.appendChild(el('h3', '', g.title));
  const plain = el('ul', 'chips'), withBars = [];
  g.items.forEach(it => {
    if (typeof it.level === 'number') {
      const wrap = el('div', 'skill-item'), row = el('div', 'row');
      row.append(el('span', '', it.name), el('span', '', it.level + '%'));
      const bar = el('div', 'bar'); bar.setAttribute('role', 'progressbar'); bar.setAttribute('aria-label', it.name);
      bar.setAttribute('aria-valuenow', it.level); bar.setAttribute('aria-valuemin', 0); bar.setAttribute('aria-valuemax', 100);
      const fill = el('i'); fill.style.width = Math.max(0, Math.min(100, it.level)) + '%'; bar.appendChild(fill);
      wrap.append(row, bar); withBars.push(wrap);
    } else plain.appendChild(el('li', '', it.name));
  });
  if (plain.children.length) card.appendChild(plain);
  withBars.forEach(w => card.appendChild(w));
  skillGrid.appendChild(card);
});

/* ---- projects ---- */
function linkBtn(label, href, primary) {
  const a = el('a', 'btn small' + (primary ? ' primary' : '') + (isPlaceholder(href) ? ' is-placeholder' : ''), label);
  a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer';
  if (isPlaceholder(href)) a.title = 'Placeholder link: replace it in script.js';
  return a;
}
const projGrid = $('#projGrid'), filters = $('#filters'), dlg = $('#projDialog');
function openDialog(p) {
  $('#dlgImg').src = p.image; $('#dlgImg').alt = p.title + ' project cover graphic';
  $('#dlgTitle').textContent = p.title; $('#dlgDesc').textContent = p.details || p.description;
  const t = $('#dlgTech'); t.textContent = ''; p.tech.forEach(x => t.appendChild(el('li', '', x)));
  const l = $('#dlgLinks'); l.textContent = '';
  if (p.github) l.appendChild(linkBtn('GitHub', p.github)); if (p.demo) l.appendChild(linkBtn('Live demo', p.demo, true));
  if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
}
PROJECTS.forEach(p => {
  const card = el('article', 'card proj reveal in'); card.dataset.category = p.category;
  const img = el('img'); img.src = p.image; img.alt = p.title + ' project cover graphic'; img.width = 800; img.height = 500; img.loading = 'lazy';
  const body = el('div', 'body'); body.append(el('span', 'tag', p.category), el('h3', '', p.title), el('p', '', p.description));
  const tech = el('ul', 'chips'); p.tech.forEach(x => tech.appendChild(el('li', '', x))); body.appendChild(tech);
  const cta = el('div', 'cta'), more = el('button', 'btn small', 'Details'); more.type = 'button'; more.addEventListener('click', () => openDialog(p));
  cta.appendChild(more); if (p.github) cta.appendChild(linkBtn('GitHub', p.github)); if (p.demo) cta.appendChild(linkBtn('Live demo', p.demo, true));
  body.appendChild(cta); card.append(img, body); projGrid.appendChild(card);
});
['All', ...new Set(PROJECTS.map(p => p.category))].forEach((cat, i) => {
  const b = el('button', 'filter', cat); b.type = 'button'; b.setAttribute('aria-pressed', i === 0);
  b.addEventListener('click', () => {
    $$('.filter').forEach(x => x.setAttribute('aria-pressed', x === b));
    $$('.proj').forEach(c => { c.hidden = cat !== 'All' && c.dataset.category !== cat; });
  });
  filters.appendChild(b);
});
$('#dlgClose').addEventListener('click', () => dlg.close ? dlg.close() : dlg.removeAttribute('open'));
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

/* ---- placeholder links: never open a dead page ---- */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (a && isPlaceholder(a.getAttribute('href'))) { e.preventDefault(); toast('Placeholder link. Replace it with your real URL (see README).'); }
});

/* ---- resume: verify file exists on a server; on file:// let the browser handle it ---- */
$$('[data-resume]').forEach(a => a.addEventListener('click', async e => {
  if (location.protocol === 'file:') return;
  e.preventDefault();
  const note = $('#resumeNote');
  try {
    const res = await fetch(a.getAttribute('href'), { method: 'HEAD' });
    if (!res.ok || !/pdf/i.test(res.headers.get('content-type') || '')) throw new Error('missing');
    note.hidden = true;
    const t = document.createElement('a'); t.href = a.getAttribute('href');
    if (a.hasAttribute('download')) t.download = 'resume.pdf'; else { t.target = '_blank'; t.rel = 'noopener'; }
    document.body.appendChild(t); t.click(); t.remove();
  } catch {
    note.hidden = false;
    note.textContent = 'Resume not available yet. The owner needs to add assets/resume.pdf. Please use the contact form or email instead.';
    note.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
  }
}));

/* ---- contact form ---- */
const form = $('#contactForm'), statusEl = $('#formStatus'), sendBtn = $('#sendBtn');
const rules = {
  name: v => v.trim().length >= 2 || 'Please enter your name (at least 2 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Enter a valid email address, e.g. name@domain.com.',
  subject: v => v.trim().length >= 3 || 'Please enter a subject (at least 3 characters).',
  message: v => v.trim().length >= 10 || 'Your message should be at least 10 characters.'
};
function validateField(k) {
  const i = form.elements[k], r = rules[k](i.value);
  $('#err-' + k).textContent = r === true ? '' : r; i.setAttribute('aria-invalid', r !== true); return r === true ? null : i;
}
Object.keys(rules).forEach(k => form.elements[k].addEventListener('input', () => { if (form.elements[k].getAttribute('aria-invalid') === 'true') validateField(k); }));
function setStatus(msg, kind) { statusEl.textContent = msg; statusEl.className = 'status ' + kind; }
let busy = false;
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (busy || form.elements._gotcha.value) return;
  const bad = Object.keys(rules).map(validateField).filter(Boolean);
  if (bad.length) { setStatus('Please fix the highlighted fields.', 'bad'); bad[0].focus(); return; }
  const d = Object.fromEntries(new FormData(form));
  if (!CONFIG.FORM_ENDPOINT) {
    if (isPlaceholder(CONFIG.CONTACT_EMAIL)) { setStatus('Owner setup needed: set CONTACT_EMAIL or FORM_ENDPOINT in script.js. Nothing was sent.', 'bad'); return; }   // honest fallback: nothing is "sent" by the website itself
    const body = `Name: ${d.name}\nEmail: ${d.email}\n\n${d.message}`;
    setStatus('No form service is configured, so your email app is opening. The message is NOT sent until you press Send there.', 'info');
    location.href = `mailto:${CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}`;
    return;
  }
  busy = true; sendBtn.disabled = true; sendBtn.textContent = 'Sending…'; setStatus('Sending your message…', 'info');
  try {
    const res = await fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    setStatus('Thank you! Your message was sent.', 'ok'); form.reset();
  } catch {
    setStatus('Sorry, the message could not be sent. Please try again or email me directly.', 'bad');
  } finally { busy = false; sendBtn.disabled = false; sendBtn.textContent = 'Send message'; }
});

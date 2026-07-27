// language switch: every translatable node carries data-pl / data-en
const KEY = 'lang';
const nodes = document.querySelectorAll('[data-pl][data-en]');
const buttons = document.querySelectorAll('.lang button');

function setLang(lang) {
  document.documentElement.lang = lang;
  nodes.forEach(n => {
    const text = n.dataset[lang];
    if (n.tagName === 'META') n.setAttribute('content', text);
    else n.textContent = text;
  });
  buttons.forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  localStorage.setItem(KEY, lang);
}

buttons.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
setLang(localStorage.getItem(KEY) === 'en' ? 'en' : 'pl');

// lightbox
const box = document.querySelector('.lightbox');
const boxImg = box.querySelector('img');
const triggers = [...document.querySelectorAll('figure button')];
let index = 0;

function show(i) {
  index = (i + triggers.length) % triggers.length;
  const t = triggers[index];
  boxImg.src = t.dataset.full;
  boxImg.alt = t.querySelector('img').alt;
  box.hidden = false;
  document.body.style.overflow = 'hidden';
}

function close() {
  box.hidden = true;
  boxImg.src = '';
  document.body.style.overflow = '';
}

triggers.forEach((t, i) => t.addEventListener('click', () => show(i)));
box.querySelector('.lb-close').addEventListener('click', close);
box.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); show(index - 1); });
box.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); show(index + 1); });
box.addEventListener('click', e => { if (e.target === box || e.target === boxImg) close(); });

document.addEventListener('keydown', e => {
  if (box.hidden) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') show(index - 1);
  if (e.key === 'ArrowRight') show(index + 1);
});

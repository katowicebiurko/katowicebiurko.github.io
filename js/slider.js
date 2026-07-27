// hero slider: native scroll-snap, moves only on user interaction (no autoplay)
const slider = document.querySelector('.slider');
const track = slider.querySelector('.track');
const slides = [...track.children];
const dots = slider.querySelector('.dots');

slides.forEach(() => dots.appendChild(document.createElement('i')));
const marks = [...dots.children];

function current() {
  return Math.round(track.scrollLeft / track.clientWidth);
}

function go(i) {
  const n = Math.max(0, Math.min(slides.length - 1, i));
  track.scrollTo({ left: n * track.clientWidth, behavior: 'smooth' });
}

function paint() {
  const i = current();
  marks.forEach((m, n) => m.classList.toggle('on', n === i));
}

slider.querySelector('.sl-prev').addEventListener('click', () => go(current() - 1));
slider.querySelector('.sl-next').addEventListener('click', () => go(current() + 1));
track.addEventListener('scroll', () => window.requestAnimationFrame(paint), { passive: true });
paint();

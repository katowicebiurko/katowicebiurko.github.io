// hero slider — Swiper (CDN). no autoplay: moves only on user interaction
new Swiper('.hero-slider', {
  slidesPerView: 1,
  loop: true,
  speed: 450,
  grabCursor: true,
  keyboard: { enabled: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  pagination: { el: '.swiper-pagination', clickable: true },
});

// the map iframe would swallow swipes — cover it until the user clicks it
const cover = document.querySelector('.map-cover');
cover.addEventListener('click', () => cover.remove());

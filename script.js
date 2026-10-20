const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  reveals.forEach(element => observer.observe(element));
}
const progress = document.querySelector('.progress');
const orbital = document.querySelector('.orbital');
let scheduled = false;
function updateScroll() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
  if (!reducedMotion.matches && window.scrollY < window.innerHeight) {
    orbital.style.transform = `translateY(${window.scrollY * .14}px) rotate(${-20 + window.scrollY * .06}deg)`;
  }
  scheduled = false;
}
window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
window.addEventListener('resize', updateScroll);
document.getElementById('year').textContent = new Date().getFullYear();
updateScroll();

export function scrollToId(id: string, offset = 120) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });

  el.classList.add("animate-section-pulse");

  setTimeout(() => {
    el.classList.remove("animate-section-pulse");
  }, 1000);
}

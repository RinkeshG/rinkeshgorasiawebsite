document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("[data-readmore]");
  const extra = document.querySelector("[data-extra]");
  if (!btn || !extra) return;
  btn.addEventListener("click", () => {
    const isHidden = extra.hasAttribute("hidden");
    if (isHidden) { extra.removeAttribute("hidden"); btn.textContent = "read less"; }
    else { extra.setAttribute("hidden",""); btn.textContent = "read more"; }
  });
});

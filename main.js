"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("primary-nav");
  const toggle = document.querySelector(".menu-toggle");
  const header = document.querySelector(".site-header");
  const setMenu = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
  };
  toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });
  document.addEventListener("click", (event) => {
    if (nav?.classList.contains("open") && !nav.contains(event.target) && !toggle?.contains(event.target)) setMenu(false);
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 850) setMenu(false); }, {passive:true});
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 12);
  updateHeader();
  window.addEventListener("scroll", updateHeader, {passive:true});
  document.querySelectorAll(".current-year").forEach((el) => {el.textContent = new Date().getFullYear();});
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && "IntersectionObserver" in window) {
    const observed = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          instance.unobserve(entry.target);
        }
      });
    }, {rootMargin:"0px 0px -30px 0px", threshold:0.06});
    observed.forEach((el) => observer.observe(el));
    document.body.classList.add("motion-ready");
  }
});
(() => {
  for (const mock of document.querySelectorAll("[data-context-help]")) {
    const trigger = mock.querySelector(".help-trigger");
    const panel = mock.querySelector(".mock-help-panel");
    const items = [...panel.querySelectorAll("[data-help-target]")];
    let selected = null;
    let preview = null;

    function highlight() {
      const active = preview ?? selected ?? items[0]?.dataset.helpTarget;
      for (const target of mock.querySelectorAll("[data-help-id]")) {
        target.classList.toggle("help-target-active", !panel.hidden && target.dataset.helpId === active);
      }
      for (const item of items) {
        item.setAttribute("aria-pressed", String(item.dataset.helpTarget === selected));
      }
    }

    function close() {
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      selected = preview = null;
      highlight();
      document.removeEventListener("keydown", escape);
      trigger.focus({ preventScroll: true });
    }

    function escape(event) {
      if (event.key === "Escape") close();
    }

    trigger.addEventListener("click", () => {
      if (!panel.hidden) return close();
      panel.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      highlight();
      document.addEventListener("keydown", escape);
    });
    panel.querySelector("[data-help-close]").addEventListener("click", close);

    for (const item of items) {
      for (const event of ["mouseenter", "focus"]) {
        item.addEventListener(event, () => {
          preview = item.dataset.helpTarget;
          highlight();
        });
      }
      for (const event of ["mouseleave", "blur"]) {
        item.addEventListener(event, () => {
          preview = null;
          highlight();
        });
      }
      item.addEventListener("click", () => {
        const id = item.dataset.helpTarget;
        if (selected !== id) {
          const target = [...mock.querySelectorAll("[data-help-id]")].find(target => target.dataset.helpId === id);
          if (target) {
            const rect = target.getBoundingClientRect();
            if (rect.bottom < 0 || rect.right < 0 || rect.top > innerHeight || rect.left > innerWidth) {
              target.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                block: "center",
              });
            }
          }
        }
        selected = selected === id ? null : id;
        highlight();
      });
    }
  }
})();

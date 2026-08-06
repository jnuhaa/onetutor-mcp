/**
 * Add questions page — layout helpers (Figma 2602:4220).
 */
(function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarLogo = document.getElementById("sidebar-logo");
  const coursesBlock = document.getElementById("sidebar-courses-block");
  const labels = document.querySelectorAll("[data-sidebar-label]");
  let collapsed = false;
  function renderSidebar() {
    if (!sidebar) return;
    sidebar.style.width = collapsed ? "106px" : "232px";
    sidebar.style.paddingLeft = collapsed ? "0.75rem" : "2rem";
    sidebar.style.paddingRight = collapsed ? "0.75rem" : "2rem";
    sidebar.classList.toggle("items-center", collapsed);
    sidebarLogo?.classList.toggle("hidden", collapsed);
    coursesBlock?.classList.toggle("hidden", collapsed);
    labels.forEach((el) => el.classList.toggle("hidden", collapsed));
  }
  sidebarToggle?.addEventListener("click", () => {
    collapsed = !collapsed;
    renderSidebar();
  });

  const wizard = document.getElementById("aq-wizard");
  const wizardTrack = document.getElementById("aq-wizard-track");
  const wizardPrev = document.getElementById("aq-wizard-prev");
  const wizardNext = document.getElementById("aq-wizard-next");
  const wizardDots = document.querySelectorAll("[data-wizard-dot]");
  const wizardPanels = document.querySelectorAll(".ot-add-questions__wizard-panel[data-wizard-step]");
  const STEP_COUNT = 3;
  let wizardStep = 0;

  function setWizardStep(next) {
    wizardStep = Math.max(0, Math.min(STEP_COUNT - 1, next));
    if (wizardTrack) {
      wizardTrack.style.transform = `translateX(calc(-${wizardStep} * 100% / ${STEP_COUNT}))`;
    }
    wizard?.setAttribute("data-wizard-step", String(wizardStep));
    if (wizardPrev) wizardPrev.disabled = wizardStep === 0;
    if (wizardNext) {
      const last = wizardStep >= STEP_COUNT - 1;
      wizardNext.classList.toggle("invisible", last);
      wizardNext.classList.toggle("pointer-events-none", last);
      wizardNext.setAttribute("aria-hidden", last ? "true" : "false");
      if (last) wizardNext.setAttribute("tabindex", "-1");
      else wizardNext.removeAttribute("tabindex");
    }
    wizardDots.forEach((dot) => {
      const i = Number(dot.getAttribute("data-wizard-dot"));
      dot.classList.toggle("ot-add-questions__wizard-dot--active", i === wizardStep);
    });
    wizardPanels.forEach((panel) => {
      const i = Number(panel.getAttribute("data-wizard-step"));
      const active = i === wizardStep;
      panel.setAttribute("aria-hidden", active ? "false" : "true");
      panel.toggleAttribute("inert", !active);
    });
  }

  wizardPrev?.addEventListener("click", () => setWizardStep(wizardStep - 1));
  wizardNext?.addEventListener("click", () => setWizardStep(wizardStep + 1));
  wizardDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const i = Number(dot.getAttribute("data-wizard-dot"));
      if (!Number.isNaN(i)) setWizardStep(i);
    });
  });
  setWizardStep(0);

  const generateBtn = document.getElementById("aq-generate-submit");
  const generateLoadingOverlay = document.getElementById("aq-generate-loading-overlay");
  const GENERATE_LOADING_MS = 2800;

  function showGenerateLoading() {
    if (!generateLoadingOverlay || !generateBtn) return;
    generateBtn.disabled = true;
    generateBtn.setAttribute("aria-busy", "true");
    generateLoadingOverlay.classList.remove("hidden");
    generateLoadingOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      generateLoadingOverlay.classList.add("ot-add-questions__loading-overlay--visible");
    });
  }

  function hideGenerateLoading() {
    if (!generateLoadingOverlay || !generateBtn) return;
    generateLoadingOverlay.classList.remove("ot-add-questions__loading-overlay--visible");
    window.setTimeout(() => {
      generateLoadingOverlay.classList.add("hidden");
      generateLoadingOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      generateBtn.disabled = false;
      generateBtn.removeAttribute("aria-busy");
    }, 400);
  }

  generateBtn?.addEventListener("click", () => {
    showGenerateLoading();
    window.setTimeout(() => {
      hideGenerateLoading();
      document.getElementById("aq-review-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, GENERATE_LOADING_MS);
  });

  const range = document.getElementById("aq-ai-range");
  const currentEl = document.getElementById("aq-ai-current");
  const sliderWrap = document.getElementById("aq-ai-slider-wrap");
  const labelsAi = ["Speed", "Balanced", "Quality"];
  /** Figma 2554:3804 — track fill: Speed 0%, Balanced 50%, Quality 100% */
  const fillPcts = ["0%", "50%", "100%"];
  function syncAiLabel() {
    if (!range || !currentEl) return;
    const i = Math.min(2, Math.max(0, Number(range.value)));
    currentEl.textContent = `Currently: ${labelsAi[i]}`;
    range.setAttribute("aria-valuetext", labelsAi[i]);
    sliderWrap?.style.setProperty("--aq-fill-pct", fillPcts[i]);
  }
  range?.addEventListener("input", syncAiLabel);
  syncAiLabel();

  /* Describe field — same prompt-bubble behavior as homepage chat composer (course-page.js) */
  const describeComposer = document.getElementById("aq-describe-composer");
  const describeInput = document.getElementById("aq-describe");
  const describePromptBubbles = document.getElementById("aq-describe-prompt-bubbles");

  function setDescribePromptsOpen(open) {
    if (!describeComposer || !describePromptBubbles) return;
    describeComposer.classList.toggle("ot-chat-composer--prompts-open", Boolean(open));
    describePromptBubbles.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function syncDescribeComposerTypingState() {
    if (!describeComposer || !describeInput) return;
    describeComposer.classList.toggle("ot-chat-composer--has-text", describeInput.value.trim().length > 0);
  }

  describeInput?.addEventListener("input", syncDescribeComposerTypingState);
  describeInput?.addEventListener("focus", () => setDescribePromptsOpen(true));
  describeComposer?.addEventListener("focusout", (e) => {
    const next = e.relatedTarget;
    if (next && describeComposer.contains(next)) return;
    setDescribePromptsOpen(false);
  });
  describeComposer?.addEventListener("click", (e) => {
    const t = e.target;
    if (t === describeComposer || (t && t.classList && t.classList.contains("ot-chat-input-wrap"))) {
      describeInput?.focus();
    }
  });
  describeComposer?.querySelectorAll(".ot-chat-prompt-bubble").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.dataset.prompt;
      if (!text || !describeInput) return;
      describeInput.value = text;
      syncDescribeComposerTypingState();
      describeInput.focus();
    });
  });
  syncDescribeComposerTypingState();

  document.querySelector(".ot-add-questions__deselect-all")?.addEventListener("click", () => {
    document
      .querySelector(".ot-add-questions__materials-body > .ot-add-questions__materials-block")
      ?.querySelectorAll(".ot-add-questions__checkbox")
      .forEach((cb) => {
        cb.checked = false;
      });
  });

  if (window.lucide?.createIcons) window.lucide.createIcons();
})();

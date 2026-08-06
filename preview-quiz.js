/**
 * Preview Quiz — Figma 2775:4004 (selected), 2780:4324 (incorrect), 2775:4111 (OneTutor AI overlay).
 */
(function () {
  const questions = [
    {
      type: "Multiple Choice",
      text: 'Which hormone is primarily associated with the body\'s stress response and is often called the "stress hormone"?',
      options: ["Adrenaline", "Serotonin", "Cortisol", "Dopamine"],
      correctIndex: 2,
      hint: "Cortisol is released by the adrenal glands in response to stress and helps regulate metabolism, immune response, and blood pressure.",
      hintSource: "Source: Psychology Fundamentals - Slide 12",
    },
    {
      type: "Multiple Choice",
      text: "What does LTP stand for in the context of synaptic plasticity?",
      options: [
        "Long-term potentiation",
        "Lateral tissue pathway",
        "Limbic transmission pulse",
        "Localized transmitter pool",
      ],
      correctIndex: 0,
      hint: "Long-term potentiation is a lasting increase in synaptic strength following high-frequency stimulation.",
      hintSource: "Source: Synaptic plasticity reader",
    },
    {
      type: "Multiple Choice",
      text: "Which practice most reliably supports healthy neuroplastic change?",
      options: ["Cramming once", "Spaced deliberate practice", "Avoiding sleep", "Multitasking under stress"],
      correctIndex: 1,
      hint: "Repeated, spaced practice with focused attention strengthens the pathways you want to keep.",
      hintSource: "Source: WS26 Week 1 materials",
    },
  ];

  let index = 0;
  let selected = null;
  let feedback = null; // null | "incorrect" | "correct"
  let hintOpen = false;
  let secondsLeft = 2 * 60 + 34;

  const els = {
    name: document.getElementById("preview-quiz-name"),
    progressLabel: document.getElementById("preview-progress-label"),
    progressPct: document.getElementById("preview-progress-pct"),
    progressFill: document.getElementById("preview-progress-fill"),
    type: document.getElementById("preview-question-type"),
    question: document.getElementById("preview-question-text"),
    options: document.getElementById("preview-options"),
    timer: document.getElementById("preview-timer"),
    hintToggle: document.getElementById("preview-hint-toggle"),
    hintPanel: document.getElementById("preview-hint-panel"),
    hintText: document.getElementById("preview-hint-text"),
    hintSource: document.getElementById("preview-hint-source"),
    prev: document.getElementById("preview-prev"),
    next: document.getElementById("preview-next"),
    skip: document.getElementById("preview-skip"),
    aiFab: document.getElementById("preview-ai-fab"),
    aiPanel: document.getElementById("preview-ai-panel"),
    aiClose: document.getElementById("preview-ai-close"),
    aiBackdrop: document.getElementById("preview-ai-backdrop"),
    aiMessages: document.getElementById("preview-ai-messages"),
    aiForm: document.getElementById("preview-ai-form"),
    aiInput: document.getElementById("preview-ai-input"),
  };

  const TOTAL = 15;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function progressPct() {
    return Math.round(((index + 1) / TOTAL) * 100);
  }

  function renderProgress() {
    const pct = progressPct();
    if (els.progressLabel) els.progressLabel.textContent = `Question ${index + 1} of ${TOTAL}`;
    if (els.progressPct) els.progressPct.textContent = `${pct}%`;
    if (els.progressFill) els.progressFill.style.width = `${pct}%`;
  }

  function optionClass(i) {
    const base = "ot-preview-quiz__option";
    if (selected !== i) return base;
    if (feedback === "incorrect") return `${base} ${base}--incorrect`;
    if (feedback === "correct") return `${base} ${base}--correct`;
    return `${base} ${base}--selected`;
  }

  function renderOptions() {
    const q = questions[index];
    if (!els.options || !q) return;
    els.options.innerHTML = q.options
      .map((label, i) => {
        const selectedAttr = selected === i ? 'aria-checked="true"' : 'aria-checked="false"';
        return `
        <button type="button" class="${optionClass(i)}" role="radio" ${selectedAttr} data-option-index="${i}">
          <span class="ot-preview-quiz__radio" aria-hidden="true"><span class="ot-preview-quiz__radio-dot"></span></span>
          <span class="ot-preview-quiz__option-label">${label}</span>
        </button>`;
      })
      .join("");

    els.options.querySelectorAll("[data-option-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (feedback) return;
        selected = Number(btn.dataset.optionIndex);
        renderOptions();
      });
    });

    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  function renderHint() {
    const q = questions[index];
    if (!els.hintPanel || !q) return;
    els.hintText.textContent = `“${q.hint}”`;
    els.hintSource.textContent = q.hintSource;
    els.hintPanel.hidden = !hintOpen;
    els.hintToggle?.setAttribute("aria-expanded", hintOpen ? "true" : "false");
  }

  function renderQuestion() {
    const q = questions[index];
    if (!q) return;
    if (els.type) els.type.textContent = q.type;
    if (els.question) els.question.textContent = q.text;
    renderProgress();
    renderOptions();
    renderHint();
  }

  function goTo(nextIndex) {
    index = Math.max(0, Math.min(questions.length - 1, nextIndex));
    selected = null;
    feedback = null;
    hintOpen = false;
    if (els.aiMessages) {
      delete els.aiMessages.dataset.seeded;
      els.aiMessages.innerHTML = "";
      if (els.aiFab?.getAttribute("aria-expanded") === "true") seedAiMessages();
    }
    renderQuestion();
  }

  els.hintToggle?.addEventListener("click", () => {
    hintOpen = !hintOpen;
    renderHint();
  });

  els.prev?.addEventListener("click", () => {
    if (index > 0) goTo(index - 1);
  });

  els.skip?.addEventListener("click", () => {
    if (index < questions.length - 1) goTo(index + 1);
    else window.location.href = "manage-quizzes.html";
  });

  els.next?.addEventListener("click", () => {
    const q = questions[index];
    if (!q) return;
    if (selected == null) return;

    if (!feedback) {
      if (selected === q.correctIndex) {
        feedback = "correct";
        renderOptions();
        window.setTimeout(() => {
          if (index < questions.length - 1) goTo(index + 1);
          else window.location.href = "manage-quizzes.html";
        }, 450);
      } else {
        feedback = "incorrect";
        renderOptions();
      }
      return;
    }

    if (index < questions.length - 1) goTo(index + 1);
    else window.location.href = "manage-quizzes.html";
  });

  /* —— OneTutor AI overlay —— */
  function setAiOpen(open) {
    if (!els.aiPanel || !els.aiFab) return;
    els.aiPanel.hidden = !open;
    els.aiPanel.setAttribute("aria-hidden", open ? "false" : "true");
    els.aiFab.setAttribute("aria-expanded", open ? "true" : "false");
    els.aiFab.classList.toggle("ot-preview-quiz__ai-fab--open", open);
    if (els.aiBackdrop) els.aiBackdrop.hidden = !open;
    document.body.classList.toggle("ot-preview-quiz--ai-open", open);
    if (open) {
      seedAiMessages();
      els.aiInput?.focus();
    }
  }

  function seedAiMessages() {
    if (!els.aiMessages || els.aiMessages.dataset.seeded === "1") return;
    const q = questions[index];
    els.aiMessages.innerHTML = `
      <div class="ot-preview-quiz__ai-bubble ot-preview-quiz__ai-bubble--assistant">
        I’m here while you preview this quiz. Want a nudge on “${q?.options?.[q.correctIndex] ?? "this question"}” without spoiling everything?
      </div>
      <div class="ot-preview-quiz__ai-suggestions">
        <button type="button" class="ot-preview-quiz__ai-chip" data-prompt="Give me a gentle hint for this question">Gentle hint</button>
        <button type="button" class="ot-preview-quiz__ai-chip" data-prompt="Explain why my answer might be wrong">Why might I be wrong?</button>
        <button type="button" class="ot-preview-quiz__ai-chip" data-prompt="Summarize the key concept in one sentence">Key concept</button>
      </div>`;
    els.aiMessages.dataset.seeded = "1";
    els.aiMessages.querySelectorAll("[data-prompt]").forEach((btn) => {
      btn.addEventListener("click", () => sendAi(btn.dataset.prompt));
    });
  }

  function appendBubble(text, role) {
    if (!els.aiMessages) return;
    const div = document.createElement("div");
    div.className = `ot-preview-quiz__ai-bubble ot-preview-quiz__ai-bubble--${role}`;
    div.textContent = text;
    els.aiMessages.appendChild(div);
    els.aiMessages.scrollTop = els.aiMessages.scrollHeight;
  }

  function replyFor(prompt) {
    const q = questions[index];
    const lower = (prompt || "").toLowerCase();
    if (lower.includes("hint") || lower.includes("gentle")) {
      return q?.hint || "Think about which gland releases the classic stress hormone.";
    }
    if (lower.includes("wrong")) {
      return "If you picked a neurotransmitter involved in mood or reward, remember the stress response is driven by a steroid hormone from the adrenal cortex.";
    }
    if (lower.includes("concept") || lower.includes("summar")) {
      return "Cortisol is the primary glucocorticoid linked to the HPA-axis stress response.";
    }
    return "Ask for a gentle hint, why an option might be wrong, or a one-sentence key concept — I’ll keep spoilers light while you preview.";
  }

  function sendAi(text) {
    const value = (text || "").trim();
    if (!value) return;
    appendBubble(value, "user");
    window.setTimeout(() => appendBubble(replyFor(value), "assistant"), 280);
    if (els.aiInput) els.aiInput.value = "";
  }

  els.aiFab?.addEventListener("click", () => {
    const open = els.aiFab.getAttribute("aria-expanded") !== "true";
    setAiOpen(open);
  });
  els.aiClose?.addEventListener("click", () => setAiOpen(false));
  els.aiBackdrop?.addEventListener("click", () => setAiOpen(false));
  els.aiForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    sendAi(els.aiInput?.value);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setAiOpen(false);
  });

  /* Timer */
  if (els.timer) els.timer.textContent = formatTime(secondsLeft);
  window.setInterval(() => {
    if (secondsLeft <= 0) return;
    secondsLeft -= 1;
    if (els.timer) els.timer.textContent = formatTime(secondsLeft);
  }, 1000);

  renderQuestion();
  if (window.lucide?.createIcons) window.lucide.createIcons();
})();

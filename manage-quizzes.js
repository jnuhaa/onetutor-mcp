/**
 * Manage Quizzes page — demo data + grid / question list (Figma 2461:9445, 2529:3306).
 */
(function () {
  const rawQuizzes = [
    {
      title: "Synaptic plasticity and learning",
      blurb: "How experience-dependent changes at the synapse support memory and skill acquisition.",
      quizType: "Practice",
      questions: 15,
      levels: [3, 8, 4],
      created: "15.02.2025",
    },
    {
      title: "Neurogenesis across the lifespan",
      blurb: "Adult-born neurons, environmental enrichment, and what “rewiring” really means in practice.",
      quizType: "Exam",
      questions: 10,
      levels: [4, 0, 6],
      created: "15.02.2025",
    },
    {
      title: "Stress, cortisol, and the brain",
      blurb: "HPA axis basics, acute vs chronic stress, and implications for attention and consolidation.",
      quizType: "Assessment",
      questions: 32,
      levels: [3, 20, 9],
      created: "15.02.2025",
    },
    {
      title: "Attention, distraction, and plasticity",
      blurb: "Selective attention, multitasking myths, and how focus shapes what the brain strengthens.",
      quizType: "Exam",
      questions: 6,
      levels: [0, 2, 4],
      created: "15.02.2025",
    },
    {
      title: "Myelination and critical periods",
      blurb: "Windows of heightened plasticity, sensitive phases in development, and how insulation shapes signal speed.",
      quizType: "Practice",
      questions: 6,
      levels: [0, 2, 4],
      created: "12.02.2025",
    },
    {
      title: "Default mode and executive networks",
      blurb: "Task-positive vs task-negative systems, mind-wandering, and how attention training shows up in connectivity.",
      quizType: "Exam",
      questions: 12,
      levels: [5, 5, 2],
      created: "10.02.2025",
    },
    {
      title: "Sleep, BDNF, and physical activity",
      blurb: "Slow-wave sleep, spindles, glymphatic clearance, and why movement is a lever for neurotrophic support.",
      quizType: "Assessment",
      questions: 18,
      levels: [6, 9, 3],
      created: "08.02.2025",
    },
    {
      title: "Growth mindset and measurable learning",
      blurb: "Beliefs about ability, effort framing, and what outcome studies do (and don’t) support in the classroom.",
      quizType: "Practice",
      questions: 14,
      levels: [4, 7, 3],
      created: "05.02.2025",
    },
  ];

  const gridQuizzes = [...rawQuizzes];

  function normalizeQuiz(q) {
    return {
      title: q.title,
      blurb: q.blurb || "Quiz content summary for this course.",
      quizType: q.quizType || "Practice",
      questions: q.questions ?? 10,
      levels: q.levels || [0, 0, 0],
      created: q.created || "15.02.2025",
    };
  }

  let demoQuestions = [
    { text: "What are counterparts of cortisol?", type: "Free-text", difficulty: "Medium", hidden: false, points: 5 },
    {
      text: "What is cortisol caused by?",
      type: "Multiple-choice",
      difficulty: "Hard",
      hidden: true,
      points: 10,
    },
    { text: "What does cortisol do?", type: "Multiple-choice", difficulty: "Easy", hidden: false, points: 1 },
    { text: "Which statement best describes LTP?", type: "Single-choice", difficulty: "Hard", hidden: false, points: 10 },
    { text: "True or false: Neuroplasticity stops after childhood.", type: "True-false", difficulty: "Easy", hidden: false, points: 1 },
    { text: "Compare habit formation and one-off learning.", type: "Free-text", difficulty: "Medium", hidden: false, points: 5 },
    { text: "List three factors that support healthy plasticity.", type: "Free-text", difficulty: "Medium", hidden: false, points: 5 },
    { text: "What is the role of NMDA receptors in LTP?", type: "Multiple-choice", difficulty: "Hard", hidden: false, points: 10 },
    { text: "Define long-term depression (LTD) and give one synaptic context where it matters.", type: "Free-text", difficulty: "Hard", hidden: false, points: 10 },
    { text: "Name two brain-derived factors that rise with aerobic exercise and support plasticity.", type: "Multiple-choice", difficulty: "Medium", hidden: false, points: 5 },
    { text: "True or false: Adult neurogenesis in the hippocampus has no functional relevance.", type: "True-false", difficulty: "Medium", hidden: false, points: 1 },
    { text: "Explain metaplasticity in one sentence.", type: "Free-text", difficulty: "Hard", hidden: false, points: 10 },
    { text: "Which intervention most directly targets working memory capacity?", type: "Single-choice", difficulty: "Easy", hidden: false, points: 1 },
    { text: "Describe how sleep deprivation affects memory consolidation after learning.", type: "Free-text", difficulty: "Medium", hidden: false, points: 5 },
    { text: "Match each term: spike-timing–dependent plasticity, homeostatic scaling, structural plasticity.", type: "Multiple-choice", difficulty: "Hard", hidden: false, points: 10 },
    { text: "True or false: Multitasking on cognitively demanding tasks improves long-term retention.", type: "True-false", difficulty: "Easy", hidden: false, points: 1 },
    { text: "What is the difference between compensatory plasticity and maladaptive plasticity?", type: "Free-text", difficulty: "Medium", hidden: false, points: 5 },
    { text: "Rank these by typical cortisol response: acute stress, chronic stress, recovery sleep.", type: "Single-choice", difficulty: "Medium", hidden: false, points: 5 },
    { text: "Outline one evidence-based strategy to reduce stereotype threat in assessment settings.", type: "Free-text", difficulty: "Hard", hidden: false, points: 10 },
  ];

  let selectedIndex = 0;

  function levelDots(levels) {
    const colors = ["var(--onetutor-level-easy)", "var(--onetutor-level-medium)", "var(--onetutor-level-hard)"];
    return levels
      .map((n, i) => ({ n, color: colors[i] }))
      .filter((x) => x.n > 0)
      .map(
        (x) =>
          `<span class="ot-manage-quizzes-card__level"><span class="ot-manage-quizzes-card__dot" style="background:${x.color}" aria-hidden="true"></span><span class="ot-body-tiny text-[var(--onetutor-text-main)]">${x.n}</span></span>`
      )
      .join("");
  }

  function renderCard(q, i, isSelected) {
    const item = normalizeQuiz(q);
    const sel = isSelected ? " ot-manage-quizzes-card--selected" : "";
    return `
      <article class="ot-manage-quizzes-card ot-solid-surface ot-hover-mode--object${sel}" data-quiz-index="${i}" role="button" tabindex="0" aria-pressed="${isSelected}">
        <div class="ot-manage-quizzes-card__top">
          <div class="ot-manage-quizzes-card__title-row">
            <p class="ot-manage-quizzes-card__name ot-card-title-compact">${item.title}</p>
            <span class="ot-manage-quizzes-card__type-pill ot-body-tiny">${item.quizType}</span>
          </div>
          <p class="ot-body-tiny ot-manage-quizzes-card__blurb">${item.blurb}</p>
        </div>
        <div class="ot-manage-quizzes-card__bottom">
          <div class="ot-manage-quizzes-card__meta-row">
            <p class="ot-body-tiny"><span class="ot-manage-quizzes-desc">Questions: </span><span class="ot-manage-quizzes-card__meta-value">${item.questions}</span></p>
            <div class="ot-manage-quizzes-card__levels" aria-label="Question levels">${levelDots(item.levels)}</div>
          </div>
          <div class="ot-manage-quizzes-card__actions-row">
            <p class="ot-body-tiny ot-manage-quizzes-desc">Created ${item.created}</p>
            <div class="ot-manage-quizzes-card__icon-pill">
              <button type="button" class="ot-manage-quizzes-icon-btn" aria-label="Edit quiz"><i data-lucide="pencil" class="h-4 w-4 ot-thin-arrow"></i></button>
              <button type="button" class="ot-manage-quizzes-icon-btn" aria-label="Delete quiz"><i data-lucide="trash-2" class="h-4 w-4 ot-thin-arrow"></i></button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function scrollToQuestionsPanel() {
    const el = document.getElementById("manage-quizzes-questions");
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderGrid(filter) {
    const host = document.getElementById("manage-quizzes-grid");
    if (!host) return;
    const q = filter.trim().toLowerCase();
    const indices = gridQuizzes
      .map((_, i) => i)
      .filter((i) => {
        const item = normalizeQuiz(gridQuizzes[i]);
        if (!q) return true;
        return item.title.toLowerCase().includes(q) || item.blurb.toLowerCase().includes(q);
      });

    if (indices.length === 0) {
      host.innerHTML = `<p class="ot-body-small ot-manage-quizzes-desc py-8 text-center w-full">No quizzes match your search.</p>`;
      return;
    }

    host.innerHTML = indices
      .map((i) => {
        const isSelected = i === selectedIndex;
        return renderCard(gridQuizzes[i], i, isSelected);
      })
      .join("");

    host.querySelectorAll(".ot-manage-quizzes-card").forEach((card) => {
      const idx = Number.parseInt(card.dataset.quizIndex, 10);
      const activate = () => {
        selectedIndex = idx;
        renderGrid(document.getElementById("manage-quizzes-search")?.value || "");
        renderQuestionRows();
        scrollToQuestionsPanel();
      };
      card.addEventListener("click", (e) => {
        if (e.target.closest(".ot-manage-quizzes-icon-btn")) return;
        activate();
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
    });

    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  function difficultyClass(d) {
    if (d === "Easy") return "ot-manage-quizzes-diff--easy";
    if (d === "Medium") return "ot-manage-quizzes-diff--medium";
    return "ot-manage-quizzes-diff--hard";
  }

  function reorderQuestionRows(from, to) {
    if (from === to || from < 0 || to < 0 || from >= demoQuestions.length || to >= demoQuestions.length) return;
    const item = demoQuestions.splice(from, 1)[0];
    demoQuestions.splice(to, 0, item);
  }

  function setupQuestionDrag() {
    const body = document.getElementById("manage-quizzes-q-rows");
    if (!body) return;

    body.querySelectorAll(".ot-manage-quizzes-qrow").forEach((row) => {
      const handle = row.querySelector("[data-drag-handle]");
      if (!handle) return;

      handle.addEventListener("mousedown", () => {
        row.setAttribute("draggable", "true");
      });
      row.addEventListener("dragend", () => {
        row.removeAttribute("draggable");
        row.classList.remove("ot-manage-quizzes-qrow--dragging");
      });
      row.addEventListener("dragstart", (e) => {
        if (!e.target.closest("[data-drag-handle]")) {
          e.preventDefault();
          return;
        }
        const from = Number.parseInt(row.dataset.questionIndex, 10);
        e.dataTransfer.setData("text/plain", String(from));
        e.dataTransfer.effectAllowed = "move";
        row.classList.add("ot-manage-quizzes-qrow--dragging");
      });
      row.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });
      row.addEventListener("drop", (e) => {
        e.preventDefault();
        const from = Number.parseInt(e.dataTransfer.getData("text/plain"), 10);
        const to = Number.parseInt(row.dataset.questionIndex, 10);
        if (Number.isNaN(from) || Number.isNaN(to)) return;
        reorderQuestionRows(from, to);
        renderQuestionRows();
      });
    });
  }

  function buildQuestionRowsHtml() {
    let visibleOrdinal = 0;
    const displayOrdinals = demoQuestions.map((q) => {
      if (q.hidden) return null;
      visibleOrdinal += 1;
      return visibleOrdinal;
    });

    return demoQuestions
      .map((row, ri) => {
        const hidden = !!row.hidden;
        const ord = displayOrdinals[ri];
        const indexHtml =
          ord == null
            ? '<span class="ot-body-small ot-manage-quizzes-qrow__index ot-manage-quizzes-qrow__index--skipped" aria-hidden="true">—</span>'
            : `<span class="ot-body-small ot-manage-quizzes-qrow__index">${ord}.</span>`;
        const statusIcon = hidden
          ? '<i data-lucide="eye-off" class="ot-manage-quizzes-status-icon ot-manage-quizzes-status-icon--hidden ot-thin-arrow" aria-hidden="true"></i>'
          : '<i data-lucide="book-open-check" class="ot-manage-quizzes-status-icon ot-thin-arrow" aria-hidden="true"></i>';
        const rowHiddenClass = hidden ? " ot-manage-quizzes-qrow--hidden" : "";
        const statusLabel = hidden ? "Show question to students" : "Hide question from students";
        const statusTip = hidden ? "Show" : "Hide";
        return `
      <div class="ot-manage-quizzes-qrow${rowHiddenClass}" role="row" data-question-index="${ri}">
        <div class="ot-manage-quizzes-qrow__inner">
          <div class="ot-manage-quizzes-qrow__grid">
            <div class="ot-manage-quizzes-qlist__cell ot-manage-quizzes-qlist__cell--question" role="cell">
              <span class="ot-manage-quizzes-qrow__question-wrap">
                ${indexHtml}
                <span class="ot-body-small ot-manage-quizzes-qrow__question">${row.text}</span>
              </span>
            </div>
            <div class="ot-manage-quizzes-qlist__cell ot-manage-quizzes-qlist__cell--fixed ot-manage-quizzes-qlist__cell--badge" role="cell">
              <span class="ot-manage-quizzes-type-pill ot-body-tiny">${row.type}</span>
            </div>
            <div class="ot-manage-quizzes-qlist__cell ot-manage-quizzes-qlist__cell--fixed ot-manage-quizzes-qlist__cell--badge" role="cell">
              <span class="ot-manage-quizzes-diff ${difficultyClass(row.difficulty)} ot-body-tiny">${row.difficulty}</span>
            </div>
            <div class="ot-manage-quizzes-qlist__cell ot-manage-quizzes-qlist__cell--fixed ot-manage-quizzes-qlist__cell--center" role="cell">
              <button type="button" class="ot-manage-quizzes-status-toggle ot-hover-mode--interactive ot-hover-tooltip" data-status-toggle data-question-index="${ri}" aria-label="${statusLabel}" aria-pressed="${hidden}">
                <span class="ot-hover-tooltip__bubble" role="tooltip" aria-hidden="true">${statusTip}</span>
                ${statusIcon}
              </button>
            </div>
            <div class="ot-manage-quizzes-qlist__cell ot-manage-quizzes-qlist__cell--fixed ot-manage-quizzes-qlist__cell--center ot-body-small ot-manage-quizzes-qrow__points" role="cell">${row.points}</div>
            <div class="ot-manage-quizzes-qlist__cell ot-manage-quizzes-qlist__cell--fixed ot-manage-quizzes-qlist__cell--center ot-manage-quizzes-qrow__actions" role="cell">
              <button type="button" class="ot-manage-quizzes-icon-btn ot-hover-tooltip" aria-label="Edit question">
                <span class="ot-hover-tooltip__bubble" role="tooltip" aria-hidden="true">Edit</span>
                <i data-lucide="pencil" class="ot-manage-quizzes-row-action-icon ot-thin-arrow"></i>
              </button>
              <button type="button" class="ot-manage-quizzes-icon-btn ot-hover-tooltip" aria-label="Delete question">
                <span class="ot-hover-tooltip__bubble" role="tooltip" aria-hidden="true">Delete</span>
                <i data-lucide="trash-2" class="ot-manage-quizzes-row-action-icon ot-thin-arrow"></i>
              </button>
              <button type="button" class="ot-manage-quizzes-drag ot-hover-tooltip" data-drag-handle aria-label="Drag to reorder question">
                <span class="ot-hover-tooltip__bubble" role="tooltip" aria-hidden="true">Drag and move</span>
                <i data-lucide="grip-horizontal" class="ot-manage-quizzes-grip-icon ot-thin-arrow"></i>
              </button>
            </div>
          </div>
        </div>
      </div>`;
      })
      .join("");
  }

  function renderQuestionRows() {
    const titleEl = document.getElementById("manage-quizzes-questions-title");
    const body = document.getElementById("manage-quizzes-q-rows");
    if (!titleEl || !body) return;
    const quiz = normalizeQuiz(gridQuizzes[selectedIndex]);
    titleEl.textContent = `Questions in ‘${quiz.title}’`;
    body.innerHTML = buildQuestionRowsHtml();
    finalizeQuestionRowsDom();
  }

  function finalizeQuestionRowsDom() {
    if (window.lucide?.createIcons) window.lucide.createIcons();
    setupQuestionDrag();
    setupQuestionStatusToggle();
  }

  /** After show/hide toggle: update row + ordinals without replacing the whole list (avoids flicker). */
  function refreshQuestionRowOrdinals() {
    const body = document.getElementById("manage-quizzes-q-rows");
    if (!body) return;
    let visibleOrdinal = 0;
    body.querySelectorAll(".ot-manage-quizzes-qrow").forEach((row) => {
      const ri = Number.parseInt(row.dataset.questionIndex, 10);
      if (Number.isNaN(ri) || ri < 0 || ri >= demoQuestions.length) return;
      const hidden = !!demoQuestions[ri].hidden;
      const wrap = row.querySelector(".ot-manage-quizzes-qrow__question-wrap");
      if (!wrap) return;
      const indexSpan = wrap.children[0];
      if (!indexSpan) return;
      if (hidden) {
        indexSpan.className = "ot-body-small ot-manage-quizzes-qrow__index ot-manage-quizzes-qrow__index--skipped";
        indexSpan.textContent = "—";
        indexSpan.setAttribute("aria-hidden", "true");
      } else {
        visibleOrdinal += 1;
        indexSpan.className = "ot-body-small ot-manage-quizzes-qrow__index";
        indexSpan.textContent = `${visibleOrdinal}.`;
        indexSpan.removeAttribute("aria-hidden");
      }
    });
  }

  function syncQuestionRowVisibility(ri) {
    const row = document.querySelector(
      `#manage-quizzes-q-rows .ot-manage-quizzes-qrow[data-question-index="${ri}"]`
    );
    if (!row) return;
    const hidden = !!demoQuestions[ri].hidden;
    row.classList.toggle("ot-manage-quizzes-qrow--hidden", hidden);
    const btn = row.querySelector("[data-status-toggle]");
    if (btn) {
      const statusLabel = hidden ? "Show question to students" : "Hide question from students";
      const statusTip = hidden ? "Show" : "Hide";
      btn.setAttribute("aria-label", statusLabel);
      btn.setAttribute("aria-pressed", String(hidden));
      const bubble = btn.querySelector(".ot-hover-tooltip__bubble");
      if (bubble) bubble.textContent = statusTip;
      const icon = btn.querySelector("i[data-lucide]");
      if (icon) {
        icon.setAttribute("data-lucide", hidden ? "eye-off" : "book-open-check");
        icon.classList.toggle("ot-manage-quizzes-status-icon--hidden", hidden);
      }
    }
    refreshQuestionRowOrdinals();
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  function setupQuestionStatusToggle() {
    const body = document.getElementById("manage-quizzes-q-rows");
    if (!body) return;
    body.querySelectorAll("[data-status-toggle]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const ri = Number.parseInt(btn.dataset.questionIndex, 10);
        if (Number.isNaN(ri) || ri < 0 || ri >= demoQuestions.length) return;
        demoQuestions[ri].hidden = !demoQuestions[ri].hidden;
        syncQuestionRowVisibility(ri);
      });
    });
  }

  const searchEl = document.getElementById("manage-quizzes-search");
  if (searchEl) {
    searchEl.addEventListener("input", () => renderGrid(searchEl.value));
  }

  document.getElementById("manage-quizzes-view-toggle")?.addEventListener("click", () => {
    document.getElementById("manage-quizzes-grid")?.classList.toggle("ot-manage-quizzes-grid--list");
  });

  renderGrid("");
  renderQuestionRows();

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
  if (window.lucide?.createIcons) window.lucide.createIcons();
})();

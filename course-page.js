/**
 * Shared course page behavior for instructor (index.html) and student (student.html).
 * Set <body data-course-page="instructor"> or data-course-page="student">.
 */
(function () {
  const COURSE_PAGE = document.body.dataset.coursePage || "instructor";

  const quizzes = [
    {
      title: "What is Neuroplasticity?",
      blurb: "Definitions, myths, and how experience shapes the brain",
      quizType: "Assessment",
      questions: 15,
      levels: [3, 8, 4],
      created: "15.02.2025",
    },
    {
      title: "Synapses, LTP, and practice",
      blurb: "Hebbian learning and strengthening pathways",
      quizType: "Practice",
      questions: 10,
      levels: [4, 6, 0],
      created: "15.02.2025",
    },
    {
      title: "WS26 Midterm mock exam",
      blurb: "Integrates habits, attention, and long-term change",
      quizType: "Exam",
      questions: 32,
      levels: [3, 20, 9],
      created: "15.02.2025",
    },
    { title: "Neuroplasticity Across the Lifespan", questions: 6, levels: [0, 2, 4] },
    { title: "Attention and brain rewiring", questions: 12, levels: [5, 5, 2] },
    { title: "Sleep, Exercise, and Plasticity", questions: 18, levels: [6, 9, 3] },
    { title: "Growth mindset and the science", questions: 14, levels: [4, 7, 3] },
  ];

  const materials = [
    {
      title: "WS26 Week 1 - What is neuroplasticity?",
      fileExt: ".txt",
      uploaded: "15.02.2025",
      typeLabel: "Word",
      quizzes: 2,
    },
    {
      title: "Synaptic plasticity & Hebbian learning (reader)",
      fileExt: ".pdf",
      uploaded: "15.02.2025",
      typeLabel: "PDF",
      quizzes: 8,
    },
    {
      title: "Interview: experience-dependent plasticity",
      fileExt: ".vid",
      uploaded: "15.02.2025",
      typeLabel: "Video",
      quizzes: 21,
    },
    { title: "Brain Regions Diagram_WS26", typeLabel: "Image", quizzes: 9 },
    { title: "Neuroplasticity habit workbook", typeLabel: "PDF", quizzes: 5 },
    { title: "Clip: practice and myelination", typeLabel: "Video", quizzes: 3 },
    { title: "Reflection journal: my learning habits", typeLabel: "Word", quizzes: 1 },
  ];

  function quizCard(item) {
    return `
          <article class="ot-rail-card ot-solid-surface ot-card-hover ot-hover-mode--object border border-[var(--onetutor-card-border)] rounded-[6px] w-[232px] min-w-[232px] h-[192px] p-6 flex flex-col min-h-0">
            <div class="w-full flex-1 min-h-0 py-4 flex flex-col">
              <p class="ot-card-title-compact">${item.title}</p>
            </div>
            <div class="flex items-center justify-between w-full shrink-0 gap-2">
              <div class="flex items-center gap-0 min-w-0 ot-body-tiny">
                <span class="text-[var(--slate-500)]">Questions: </span>
                <span class="text-[var(--onetutor-text-main)]">${item.questions}</span>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <span class="inline-flex items-center gap-1 ot-body-tiny text-[var(--onetutor-text-main)]"><span class="text-[var(--onetutor-level-easy)]">●</span>${item.levels[0]}</span>
                <span class="inline-flex items-center gap-1 ot-body-tiny text-[var(--onetutor-text-main)]"><span class="text-[var(--onetutor-level-medium)]">●</span>${item.levels[1]}</span>
                <span class="inline-flex items-center gap-1 ot-body-tiny text-[var(--onetutor-text-main)]"><span class="text-[var(--onetutor-level-hard)]">●</span>${item.levels[2]}</span>
              </div>
            </div>
          </article>
        `;
  }

  function materialCard(item) {
    return `
          <article class="ot-rail-card ot-solid-surface ot-card-hover ot-hover-mode--object border border-[var(--onetutor-card-border)] rounded-[6px] w-[232px] min-w-[232px] h-[192px] p-6 flex flex-col min-h-0">
            <div class="w-full flex-1 min-h-0 py-4 flex flex-col">
              <p class="ot-card-title-compact">${item.title}</p>
            </div>
            <div class="flex items-center justify-between w-full shrink-0 gap-2">
              <div class="flex items-center gap-0 min-w-0 ot-body-tiny">
                <span class="text-[var(--slate-500)]">Type: </span>
                <span class="text-[var(--onetutor-text-main)]">${item.typeLabel}</span>
              </div>
              <div class="inline-flex items-center gap-1 shrink-0 ot-body-tiny text-[var(--onetutor-text-main)]">
                <span class="text-[var(--onetutor-brand-accent)]">●</span>${item.quizzes} quizzes
              </div>
            </div>
          </article>
        `;
  }

  const quizTrack = document.getElementById("quiz-track");
  const materialTrack = document.getElementById("material-track");
  if (quizTrack) quizTrack.innerHTML = [...quizzes, ...quizzes].map(quizCard).join("");
  if (materialTrack) materialTrack.innerHTML = [...materials, ...materials].map(materialCard).join("");
  if (window.lucide?.createIcons) window.lucide.createIcons();

  function setupInfiniteRail(scrollerId, nextBtnId, cardCount) {
    const scroller = document.getElementById(scrollerId);
    const nextBtn = document.getElementById(nextBtnId);
    if (!scroller || !nextBtn) return;

    const cardSpan = 256;
    const baseWidth = cardCount * cardSpan;
    const clickStep = cardSpan * 3;

    scroller.addEventListener("scroll", () => {
      if (scroller.scrollLeft >= baseWidth) {
        scroller.scrollLeft -= baseWidth;
      }
      if (scroller.scrollLeft < 0) {
        scroller.scrollLeft += baseWidth;
      }
    });

    nextBtn.addEventListener("click", () => {
      scroller.scrollBy({ left: clickStep, behavior: "smooth" });
    });
  }
  setupInfiniteRail("quiz-scroller", "quiz-next", quizzes.length);
  setupInfiniteRail("material-scroller", "material-next", materials.length);

  /** Student analytics card: improvement % vs first attempt (demo), aligned with course quizzes */
  const studentQuizProgress = quizzes.slice(0, 7).map((q, i) => ({
    title: q.title,
    improvementPct: [5, 9, 14, 7, 16, 11, 8][i],
    done: i < 5,
    lastScore: [72, 78, 85, 80, 90, null, null][i],
  }));

  function buildStudentQuizPrompt(row) {
    if (!row) return "";
    if (!row.done) {
      return `I haven't started the quiz "${row.title}" yet. What should I focus on first, and how should I prepare?`;
    }
    return `For my quiz "${row.title}", my analytics show +${row.improvementPct}% improvement vs my first attempt and my last score was ${row.lastScore}%. What should I practice next, and what concepts am I still weak on?`;
  }

  function addStudentQuizPromptToChat(row) {
    const input = document.getElementById("chat-input");
    if (!input || !row) return;
    input.value = buildStudentQuizPrompt(row);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
    document.getElementById("chat-card")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  let studentLearningChart = null;

  function initStudentLearningAnalytics() {
    if (COURSE_PAGE !== "student" || !window.Chart) return null;
    if (studentLearningChart) return studentLearningChart;
    const canvas = document.getElementById("student-quiz-improvement-chart");
    const listEl = document.getElementById("student-quiz-checklist");
    if (!canvas || !listEl) return null;

    const chartWrap = canvas.parentElement;

    function hideStudentAnalyticsTooltip() {
      const el = document.getElementById("ot-student-analytics-tooltip");
      if (!el) return;
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      el.setAttribute("aria-hidden", "true");
    }

    function getOrCreateStudentAnalyticsTooltipEl() {
      if (!chartWrap) return null;
      let el = document.getElementById("ot-student-analytics-tooltip");
      if (el && el.parentElement !== chartWrap) {
        el.remove();
        el = null;
      }
      if (!el) {
        el = document.createElement("div");
        el.id = "ot-student-analytics-tooltip";
        el.className = "ot-analytics-tooltip-external";
        el.setAttribute("role", "tooltip");
        el.innerHTML = `
        <div class="ot-analytics-tooltip-external__title"></div>
        <ul class="ot-analytics-tooltip-external__stats"></ul>
        <button type="button" class="ot-analytics-tooltip-external__action">Add to chat</button>
      `;
        chartWrap.appendChild(el);
        el.setAttribute("aria-hidden", "true");
        el.querySelector(".ot-analytics-tooltip-external__action").addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const idx = Number.parseInt(el.dataset.quizIndex, 10);
          if (Number.isNaN(idx)) return;
          const row = studentQuizProgress[idx];
          if (row) addStudentQuizPromptToChat(row);
        });
        if (!chartWrap.dataset.otStudentAnalyticsTooltipLeaveBound) {
          chartWrap.dataset.otStudentAnalyticsTooltipLeaveBound = "1";
          chartWrap.addEventListener("mouseleave", hideStudentAnalyticsTooltip);
        }
      }
      return el;
    }

    function positionStudentAnalyticsTooltip(el, chart, tooltip) {
      if (!chartWrap) return;
      const cx = tooltip.caretX ?? tooltip.x;
      const cy = tooltip.caretY ?? tooltip.y;
      const wrapRect = chartWrap.getBoundingClientRect();
      const canvasRect = chart.canvas.getBoundingClientRect();
      const left = canvasRect.left - wrapRect.left + cx;
      const top = canvasRect.top - wrapRect.top + cy;
      el.style.position = "absolute";
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.transform = "translate(-50%, calc(-100% - 14px))";
      el.style.zIndex = "5";
    }

    function renderStudentAnalyticsTooltipContent(el, dataIndex) {
      const row = studentQuizProgress[dataIndex];
      if (!row) return;
      el.dataset.quizIndex = String(dataIndex);
      el.querySelector(".ot-analytics-tooltip-external__title").textContent = row.title;
      const ul = el.querySelector(".ot-analytics-tooltip-external__stats");
      ul.innerHTML = "";
      const lines = row.done
        ? [
            { label: "Improvement vs first", value: `+${row.improvementPct}%` },
            { label: "Last score", value: `${row.lastScore}%` },
          ]
        : [{ label: "Status", value: "Not started yet" }];
      lines.forEach((line) => {
        const li = document.createElement("li");
        li.className = "ot-analytics-tooltip-external__stat";
        li.innerHTML = `<span class="ot-analytics-tooltip-external__stat-label">${line.label}</span><span class="ot-analytics-tooltip-external__stat-value">${line.value}</span>`;
        ul.appendChild(li);
      });
    }

    const cs = getComputedStyle(document.documentElement);
    const barColor = cs.getPropertyValue("--onetutor-level-easy").trim() || "#10b981";
    const chartBorderMuted = cs.getPropertyValue("--color-border-muted").trim() || "#d1d5e3";
    const chartBorderDefault = cs.getPropertyValue("--color-border-default").trim() || "#e4e8f5";
    const chartTextMuted = cs.getPropertyValue("--color-text-muted").trim() || "#7a8ba0";

    const ctx = canvas.getContext("2d");
    studentLearningChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: studentQuizProgress.map((row) => {
          const t = row.title;
          return t.length > 36 ? `${t.slice(0, 34)}…` : t;
        }),
        datasets: [
          {
            label: "Improvement vs first attempt",
            data: studentQuizProgress.map((r) => r.improvementPct),
            backgroundColor: `${barColor}99`,
            borderColor: barColor,
            borderWidth: 1,
            borderRadius: 6,
            maxBarThickness: 22,
            hoverBackgroundColor: `${barColor}b3`,
            hoverBorderColor: barColor,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        interaction: { mode: "index", intersect: false },
        onClick(evt, elements, chart) {
          let idx = null;
          if (elements?.length) {
            idx = elements[0].index;
          } else if (chart?.getElementsAtEventForMode) {
            const found = chart.getElementsAtEventForMode(evt, "index", { intersect: false }, true);
            if (found?.length) idx = found[0].index;
          }
          if (idx == null) return;
          const row = studentQuizProgress[idx];
          if (row) addStudentQuizPromptToChat(row);
        },
        scales: {
          x: {
            border: { display: true, color: chartBorderMuted },
            grid: { color: chartBorderDefault, borderDash: [3, 3] },
            ticks: {
              color: chartTextMuted,
              font: { size: 11 },
              callback(value) {
                return `${value}%`;
              },
            },
            suggestedMin: 0,
            suggestedMax: 20,
            title: {
              display: true,
              text: "Improvement (%)",
              color: chartTextMuted,
              font: { size: 11 },
            },
          },
          y: {
            border: { display: true, color: chartBorderMuted },
            grid: { display: false },
            ticks: {
              color: chartTextMuted,
              font: { size: 10 },
              autoSkip: false,
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external(context) {
              const tooltip = context.tooltip;
              const el = getOrCreateStudentAnalyticsTooltipEl();
              if (!el) return;
              if (tooltip.opacity === 0) {
                hideStudentAnalyticsTooltip();
                return;
              }
              const pts = tooltip.dataPoints ?? tooltip.tooltipItems;
              const pt = pts && pts[0];
              const dataIndex = pt != null ? pt.dataIndex : null;
              if (dataIndex == null) {
                hideStudentAnalyticsTooltip();
                return;
              }
              renderStudentAnalyticsTooltipContent(el, dataIndex);
              positionStudentAnalyticsTooltip(el, context.chart, tooltip);
              el.style.opacity = "1";
              el.style.pointerEvents = "auto";
              el.removeAttribute("aria-hidden");
            },
          },
        },
      },
    });

    listEl.innerHTML = studentQuizProgress
      .map((row, i) => {
        const meta = row.done
          ? `+${row.improvementPct}% improvement · last score ${row.lastScore}%`
          : "Not started yet";
        return `<li class="ot-student-quiz-checklist__item${row.done ? " ot-student-quiz-checklist__item--done" : ""}" data-index="${i}" role="button" tabindex="0">
        <span class="ot-student-quiz-checklist__marker" aria-hidden="true"></span>
        <div class="ot-student-quiz-checklist__main">
          <span class="ot-student-quiz-checklist__title">${row.title}</span>
          <span class="ot-student-quiz-checklist__meta">${meta}</span>
        </div>
      </li>`;
      })
      .join("");

    listEl.querySelectorAll(".ot-student-quiz-checklist__marker").forEach((el, i) => {
      const row = studentQuizProgress[i];
      el.innerHTML = row.done
        ? '<i data-lucide="check" class="h-4 w-4"></i>'
        : '<i data-lucide="circle" class="h-4 w-4 ot-student-quiz-checklist__icon-todo"></i>';
    });

    listEl.querySelectorAll(".ot-student-quiz-checklist__item").forEach((li) => {
      const go = () => {
        const i = Number.parseInt(li.dataset.index, 10);
        const row = studentQuizProgress[i];
        if (row) addStudentQuizPromptToChat(row);
      };
      li.addEventListener("click", go);
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      });
    });

    if (window.lucide?.createIcons) window.lucide.createIcons();
    return studentLearningChart;
  }

  const STUDENT_PROGRESS_TARGET = 95;
  /** Instructor compact ring: weekly class engagement trend (aligns with trend chart metric) */
  const INSTRUCTOR_CLASS_ENGAGEMENT_TARGET = 88;

  function animateCourseAnalyticsRing() {
    const ring =
      COURSE_PAGE === "student"
        ? {
            rootId: "student-progress-ring",
            fillId: "student-progress-ring-fill",
            valueId: "student-progress-value",
            target: STUDENT_PROGRESS_TARGET,
          }
        : COURSE_PAGE === "instructor"
          ? {
              rootId: "instructor-progress-ring",
              fillId: "instructor-progress-ring-fill",
              valueId: "instructor-progress-value",
              target: INSTRUCTOR_CLASS_ENGAGEMENT_TARGET,
            }
          : null;
    if (!ring) return;

    const root = document.getElementById(ring.rootId);
    const fill = document.getElementById(ring.fillId);
    const valueEl = document.getElementById(ring.valueId);
    if (!root || !fill || !valueEl) return;

    const DURATION_MS = 1150;
    const { target } = ring;

    function setRingProgress(pct) {
      const len = fill.getTotalLength();
      if (!len) return;
      const t = Math.min(100, Math.max(0, pct)) / 100;
      fill.style.strokeDasharray = `${len * t} ${len}`;
      fill.style.strokeDashoffset = "0";
    }

    function applyFinal() {
      const len = fill.getTotalLength();
      if (!len) return;
      setRingProgress(target);
      valueEl.textContent = String(target);
      root.setAttribute("aria-valuenow", String(target));
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyFinal();
      return;
    }

    requestAnimationFrame(() => {
      const len = fill.getTotalLength();
      if (!len) {
        applyFinal();
        return;
      }
      fill.style.strokeDasharray = `0 ${len}`;
      fill.style.strokeDashoffset = "0";
      valueEl.textContent = "0";
      root.setAttribute("aria-valuenow", "0");

      const easeOutCubic = (t) => 1 - (1 - t) ** 3;
      const t0 = performance.now();

      function tick(now) {
        const elapsed = now - t0;
        const u = Math.min(1, elapsed / DURATION_MS);
        const p = easeOutCubic(u);
        const pct = target * p;
        setRingProgress(pct);
        const rounded = Math.round(pct);
        valueEl.textContent = String(rounded);
        root.setAttribute("aria-valuenow", String(rounded));
        if (u < 1) {
          requestAnimationFrame(tick);
        } else {
          applyFinal();
        }
      }
      requestAnimationFrame(tick);
    });
  }

  const analyticsToggle = document.getElementById("analytics-toggle");
  const analyticsBody = document.getElementById("analytics-body");
  const analyticsChevron = document.getElementById("analytics-chevron");
  const topInsightsSection = document.getElementById("top-insights-section");
  const chatCard = document.getElementById("chat-card");
  const analyticsCompactCard = document.getElementById("analytics-compact-card");
  const analyticsExpandedHost = document.getElementById("analytics-expanded-host");
  const analyticsExpandedCard = document.getElementById("analytics-expanded-card");
  const analyticsCollapseBtn = document.getElementById("analytics-collapse");
  const analyticsPaneOverview = document.getElementById("analytics-pane-overview");
  let overviewTrendChart = null;

  const analyticsTrendData = [
    { name: "Week 1", quizScore: 65, engagement: 75, completion: 82 },
    { name: "Week 2", quizScore: 68, engagement: 78, completion: 85 },
    { name: "Week 3", quizScore: 72, engagement: 82, completion: 88 },
    { name: "Week 4", quizScore: 75, engagement: 85, completion: 87 },
    { name: "Week 5", quizScore: 78, engagement: 88, completion: 90 },
    { name: "Week 6", quizScore: 76, engagement: 86, completion: 89 },
    { name: "Week 7", quizScore: 80, engagement: 90, completion: 92 },
  ];

  function gradientFill(ctx, color) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0.05, `${color}4d`);
    gradient.addColorStop(0.95, `${color}00`);
    return gradient;
  }

  /** Populated after chatInput + syncChatComposerTypingState exist; used by analytics chart */
  let injectWeekIntoChat = function () {};

  function createAnalyticsTrendChart(canvasId) {
    if (!window.Chart) return null;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    const labels = analyticsTrendData.map((d) => d.name);
    const quizColor = getComputedStyle(document.documentElement).getPropertyValue("--onetutor-level-easy").trim() || "#10b981";
    const engagementColor = getComputedStyle(document.documentElement).getPropertyValue("--onetutor-level-medium").trim() || "#f97316";
    const completionColor = getComputedStyle(document.documentElement).getPropertyValue("--onetutor-level-hard").trim() || "#8b5cf6";
    const cs = getComputedStyle(document.documentElement);
    const chartBorderMuted = cs.getPropertyValue("--color-border-muted").trim() || "#d1d5e3";
    const chartBorderDefault = cs.getPropertyValue("--color-border-default").trim() || "#e4e8f5";
    const chartTextMuted = cs.getPropertyValue("--color-text-muted").trim() || "#7a8ba0";
    const chartPointRing = cs.getPropertyValue("--color-text-on-primary").trim() || "#ffffff";

    const chartWrap = canvas.parentElement;

    function hideTrendTooltip() {
      const el = document.getElementById("ot-analytics-trend-tooltip");
      if (!el) return;
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      el.setAttribute("aria-hidden", "true");
    }

    function getOrCreateTrendTooltipEl() {
      if (!chartWrap) return null;
      let el = document.getElementById("ot-analytics-trend-tooltip");
      if (el && el.parentElement !== chartWrap) {
        el.remove();
        el = null;
      }
      if (!el) {
        el = document.createElement("div");
        el.id = "ot-analytics-trend-tooltip";
        el.className = "ot-analytics-tooltip-external";
        el.setAttribute("role", "tooltip");
        el.innerHTML = `
        <div class="ot-analytics-tooltip-external__title"></div>
        <ul class="ot-analytics-tooltip-external__stats"></ul>
        <button type="button" class="ot-analytics-tooltip-external__action">Add to chat</button>
      `;
        chartWrap.appendChild(el);
        el.setAttribute("aria-hidden", "true");
        el.querySelector(".ot-analytics-tooltip-external__action").addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const idx = Number.parseInt(el.dataset.weekIndex, 10);
          if (Number.isNaN(idx)) return;
          const row = analyticsTrendData[idx];
          if (row) injectWeekIntoChat(row);
        });
        if (!chartWrap.dataset.otAnalyticsTooltipLeaveBound) {
          chartWrap.dataset.otAnalyticsTooltipLeaveBound = "1";
          chartWrap.addEventListener("mouseleave", hideTrendTooltip);
        }
      }
      return el;
    }

    function positionTrendTooltip(el, chart, tooltip) {
      if (!chartWrap) return;
      const cx = tooltip.caretX ?? tooltip.x;
      const cy = tooltip.caretY ?? tooltip.y;
      const wrapRect = chartWrap.getBoundingClientRect();
      const canvasRect = chart.canvas.getBoundingClientRect();
      const left = canvasRect.left - wrapRect.left + cx;
      const top = canvasRect.top - wrapRect.top + cy;
      el.style.position = "absolute";
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.transform = "translate(-50%, calc(-100% - 14px))";
      el.style.zIndex = "5";
    }

    function renderTrendTooltipContent(el, dataIndex) {
      const row = analyticsTrendData[dataIndex];
      if (!row) return;
      el.dataset.weekIndex = String(dataIndex);
      el.querySelector(".ot-analytics-tooltip-external__title").textContent = row.name;
      const ul = el.querySelector(".ot-analytics-tooltip-external__stats");
      ul.innerHTML = "";
      [
        { label: "Quiz score", value: `${row.quizScore}%` },
        { label: "Engagement", value: `${row.engagement}%` },
        { label: "Completion", value: `${row.completion}%` },
      ].forEach((line) => {
        const li = document.createElement("li");
        li.className = "ot-analytics-tooltip-external__stat";
        li.innerHTML = `<span class="ot-analytics-tooltip-external__stat-label">${line.label}</span><span class="ot-analytics-tooltip-external__stat-value">${line.value}</span>`;
        ul.appendChild(li);
      });
    }

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Quiz Score %",
            data: analyticsTrendData.map((d) => d.quizScore),
            borderColor: quizColor,
            backgroundColor: gradientFill(ctx, quizColor),
            pointStyle: "circle",
            fill: true,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: quizColor,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: chartPointRing,
            borderWidth: 2,
          },
          {
            label: "Engagement %",
            data: analyticsTrendData.map((d) => d.engagement),
            borderColor: engagementColor,
            backgroundColor: gradientFill(ctx, engagementColor),
            pointStyle: "circle",
            fill: true,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: engagementColor,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: chartPointRing,
            borderWidth: 2,
          },
          {
            label: "Completion %",
            data: analyticsTrendData.map((d) => d.completion),
            borderColor: completionColor,
            backgroundColor: gradientFill(ctx, completionColor),
            pointStyle: "circle",
            fill: true,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: completionColor,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: chartPointRing,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        onClick(evt, elements, chart) {
          let idx = null;
          if (elements?.length) {
            idx = elements[0].index;
          } else if (chart?.getElementsAtEventForMode) {
            const found = chart.getElementsAtEventForMode(evt, "index", { intersect: false }, true);
            if (found?.length) idx = found[0].index;
          }
          if (idx == null) return;
          const row = analyticsTrendData[idx];
          if (row) injectWeekIntoChat(row);
        },
        scales: {
          x: {
            border: { display: true, color: chartBorderMuted },
            grid: { color: chartBorderDefault, borderDash: [3, 3] },
            ticks: { color: chartTextMuted, font: { size: 12 } },
          },
          y: {
            border: { display: true, color: chartBorderMuted },
            grid: { color: chartBorderDefault, borderDash: [3, 3] },
            ticks: {
              color: chartTextMuted,
              font: { size: 12 },
              callback(value) {
                return `${value}%`;
              },
            },
            suggestedMin: 60,
            suggestedMax: 95,
          },
        },
        plugins: {
          legend: {
            labels: {
              color: chartTextMuted,
              usePointStyle: true,
              pointStyle: "circle",
              boxWidth: 10,
              boxHeight: 10,
              padding: 12,
              font: { size: 12 },
            },
          },
          tooltip: {
            enabled: false,
            external(context) {
              const tooltip = context.tooltip;
              const el = getOrCreateTrendTooltipEl();
              if (!el) return;
              if (tooltip.opacity === 0) {
                hideTrendTooltip();
                return;
              }
              const pts = tooltip.dataPoints ?? tooltip.tooltipItems;
              const pt = pts && pts[0];
              const dataIndex = pt != null ? pt.dataIndex : null;
              if (dataIndex == null) {
                hideTrendTooltip();
                return;
              }
              renderTrendTooltipContent(el, dataIndex);
              positionTrendTooltip(el, context.chart, tooltip);
              el.style.opacity = "1";
              el.style.pointerEvents = "auto";
              el.removeAttribute("aria-hidden");
            },
          },
        },
      },
    });
    return chart;
  }

  function openExpandedAnalytics() {
    if (!analyticsExpandedHost) return;
    topInsightsSection.classList.remove("ot-top-insights-grid");
    topInsightsSection.classList.add("flex", "flex-col", "gap-6");
    chatCard.classList.add("chat-card-expanded");
    analyticsCompactCard.classList.add("hidden");
    analyticsExpandedHost.classList.remove("hidden");
    analyticsBody?.classList.remove("hidden");
    if (analyticsChevron) analyticsChevron.style.transform = "rotate(0deg)";
    analyticsPaneOverview?.classList.remove("hidden");
    analyticsToggle?.setAttribute("aria-expanded", "true");
    if (COURSE_PAGE === "instructor") {
      if (!overviewTrendChart) overviewTrendChart = createAnalyticsTrendChart("analytics-trend-chart-overview");
    } else if (COURSE_PAGE === "student") {
      initStudentLearningAnalytics();
      requestAnimationFrame(() => studentLearningChart?.resize());
    }
    analyticsExpandedCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function collapseExpandedAnalytics() {
    if (!analyticsExpandedHost) return;
    analyticsExpandedHost.classList.add("hidden");
    analyticsCompactCard.classList.remove("hidden");
    topInsightsSection.classList.remove("flex", "flex-col", "gap-6");
    topInsightsSection.classList.add("ot-top-insights-grid");
    chatCard.classList.remove("chat-card-expanded");
    analyticsToggle?.setAttribute("aria-expanded", "false");
    document.querySelector("main.ot-main")?.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (analyticsToggle && analyticsExpandedHost) {
    analyticsToggle.addEventListener("click", openExpandedAnalytics);
  }
  if (analyticsCollapseBtn && analyticsExpandedHost) {
    analyticsCollapseBtn.addEventListener("click", collapseExpandedAnalytics);
  }

  const chatState = document.getElementById("chat-state");
  const chatComposer = document.getElementById("chat-composer");
  const chatInput = document.getElementById("chat-input");
  const chatPromptBubbles = document.getElementById("chat-prompt-bubbles");

  function setChatPromptsOpen(open) {
    if (!chatComposer || !chatPromptBubbles) return;
    chatComposer.classList.toggle("ot-chat-composer--prompts-open", Boolean(open));
    chatPromptBubbles.setAttribute("aria-hidden", open ? "false" : "true");
  }

  const CHAT_PROMPTS_STUDENT = [
    "Give me an exam preparation plan for neuroplasticity",
    "Explain neuroplasticity in simple terms",
    "Create flashcards on synaptic plasticity and LTP",
    "Summarize this week’s WS26 topics",
    "What habits best support brain rewiring?",
  ];
  const CHAT_PROMPTS_INSTRUCTOR = [
    "How did my students perform on the quiz “Synapses, LTP, and practice”? Which questions were hardest?",
    "What are the most common wrong answers and misconceptions on the WS26 midterm mock exam?",
    "Which quiz items have the lowest success rates, and which distractors are picked most often?",
    "Compare Week 3 vs Week 4 engagement and quiz scores. What should I prioritize?",
    "Summarize at-risk students and suggest interventions based on recent quiz trends.",
  ];
  const CHAT_PROMPTS = COURSE_PAGE === "instructor" ? CHAT_PROMPTS_INSTRUCTOR : CHAT_PROMPTS_STUDENT;
  let typewriterTimer = null;
  let twPhrase = 0;
  let twChar = 0;
  let twDeleting = false;

  function clearTypewriterTimer() {
    if (typewriterTimer != null) {
      clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }
  }

  function shouldShowChatTypewriter() {
    if (!chatInput || chatInput.value.trim()) return false;
    if (document.activeElement === chatInput) return false;
    if (chatComposer && chatComposer.contains(document.activeElement)) return false;
    return true;
  }

  function setChatPlaceholderAnimated(text) {
    if (!chatInput) return;
    chatInput.setAttribute("placeholder", text);
  }

  function clearChatPlaceholderAnimation() {
    if (!chatInput) return;
    chatInput.setAttribute("placeholder", "");
  }

  function startChatTypewriterLoop() {
    clearTypewriterTimer();
    if (!chatInput || !shouldShowChatTypewriter()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChatPlaceholderAnimated(CHAT_PROMPTS[0]);
      return;
    }
    twPhrase = 0;
    twChar = 0;
    twDeleting = false;
    setChatPlaceholderAnimated("");
    const twTypeMs = 48;
    const twDeleteMs = 34;
    const twPauseAtFullMs = 6200;
    const twPauseBetweenPhrasesMs = 2600;
    function tick() {
      if (!shouldShowChatTypewriter()) {
        clearTypewriterTimer();
        clearChatPlaceholderAnimation();
        return;
      }
      const full = CHAT_PROMPTS[twPhrase];
      let display = "";
      if (!twDeleting) {
        twChar += 1;
        display = full.slice(0, twChar);
        if (twChar >= full.length) {
          twDeleting = true;
          setChatPlaceholderAnimated(display);
          typewriterTimer = setTimeout(tick, twPauseAtFullMs);
          return;
        }
      } else {
        twChar -= 1;
        display = full.slice(0, Math.max(0, twChar));
        if (twChar <= 0) {
          twDeleting = false;
          twPhrase = (twPhrase + 1) % CHAT_PROMPTS.length;
          twChar = 0;
          setChatPlaceholderAnimated("");
          typewriterTimer = setTimeout(tick, twPauseBetweenPhrasesMs);
          return;
        }
      }
      setChatPlaceholderAnimated(display);
      typewriterTimer = setTimeout(tick, twDeleting ? twDeleteMs : twTypeMs);
    }
    tick();
  }

  function applyChatTypewriterState() {
    if (!chatInput) return;
    const show = shouldShowChatTypewriter();
    if (!show) {
      clearTypewriterTimer();
      clearChatPlaceholderAnimation();
      return;
    }
    startChatTypewriterLoop();
  }

  function syncChatComposerTypingState() {
    if (!chatComposer || !chatInput) return;
    chatComposer.classList.toggle("ot-chat-composer--has-text", chatInput.value.trim().length > 0);
    applyChatTypewriterState();
  }

  function buildWeekDiagnosticPrompt(row) {
    return `For ${row.name}, my course analytics show quiz average ${row.quizScore}%, engagement ${row.engagement}%, and completion ${row.completion}%. How did my students perform on the quizzes for this week? Which questions were hardest, what wrong answers were most common, and what should I reteach or adjust?`;
  }

  injectWeekIntoChat = function (row) {
    if (!chatInput || !row) return;
    chatInput.value = buildWeekDiagnosticPrompt(row);
    syncChatComposerTypingState();
    chatInput.focus();
    document.getElementById("chat-card")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  chatInput?.addEventListener("input", syncChatComposerTypingState);
  chatInput?.addEventListener("focus", () => {
    setChatPromptsOpen(true);
    applyChatTypewriterState();
  });
  chatInput?.addEventListener("blur", applyChatTypewriterState);
  chatComposer?.addEventListener("focusout", (e) => {
    const next = e.relatedTarget;
    if (next && chatComposer.contains(next)) return;
    setChatPromptsOpen(false);
  });
  chatComposer?.addEventListener("click", (e) => {
    const t = e.target;
    if (t === chatComposer || (t && t.classList && t.classList.contains("ot-chat-input-wrap"))) {
      chatInput?.focus();
    }
  });
  document.querySelectorAll(".ot-chat-prompt-bubble").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.dataset.prompt;
      if (!text || !chatInput) return;
      chatInput.value = text;
      syncChatComposerTypingState();
      chatInput.focus();
    });
  });
  applyChatTypewriterState();

  document.getElementById("chat-edit")?.addEventListener("click", () => {
    if (!chatState) return;
    chatState.textContent = "Draft updated in chat input.";
    chatState.classList.remove("hidden");
  });
  document.getElementById("chat-send")?.addEventListener("click", () => {
    if (!chatState) return;
    chatState.textContent = "Message sent. Preparing recommended resources.";
    chatState.classList.remove("hidden");
  });
  document.getElementById("chat-toggle")?.addEventListener("click", () => {
    if (!chatState) return;
    chatState.textContent = "Showing previous assistant recommendations.";
    chatState.classList.remove("hidden");
  });

  const uploadToggle = document.getElementById("upload-toggle");
  let uploadConsented = false;
  if (uploadToggle) {
    uploadToggle.addEventListener("click", () => {
      uploadConsented = !uploadConsented;
      uploadToggle.dataset.state = uploadConsented ? "on" : "off";
      uploadToggle.setAttribute("aria-pressed", uploadConsented ? "true" : "false");
    });
  }

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

  animateCourseAnalyticsRing();

  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
})();

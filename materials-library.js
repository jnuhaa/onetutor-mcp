/**
 * Materials Library — Figma 2454:4707, design-system tokens + manage-quizzes patterns.
 */
(function () {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role") === "student" ? "student" : "instructor";
  document.body.dataset.coursePage = role;
  const main = document.getElementById("course-main");
  if (main) main.dataset.courseView = role;

  const backLink = document.getElementById("materials-back");
  const courseLink = document.getElementById("materials-course-link");
  const courseHref = role === "student" ? "student.html" : "index.html";
  if (backLink) backLink.href = courseHref;
  if (courseLink) courseLink.href = courseHref;

  const uploadPanel = document.getElementById("materials-upload-panel");
  if (role === "student" && uploadPanel) {
    uploadPanel.hidden = true;
  }

  const materials = [
    { title: "Stress and Cortisol - Short Essay", fileExt: ".img", uploaded: "15.02.2025", hidden: false },
    { title: "Interview with B.F. Skinner", fileExt: ".pdf", uploaded: "15.02.2025", hidden: false },
    { title: "Psychology Fundamentals", fileExt: ".vid", uploaded: "15.02.2025", hidden: false },
    {
      title: "Current Directions in Stress and Human Immune Function",
      fileExt: ".txt",
      uploaded: "15.02.2025",
      hidden: false,
    },
    { title: "How Chronic Stress Impact Vaccine", fileExt: ".pdf", uploaded: "15.02.2025", hidden: true },
    { title: "WS26 Week 1 - What is neuroplasticity?", fileExt: ".txt", uploaded: "15.02.2025", hidden: false },
    { title: "Synaptic plasticity & Hebbian learning (reader)", fileExt: ".pdf", uploaded: "15.02.2025", hidden: false },
    { title: "Interview: experience-dependent plasticity", fileExt: ".vid", uploaded: "15.02.2025", hidden: false },
    { title: "Brain Regions Diagram_WS26", fileExt: ".img", uploaded: "14.02.2025", hidden: false },
    { title: "Neuroplasticity habit workbook", fileExt: ".pdf", uploaded: "12.02.2025", hidden: false },
    { title: "Clip: practice and myelination", fileExt: ".vid", uploaded: "10.02.2025", hidden: false },
    { title: "Reflection journal: my learning habits", fileExt: ".txt", uploaded: "08.02.2025", hidden: false },
    { title: "Course 1_Lecture 3", fileExt: ".pdf", uploaded: "05.02.2025", hidden: false },
    { title: "Course 1_Lecture 5 Questions and Answers", fileExt: ".txt", uploaded: "03.02.2025", hidden: false },
    { title: "Attention networks overview", fileExt: ".vid", uploaded: "01.02.2025", hidden: false },
    { title: "Sleep and consolidation slides", fileExt: ".pdf", uploaded: "28.01.2025", hidden: false },
  ];

  const FILE_META = {
    ".txt": { icon: "file-text", label: ".txt" },
    ".pdf": { icon: "file", label: ".pdf" },
    ".vid": { icon: "file-video", label: ".vid" },
    ".img": { icon: "file-image", label: ".img" },
  };

  const gridEl = document.getElementById("materials-grid");
  const searchInput = document.getElementById("materials-search");
  const viewToggle = document.getElementById("materials-view-toggle");
  let listView = false;
  let query = "";

  function fileMeta(ext) {
    return FILE_META[ext] || FILE_META[".txt"];
  }

  function extClass(ext) {
    const key = (ext || ".txt").replace(".", "");
    return `ot-materials-library__ext--${key}`;
  }

  function renderCard(item) {
    const meta = fileMeta(item.fileExt);
    const actions =
      role === "student"
        ? ""
        : `<div class="ot-materials-library__card-actions">
            ${
              item.hidden
                ? `<button type="button" class="ot-materials-library__icon-btn" aria-label="Hidden from students"><i data-lucide="eye-off" class="h-4 w-4 ot-thin-arrow"></i></button>`
                : ""
            }
            <button type="button" class="ot-materials-library__icon-btn" aria-label="Edit material"><i data-lucide="pencil" class="h-4 w-4 ot-thin-arrow"></i></button>
            <button type="button" class="ot-materials-library__icon-btn" aria-label="Delete material"><i data-lucide="trash-2" class="h-4 w-4 ot-thin-arrow"></i></button>
          </div>`;

    return `
      <article class="ot-materials-library__card ot-solid-surface ot-hover-mode--object" role="listitem">
        <div class="ot-materials-library__card-top">
          <div class="ot-materials-library__file-type">
            <i data-lucide="${meta.icon}" class="h-6 w-6 shrink-0 ot-thin-arrow ot-materials-library__file-icon" aria-hidden="true"></i>
            <span class="ot-materials-library__ext ${extClass(item.fileExt)} ot-body-tiny">${meta.label}</span>
          </div>
          <p class="ot-materials-library__card-title ot-card-title-compact">${item.title}</p>
        </div>
        <div class="ot-materials-library__card-bottom">
          <p class="ot-body-tiny ot-materials-library__uploaded">Uploaded ${item.uploaded}</p>
          ${actions}
        </div>
      </article>
    `;
  }

  function filteredMaterials() {
    const q = query.trim().toLowerCase();
    if (!q) return materials;
    return materials.filter(
      (m) => m.title.toLowerCase().includes(q) || (m.fileExt || "").toLowerCase().includes(q)
    );
  }

  function renderGrid() {
    if (!gridEl) return;
    const items = filteredMaterials();
    gridEl.innerHTML = items.length
      ? items.map(renderCard).join("")
      : `<p class="ot-body-small ot-materials-library__empty">No materials match your search.</p>`;
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  searchInput?.addEventListener("input", () => {
    query = searchInput.value || "";
    renderGrid();
  });

  viewToggle?.addEventListener("click", () => {
    listView = !listView;
    gridEl?.classList.toggle("ot-materials-library__grid--list", listView);
    const icon = viewToggle.querySelector("[data-lucide]");
    if (icon) icon.setAttribute("data-lucide", listView ? "list" : "layout-grid");
    if (window.lucide?.createIcons) window.lucide.createIcons();
  });

  const uploadToggle = document.getElementById("materials-upload-toggle");
  const uploadButton = document.getElementById("materials-upload-button");
  const fileInput = document.getElementById("materials-file-input");
  const dropzone = document.getElementById("materials-dropzone");
  let consented = false;

  function syncUploadEnabled() {
    if (!uploadButton) return;
    uploadButton.disabled = !consented;
  }

  uploadToggle?.addEventListener("click", () => {
    consented = !consented;
    uploadToggle.dataset.state = consented ? "on" : "off";
    uploadToggle.setAttribute("aria-pressed", consented ? "true" : "false");
    syncUploadEnabled();
  });

  uploadButton?.addEventListener("click", () => {
    if (!consented) return;
    fileInput?.click();
  });

  dropzone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!consented) return;
    dropzone.classList.add("ot-materials-upload__dropzone--active");
  });
  dropzone?.addEventListener("dragleave", () => {
    dropzone.classList.remove("ot-materials-upload__dropzone--active");
  });
  dropzone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("ot-materials-upload__dropzone--active");
  });

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

  renderGrid();
  if (window.lucide?.createIcons) window.lucide.createIcons();
})();

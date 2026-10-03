const projects = [
  {
    title: "Admission Recommendation Agent",
    description: "An AI-based admission recommendation agent that assists students with admission-related guidance and personalized recommendations.",
    tech: ["Python", "Twilio", "AI"],
    categories: ["ai", "python"],
    link: "https://github.com/Syeda-Qurrat/Admission-Recommendation-Agent"
  },
  {
    title: "Lumen – Cognitive Screening Platform",
    description: "A web-based cognitive screening platform featuring speech assessment, clock drawing evaluation, dashboard analytics, and automated PDF report generation.",
    tech: ["React", "TypeScript", "Vite", "FastAPI"],
    categories: ["ai", "web"],
    link: "https://github.com/Syeda-Qurrat/Early-Stage-Dementia-Detection"
  },
  {
    title: "Brain Tumor Detection using Deep Learning",
    description: "A CNN-based system that analyzes MRI scans to classify whether a scan contains a brain tumor and identify its type when detected.",
    tech: ["Python", "CNN", "TensorFlow", "Keras", "OpenCV"],
    categories: ["ai", "python"],
    link: null
  },
  {
    title: "Sticky Notes Using React",
    description: "A React-based web application for creating, organizing, and managing notes through a simple interactive interface.",
    tech: ["React", "JavaScript", "CSS"],
    categories: ["web"],
    link: "https://github.com/Syeda-Qurrat/Sticky-Notes-Using-React"
  },
  {
    title: "Scramble Word",
    description: "A browser-based word scramble game that challenges users to unscramble letters and form the correct word.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    categories: ["web"],
    link: "https://github.com/Syeda-Qurrat/Scramble-Word"
  }
];

const projectGrid = document.getElementById("projectGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

const renderProjects = (filter = "all") => {
  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.categories.includes(filter));

  projectGrid.innerHTML = filteredProjects.map(project => `
    <div class="col-md-6 col-lg-4">
      <article class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-list">
          ${project.tech.map(item => `<span class="tech-tag">${item}</span>`).join("")}
        </div>
        ${project.link
          ? `<a class="project-link" href="${project.link}" target="_blank" rel="noopener">
               View Project <i class="bi bi-box-arrow-up-right"></i>
             </a>`
          : `<span class="project-note"><i class="bi bi-info-circle"></i> Project details available on request</span>`
        }
      </article>
    </div>
  `).join("");
};

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.documentElement.dataset.theme = "dark";
}

const updateThemeIcon = () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeToggle.innerHTML = isDark
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-stars-fill"></i>';
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
};

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";

  if (isDark) {
    delete document.documentElement.dataset.theme;
    localStorage.setItem("portfolio-theme", "light");
  } else {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem("portfolio-theme", "dark");
  }

  updateThemeIcon();
});

updateThemeIcon();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
let formMessageTimer;

const showFormMessage = (message, type = "") => {
  clearTimeout(formMessageTimer);
  formMessage.textContent = message;
  formMessage.className = `form-message mt-3 ${type}`.trim();

  formMessageTimer = setTimeout(() => {
    formMessage.textContent = "";
    formMessage.className = "form-message mt-3";
  }, 4000);
};

const setFieldValue = (id) => document.getElementById(id).value.trim();

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = setFieldValue("name");
  const email = setFieldValue("email");
  const message = setFieldValue("message");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = [];

  // Client-side validation: trim values and check meaningful input.
  if (name.length < 2) errors.push("name");
  if (!emailPattern.test(email)) errors.push("email");
  if (message.length < 10) errors.push("message");

  // Trigger Bootstrap's built-in validation UI as well.
  contactForm.classList.add("was-validated");

  if (errors.length > 0 || !contactForm.checkValidity()) {
    // Focus the first invalid field so the user immediately knows what to fix.
    const firstInvalid = contactForm.querySelector(":invalid");
    firstInvalid?.focus();
    showFormMessage("Please correct the highlighted fields and try again.", "error");
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending... <i class="bi bi-arrow-repeat"></i>';

  const formData = {
    name,
    email,
    message,
    _subject: "New Portfolio Contact Message",
    _template: "table",
    _honey: document.querySelector('[name="_honey"]').value
  };

  try {
    const response = await fetch("https://formsubmit.co/ajax/syedaqurrat542@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || "Unable to send the message.");
    }

    showFormMessage("Message sent successfully! Thank you for reaching out.", "success");
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  } catch (error) {
    console.error("Contact form error:", error);
    showFormMessage("Sorry, your message could not be sent. Please try again.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderProjects();

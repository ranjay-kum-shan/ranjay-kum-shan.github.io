// Edit this file to customize your portfolio content.
// Tip: You can update this anytime and re-deploy (or just push changes).

window.PROFILE = {
  name: "Ranjay",
  tagline: "Software Developer • Open to opportunities",
  yearsExperience: "0–2",              // e.g., "3+"
  focus: "Backend / Embedded / Full‑stack", // e.g., "Embedded Systems"
  location: "United Kingdom",          // e.g., "Leicester, UK"

  // Add your resume PDF (optional). Put it in /assets and update the path.
  resumeUrl: "",

  // Social links shown in the hero.
  socials: [
    { label: "GitHub", url: "https://github.com/ranjay-kum-shan" },
    { label: "LinkedIn", url: "" },
    { label: "Email", url: "mailto:your.email@example.com" }
  ],

  about:
    "I build reliable, maintainable software and enjoy turning ambiguous requirements into clear, usable solutions. " +
    "I’m comfortable across the stack, love learning new tools, and care about clean architecture and shipping.",

  highlights: [
    "Strong fundamentals: data structures, OOP, debugging, and testing",
    "Hands-on: build → measure → iterate, with clean documentation",
    "Open to roles in software, firmware/embedded, or backend engineering"
  ],

  skills: [
    { category: "Languages", items: ["C/C++", "Python", "Java", "JavaScript", "SQL"] },
    { category: "Backend", items: ["REST APIs", "Spring / Node.js", "Auth", "Databases", "Testing"] },
    { category: "Embedded", items: ["Bare‑metal", "RTOS basics", "Drivers", "Serial (UART/I2C/SPI)", "Debugging"] },
    { category: "Tools", items: ["Git", "Linux", "Docker", "CI basics"] },
    { category: "Cloud", items: ["GitHub Pages", "Deployments", "Basics of AWS/GCP (optional)"] },
    { category: "Soft Skills", items: ["Communication", "Ownership", "Problem solving", "Collaboration"] }
  ],

  // Featured projects you want to showcase (manual). Replace with your real projects.
  featuredProjects: [
    {
      title: "Project One",
      description: "A concise 1–2 line description of what this project does and the impact.",
      tech: ["Tech 1", "Tech 2", "Tech 3"],
      links: [
        { label: "Repo", url: "https://github.com/ranjay-kum-shan" },
        { label: "Live Demo", url: "" }
      ]
    },
    {
      title: "Project Two",
      description: "Explain your role, key features, and what you learned.",
      tech: ["Tech 1", "Tech 2"],
      links: [
        { label: "Repo", url: "https://github.com/ranjay-kum-shan" }
      ]
    },
    {
      title: "Project Three",
      description: "Focus on results: speedup, reliability, users served, etc.",
      tech: ["Tech 1", "Tech 2", "Tech 3"],
      links: [
        { label: "Repo", url: "https://github.com/ranjay-kum-shan" }
      ]
    }
  ],

  experience: [
    {
      role: "Software Developer (Example)",
      org: "Company / Internship / Freelance",
      dates: "YYYY — YYYY",
      bullets: [
        "Built X that improved Y by Z%",
        "Designed and implemented feature A, reduced bugs by B",
        "Collaborated with stakeholders, shipped on schedule"
      ]
    }
  ],

  education: [
    {
      title: "Degree / Certification",
      meta: "University / Platform • YYYY — YYYY"
    }
  ],

  contact: {
    email: "your.email@example.com",
    linkedin: "",
    blurb: "Want to collaborate, hire, or chat about a project? Reach out — I’ll respond quickly."
  },

  githubUsername: "ranjay-kum-shan",
  githubRepoCount: 6 // number of repos to show in the GitHub feed
};

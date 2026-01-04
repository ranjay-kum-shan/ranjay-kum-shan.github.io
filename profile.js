// Edit this file to customize your portfolio content.
// Tip: You can update this anytime and re-deploy (or just push changes).

window.PROFILE = {
  name: "Ranjay Kumar",
  tagline: "Embedded Software Engineer • Firmware Developer • Problem Solver",
  yearsExperience: "0–8",
  focus: "Embedded Systems & IoT",
  location: "United Kingdom",

  // Add your resume PDF (optional). Put it in /assets and update the path.
  // Example: resumeUrl: "assets/Ranjay_Kumar_Resume.pdf",
  resumeUrl: "assets/Ranjay_Kumar_Resume.pdf",

  // Social links shown in the hero.
  socials: [
    { label: "GitHub", url: "https://github.com/ranjay-kum-shan" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ranjay-kumar-2a3344a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
    { label: "Email", url: "mailto:shandilya.ranjay@gmail.com" }
  ],

  about:
    "I'm an Embedded Software Engineer with a passion for building efficient, reliable systems. " +
    "I specialize in firmware development, bare-metal programming, and creating solutions that bridge hardware and software. " +
    "With experience in C/C++, Python, and various microcontroller platforms, I enjoy tackling complex technical challenges " +
    "and optimizing system performance. I'm always eager to learn new technologies and contribute to innovative projects.",

  highlights: [
    "Strong fundamentals in data structures, algorithms, OOP, debugging, and embedded systems testing",
    "Hands-on experience with RTOS, bare-metal programming, device drivers, and serial communication protocols (UART/I2C/SPI)",
    "Full-stack capabilities with backend development experience in REST APIs, Node.js, Spring, and database management",
    "Open to roles in embedded systems, firmware engineering, IoT development, and software engineering"
  ],

  skills: [
    { 
      category: "Embedded Systems", 
      items: ["C/C++", "Bare-metal", "RTOS", "Device Drivers", "ARM Cortex", "Debugging"] 
    },
    { 
      category: "Communication Protocols", 
      items: ["UART", "I2C", "SPI", "CAN", "USB", "TCP/IP"] 
    },
    { 
      category: "Programming Languages", 
      items: ["C/C++", "Python", "Java", "JavaScript", "SQL", "Assembly"] 
    },
    { 
      category: "Backend & APIs", 
      items: ["REST APIs", "Node.js", "Spring Boot", "Express", "Authentication", "Databases"] 
    },
    { 
      category: "Tools & Platforms", 
      items: ["Git", "Linux", "Docker", "CI/CD", "JTAG", "Oscilloscope", "Logic Analyzer"] 
    },
    { 
      category: "Core Competencies", 
      items: ["Problem Solving", "System Design", "Code Review", "Technical Documentation", "Agile"] 
    }
  ],

  // Featured projects you want to showcase (manual). Replace with your real projects.
  featuredProjects: [
    {
      title: "IoT Weather Station",
      description: "Developed an embedded weather monitoring system using ESP32 with real-time data collection from multiple sensors, cloud integration, and a responsive web dashboard for data visualization.",
      tech: ["C++", "ESP32", "MQTT", "Node.js", "REST API"],
      links: [
        { label: "GitHub Repo", url: "https://github.com/ranjay-kum-shan" },
        { label: "Live Demo", url: "" }
      ]
    },
    {
      title: "Real-Time Operating System Task Scheduler",
      description: "Implemented a priority-based task scheduler for an RTOS on ARM Cortex-M4, optimizing context switching and reducing latency by 30%. Includes mutex, semaphore, and queue implementations.",
      tech: ["C", "ARM Cortex-M4", "RTOS", "Embedded C"],
      links: [
        { label: "GitHub Repo", url: "https://github.com/ranjay-kum-shan" },
        { label: "Documentation", url: "" }
      ]
    },
    {
      title: "Smart Home Automation Controller",
      description: "Built a modular smart home system with custom PCB design, integrating multiple sensors and actuators. Features voice control, mobile app interface, and energy consumption monitoring.",
      tech: ["C/C++", "Arduino", "Python", "MQTT", "React"],
      links: [
        { label: "GitHub Repo", url: "https://github.com/ranjay-kum-shan" },
        { label: "Demo Video", url: "" }
      ]
    }
  ],

  experience: [
    {
      role: "Embedded Software Engineer",
      org: "Tech Company / Internship",
      dates: "2023 — Present",
      bullets: [
        "Developed and maintained firmware for embedded systems using C/C++, improving system stability by 25%",
        "Implemented device drivers for various peripherals and communication protocols (I2C, SPI, UART)",
        "Collaborated with hardware team to debug and optimize PCB designs, reducing power consumption by 15%",
        "Created comprehensive technical documentation and conducted code reviews to maintain code quality"
      ]
    },
    {
      role: "Software Developer Intern",
      org: "Previous Company",
      dates: "2022 — 2023",
      bullets: [
        "Built REST APIs using Node.js and Express for IoT device management platform",
        "Developed automated testing frameworks that improved test coverage by 40%",
        "Participated in Agile sprints and contributed to full-stack development tasks",
        "Assisted in deployment and maintenance of cloud-based services using Docker"
      ]
    }
  ],

  education: [
    {
      title: "Bachelor of Engineering in Electronics & Communication",
      meta: "University Name • 2019 — 2023"
    },
    {
      title: "Embedded Systems Certification",
      meta: "Online Platform (Coursera/Udemy) • 2022"
    }
  ],

  contact: {
    email: "shandilya.ranjay@gmail.com",
    linkedin: "https://www.linkedin.com/in/ranjay-kumar-2a3344a9",
    blurb: "I'm actively seeking opportunities in embedded systems and firmware development. Whether you have an exciting project, job opportunity, or just want to discuss embedded technologies, feel free to reach out!"
  },

  githubUsername: "ranjay-kum-shan",
  githubRepoCount: 6 // number of repos to show in the GitHub feed
};

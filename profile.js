// Edit this file to customize your portfolio content.
// Tip: You can update this anytime and re-deploy (or just push changes).

window.PROFILE = {
  name: "Ranjay Kumar",
  tagline: "Embedded Software Engineer • Firmware Developer • Problem Solver",
  yearsExperience: "6+",
  focus: "Embedded Systems, Firmware & IoT",
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
    "I'm an Embedded Engineer with a passion for building efficient, reliable systems. " +
    "I specialize in firmware development, bare-metal programming, and creating solutions that bridge hardware and software. " +
    "With experience in C/C++, Python, and various microcontroller platforms, I enjoy tackling complex technical challenges " +
    "and optimizing system performance. I hold a patent in emergency exit route indication systems for building management and am always eager to learn new technologies and contribute to innovative projects.",

  highlights: [
    "Patent: Exit route indication via synchronized cues (EP4246479A1)",
    "Strong fundamentals in data structures, algorithms, OOP, debugging, and embedded systems testing",
    "Hands-on experience with RTOS, bare-metal programming, device drivers, and serial communication protocols (UART/I2C/SPI)",
    "Proficient with tools like Git, JTAG debuggers, oscilloscopes, logic analyzers, and Linux environments",
    "FPGA basics and HDL exposure (Verilog/VHDL) for hardware-software co-design"
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
      items: ["C/C++", "Python", "Verilog", "SQL", "Assembly"] 
    },
    { 
      category: "FPGA & HDL", 
      items: ["Verilog", "VHDL", "FPGA Design", "Hardware-Software Co-Design"] 
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
      title: "Porting of firmware running on IMX6 processor from Linux to iMXRT1062 microcontroller running on FreeRTOS",
      description: "Led the successful migration of embedded firmware from an iMX6 Linux-based platform to an iMXRT1062 microcontroller running FreeRTOS. This involved adapting device drivers, optimizing memory usage, and ensuring real-time performance for critical applications.",
      tech: ["C/C++", "FreeRTOS", "iMX6", "iMXRT1062", "Device Drivers", "Embedded Linux"],
      links: [
        { label: "GitHub", url: "N/A" },
        { label: "Case Study", url: "" }
      ] 
    },
    {
      title: "SIA DC09 Standard Compliant Alarm reporting System for existing security systems",
      description: "Developed a SIA DC09 compliant alarm reporting module for integration with existing security systems. Implemented secure communication protocols, event logging, and real-time alerting features to enhance system reliability and compliance with industry standards.",
      tech: ["Python", "Embedded Linux", "TCP/IP", "Security Protocols", "C/C++"],
      links: [
        { label: "GitHub", url: "N/A" },
        { label: "Documentation", url: "" }
      ]
    },
    {
      title: "Building Emergency Exit Route Indication System",
      description: "Developed embedded firmware for intelligent emergency exit route indication in building management control panels. Implemented real-time monitoring of building conditions, dynamic route calculation algorithms, and visual/audio guidance systems for optimal evacuation paths during emergencies.",
      tech: ["C/C++", "Embedded Linux", "CAN Bus", "MQTT", "Python"],
      links: [
        { label: "Patent", url: "https://patents.google.com/patent/EP4246479A1/en" },
        { label: "Details", url: "" }
      ]
    },
    {
      title: "IoT Environmental Monitoring System",
      description: "Built an IoT-based environmental monitoring solution with ESP32 microcontroller. Features include multi-sensor data collection (temperature, humidity, air quality), cloud integration via MQTT, and real-time data visualization dashboard.",
      tech: ["C++", "ESP32", "MQTT", "FreeRTOS", "Node.js", "MongoDB"],
      links: [
        { label: "GitHub", url: "https://github.com/ranjay-kum-shan" },
        { label: "Demo", url: "" }
      ]
    },
    {
      title: "Real-Time Embedded System Scheduler",
      description: "Implemented a custom priority-based task scheduler for ARM Cortex-M4 RTOS. Optimized context switching mechanisms, implemented synchronization primitives (mutexes, semaphores), and reduced task latency by 30% through efficient scheduling algorithms.",
      tech: ["C", "ARM Cortex-M4", "RTOS", "Assembly", "JTAG Debugging"],
      links: [
        { label: "GitHub", url: "https://github.com/ranjay-kum-shan" },
        { label: "Documentation", url: "" }
      ]
    },
    {
      title: "Smart Home Automation Hub : Frictionless Arming and Disarming",
      description: "Designed and developed a centralized smart home controller with custom PCB. Integrated multiple communication protocols (WiFi, Zigbee, BLE), implemented voice control via Alexa integration, and created mobile app for remote device management.",
      tech: ["C/C++", "Arduino", "ESP32", "Python", "React Native", "Firebase"],
      links: [
        { label: "Patent", url: "https://github.com/ranjay-kum-shan" },
        { label: "Demo Video", url: "" }
      ]
    }
  ],

  experience: [
    {
      role: "Firmware Engineer",
      org: "Honeywell",
      dates: "Nov 2021 — Present",
      bullets: [
        "Developed and maintained firmware for embedded systems using C/C++, improving system stability by 25%",
        "Implemented device drivers for various peripherals and communication protocols (I2C, SPI, UART)",
        "Collaborated with hardware team to debug and optimize PCB designs, reducing power consumption by 15%",
        "Created comprehensive technical documentation and conducted code reviews to maintain code quality"
      ]
    },
    {
      role: "Software Developer",
      org: "Waters Corporation",
      dates: "2018 — 2021",
      bullets: [
        "Windows Desktop Application Development using C++ and MFC for laboratory instruments",
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
      meta: "National Institute of Technology, Nagaland • 2014-2018"
    },
    {
      title: "Embedded Systems Certification",
      meta: "Online Platform (Coursera/Udemy) • 2022"
    }
  ],

  patents: [
    {
      title: "Exit route indication via synchronized audible cues",
      number: "EP4246479A1",
      office: "Worldwide applications",
      status: "Published",
      date: "2023",
      inventors: "Ranjay Kumar, et al.",
      url: "https://patents.google.com/patent/EP4246479A1/en",
      description: "A system and method for intelligent emergency exit route indication and management in building control systems. Provides real-time recommendations for optimal evacuation paths during emergency situations."
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

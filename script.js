/* Global window.PROFILE is loaded from profile.js */

function $(id){ return document.getElementById(id); }

function isBootstrapUI(){
  return document.body && document.body.dataset && document.body.dataset.ui === "bootstrap";
}

function setTheme(theme){
  document.documentElement.dataset.theme = theme;
  // Bootstrap 5.3 theme hook
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
}

function initTheme(){
  const saved = localStorage.getItem("theme");
  if(saved){ setTheme(saved); return; }
  // default: match system preference
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(prefersLight ? "light" : "dark");
}

// Typing animation for hero subtitle
function typeText(text, elementId, speed = 55) {
  const element = $(elementId);
  if (!element) return;
  
  let index = 0;
  element.textContent = '';
  
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  
  setTimeout(type, 200); // Delay before starting
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  document.querySelectorAll('.observe-fade').forEach(el => observer.observe(el));
  
  // Observe stagger children
  document.querySelectorAll('.stagger-children').forEach(el => observer.observe(el));

  // Bootstrap UI: richer reveal animations
  initBootstrapReveals();
}

// Scroll progress indicator
function updateScrollProgress() {
  const scrollProgress = $('scrollProgress');
  if (!scrollProgress) return;
  
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / documentHeight) * 100;
  
  scrollProgress.style.width = `${progress}%`;
}

// Scroll to top button
function initScrollToTop() {
  const scrollBtn = $('scrollToTop');
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
    
    updateScrollProgress();
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Parallax scrolling effect for layers
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax-layer, .parallax-bg');
  
  function updateParallax() {
    const scrolled = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.speed) || 0.5;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = (scrolled - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
  }
  
  // Use requestAnimationFrame for smooth performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial update
  updateParallax();
}

// Layer slide animations on scroll
function initLayerAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('layer-active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.layer-slide-up').forEach(el => observer.observe(el));
}

function prefersReducedMotion(){
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let bootstrapRevealObserver = null;

function getBootstrapRevealObserver(){
  if(bootstrapRevealObserver) return bootstrapRevealObserver;

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
  };

  bootstrapRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      bootstrapRevealObserver.unobserve(entry.target);
    });
  }, observerOptions);

  return bootstrapRevealObserver;
}

function applyBootstrapReveal(el, delayMs = 0){
  if(!el) return;
  if(!isBootstrapUI()) return;
  if(prefersReducedMotion()) return;
  if(el.classList.contains('visible')) return;

  el.classList.add('reveal');
  el.style.setProperty('--d', `${delayMs}ms`);
  getBootstrapRevealObserver().observe(el);
}

function initBootstrapReveals(){
  if(!isBootstrapUI()) return;
  if(prefersReducedMotion()) return;

  // Sections
  Array.from(document.querySelectorAll('main section')).forEach((sec, i) => {
    applyBootstrapReveal(sec, i * 60);
  });

  // Hero columns (slightly quicker)
  document.querySelectorAll('.hero-bs .col-lg-7, .hero-bs .col-lg-5').forEach((el, i) => {
    applyBootstrapReveal(el, i * 100);
  });

  // Grid items (skills/projects/education/patents/repos)
  const gridItemSelectors = [
    '#skillsGrid > div',
    '#featuredProjects > div',
    '#educationGrid > div',
    '#patentsGrid > div',
    '#repoGrid > div',
    '#experienceTimeline > div'
  ];
  document.querySelectorAll(gridItemSelectors.join(',')).forEach((el, i) => {
    applyBootstrapReveal(el, Math.min(80 + i * 50, 380));
  });
}

function initMobileNav(){
  // Bootstrap version uses navbar collapse; no custom mobile nav.
  if(isBootstrapUI()) return;

  const nav = $("mobileNav");
  const overlay = $("mobileNavOverlay");
  const toggle = $("navToggle");
  const closeBtn = $("navClose");

  if(!nav || !overlay || !toggle || !closeBtn) return;

  function openNav(){
    nav.hidden = false;
    overlay.hidden = false;
    // next frame so transitions apply
    requestAnimationFrame(() => {
      nav.classList.add('open');
      overlay.classList.add('open');
    });
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav(){
    nav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    // wait for transition end
    window.setTimeout(() => {
      nav.hidden = true;
      overlay.hidden = true;
    }, 180);
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if(isOpen) closeNav();
    else openNav();
  });

  closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);

  document.addEventListener('keydown', (e) => {
    if(e.key !== 'Escape') return;
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if(isOpen) closeNav();
  });

  nav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => closeNav());
  });
}

function pillLink(label, url){
  const a = document.createElement("a");
  a.className = isBootstrapUI() ? "social-pill text-body-secondary bg-body-tertiary" : "social-pill";
  a.textContent = label;
  a.href = url || "#";
  if(url && !url.startsWith("mailto:")){
    a.target = "_blank";
    a.rel = "noopener";
  }
  if(!url){ a.setAttribute("aria-disabled","true"); a.style.opacity = ".55"; a.style.pointerEvents = "none"; }
  return a;
}

function renderProfile(){
  const p = window.PROFILE;

  document.title = `${p.name} | Portfolio`;

  // Start typing animation for tagline
  if (p.tagline) {
    typeText(p.tagline, 'typingText', 45);
  }

  $("statYears").textContent = p.yearsExperience;
  $("statFocus").textContent = p.focus;
  $("statLocation").textContent = p.location;

  // Resume
  if(p.resumeUrl){
    $("resumeBtn").href = p.resumeUrl;
  }else{
    $("resumeBtn").style.opacity = ".55";
    $("resumeBtn").style.pointerEvents = "none";
    $("resumeBtn").title = "Add a resumeUrl in profile.js to enable.";
  }

  // Socials
  const row = $("socialRow");
  row.innerHTML = "";
  (p.socials || []).forEach((s, i) => {
    const el = pillLink(s.label, s.url);
    row.appendChild(el);
    applyBootstrapReveal(el, 90 + i * 60);
  });

  // About / highlights
  $("aboutText").textContent = p.about;
  const hl = $("highlights");
  hl.innerHTML = "";
  (p.highlights || []).forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    hl.appendChild(li);
  });

  // Skills
  const sg = $("skillsGrid");
  sg.innerHTML = "";
  (p.skills || []).forEach((group, i) => {
    const card = document.createElement("div");
    if(isBootstrapUI()){
      card.className = "col-md-6 col-lg-4";
      const inner = document.createElement("div");
      inner.className = "card h-100 shadow-sm";
      const body = document.createElement("div");
      body.className = "card-body";

      const h = document.createElement("h3");
      h.className = "h6 fw-bold mb-2";
      h.textContent = group.category;

      const tags = document.createElement("div");
      tags.className = "d-flex flex-wrap gap-2";
      (group.items || []).forEach(item => {
        const t = document.createElement("span");
        t.className = "badge text-bg-secondary";
        t.textContent = item;
        tags.appendChild(t);
      });

      body.appendChild(h);
      body.appendChild(tags);
      inner.appendChild(body);
      card.appendChild(inner);
      sg.appendChild(card);
      applyBootstrapReveal(card, 90 + i * 60);
      return;
    }

    card.className = "skill-card";
    const h = document.createElement("h3");
    h.className = "skill-title";
    h.textContent = group.category;
    const tags = document.createElement("div");
    tags.className = "skill-tags";
    (group.items || []).forEach(item => {
      const t = document.createElement("span");
      t.className = "tag";
      t.textContent = item;
      tags.appendChild(t);
    });
    card.appendChild(h);
    card.appendChild(tags);
    sg.appendChild(card);
  });

  // Featured projects
  const fp = $("featuredProjects");
  fp.innerHTML = "";
  (p.featuredProjects || []).forEach((pr, i) => {
    const card = document.createElement("div");
    if(isBootstrapUI()){
      card.className = "col-md-6 col-lg-4";
      const inner = document.createElement("div");
      inner.className = "card h-100 shadow-sm";
      const body = document.createElement("div");
      body.className = "card-body d-flex flex-column";

      const h = document.createElement("h3");
      h.className = "h6 fw-bold mb-2";
      h.textContent = pr.title;

      const d = document.createElement("p");
      d.className = "text-secondary mb-3";
      d.textContent = pr.description;

      const meta = document.createElement("div");
      meta.className = "d-flex flex-wrap gap-2 mt-auto";
      (pr.tech || []).forEach(t => {
        const s = document.createElement("span");
        s.className = "badge text-bg-secondary";
        s.textContent = t;
        meta.appendChild(s);
      });

      const links = document.createElement("div");
      links.className = "d-flex flex-wrap gap-2 mt-3";
      (pr.links || []).forEach(l => {
        if(!l.url) return;
        const a = document.createElement("a");
        a.className = "btn btn-outline-secondary btn-sm";
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = `${l.label} ↗`;
        links.appendChild(a);
      });

      body.appendChild(h);
      body.appendChild(d);
      body.appendChild(meta);
      if(links.childElementCount) body.appendChild(links);
      inner.appendChild(body);
      card.appendChild(inner);
      fp.appendChild(card);
      applyBootstrapReveal(card, 90 + i * 60);
      return;
    }

    card.className = "project-card";
    const h = document.createElement("h3");
    h.className = "project-title";
    h.textContent = pr.title;

    const d = document.createElement("p");
    d.className = "project-desc";
    d.textContent = pr.description;

    const meta = document.createElement("div");
    meta.className = "project-meta";
    (pr.tech || []).forEach(t => {
      const s = document.createElement("span");
      s.className = "meta-pill";
      s.textContent = t;
      meta.appendChild(s);
    });

    const links = document.createElement("div");
    links.className = "project-links";
    (pr.links || []).forEach(l => {
      if(!l.url) return;
      const a = document.createElement("a");
      a.className = "link";
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `${l.label} ↗`;
      links.appendChild(a);
    });

    card.appendChild(h);
    card.appendChild(d);
    card.appendChild(meta);
    card.appendChild(links);
    fp.appendChild(card);
  });

  // Experience
  const ex = $("experienceTimeline");
  ex.innerHTML = "";
  (p.experience || []).forEach((it, i) => {
    if(isBootstrapUI()){
      const wrap = document.createElement('div');
      wrap.className = 'card shadow-sm';

      const body = document.createElement('div');
      body.className = 'card-body';

      const head = document.createElement('div');
      head.className = 'd-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-2';

      const left = document.createElement('div');
      const role = document.createElement('div');
      role.className = 'fw-bold';
      role.textContent = it.role;
      const org = document.createElement('div');
      org.className = 'text-secondary';
      org.textContent = it.org;
      left.appendChild(role);
      left.appendChild(org);

      const dates = document.createElement('div');
      dates.className = 'text-secondary small';
      dates.textContent = it.dates;

      head.appendChild(left);
      head.appendChild(dates);

      const ul = document.createElement('ul');
      ul.className = 'text-secondary mb-0 ps-3';
      (it.bullets || []).forEach(b => {
        const li = document.createElement('li');
        li.textContent = b;
        ul.appendChild(li);
      });

      body.appendChild(head);
      body.appendChild(ul);
      wrap.appendChild(body);
      ex.appendChild(wrap);
      applyBootstrapReveal(wrap, 90 + i * 60);
      return;
    }

    const card = document.createElement("div");
    card.className = "timeline-item";

    const top = document.createElement("div");
    top.className = "timeline-top";

    const left = document.createElement("div");
    const role = document.createElement("h3");
    role.className = "timeline-role";
    role.textContent = it.role;
    const org = document.createElement("div");
    org.className = "timeline-org";
    org.textContent = it.org;
    left.appendChild(role);
    left.appendChild(org);

    const dates = document.createElement("div");
    dates.className = "timeline-dates";
    dates.textContent = it.dates;

    top.appendChild(left);
    top.appendChild(dates);

    const ul = document.createElement("ul");
    ul.className = "timeline-bullets";
    (it.bullets || []).forEach(b => {
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    });

    card.appendChild(top);
    card.appendChild(ul);
    ex.appendChild(card);
  });

  // Education
  const eg = $("educationGrid");
  eg.innerHTML = "";
  (p.education || []).forEach((ed, i) => {
    const card = document.createElement("div");
    if(isBootstrapUI()){
      card.className = "col-md-6";
      const inner = document.createElement("div");
      inner.className = "card h-100 shadow-sm";
      const body = document.createElement("div");
      body.className = "card-body";

      const t = document.createElement("h3");
      t.className = "h6 fw-bold mb-1";
      t.textContent = ed.title;
      const m = document.createElement("p");
      m.className = "text-secondary mb-0";
      m.textContent = ed.meta;

      body.appendChild(t);
      body.appendChild(m);
      inner.appendChild(body);
      card.appendChild(inner);
      eg.appendChild(card);
      applyBootstrapReveal(card, 120 + i * 90);
      return;
    }

    card.className = "edu-card";
    const t = document.createElement("h3");
    t.className = "edu-title";
    t.textContent = ed.title;
    const m = document.createElement("p");
    m.className = "edu-meta";
    m.textContent = ed.meta;
    card.appendChild(t);
    card.appendChild(m);
    eg.appendChild(card);
  });

  // Patents
  const pg = $("patentsGrid");
  if (pg && p.patents) {
    pg.innerHTML = "";
    (p.patents || []).forEach((patent, i) => {
      const card = document.createElement("div");
      if(isBootstrapUI()){
        card.className = "col-lg-6";
        const inner = document.createElement("div");
        inner.className = "card h-100 shadow-sm patent-card-bs";
        const body = document.createElement("div");
        body.className = "card-body";

        const statusText = (patent.status || "").toString().trim();
        const statusLower = statusText.toLowerCase();
        let statusClass = "text-bg-secondary";
        if(statusLower.includes('published') || statusLower.includes('granted') || statusLower.includes('issued')){
          statusClass = "text-bg-success";
          inner.classList.add('status-success');
        }else if(statusLower.includes('pending') || statusLower.includes('filed') || statusLower.includes('provisional')){
          statusClass = "text-bg-warning";
          inner.classList.add('status-warning');
        }else if(statusLower.includes('rejected') || statusLower.includes('abandoned') || statusLower.includes('expired')){
          statusClass = "text-bg-danger";
          inner.classList.add('status-danger');
        }

        const header = document.createElement('div');
        header.className = 'd-flex justify-content-between align-items-start gap-2 mb-2';

        const title = document.createElement("h3");
        title.className = "h6 fw-bold mb-0";
        title.textContent = patent.title;

        const status = document.createElement('span');
        status.className = `badge rounded-pill ${statusClass} patent-status-bs`;
        status.textContent = statusText || '—';

        header.appendChild(title);
        header.appendChild(status);

        const meta = document.createElement("div");
        meta.className = "d-flex flex-wrap gap-2 text-secondary small mb-2";
        meta.innerHTML = `
          <span class="badge text-bg-secondary">${patent.number}</span>
          <span class="badge text-bg-secondary">${patent.office}</span>
          <span class="badge text-bg-secondary">${patent.date}</span>
        `;

        const inventors = document.createElement("p");
        inventors.className = "text-secondary mb-2";
        inventors.textContent = `Inventors: ${patent.inventors}`;

        const desc = document.createElement("p");
        desc.className = "text-secondary mb-3";
        desc.textContent = patent.description;

        const link = document.createElement("a");
        link.className = "btn btn-outline-secondary btn-sm";
        link.href = patent.url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "View Patent ↗";

        body.appendChild(header);
        body.appendChild(meta);
        body.appendChild(inventors);
        body.appendChild(desc);
        body.appendChild(link);
        inner.appendChild(body);
        card.appendChild(inner);
        pg.appendChild(card);
        applyBootstrapReveal(card, 140 + i * 110);
        return;
      }

      card.className = "patent-card";
      
      const header = document.createElement("div");
      header.className = "patent-header";
      
      const title = document.createElement("h3");
      title.className = "patent-title";
      title.textContent = patent.title;
      
      const status = document.createElement("span");
      status.className = "patent-status";
      status.textContent = patent.status;
      
      header.appendChild(title);
      header.appendChild(status);
      
      const meta = document.createElement("div");
      meta.className = "patent-meta";
      meta.innerHTML = `
        <span class="patent-number">📄 ${patent.number}</span>
        <span class="patent-office">${patent.office}</span>
        <span class="patent-date">📅 ${patent.date}</span>
      `;
      
      const inventors = document.createElement("p");
      inventors.className = "patent-inventors";
      inventors.textContent = `Inventors: ${patent.inventors}`;
      
      const desc = document.createElement("p");
      desc.className = "patent-desc";
      desc.textContent = patent.description;
      
      const link = document.createElement("a");
      link.className = "patent-link";
      link.href = patent.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.innerHTML = `View Patent ↗`;
      
      card.appendChild(header);
      card.appendChild(meta);
      card.appendChild(inventors);
      card.appendChild(desc);
      card.appendChild(link);
      
      pg.appendChild(card);
    });
  }

  // Contact
  $("contactBlurb").textContent = (p.contact && p.contact.blurb) ? p.contact.blurb : "";
  $("emailText").textContent = p.contact.email || "your.email@example.com";
  $("emailLink").href = p.contact.email ? `mailto:${p.contact.email}` : "#";

  $("linkedinText").textContent = p.contact.linkedin ? "View profile" : "Add your LinkedIn";
  $("linkedinLink").href = p.contact.linkedin || "#";
  if(!p.contact.linkedin){
    $("linkedinLink").style.opacity = ".55";
    $("linkedinLink").style.pointerEvents = "none";
  }

  // GitHub pills
  const user = p.githubUsername || "ranjay-kum-shan";
  $("githubUserPill").textContent = `@${user}`;
  $("githubProfileLink").href = `https://github.com/${user}`;
  $("githubLink").href = `https://github.com/${user}`;

  // Footer
  $("year").textContent = new Date().getFullYear();
  $("lastUpdated").textContent = new Date().toLocaleDateString(undefined, { year:"numeric", month:"short", day:"numeric" });

  // Bootstrap UI: ensure newly-rendered items are observed for reveals
  initBootstrapReveals();
}

async function fetchGithubRepos(){
  const p = window.PROFILE;
  const user = p.githubUsername || "ranjay-kum-shan";
  const limit = p.githubRepoCount || 6;

  const grid = $("repoGrid");
  const note = $("repoNote");
  rememberLoading(true);

  // Show loading skeleton
  grid.innerHTML = Array(limit).fill(0).map(() => `
    <div class="repo-card" style="opacity: 0.6;">
      <div class="repo-top">
        <span class="repo-name">Loading...</span>
        <span class="meta-pill">—</span>
      </div>
      <p class="repo-desc">Fetching repository data...</p>
    </div>
  `).join('');

  try{
    // Public GitHub API (unauthenticated rate limits apply).
    const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated`;
    const res = await fetch(url, { 
      headers: { 
        "Accept":"application/vnd.github+json",
        "User-Agent": "Portfolio-Site"
      }
    });
    if(!res.ok) throw new Error(`GitHub API returned ${res.status}`);

    const repos = await res.json();

    // Sort by stars then updated, and show the top few.
    repos.sort((a,b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.updated_at) - new Date(a.updated_at)));
    const top = repos.slice(0, limit);

    grid.innerHTML = "";
    if(top.length === 0){
      note.textContent = "No public repos found yet. Make a repository public and click Refresh.";
      return;
    }
    note.textContent = `Showing ${top.length} public repositories via GitHub API.`;

    top.forEach((r, index) => {
      const card = document.createElement("div");
      if(isBootstrapUI()){
        card.className = "col-md-6 col-lg-4";
      }else{
        card.className = "repo-card";
      }
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";

      if(isBootstrapUI()){
        const inner = document.createElement("div");
        inner.className = "card h-100 shadow-sm";
        const body = document.createElement("div");
        body.className = "card-body";

        const topRow = document.createElement("div");
        topRow.className = "d-flex justify-content-between align-items-center gap-2 mb-2";

        const name = document.createElement("a");
        name.className = "fw-semibold text-decoration-none";
        name.href = r.html_url;
        name.target = "_blank";
        name.rel = "noopener";
        name.textContent = r.name;

        const badge = document.createElement("span");
        badge.className = "badge text-bg-secondary";
        badge.textContent = r.language || "—";

        topRow.appendChild(name);
        topRow.appendChild(badge);

        const desc = document.createElement("p");
        desc.className = "text-secondary mb-3";
        desc.textContent = r.description || "No description yet.";

        const bottom = document.createElement("div");
        bottom.className = "d-flex flex-wrap gap-3 text-secondary small";
        const updatedDate = new Date(r.updated_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        bottom.innerHTML = `
          <span>⭐ ${r.stargazers_count}</span>
          <span>🔱 ${r.forks_count}</span>
          <span>📅 ${updatedDate}</span>
        `;

        body.appendChild(topRow);
        body.appendChild(desc);
        body.appendChild(bottom);
        inner.appendChild(body);
        card.appendChild(inner);
        grid.appendChild(card);

        applyBootstrapReveal(card, 140 + index * 90);

        setTimeout(() => {
          card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, index * 100);
        return;
      }

      const topRow = document.createElement("div");
      topRow.className = "repo-top";

      const name = document.createElement("a");
      name.className = "repo-name";
      name.href = r.html_url;
      name.target = "_blank";
      name.rel = "noopener";
      name.textContent = r.name;

      const badge = document.createElement("span");
      badge.className = "meta-pill";
      badge.textContent = r.language || "—";

      topRow.appendChild(name);
      topRow.appendChild(badge);

      const desc = document.createElement("p");
      desc.className = "repo-desc";
      desc.textContent = r.description || "No description yet.";

      const bottom = document.createElement("div");
      bottom.className = "repo-bottom";
      const updatedDate = new Date(r.updated_at).toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      bottom.innerHTML = `
        <span>⭐ ${r.stargazers_count}</span>
        <span>🔱 ${r.forks_count}</span>
        <span>📅 ${updatedDate}</span>
      `;

      card.appendChild(topRow);
      card.appendChild(desc);
      card.appendChild(bottom);

      grid.appendChild(card);
      
      // Animate in
      setTimeout(() => {
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 100);
    });

    // Bootstrap UI: observe any new repo cards
    initBootstrapReveals();
  }catch(err){
    grid.innerHTML = "";
    note.textContent = "Could not load GitHub repos right now (rate limit or network issue). Try again later.";
    console.error("GitHub API Error:", err);
  }finally{
    rememberLoading(false);
  }
}

function rememberLoading(isLoading){
  const btn = $("refreshRepos");
  if(!btn) return;
  btn.disabled = isLoading;
  btn.textContent = isLoading ? "Refreshing…" : "Refresh";
}

function initEvents(){
  $("themeToggle").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  const swipeToggle = $("swipeModeToggle");
  if(swipeToggle){
    swipeToggle.addEventListener('click', () => {
      const enabled = !document.body.classList.contains('swipe-mode');
      setSwipeMode(enabled, { persist: true });
    });
  }

  $("refreshRepos").addEventListener("click", fetchGithubRepos);
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // If using Bootstrap navbar collapse, close it after navigation.
  if(isBootstrapUI() && window.bootstrap){
    const navCollapse = document.getElementById('primaryNav');
    if(navCollapse){
      navCollapse.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', () => {
          const instance = window.bootstrap.Collapse.getInstance(navCollapse) || new window.bootstrap.Collapse(navCollapse, { toggle:false });
          instance.hide();
        });
      });
    }
  }

  initMobileNav();
}

function setSwipeMode(enabled, opts = { persist: true }){
  const swipeToggle = $("swipeModeToggle");

  if(enabled){
    document.body.classList.add('swipe-mode');
    document.documentElement.classList.add('swipe-mode');
    swipeToggle?.setAttribute('aria-pressed', 'true');
    if(swipeToggle){
      swipeToggle.classList.remove('btn-outline-secondary');
      swipeToggle.classList.add('btn-primary');
      swipeToggle.textContent = 'Swipe: ON';
    }
    enableSwipeDeck();
    showSwipeHintOnce();
  }else{
    document.body.classList.remove('swipe-mode');
    document.documentElement.classList.remove('swipe-mode');
    swipeToggle?.setAttribute('aria-pressed', 'false');
    if(swipeToggle){
      swipeToggle.classList.add('btn-outline-secondary');
      swipeToggle.classList.remove('btn-primary');
      swipeToggle.textContent = 'Swipe';
    }
    disableSwipeDeck();
  }

  if(opts && opts.persist){
    try{ localStorage.setItem('swipeMode', enabled ? '1' : '0'); }catch(_){ /* ignore */ }
  }
}

let swipeDeck = {
  enabled: false,
  sections: [],
  index: 0,
  savedScrollY: 0,
  overlayEl: null,
  deckEl: null,
  restorePoints: [],
  hintEl: null,
  pointerId: null,
  startX: 0,
  startY: 0,
  dragging: false,
  moved: false,
  activeEl: null
};

function setHeaderHeightVar(){
  const header = document.querySelector('header');
  const h = header ? header.getBoundingClientRect().height : 84;
  document.documentElement.style.setProperty('--header-h', `${Math.round(h)}px`);
}

function getOrderedSections(){
  return Array.from(document.querySelectorAll('main section[id]'))
    .filter(s => s.id && s.id.trim().length > 0);
}

function getInitialSectionIndex(sections){
  const id = (location.hash && location.hash.startsWith('#')) ? location.hash.slice(1) : null;
  if(id){
    const idx = sections.findIndex(s => s.id === id);
    if(idx >= 0) return idx;
  }

  // If no hash, pick the section closest to the top of the viewport.
  const header = document.querySelector('header');
  const headerH = header ? header.getBoundingClientRect().height : 84;
  let bestIdx = 0;
  let bestDist = Infinity;
  sections.forEach((sec, idx) => {
    const top = sec.getBoundingClientRect().top;
    const dist = Math.abs(top - headerH);
    if(dist < bestDist){ bestDist = dist; bestIdx = idx; }
  });
  return bestIdx;
}

function renderSwipeDeckState(){
  const sections = swipeDeck.sections;
  const idx = swipeDeck.index;
  sections.forEach((sec, i) => {
    sec.dataset.swipeHidden = (i !== idx && i !== idx + 1) ? 'true' : 'false';
    sec.dataset.swipeActive = (i === idx) ? 'true' : 'false';
    sec.dataset.swipeNext = (i === idx + 1) ? 'true' : 'false';
    sec.style.zIndex = i === idx ? '3' : (i === idx + 1 ? '2' : '1');

    if(i === idx){
      // reset in case previous swipe left transform
      sec.style.transition = '';
      sec.style.transform = 'translate3d(0,0,0) rotate(0deg)';
    }
  });

  const active = sections[idx];
  swipeDeck.activeEl = active;
  if(active){
    history.replaceState(null, '', `#${active.id}`);
  }
}

function ensureSwipeOverlay(){
  if(swipeDeck.overlayEl && swipeDeck.deckEl) return;
  const overlay = document.createElement('div');
  overlay.id = 'swipeDeckOverlay';
  overlay.className = 'swipe-overlay';
  overlay.hidden = true;

  const overlayBar = document.createElement('div');
  overlayBar.className = 'swipe-overlay-bar';
  overlayBar.innerHTML = `
    <div class="swipe-overlay-title">Swipe Mode</div>
    <button type="button" class="btn btn-sm btn-outline-secondary" id="swipeCloseBtn" aria-label="Exit swipe mode">Exit</button>
  `;

  const deck = document.createElement('div');
  deck.className = 'swipe-deck';
  overlay.appendChild(overlayBar);
  overlay.appendChild(deck);

  document.body.appendChild(overlay);
  swipeDeck.overlayEl = overlay;
  swipeDeck.deckEl = deck;

  const closeBtn = document.getElementById('swipeCloseBtn');
  closeBtn?.addEventListener('click', () => {
    setSwipeMode(false, { persist: true });
  });
}

function showSwipeHintOnce(){
  if(swipeDeck.hintEl) return;
  const el = document.createElement('div');
  el.className = 'swipe-hint';
  el.textContent = 'Drag left/right to switch sections • Esc to exit';
  document.body.appendChild(el);
  swipeDeck.hintEl = el;
  window.setTimeout(() => {
    el.style.transition = 'opacity .35s ease';
    el.style.opacity = '0';
    window.setTimeout(() => el.remove(), 400);
    swipeDeck.hintEl = null;
  }, 2200);
}

function enableSwipeDeck(){
  swipeDeck.enabled = true;
  setHeaderHeightVar();

  ensureSwipeOverlay();
  swipeDeck.overlayEl.hidden = false;
  swipeDeck.overlayEl.style.display = 'block';

  // Hard hide main content so the page can't behave like normal scroll.
  const main = document.querySelector('main');
  if(main) main.style.display = 'none';

  // Hard lock scroll (extra safety for Safari/iOS)
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  // Lock current page scroll position (helps iOS Safari + prevents jump)
  swipeDeck.savedScrollY = window.scrollY || 0;

  swipeDeck.sections = getOrderedSections();
  swipeDeck.index = getInitialSectionIndex(swipeDeck.sections);

  // Move real section nodes into the overlay deck, remember where to restore them.
  swipeDeck.restorePoints = swipeDeck.sections.map(sec => ({
    sec,
    parent: sec.parentNode,
    next: sec.nextSibling
  }));
  swipeDeck.sections.forEach(sec => {
    sec.classList.add('swipe-card');
    swipeDeck.deckEl.appendChild(sec);
  });

  // Ensure previous layout artifacts are hidden
  const cardsBar = $('sectionCards');
  if(cardsBar) cardsBar.style.display = 'none';

  renderSwipeDeckState();

  window.addEventListener('resize', setHeaderHeightVar);
}

function disableSwipeDeck(){
  swipeDeck.enabled = false;
  swipeDeck.pointerId = null;
  swipeDeck.dragging = false;
  swipeDeck.moved = false;
  swipeDeck.activeEl = null;

  // Restore main content
  const main = document.querySelector('main');
  if(main) main.style.display = '';

  // Release hard lock
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  // Restore sections back to main
  swipeDeck.restorePoints.forEach(({ sec, parent, next }) => {
    sec.classList.remove('swipe-card');
    delete sec.dataset.swipeHidden;
    delete sec.dataset.swipeActive;
    delete sec.dataset.swipeNext;
    sec.style.transition = '';
    sec.style.transform = '';
    sec.style.zIndex = '';
    if(parent){
      if(next) parent.insertBefore(sec, next);
      else parent.appendChild(sec);
    }
  });
  swipeDeck.restorePoints = [];

  swipeDeck.sections = [];

  window.removeEventListener('resize', setHeaderHeightVar);

  // Restore page scroll position
  if(typeof swipeDeck.savedScrollY === 'number'){
    // Safari doesn't support behavior: "instant"
    window.scrollTo(0, swipeDeck.savedScrollY);
  }

  if(swipeDeck.overlayEl){
    swipeDeck.overlayEl.hidden = true;
    swipeDeck.overlayEl.style.display = 'none';
  }
}

function getSectionLabel(section){
  const id = section.id;
  const navLink = document.querySelector(`a[href="#${CSS.escape(id)}"]`);
  if(navLink){
    const text = (navLink.textContent || '').trim();
    if(text) return text;
  }
  const heading = section.querySelector('h1,h2');
  return heading ? (heading.textContent || id).trim() : id;
}

function initSectionCards(){
  const bar = $('sectionCards');
  if(!bar) return;

  // Show on all screen sizes (mobile + desktop).
  bar.style.display = '';

  const sections = getOrderedSections();
  if(sections.length === 0) return;

  bar.innerHTML = '';

  const cardsById = new Map();
  sections.forEach(sec => {
    const a = document.createElement('a');
    a.className = 'section-card';
    a.href = `#${sec.id}`;
    a.textContent = getSectionLabel(sec);
    a.addEventListener('click', (e) => {
      e.preventDefault();
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    bar.appendChild(a);
    cardsById.set(sec.id, a);
  });

  let isUserScrollingBar = false;
  let barScrollEndTimer = null;
  let ignoreBarSyncUntil = 0;

  // Mouse/trackpad drag support (desktop).
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let dragHasMoved = false;

  function getClientX(evt){
    if(!evt) return 0;
    if(typeof evt.clientX === 'number') return evt.clientX;
    return 0;
  }

  bar.style.cursor = 'grab';

  bar.addEventListener('pointerdown', () => { isUserScrollingBar = true; }, { passive: true });
  window.addEventListener('pointerup', () => {
    // small delay so momentum scrolling counts as user scroll
    window.setTimeout(() => { isUserScrollingBar = false; }, 150);
  }, { passive: true });

  bar.addEventListener('pointerdown', (e) => {
    // Enable dragging for mouse/pen; touch should naturally scroll.
    if(e.pointerType === 'touch') return;
    if(typeof e.button === 'number' && e.button !== 0) return;
    isDragging = true;
    dragHasMoved = false;
    dragStartX = getClientX(e);
    dragStartScrollLeft = bar.scrollLeft;
    bar.style.cursor = 'grabbing';
    bar.style.userSelect = 'none';
    try{ bar.setPointerCapture(e.pointerId); }catch(_){ /* ignore */ }
  });

  bar.addEventListener('pointermove', (e) => {
    if(!isDragging) return;
    const x = getClientX(e);
    const dx = x - dragStartX;
    if(Math.abs(dx) > 3) dragHasMoved = true;
    bar.scrollLeft = dragStartScrollLeft - dx;
  });

  bar.addEventListener('pointerup', (e) => {
    if(!isDragging) return;
    isDragging = false;
    bar.style.cursor = 'grab';
    bar.style.userSelect = '';

    // If it was a click (no drag), let the anchor click handler run.
    if(!dragHasMoved) return;

    // Snap/navigate to nearest after drag.
    const id = getNearestCardIdToCenter();
    ignoreBarSyncUntil = Date.now() + 600;
    setActiveSection(id, { scrollBar: true });
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  bar.addEventListener('pointercancel', () => {
    isDragging = false;
    bar.style.cursor = 'grab';
    bar.style.userSelect = '';
  });

  function setActiveSection(sectionId, opts = { scrollBar: true }){
    cardsById.forEach((el, id) => {
      if(id === sectionId) el.classList.add('is-active');
      else el.classList.remove('is-active');
    });

    if(opts.scrollBar){
      const card = cardsById.get(sectionId);
      if(card){
        const now = Date.now();
        if(now >= ignoreBarSyncUntil && !isUserScrollingBar){
          card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    }
  }

  // Sync active card based on vertical scroll position
  const observer = new IntersectionObserver((entries) => {
    // pick the most visible intersecting section
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => (b.intersectionRatio - a.intersectionRatio));
    if(visible.length === 0) return;
    const id = visible[0].target.id;
    setActiveSection(id, { scrollBar: true });
  }, {
    root: null,
    threshold: [0.2, 0.35, 0.5, 0.65],
    rootMargin: '-20% 0px -55% 0px'
  });
  sections.forEach(sec => observer.observe(sec));

  // When the user swipes the bar itself, snap to the nearest card and navigate.
  function getNearestCardIdToCenter(){
    const barRect = bar.getBoundingClientRect();
    const centerX = barRect.left + barRect.width / 2;
    let bestId = sections[0].id;
    let bestDist = Infinity;
    sections.forEach(sec => {
      const card = cardsById.get(sec.id);
      if(!card) return;
      const r = card.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const dist = Math.abs(cardCenter - centerX);
      if(dist < bestDist){
        bestDist = dist;
        bestId = sec.id;
      }
    });
    return bestId;
  }

  bar.addEventListener('scroll', () => {
    if(barScrollEndTimer) window.clearTimeout(barScrollEndTimer);
    barScrollEndTimer = window.setTimeout(() => {
      if(!isUserScrollingBar) return;
      const id = getNearestCardIdToCenter();
      ignoreBarSyncUntil = Date.now() + 600;
      setActiveSection(id, { scrollBar: true });
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 140);
  }, { passive: true });

  // Initial active
  const initial = (location.hash && location.hash.startsWith('#')) ? location.hash.slice(1) : sections[0].id;
  if(cardsById.has(initial)) setActiveSection(initial, { scrollBar: true });
}

function initSwipeGestures(){
  ensureSwipeOverlay();
  const surface = swipeDeck.deckEl;
  if(!surface) return;

  function shouldIgnoreTarget(t){
    if(!t) return true;
    const tag = (t.tagName || '').toLowerCase();
    if(['input','textarea','select','button'].includes(tag)) return true;
    // allow links to be clickable within the card (don't start swipe from a link)
    if(tag === 'a') return true;
    return !!t.closest?.('[data-no-swipe]');
  }

  function onPointerDown(e){
    if(!document.body.classList.contains('swipe-mode')) return;
    if(!swipeDeck.enabled) return;
    if(e.pointerType !== 'touch' && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    if(e.pointerType === 'mouse' && typeof e.button === 'number' && e.button !== 0) return;
    if(shouldIgnoreTarget(e.target)) return;

    const active = swipeDeck.activeEl;
    if(!active) return;

    swipeDeck.pointerId = e.pointerId;
    swipeDeck.startX = e.clientX;
    swipeDeck.startY = e.clientY;
    swipeDeck.dragging = true;
    swipeDeck.moved = false;
    active.style.transition = 'none';
    try{ active.setPointerCapture(e.pointerId); }catch(_){ /* ignore */ }
  }

  function onPointerMove(e){
    if(!document.body.classList.contains('swipe-mode')) return;
    if(!swipeDeck.dragging) return;
    if(swipeDeck.pointerId !== e.pointerId) return;
    const active = swipeDeck.activeEl;
    if(!active) return;

    const dx = e.clientX - swipeDeck.startX;
    const dy = e.clientY - swipeDeck.startY;
    if(Math.abs(dx) > 4) swipeDeck.moved = true;

    const rot = Math.max(-14, Math.min(14, dx / 22));
    active.style.transform = `translate3d(${dx}px, ${dy * 0.08}px, 0) rotate(${rot}deg)`;
  }

  function animateBack(active){
    active.style.transition = prefersReducedMotion() ? 'none' : 'transform 220ms ease';
    active.style.transform = 'translate3d(0,0,0) rotate(0deg)';
  }

  function animateOut(active, dir){
    const w = Math.max(320, window.innerWidth);
    const x = dir * (w * 1.15);
    const rot = dir * 18;
    active.style.transition = prefersReducedMotion() ? 'none' : 'transform 240ms ease';
    active.style.transform = `translate3d(${x}px, 0, 0) rotate(${rot}deg)`;
  }

  function goToIndex(nextIndex){
    const clamped = Math.max(0, Math.min(nextIndex, swipeDeck.sections.length - 1));
    swipeDeck.index = clamped;
    renderSwipeDeckState();
  }

  function onPointerUp(e){
    if(!document.body.classList.contains('swipe-mode')) return;
    if(!swipeDeck.dragging) return;
    if(swipeDeck.pointerId !== e.pointerId) return;

    swipeDeck.dragging = false;
    swipeDeck.pointerId = null;

    const active = swipeDeck.activeEl;
    if(!active) return;

    const dx = e.clientX - swipeDeck.startX;
    const dy = e.clientY - swipeDeck.startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // Require a clear horizontal gesture.
    const threshold = Math.max(90, Math.round(window.innerWidth * 0.22));
    if(absX < threshold || absX < absY * 1.35){
      animateBack(active);
      return;
    }

    // Tinder-like navigation: left = next, right = previous
    const dir = dx < 0 ? -1 : 1;
    const nextIndex = dx < 0 ? swipeDeck.index + 1 : swipeDeck.index - 1;
    if(nextIndex < 0 || nextIndex >= swipeDeck.sections.length){
      animateBack(active);
      return;
    }

    animateOut(active, dir);
    window.setTimeout(() => {
      // reset before showing again later
      active.style.transition = '';
      active.style.transform = 'translate3d(0,0,0) rotate(0deg)';
      goToIndex(nextIndex);
    }, prefersReducedMotion() ? 0 : 245);
  }

  surface.addEventListener('pointerdown', onPointerDown, { passive: true });
  surface.addEventListener('pointermove', onPointerMove, { passive: true });
  surface.addEventListener('pointerup', onPointerUp, { passive: true });
  surface.addEventListener('pointercancel', onPointerUp, { passive: true });

  // Touch fallback (Mobile Safari reliability)
  let touchActive = false;
  function onTouchStart(e){
    if(!document.body.classList.contains('swipe-mode')) return;
    if(!swipeDeck.enabled) return;
    if(!e.touches || e.touches.length !== 1) return;
    if(shouldIgnoreTarget(e.target)) return;
    const active = swipeDeck.activeEl;
    if(!active) return;
    touchActive = true;
    swipeDeck.startX = e.touches[0].clientX;
    swipeDeck.startY = e.touches[0].clientY;
    active.style.transition = 'none';
  }

  function onTouchMove(e){
    if(!touchActive) return;
    const active = swipeDeck.activeEl;
    if(!active) return;
    const t = e.touches && e.touches[0];
    if(!t) return;
    const dx = t.clientX - swipeDeck.startX;
    const dy = t.clientY - swipeDeck.startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // Only hijack when the gesture is clearly horizontal.
    if(absX > 10 && absX > absY * 1.1){
      e.preventDefault();
      const rot = Math.max(-14, Math.min(14, dx / 22));
      active.style.transform = `translate3d(${dx}px, ${dy * 0.08}px, 0) rotate(${rot}deg)`;
    }
  }

  function onTouchEnd(e){
    if(!touchActive) return;
    touchActive = false;
    const active = swipeDeck.activeEl;
    if(!active) return;

    const t = e.changedTouches && e.changedTouches[0];
    if(!t) return;
    const dx = t.clientX - swipeDeck.startX;
    const dy = t.clientY - swipeDeck.startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const threshold = Math.max(90, Math.round(window.innerWidth * 0.22));

    function back(){
      active.style.transition = prefersReducedMotion() ? 'none' : 'transform 220ms ease';
      active.style.transform = 'translate3d(0,0,0) rotate(0deg)';
    }

    if(absX < threshold || absX < absY * 1.35){
      back();
      return;
    }

    const dir = dx < 0 ? -1 : 1;
    const nextIndex = dx < 0 ? swipeDeck.index + 1 : swipeDeck.index - 1;
    if(nextIndex < 0 || nextIndex >= swipeDeck.sections.length){
      back();
      return;
    }

    const w = Math.max(320, window.innerWidth);
    const x = dir * (w * 1.15);
    const rot = dir * 18;
    active.style.transition = prefersReducedMotion() ? 'none' : 'transform 240ms ease';
    active.style.transform = `translate3d(${x}px, 0, 0) rotate(${rot}deg)`;

    window.setTimeout(() => {
      active.style.transition = '';
      active.style.transform = 'translate3d(0,0,0) rotate(0deg)';
      swipeDeck.index = nextIndex;
      renderSwipeDeckState();
    }, prefersReducedMotion() ? 0 : 245);
  }

  surface.addEventListener('touchstart', onTouchStart, { passive: true });
  surface.addEventListener('touchmove', onTouchMove, { passive: false });
  surface.addEventListener('touchend', onTouchEnd, { passive: true });
}

(function init(){
  initTheme();
  renderProfile();
  initEvents();
  initSwipeGestures();

  // Restore swipe mode preference
  try{
    if(localStorage.getItem('swipeMode') === '1'){
      setSwipeMode(true, { persist: false });
    }
  }catch(_){ /* ignore */ }

  initScrollAnimations();
  initLayerAnimations();
  if(!prefersReducedMotion()){
    initParallax();
  }
  initScrollToTop();
  fetchGithubRepos();
  
  // Update scroll progress on scroll
  window.addEventListener('scroll', updateScrollProgress);
})();

// Keyboard controls for swipe mode
document.addEventListener('keydown', (e) => {
  if(!document.body.classList.contains('swipe-mode')) return;
  if(e.key === 'Escape'){
    const btn = $('swipeModeToggle');
    document.body.classList.remove('swipe-mode');
    btn?.setAttribute('aria-pressed', 'false');
    disableSwipeDeck();
    return;
  }
  if(!swipeDeck.enabled) return;
  if(e.key === 'ArrowLeft'){
    swipeDeck.index = Math.max(0, swipeDeck.index - 1);
    renderSwipeDeckState();
  }
  if(e.key === 'ArrowRight'){
    swipeDeck.index = Math.min(swipeDeck.sections.length - 1, swipeDeck.index + 1);
    renderSwipeDeckState();
  }
});

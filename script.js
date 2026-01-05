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

  $("refreshRepos").addEventListener("click", fetchGithubRepos);
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#top') return;
      
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

(function init(){
  initTheme();
  renderProfile();
  initEvents();
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

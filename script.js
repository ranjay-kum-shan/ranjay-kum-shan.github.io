/* ====== Base ====== */
:root{
  --bg: #0b0c10;
  --surface: #12141a;
  --surface-2:#171a22;
  --text: #f3f4f6;
  --muted:#aab0bd;
  --line:#232838;
  --accent:#7c3aed;
  --accent-2:#22c55e;

  --shadow: 0 10px 30px rgba(0,0,0,.35);
  --shadow-lg: 0 20px 60px rgba(0,0,0,.45);
  --radius: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:root[data-theme="light"]{
  --bg:#ffffff;
  --surface:#f6f7fb;
  --surface-2:#ffffff;
  --text:#101828;
  --muted:#475467;
  --line:#e4e7ec;
  --shadow: 0 10px 30px rgba(16,24,40,.10);
  --shadow-lg: 0 20px 60px rgba(16,24,40,.15);
}

*{box-sizing:border-box}
html{scroll-behavior:smooth; scroll-padding-top: 80px;}
body{
  margin:0;
  font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height:1.6;
  transition: background 0.3s ease, color 0.3s ease;
}

a{color:inherit; text-decoration:none; transition: var(--transition);}
a:hover{opacity:.92}

code{
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: .95em;
}

.container{
  width:min(1100px, calc(100% - 2rem));
  margin: 0 auto;
}

.skip-link{
  position:absolute;
  left:-999px;
  top:8px;
  background:var(--surface-2);
  border:1px solid var(--line);
  padding:.6rem .8rem;
  border-radius:12px;
  z-index: 999;
}
.skip-link:focus{left:12px}

/* ====== Scroll Progress ====== */
.scroll-progress{
  position: fixed;
  top:0;
  left:0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  z-index: 999;
  transition: var(--transition);
}
.site-header:hover{
  border-bottom-color: color-mix(in oklab, var(--accent) 40%, var(--line));
  transition: width 0.1s ease;
}

/* ====== Animations ====== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDelayed {
  0%, 20% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.fade-in-delayed {
  animation: fadeInDelayed 1.2s ease-out forwards;
}

.observe-fade {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.observe-fade.visible {
  opacity: 1;
  transform: translateY(0);
}

.stagger-children > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.stagger-children.visible > * {
  opacity: 1;
  transform: translateY(0);
}

.stagger-children.visible > *:nth-child(1) { transition-delay: 0.1s; }
.stagger-children.visible > *:nth-child(2) { transition-delay: 0.2s; }
.stagger-children.visible > *:nth-child(3) { transition-delay: 0.3s; }
.stagger-children.visible > *:nth-child(4) { transition-delay: 0.4s; }
.stagger-children.visible > *:nth-child(5) { transition-delay: 0.5s; }
.stagger-children.visible > *:nth-child(6) { transition-delay: 0.6s; }

.typing-cursor {
  animation: blink 1s infinite;
  font-weight: 300;
  color: var(--accent);
}

/* ====== Header ====== */
.site-header{
  position: sticky;
  top:0;
  z-index:50;
  backdrop-filter: blur(10px);
  background: color-mix(in oklab, var(--bg) 70%, transparent);
  border-bottom:1px solid var(--line);
}
.header-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:.9rem 0;
  gap:1rem;
}

.brand{
  display:flex;
  align-items:center;
  gap:.75rem;
  font-weight:700;
}
.brand-avatar{
  width:34px;
  height:34px;
  border-radius:50%;
  border:1px solid var(--line);
  background:var(--surface-2);
}
.brand-name{letter-spacing:.2px}

.nav{
  display:flex;
  gap:1rem;
  align-items:center;
  font-weight:500;
  color: var(--muted);
}
.nav a{padding:.35rem .35rem; border-radius:10px}
.nav a:hover{background: color-mix(in oklab, var(--surface) 70%, transparent); color: var(--text)}
.nav-cta{
  color: var(--text) !important;
  background: color-mix(in oklab, var(--accent) 25%, transparent);
  border:1px solid color-mix(in oklab, var(--accent) 55%, var(--line));
}

.icon-btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:40px;
  height:40px;
  border-radius:12px;
  transition: var(--transition);
}
.icon-btn:hover{
  transform: scale(1.05);
  border-color: var(--accent);
}
.icon-btn:active{
  transform: scale(0.95);
}
.icon{font-size:18px}
.theme-icon{
  transition: transform 0.3s ease;
}
.icon-btn:hover .theme-icon{
  transform: rotate(180deg);
ar(--line);
  cursor:pointer;
  box-shadow: var(--shadow);
}
.icon{font-size:18px}

/* ====== Hero ====== */
.hero{
  padding: 4.2rem 0 2.5rem;
  border-bottom:1px solid var(--line);
  background:
    radial-gradient(900px 500px at 20% -10%, color-mix(in oklab, var(--accent) 35%, transparent), transparent 60%),
    radial-gradient(700px 450px at 95% 0%, color-mix(in oklab, var(--accent-2) 25%, transparent), transparent 60%);
}
.hero-inner{
  display:grid;
  grid-template-columns: 1.4fr .9fr;
  gap: 2rem;
  align-items: start;
}
.eyebrow{
  margin:0;
  color: var(--muted);
  font-weight:600;
}
.hero-title{
  margin:.3rem 0 .2rem;
  font-size: clamp(2.4rem, 4.5vw, 3.6rem);
  line-height:1.1;
  letter-spacing:-0.02em;
}
.hero-subtitle{
  margin:.5rem 0 1.3rem;
  color: var(--muted);
  font-size: 1.05rem;
  transition: var(--transition);
  cursor: pointer;
}
.btn:hover{
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
.btn:active{
  transform: translateY(0);
}
.btn.primary{
  background: color-mix(in oklab, var(--accent) 25%, var(--surface));
  border:1px solid color-mix(in oklab, var(--accent) 55%, var(--line));
}
.btn.primary:hover{
  background: color-mix(in oklab, var(--accent) 35%, var(--surface));
}
.btn.small{padding:.55rem .8rem; border-radius:12px; font-weight:600; box-shadow:none}
.btn.small:hover{
  transition: var(--transition);
}
.social-pill:hover{
  color: var(--text);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow);


}
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:.78rem 1rem;
  border-radius: 14px;
  transition: var(--transition);
}
.card.card-hover:hover{
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: color-mix(in oklab, var(--accent) 40%, var(--line));
  border:1px solid var(--line);
  background: var(--surface);
  color: var(--text);
  font-weight:600;
  box-shadow: var(--shadow);
}
.btn.primary{
  background: color-mix(in oklab, var(--accent) 25%, var(--surface));
  border:1px solid color-mix(in oklab, var(--accent) 55%, var(--line));
}
.btn.small{padding:.55rem .8rem; border-radius:12px; font-weight:600; box-shadow:none}

.social-row{display:flex; gap:.55rem; flex-wrap:wrap}
.social-pill{
  padding:.45rem .7rem;
  border-radius:999px;
  border:1px solid var(--line);
  background: color-mix(in oklab, var(--surface) 75%, transparent);
  color: var(--muted);
  font-weight:600;
}
.social-pill:hover{color: var(--text)}

/* ====== Cards / Sections ====== */
.section{padding: 3rem 0}
.section h2{
  margin: 0 0 1rem;
  letter-spacing:-0.015em;
}
.section-lead{margin: -.35rem 0 1.25rem; color: var(--muted)}
.card{
  background: var(--surface);
  border:1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.15rem;
  box-shadow: var(--shadow);
}
.card.subtle{
  background: color-mix(in oklab, var(--surface) 80%, transparent);
  box-shadow:none;
  transition: var(--transition);
}
.skill-card:hover{
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: color-mix(in oklab, var(--accent) 40%, var(--line));
}

.highlights{
  margin:1rem 0 0;
  padding: 0 0 0 1.1rem;
  color: var(--muted);
  transition: var(--transition);
}
.tag:hover{
  border-color: var(--accent);
  color: var(--text);
  transform: scale(1.05);
}
.highlights li{margin:.2rem 0}

.grid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
@media (max-width: 960px){
  .hero-inner{grid-template-columns:1fr}
  .nav{display:none}
  .grid{grid-template-columns:1fr 1fr}
}
@media (max-width: 640px){
  .grid{grid-template-columns:1fr}
}

.skill-card{
  padding: 1rem;
  border-radius: var(--radius);
  border:1px solid var(--line);
  background: var(--surface);
}
.skill-title{margin:0 0 .35rem; font-weight:700}
.skill-tags{
  display:flex; flex-wrap:wrap; gap:.4rem;
}
.tag{
  font-size:.9rem;
  padding:.25rem .55rem;
  border-radius:999px;
  border:1px solid var(--line);
  color: var(--muted);
  background: color-mix(in oklab, var(--surface-2) 55%, transparent);
}

/* ====== Quick stats ====== */
.hero-card{
  background: color-mix(in oklab, var(--surface) 85%, transparent);
  border:1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.15rem;
  box-shadow: var(--shadow);
}
.stat{padding:.65rem 0; border-bottom:1px dashed var(--line)}
  transition: var(--transition);
}
.projects .project-card:hover{
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: color-mix(in oklab, var(--accent) 50%, var(--line));
.stat:last-child{border-bottom:none}
.stat-value{font-size:1.4rem; font-weight:800; letter-spacing:-0.02em}
.stat-label{color: var(--muted); font-weight:600}
.stat-note{margin:.9rem 0 0; color: var(--muted); font-size:.95rem}

/* ====== Projects ====== */
.section-head{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:1rem;
  flex-wrap:wrap;
}
.pill-row{display:flex; gap:.5rem; align-items:center; flex-wrap:wrap}
.pill{
  padding:.35rem .65rem;
  border-radius:999px;
  border:1px solid var(--line);
  background: color-mix(in oklab, var(--accent) 12%, var(--surface));
  color: var(--text);
  font-weight:700;
}
.pill-link{
  padding:.35rem .65rem;
  border-radius:999px;
  border:1px solid var(--line);
  background: var(--surface);
  color: var(--muted);
  font-weight:700;
}
.pill-link:hover{color: var(--text)}

.projects .project-card{
  display:flex;
  flex-direction:column;
  gap:.75rem;
  padding: 1.1rem;
  border-radius: var(--radius);
  border:1px solid var(--line);
  background: var(--surface);
}
.project-title{margin:0; font-weight:800; letter-spacing:-0.015em}
.project-desc{margin:0; color: var(--muted)}
  transition: var(--transition);
}
.repo-card:hover{
  transform: translateY(-3px);
  box-shadow: var(--shadow);
  border-color: color-mix(in oklab, var(--accent) 40%, var(--line));
.project-meta{display:flex; gap:.5rem; flex-wrap:wrap; align-items:center; margin-top:auto}
.meta-pill{
  font-size:.9rem;
  padding:.25rem .55rem;
  border-radius:999px;
  border:1px solid var(--line);
  color: var(--muted);
}
.project-links{margin-top:.25rem; display:flex; gap:.6rem; flex-wrap:wrap}
.link{
  color: var(--muted);
  transition: var(--transition);
}
.timeline-item:hover{
  transform: translateX(8px);
  box-shadow: var(--shadow-lg);
  border-color: color-mix(in oklab, var(--accent) 40%, var(--line));
  font-weight:700;
  border-bottom: 1px solid transparent;
}
.link:hover{color: var(--text); border-bottom-color: var(--text)}

/* ====== Repo grid ====== */
.repo-grid{
  margin-top:.75rem;
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  gap:.75rem;
}
@media (max-width: 640px){ .repo-grid{grid-template-columns:1fr} }

  transition: var(--transition);
}
.edu-card:hover{
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: color-mix(in oklab, var(--accent) 40%, var(--line));
.repo-card{
  padding:.9rem;
  border-radius: var(--radius);
  border:1px solid var(--line);
  background: var(--surface-2);
}
.repo-top{display:flex; justify-content:space-between; gap:.75rem; align-items:flex-start}
.repo-name{font-weight:800}
.repo-desc{margin:.35rem 0 .65rem; color: var(--muted)}
.repo-bottom{display:flex; gap:.6rem; flex-wrap:wrap; color: var(--muted); font-weight:600; font-size:.95rem}
.muted{color: var(--muted)}

/* ====== Timeline ====== */
.timeline{
  display:grid;
  gap: 1rem;
}
.timeline-item{
  transition: var(--transition);
}
.contact-item:hover{
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: color-mix(in oklab, var(--accent) 50%, var(--line));
  padding: 1.1rem;
  border-radius: var(--radius);
  border:1px solid var(--line);
  background: var(--surface);
}
.timeline-top{
  display:flex;
  justify-content:space-between;
  gap:1rem;
  flex-wrap:wrap;
  align-items:baseline;
}
.timeline-role{margin:0; font-weight:800}
.timeline-org{color: var(--muted); font-weight:700}
.timeline-dates{color: var(--muted); font-weight:700}
.timeline-bullets{margin:.7rem 0 0; padding-left: 1.1rem; color: var(--muted)}
.timeline-bullets li{margin:.25rem 0}

/* ====== Education ====== */
.edu-card{
  padding: 1rem;
  border-radius: var(--radius);
  border:1px solid var(--line);
  background: var(--surface);
}

/* ====== Scroll to Top Button ====== */
.scroll-to-top{
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: var(--transition);
  z-index: 40;
}
.scroll-to-top.visible{
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.scroll-to-top:hover{
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 25px 70px rgba(124, 58, 237, .5);
}
.scroll-to-top:active{
  transform: translateY(-2px) scale(1);
}

/* ====== Responsive Adjustments ====== */
@media (max-width: 640px) {
  .scroll-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
  }
}
.edu-title{margin:0; font-weight:800}
.edu-meta{margin:.25rem 0 0; color: var(--muted); font-weight:700}

/* ====== Contact ====== */
.contact-grid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:.75rem;
  margin-top: 1rem;
}
@media (max-width: 960px){ .contact-grid{grid-template-columns:1fr} }

.contact-item{
  padding: 1rem;
  border-radius: var(--radius);
  border:1px solid var(--line);
  background: var(--surface-2);
}
.contact-kicker{display:block; color: var(--muted); font-weight:700}
.contact-value{display:block; font-weight:800; margin-top:.15rem}

.footer-note{
  margin-top: 1rem;
  padding-top: 1rem;
  border-top:1px solid var(--line);
  display:flex;
  justify-content:space-between;
  gap:1rem;
  flex-wrap:wrap;
  color: var(--muted);
  font-weight:600;
}

/* ====== Footer ====== */
.site-footer{
  border-top: 1px solid var(--line);
  padding: 1.2rem 0;
}
.footer-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  flex-wrap:wrap;
}
.row{display:flex; gap:.75rem; align-items:center}
.between{justify-content:space-between}
.h3{margin:0}

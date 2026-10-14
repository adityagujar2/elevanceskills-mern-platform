import { useEffect, useState } from "react";
import {
  Activity, ArrowUpRight, Bell, BookOpen, Captions, CheckCircle2,
  CircleUserRound, CloudDownload, CreditCard, Film, LockKeyhole,
  MessageCircle, Moon, Play, Radio, ShieldCheck, Sun, Video
} from "lucide-react";

const modules = [
  {
    number: "01",
    title: "Community comments",
    description: "Threaded discussions, translations, reactions and moderation.",
    icon: MessageCircle,
    status: "Planned",
    tone: "violet"
  },
  {
    number: "02",
    title: "Smart downloads",
    description: "Subscription-aware quotas and a personal download library.",
    icon: CloudDownload,
    status: "Planned",
    tone: "blue"
  },
  {
    number: "03",
    title: "Membership plans",
    description: "Free, Bronze, Silver and Gold with test payment checkout.",
    icon: CreditCard,
    status: "Planned",
    tone: "amber"
  },
  {
    number: "04",
    title: "Account security",
    description: "Login history, theme preferences and trusted-device OTP.",
    icon: ShieldCheck,
    status: "Planned",
    tone: "green"
  },
  {
    number: "05",
    title: "Custom video player",
    description: "Playback controls, resume progress, captions and shortcuts.",
    icon: Captions,
    status: "Planned",
    tone: "pink"
  },
  {
    number: "06",
    title: "Live video rooms",
    description: "Real-time calls, screen sharing and meeting controls.",
    icon: Radio,
    status: "Planned",
    tone: "cyan"
  }
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("elevance-theme");
    if (saved === "light" || saved === "dark") return saved;
    const hour = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      hourCycle: "h23"
    }).format(new Date());
    const istHour = Number(hour);
    return istHour >= 5 && istHour < 12 ? "light" : "dark";
  });
  const [apiStatus, setApiStatus] = useState("Checking");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("elevance-theme", theme);
  }, [theme]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/health`)
      .then((response) => {
        if (!response.ok) throw new Error("API unavailable");
        return response.json();
      })
      .then((data) => setApiStatus(data.database === "connected" ? "API and database connected" : "API online · database not connected"))
      .catch(() => setApiStatus("API not connected · start the server"));
  }, []);

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Elevance home">
          <span className="brand-mark"><Play size={18} fill="currentColor" /></span>
          <span>elevance<span className="brand-dot">.</span><small>LEARNING STUDIO</small></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="navigation" aria-label="Main navigation">
          <a className="nav-link active" href="#overview"><Activity size={18} /> Overview</a>
          <a className="nav-link" href="#modules"><Film size={18} /> Platform modules</a>
          <a className="nav-link" href="#modules"><BookOpen size={18} /> Learning library</a>
          <a className="nav-link" href="#modules"><Video size={18} /> Live rooms <span className="nav-tag">Soon</span></a>
        </nav>

        <div className="sidebar-bottom">
          <div className="security-card">
            <div className="security-icon"><LockKeyhole size={17} /></div>
            <strong>Built with security in mind</strong>
            <p>Server-side permissions, safe environment variables and verified payments.</p>
          </div>
          <div className="profile-row">
            <div className="avatar">AG</div>
            <div className="profile-copy"><strong>Aditya Gujar</strong><span>Project owner</span></div>
            <CircleUserRound size={18} className="profile-action" />
          </div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> Overview</div>
          <div className="topbar-actions">
            <span className="status-pill"><span className={apiStatus.startsWith("API and") ? "status-dot good" : "status-dot"} />{apiStatus}</span>
            <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-button" aria-label="Notifications" title="Notifications"><Bell size={18} /></button>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> INTERNSHIP PROJECT · MERN STACK</div>
            <h1>Your learning platform,<br /><span>one module at a time.</span></h1>
            <p className="welcome-copy">A single workspace for video learning, member access, community and live collaboration.</p>
            <a className="primary-button" href="#modules">Explore the modules <ArrowUpRight size={17} /></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-play"><Play size={34} fill="currentColor" /></div>
            <div className="floating-chip chip-top"><span className="chip-dot" /> Learn at your pace</div>
            <div className="floating-chip chip-bottom"><Activity size={15} /> Six connected modules</div>
            <div className="hero-spark spark-one">✳</div><div className="hero-spark spark-two">✦</div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Project overview">
          <article className="stat-card">
            <div className="stat-icon purple"><LayersIcon /></div>
            <span className="stat-label">PROJECT MODULES</span><strong className="stat-number">06</strong><span className="stat-foot">Integrated feature areas</span>
          </article>
          <article className="stat-card">
            <div className="stat-icon blue"><BookOpen size={19} /></div>
            <span className="stat-label">CORE STACK</span><strong className="stat-number">MERN</strong><span className="stat-foot">MongoDB · Express · React · Node</span>
          </article>
          <article className="stat-card">
            <div className="stat-icon green"><CheckCircle2 size={19} /></div>
            <span className="stat-label">BUILD STATUS</span><strong className="stat-number">In progress</strong><span className="stat-foot">Foundation stage</span>
          </article>
        </section>

        <section className="module-section" id="modules">
          <div className="section-heading">
            <div><div className="section-kicker">THE BUILD PLAN</div><h2>Platform modules</h2><p>Each module will plug into the same authentication and data layer.</p></div>
            <span className="count-badge">0 / 6 implemented</span>
          </div>
          <div className="module-grid">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <article className="module-card" key={module.number}>
                  <div className="module-card-top">
                    <div className={`module-icon ${module.tone}`}><Icon size={21} /></div>
                    <span className="module-number">{module.number}</span>
                  </div>
                  <div className="module-body"><h3>{module.title}</h3><p>{module.description}</p></div>
                  <div className="module-footer"><span className="planned-dot" /> {module.status}<span className="module-arrow"><ArrowUpRight size={16} /></span></div>
                </article>
              );
            })}
          </div>
        </section>

        <footer className="page-footer">
          <span>© 2026 Elevance Learning Studio</span><span>Built with React · Express · MongoDB</span>
        </footer>
      </main>
    </div>
  );
}

function LayersIcon() {
  return <span className="layers-glyph">▱</span>;
}

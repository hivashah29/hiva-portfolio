import { useState } from "react";
import { Link } from "react-router-dom";

const FONT_LINK = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const CSS = `
  ${FONT_LINK}

  :root {
    --cream:      #FFFEE0;
    --white:      #FAF8F6;
    --blond:      #FFF8D5;
    --aqua:       #D5F6FB;
    --lemon:      #F6F3A9;
    --snow:       #E5ECF8;
    --pearl:      #F0EBD8;
    --lime:       #D1FEB8;
    --skin:       #EFDFD8;
    --peach:      #F7DFC2;
    --mauve:      #EBCCFF;
    --nude:       #E7D7CA;
    --sky:        #BEDDF1;
    --khaki:      #DAD4B6;
    --tan:        #E9C9AA;
    --gold:       #E7D27C;
    --gray:       #CFCFC4;
    --rose:       #F6B8D0;
    --flesh:      #F1BEB5;
    --amber:      #F8C57C;
    --earth:      #D7CAB7;
    --cyan:       #A4D8D8;
    --beige:      #D4C6AA;
    --sand:       #D3C7A2;

    --dark:       #3a3060;
    --darker:     #2e2550;
    --text-dark:  #2d2040;

    --pixel:   'Press Start 2P', monospace;
    --mono:    'VT323', monospace;
    --body:    'DM Sans', sans-serif;
  }

  * { margin:0; padding:0; box-sizing:border-box; }

 body, html {
    background: var(--blond);
    color: var(--text-dark);
    font-family: var(--body);
    overflow-x: hidden;
    cursor: crosshair;
  }
  html { background: var(--cream); }

  ::-webkit-scrollbar { width:8px; }
  ::-webkit-scrollbar-track { background: var(--blond); }
  ::-webkit-scrollbar-thumb { background: var(--rose); border-radius:4px; }

  body::before {
    content:''; position:fixed; inset:0;
    background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.02) 2px,rgba(0,0,0,.02) 4px);
    pointer-events:none; z-index:9999;
  }

  .stars { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
  .star { position:absolute; border-radius:50%; animation: twinkle 2s infinite alternate; }
  @keyframes twinkle { from{opacity:.3;transform:scale(.8)} to{opacity:.9;transform:scale(1.4)} }

  .cloud-strip { display:flex; gap:40px; align-items:center; padding:12px 0; overflow:hidden; }
  .pixel-cloud { font-family:var(--mono); font-size:28px; color:var(--mauve); opacity:.8; white-space:nowrap; }

  nav {
    position:fixed; top:0; left:0; right:0; z-index:1000; transition:top 0.1s;
    display:flex; justify-content:space-between; align-items:center;
    padding:12px 32px; background:rgba(255,254,224,.96); backdrop-filter:blur(8px);
    border-bottom:3px solid var(--rose); box-shadow:0 2px 0 var(--mauve);
  }
  .nav-logo { font-family:var(--pixel); font-size:10px; color:var(--darker); text-shadow:2px 2px var(--rose); letter-spacing:1px; }
  .nav-links { display:flex; gap:20px; list-style:none; }
  .nav-links a { font-family:var(--mono); font-size:22px; color:var(--darker); text-decoration:none; transition:color .2s; letter-spacing:1px; }
  .nav-links a:hover { color:var(--cyan); }

  .hp-bar { display:flex; align-items:center; gap:8px; }
  .hp-label { font-family:var(--pixel); font-size:7px; color:var(--darker); }
  .hp-track { width:100px; height:12px; background:rgba(0,0,0,.08); border:2px solid var(--rose); border-radius:2px; }
  .hp-fill { height:100%; width:85%; background:linear-gradient(90deg,var(--cyan),var(--lime)); border-radius:1px; animation:hp-pulse 3s infinite alternate; }
  @keyframes hp-pulse { from{opacity:.8} to{opacity:1} }

  .hero {
    position:relative; min-height:100vh; min-height:100dvh;
    display:flex; flex-direction:column; justify-content:center; align-items:center;
    text-align:center; padding:120px 24px 60px; overflow:hidden; z-index:1;
    background:var(--cream); width:100%;
  }
  .hero-star { position:absolute; pointer-events:none; font-family:var(--pixel); color:var(--gold); font-size:20px; animation:twinkle 2s infinite alternate; }
  .xp-bar-top { position:absolute; top:72px; left:0; right:0; display:flex; justify-content:space-between; padding:8px 32px; font-family:var(--pixel); font-size:7px; color:var(--darker); opacity:.7; }
  .hero-year { font-family:var(--pixel); font-size:12px; color:var(--rose); margin-bottom:0; animation:blink 1.2s step-end infinite; }
  @keyframes blink { 50%{opacity:0} }
  .hero-title { font-family:var(--pixel); font-size:clamp(24px,5vw,52px); color:var(--rose); line-height:1.2; text-shadow:3px 3px 0 var(--mauve),5px 5px 0 var(--flesh); margin-bottom:0; letter-spacing:2px; }
  .start-btn { font-family:var(--pixel); font-size:12px; padding:14px 40px; background:var(--lime); color:var(--text-dark); border:3px solid var(--sand); cursor:pointer; box-shadow:4px 4px 0 var(--tan); transition:transform .1s,box-shadow .1s; margin-bottom:0; letter-spacing:2px; }
  .start-btn:hover { transform:translate(2px,2px); box-shadow:2px 2px 0 var(--darker); }
  .start-btn:active { transform:translate(4px,4px); box-shadow:none; }

  .floating-sticker { position:absolute; pointer-events:none; font-size:36px; animation:float-s 4s ease-in-out infinite; opacity:0.7; }
  @keyframes float-s { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-14px) rotate(3deg)} }

  .ticker { position:relative; z-index:2; background:var(--rose); padding:10px 0; overflow:hidden; border-top:2px solid var(--flesh); border-bottom:2px solid var(--flesh); }
  .ticker-inner { display:flex; gap:60px; animation:scroll-left 18s linear infinite; white-space:nowrap; }
  @keyframes scroll-left { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .ticker-item { font-family:var(--pixel); font-size:8px; color:var(--text-dark); letter-spacing:2px; }

  .section { position:relative; z-index:1; max-width:1100px; margin:0 auto; padding:80px 24px; }
  .section-header { display:flex; align-items:center; gap:16px; margin-bottom:48px; }
  .level-badge { font-family:var(--pixel); font-size:9px; color:var(--text-dark); background:var(--lemon); border:2px solid var(--gold); padding:8px 14px; white-space:nowrap; }
  .section-title { font-family:var(--pixel); font-size:clamp(13px,2.5vw,20px); color:var(--darker); text-shadow:2px 2px var(--cyan); }

  .about-top { display:grid; grid-template-columns:200px 1fr; gap:32px; align-items:center; margin-bottom:36px; }
  .about-level-block { display:flex; flex-direction:column; gap:10px; }
  .about-level-num { font-family:var(--pixel); font-size:clamp(28px,5vw,52px); color:var(--rose); line-height:1; text-shadow:3px 3px 0 var(--flesh); }
  .about-level-sub { font-family:var(--pixel); font-size:10px; color:var(--darker); line-height:1.8; }
  .about-player-name { font-family:var(--pixel); font-size:clamp(14px,2.5vw,22px); color:var(--darker); margin-top:8px; line-height:1.6; text-shadow:2px 2px var(--rose); }

  .ds-console-wrap { display:flex; justify-content:center; position:relative; }
  .ds-console-wrap .star-deco { position:absolute; font-size:28px; animation:float 3s ease-in-out infinite; }
  .ds-console-wrap .star-deco.left { top:20%; left:-10px; animation-delay:.4s; }
  .ds-console-wrap .star-deco.right { top:25%; right:-10px; animation-delay:1s; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

  .ds-frame { background:linear-gradient(145deg,#f272a8,#e05090); border-radius:16px 16px 28px 28px; padding:16px 16px 20px; box-shadow:0 0 0 4px #d94080,8px 10px 28px rgba(0,0,0,.25),inset 0 3px 6px rgba(255,255,255,.3); width:min(320px,90vw); }
  .ds-hinge { height:10px; margin:-16px -16px 10px; background:linear-gradient(90deg,#c03070,#e05090,#c03070); border-radius:16px 16px 0 0; }
  .ds-screen-top { background:#1a3320; border-radius:6px; padding:0; border:4px solid #0d1f12; margin-bottom:14px; height:200px; overflow:hidden; position:relative; }
  .ds-screen-top img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
  .ds-screen-top::after { content:''; position:absolute; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.08) 3px,rgba(0,0,0,.08) 4px); pointer-events:none; }
  .ds-screen-bottom { background:linear-gradient(160deg,#f08ab0,#e06090); border-radius:4px; padding:10px 12px; border:3px solid #c03070; margin-bottom:12px; min-height:60px; display:flex; align-items:center; justify-content:center; }
  .ds-bottom-dot { width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,.12); border:2px solid rgba(255,255,255,.25); }
  .ds-buttons { display:flex; justify-content:space-between; align-items:center; padding:0 8px; }
  .ds-dpad { width:52px; height:52px; position:relative; display:flex; align-items:center; justify-content:center; }
  .ds-dpad::before,.ds-dpad::after { content:''; position:absolute; background:rgba(255,255,255,.25); border-radius:2px; }
  .ds-dpad::before { width:18px; height:52px; }
  .ds-dpad::after { width:52px; height:18px; }
  .ds-center-btn { width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,.35); position:relative; z-index:1; }
  .ds-mid-btns { display:flex; gap:6px; font-family:var(--pixel); font-size:6px; color:rgba(255,255,255,.7); }
  .ds-small-btn { padding:3px 6px; border-radius:2px; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.3); }
  .ds-ab { display:flex; gap:8px; align-items:center; }
  .ds-btn { width:22px; height:22px; border-radius:50%; font-family:var(--pixel); font-size:7px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; box-shadow:0 3px 0 rgba(0,0,0,.3); }

  .about-windows-grid { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:16px; margin-top:8px; }
  .mini-window { background:var(--white); border-radius:6px; overflow:hidden; box-shadow:4px 4px 0 rgba(0,0,0,.08); }
  .mini-titlebar { padding:5px 10px; display:flex; align-items:center; gap:6px; font-family:var(--pixel); font-size:7px; color:var(--text-dark); border-bottom:2px solid rgba(0,0,0,.07); }
  .mini-dots { display:flex; gap:3px; }
  .mini-dot { width:8px; height:8px; border-radius:50%; }
  .mini-body { padding:14px; }
  .mini-row { font-family:var(--mono); font-size:17px; color:var(--text-dark); line-height:1.5; margin-bottom:6px; }
  .mini-label { color:var(--darker); font-weight:bold; }

  .tools-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .tool-chip { background:var(--snow); border:2px solid var(--mauve); border-radius:4px; padding:6px 8px; font-family:var(--mono); font-size:17px; color:var(--darker); text-align:center; transition:background .2s; }
  .tool-chip:hover { background:var(--mauve); }

  .skills-list { font-family:var(--mono); font-size:17px; color:var(--text-dark); line-height:1.8; }
  .skills-list li { list-style:none; padding-left:14px; position:relative; }
  .skills-list li::before { content:"•"; position:absolute; left:0; color:var(--rose); }

  .info-window { background:var(--white); border:2px solid var(--cyan); border-radius:6px; overflow:hidden; box-shadow:4px 4px 0 var(--aqua); }
  .window-titlebar { background:var(--cyan); padding:6px 12px; display:flex; align-items:center; gap:8px; font-family:var(--pixel); font-size:7px; color:var(--text-dark); }
  .win-dots { display:flex; gap:4px; }
  .win-dot { width:10px; height:10px; border-radius:50%; }
  .window-body { padding:20px; }

  .project-card { background:var(--white); border:3px solid var(--amber); border-radius:12px; overflow:hidden; box-shadow:6px 6px 0 var(--flesh); transition:transform .2s,box-shadow .2s; margin-bottom:32px; }
  .project-card:hover { transform:translateY(-4px); box-shadow:8px 12px 0 var(--flesh); }
  .case-study-header { padding:14px 24px; display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid var(--amber); }
  .case-study-mission-num { font-family:var(--pixel); font-size:10px; color:var(--text-dark); }
  .case-study-tags { display:flex; gap:8px; align-items:center; }
  .tag-pill { font-family:var(--pixel); font-size:7px; padding:4px 10px; border-radius:2px; }
  .case-study-body { display:grid; grid-template-columns:1fr 1fr; gap:0; }
  .case-left { padding:28px 32px; border-right:3px solid var(--amber); }
  .case-right { padding:28px 32px; display:flex; flex-direction:column; gap:20px; }
  .case-mission-label { font-family:var(--pixel); font-size:9px; color:var(--amber); margin-bottom:6px; }
  .case-title { font-family:var(--mono); font-size:36px; color:var(--darker); line-height:1.2; margin-bottom:4px; letter-spacing:1px; }
  .case-subtitle { font-family:var(--mono); font-size:18px; color:var(--flesh); margin-bottom:24px; }
  .cs-section { margin-bottom:18px; }
  .cs-section-label { font-family:var(--pixel); font-size:8px; color:var(--amber); margin-bottom:5px; display:flex; align-items:center; gap:6px; }
  .cs-section-label::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,var(--rose) 0%,transparent 100%); opacity:0.4; }
  .cs-section-text { font-family:var(--mono); font-size:19px; color:var(--text-dark); line-height:1.6; }
  .case-btn-row { display:flex; gap:10px; flex-wrap:wrap; margin-top:20px; }
  .case-btn { display:inline-block; font-family:var(--pixel); font-size:7px; padding:10px 16px; border:2px solid var(--darker); border-radius:2px; cursor:pointer; text-decoration:none; transition:transform .1s,box-shadow .1s; box-shadow:3px 3px 0 rgba(0,0,0,.15); color:var(--text-dark); }
  .case-btn:hover { transform:translate(2px,2px); box-shadow:1px 1px 0 rgba(0,0,0,.15); }
  .case-btn-primary { background:var(--aqua); }
  .case-btn-secondary { background:var(--lemon); }

  .locked-card { opacity:0.55; background:var(--pearl); border:3px dashed var(--khaki); }
  .locked-inner { font-family:var(--mono); font-size:22px; color:var(--gray); text-align:center; padding:40px 0; }
  .more-projects-note { margin-top:16px; font-family:var(--pixel); font-size:8px; color:var(--cyan); text-align:center; animation:blink 1.5s step-end infinite; }

  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
  .contact-window { background:var(--white); border:2px solid var(--sky); border-radius:6px; overflow:hidden; box-shadow:4px 4px 0 var(--aqua); }
  .contact-form { padding:24px; display:flex; flex-direction:column; gap:14px; }
  .form-label { font-family:var(--pixel); font-size:7px; color:var(--darker); margin-bottom:4px; display:block; }
  .form-input { width:100%; background:var(--snow); border:2px solid var(--sky); border-radius:4px; padding:10px 14px; font-family:var(--mono); font-size:20px; color:var(--text-dark); outline:none; transition:border-color .2s; }
  .form-input:focus { border-color:var(--rose); }
  .form-textarea { min-height:110px; resize:vertical; }
  .send-btn { font-family:var(--pixel); font-size:9px; background:var(--sky); color:var(--text-dark); border:none; padding:12px; cursor:pointer; border-radius:4px; box-shadow:4px 4px 0 rgba(0,0,0,.1); transition:transform .1s,box-shadow .1s; }
  .send-btn:hover { transform:translate(2px,2px); box-shadow:2px 2px 0 rgba(0,0,0,.1); }

  .social-links { padding:24px; display:flex; flex-direction:column; gap:14px; }
  .social-link { display:flex; align-items:center; gap:14px; font-family:var(--mono); font-size:22px; color:var(--text-dark); text-decoration:none; padding:12px 16px; background:var(--blond); border:2px solid var(--tan); border-radius:6px; transition:background .2s,border-color .2s; }
  .social-link:hover { background:var(--aqua); border-color:var(--sky); }
  .social-icon { font-size:24px; }

  footer { border-top:3px solid var(--rose); background:var(--blond); padding:24px; text-align:center; font-family:var(--pixel); font-size:7px; color:rgba(46,37,80,.5); line-height:2.5; z-index:1; position:relative; }

  .lightbox { position:fixed; inset:0; background:rgba(46,37,80,.85); z-index:9000; display:flex; align-items:center; justify-content:center; cursor:pointer; }
  .lightbox img { max-width:90vw; max-height:90vh; object-fit:contain; border:3px solid var(--rose); border-radius:8px; }

  .toast { position:fixed; bottom:32px; right:32px; background:var(--lime); color:var(--text-dark); font-family:var(--pixel); font-size:8px; padding:14px 20px; border-radius:4px; box-shadow:4px 4px 0 var(--cyan); z-index:8000; animation:slide-in .3s ease; }
  @keyframes slide-in { from{transform:translateX(120px);opacity:0} to{transform:translateX(0);opacity:1} }

  .section-bg-alt { background:linear-gradient(180deg,var(--snow) 0%,var(--pearl) 100%); }
  .section-bg-contact { background:linear-gradient(180deg,var(--blond) 0%,var(--skin) 100%); }

  .site-content { animation:fade-in 0.7s ease forwards; }
  @keyframes fade-in { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

  @media(max-width:900px) { .about-windows-grid{grid-template-columns:1fr 1fr;} }
  @media(max-width:700px) {
    nav{position:fixed;top:0;padding:8px 16px;}
    .nav-links{gap:10px;} .nav-links a{font-size:16px;}
    .hp-track{width:50px;} .hp-label{display:none;}
    .hero{min-height:100vh;min-height:100dvh;padding:0;justify-content:center;align-items:center;}
    .xp-bar-top{top:62px;padding:4px 12px;font-size:5px;}
    .hero-title{font-size:clamp(26px,9vw,42px);} .hero-year{font-size:8px;} .start-btn{font-size:10px;padding:12px 24px;}
    .floating-sticker{font-size:20px;} .hero-star{font-size:14px;}
    .pixel-scene-wrap{height:110px !important;bottom:32px;}
    .about-top{grid-template-columns:1fr;justify-items:center;text-align:center;}
    .about-level-block{align-items:center;}
    .about-windows-grid{grid-template-columns:1fr 1fr;}
    .case-study-body{grid-template-columns:1fr;}
    .case-left{border-right:none;border-bottom:3px solid var(--amber);padding:20px 16px;}
    .case-right{padding:20px 16px;}
    .contact-grid{grid-template-columns:1fr;} .section{padding:60px 16px;}
    .case-study-header{flex-wrap:wrap;gap:8px;}
    .toast{right:16px;bottom:16px;left:16px;}
  }
  @media(max-width:500px) {
    .about-windows-grid{grid-template-columns:1fr;} .tools-grid{grid-template-columns:1fr 1fr;}
    .section-header{flex-direction:column;align-items:flex-start;gap:8px;}
    .case-study-tags{flex-wrap:wrap;} .case-btn-row{flex-direction:column;} .case-btn{text-align:center;}
  }
`;

const STAR_COLORS = ["#F6B8D0","#EBCCFF","#D5F6FB","#D1FEB8","#F6F3A9","#F7DFC2","#BEDDF1"];
const Stars = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i, top:`${Math.random()*100}%`, left:`${Math.random()*100}%`,
    delay:`${Math.random()*3}s`, size:Math.random()>0.8?"6px":"4px",
    color:STAR_COLORS[Math.floor(Math.random()*STAR_COLORS.length)],
  }));
  return (
    <div className="stars">
      {stars.map(s=>(
        <div key={s.id} className="star" style={{top:s.top,left:s.left,animationDelay:s.delay,width:s.size,height:s.size,background:s.color}}/>
      ))}
    </div>
  );
};

const tickerItems = [
  "★ UI/UX DESIGNER","✦ HIVA SHAH","★ CRAFTING PIXELS","★ PORTFOLIO","✦ LEVEL 01 UNLOCKED",
  "★ UI/UX DESIGNER","✦ HIVA SHAH","★ CRAFTING PIXELS","★ PORTFOLIO","✦ LEVEL 01 UNLOCKED",
];
const Ticker = () => (
  <div className="ticker">
    <div className="ticker-inner">
      {tickerItems.map((t,i)=><span key={i} className="ticker-item">{t}</span>)}
    </div>
  </div>
);

const Window = ({ title, color="var(--cyan)", children, style }) => (
  <div className="info-window" style={{borderColor:color,boxShadow:`4px 4px 0 ${color}55`,...style}}>
    <div className="window-titlebar" style={{background:color}}>
      <div className="win-dots">
        <div className="win-dot" style={{background:"#ff6b6b"}}/>
        <div className="win-dot" style={{background:"#ffd93d"}}/>
        <div className="win-dot" style={{background:"#6bcb77"}}/>
      </div>
      {title}
    </div>
    <div className="window-body">{children}</div>
  </div>
);

export default function Portfolio() {
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast]       = useState("");
  const [formData, setFormData] = useState({name:"",email:"",message:""});
  const [started, setStarted]   = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""),3500); };

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      const el = document.getElementById("about");
      if (el) {
        const offset = 127;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior:"smooth" });
      }
    }, 50);
  };

  const handleSend = () => {
    if(!formData.name||!formData.email||!formData.message){showToast("⚠ FILL ALL FIELDS FIRST!");return;}
    showToast("✉ MESSAGE SENT! +50 XP");
    setFormData({name:"",email:"",message:""});
  };

  return (
    <>
      <style>{CSS}</style>
      <Stars/>

      <nav style={{top: started ? 0 : 26}}>
        <div className="nav-logo">HS.EXE</div>
        <ul className="nav-links">
          {["#about","#projects","#contact"].map(href=>(
            <li key={href}><a href={href}>{href.replace("#","").toUpperCase()}</a></li>
          ))}
        </ul>
        <div className="hp-bar">
          <span className="hp-label">HP</span>
          <div className="hp-track"><div className="hp-fill"/></div>
        </div>
      </nav>

      {!started && (
        <div style={{position:"fixed",top:0,left:0,right:0,zIndex:1200,height:26,background:"#F6B8D0",overflow:"hidden",borderBottom:"2px solid #F1BEB5",display:"flex",alignItems:"center"}}>
          <div style={{display:"flex",gap:"60px",animation:"scroll-left 22s linear infinite",whiteSpace:"nowrap",paddingLeft:20}}>
            {["✦ HIVA SHAH","★ UI/UX DESIGNER","✦ CRAFTING PIXELS","★ PORTFOLIO 2026","✦ LEVEL UP","★ FIGMA","✦ VISUAL DESIGN","★ Y2K AESTHETIC",
              "✦ HIVA SHAH","★ UI/UX DESIGNER","✦ CRAFTING PIXELS","★ PORTFOLIO 2026","✦ LEVEL UP","★ FIGMA","✦ VISUAL DESIGN","★ Y2K AESTHETIC"].map((t,i)=>(
              <span key={i} style={{fontFamily:"'Press Start 2P',monospace",fontSize:8,color:"#2d2040",letterSpacing:2,whiteSpace:"nowrap"}}>{t}</span>
            ))}
          </div>
        </div>
      )}

      <section className="hero">
        <div className="xp-bar-top"><span>XP: UI/UX LEVEL 03</span><span>PLAYER 01</span></div>
        <span className="hero-star" style={{top:"20%",left:"6%"}}>★</span>
        <span className="hero-star" style={{top:"15%",left:"15%",fontSize:14}}>★</span>
        <span className="hero-star" style={{top:"22%",right:"8%"}}>★</span>
        <span className="hero-star" style={{top:"17%",right:"18%",fontSize:14}}>★</span>
        <span className="hero-star" style={{top:"55%",left:"4%",fontSize:14}}>★</span>
        <span className="hero-star" style={{top:"55%",right:"4%",fontSize:14}}>★</span>
        <span className="floating-sticker" style={{top:"58%",left:"8%",fontSize:28}}>🎮</span>
        <span className="floating-sticker" style={{top:"55%",right:"8%",fontSize:28}}>🎀</span>
        <div style={{position:"absolute",top:90,left:0,right:0,overflow:"hidden",opacity:0.5}}>
          <div className="cloud-strip">
            {["☁","⛅","☁","⛅","☁","⛅","☁","⛅"].map((c,i)=>(
              <span key={i} className="pixel-cloud">{c}</span>
            ))}
          </div>
        </div>
        <div className="hero-year"></div>
          <div style={{fontFamily:"var(--pixel)",fontSize:"clamp(18px,3.5vw,32px)",color:"var(--darker)",letterSpacing:4,marginBottom:14,textShadow:"3px 3px 0 var(--rose)"}}>HIVA SHAH</div>
          <h1 className="hero-title">PORTFOLIO</h1>
        <button className="start-btn" onClick={handleStart}>▶ START</button>

        <div className="pixel-scene-wrap" style={{position:"absolute",bottom:32,left:0,right:0,height:180,pointerEvents:"none",overflow:"visible"}}>
          <svg width="100%" viewBox="0 0 680 140" preserveAspectRatio="xMidYMax meet">
            <style>{`
              @keyframes bob2{0%,100%{transform:translateY(0px)}50%{transform:translateY(-5px)}}
              @keyframes cw{0%{transform:translateX(0) scaleX(1)}45%{transform:translateX(-50px) scaleX(1)}50%{transform:translateX(-50px) scaleX(-1)}95%{transform:translateX(0) scaleX(-1)}100%{transform:translateX(0) scaleX(1)}}
              @keyframes lg2{0%,100%{opacity:.6}50%{opacity:1}}
              .gg{animation:bob2 1.2s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%;}
              .cg{animation:cw 7s linear infinite;transform-box:fill-box;transform-origin:50% 50%;}
              .lg{animation:lg2 2s ease-in-out infinite;}
            `}</style>
            <rect x="0" y="124" width="680" height="16" fill="#D1FEB8"/>
            <rect x="0" y="132" width="680" height="8" fill="#A4D8D8"/>
            <rect x="56" y="30" width="6" height="96" fill="#BEDDF1"/>
            <rect x="56" y="26" width="40" height="6" fill="#EBCCFF"/>
            <rect x="48" y="120" width="20" height="6" fill="#BEDDF1"/>
            <rect x="90" y="20" width="14" height="12" fill="#EBCCFF"/>
            <rect x="92" y="14" width="10" height="8" fill="#F6F3A9"/>
            <rect x="94" y="10" width="6" height="6" fill="#F6F3A9" className="lg"/>
            <ellipse cx="97" cy="18" rx="8" ry="5" fill="#F6F3A9" opacity="0.25" className="lg"/>
            <g className="gg">
              <rect x="128" y="42" width="34" height="28" fill="#5C3317"/>
              <rect x="131" y="44" width="28" height="22" fill="#F1C27D"/>
              <rect x="136" y="50" width="5" height="5" fill="#3a2010"/>
              <rect x="149" y="50" width="5" height="5" fill="#3a2010"/>
              <rect x="138" y="51" width="2" height="2" fill="#fff"/>
              <rect x="151" y="51" width="2" height="2" fill="#fff"/>
              <rect x="133" y="57" width="6" height="3" fill="#F6B8D0" opacity="0.7"/>
              <rect x="151" y="57" width="6" height="3" fill="#F6B8D0" opacity="0.7"/>
              <rect x="143" y="58" width="4" height="2" fill="#d4956a"/>
              <rect x="140" y="62" width="10" height="2" fill="#3a2010"/>
              <rect x="142" y="46" width="6" height="3" fill="#F6B8D0"/>
              <rect x="126" y="36" width="38" height="10" fill="#5C3317"/>
              <rect x="130" y="30" width="30" height="8" fill="#5C3317"/>
              <rect x="152" y="32" width="8" height="4" fill="#F6B8D0"/>
              <rect x="154" y="30" width="4" height="8" fill="#F6B8D0"/>
              <rect x="155" y="33" width="2" height="3" fill="#fff"/>
              <rect x="126" y="64" width="6" height="16" fill="#5C3317"/>
              <rect x="158" y="64" width="6" height="16" fill="#5C3317"/>
              <rect x="139" y="66" width="12" height="8" fill="#F1C27D"/>
              <rect x="128" y="74" width="34" height="28" fill="#FAF8F6"/>
              <rect x="134" y="74" width="22" height="4" fill="#D1FEB8"/>
              <rect x="141" y="84" width="8" height="8" fill="#F6B8D0"/>
              <rect x="143" y="82" width="4" height="12" fill="#F6B8D0"/>
              <rect x="139" y="86" width="12" height="4" fill="#F6B8D0"/>
              <rect x="144" y="86" width="2" height="2" fill="#fff"/>
              <rect x="120" y="76" width="8" height="18" fill="#F1C27D"/>
              <rect x="162" y="76" width="8" height="18" fill="#F1C27D"/>
              <rect x="124" y="102" width="42" height="18" fill="#D1FEB8"/>
              <rect x="124" y="100" width="42" height="4" fill="#A4D8D8"/>
              <rect x="132" y="120" width="10" height="6" fill="#F1C27D"/>
              <rect x="148" y="120" width="10" height="6" fill="#F1C27D"/>
              <rect x="130" y="124" width="12" height="4" fill="#FAF8F6"/>
              <rect x="146" y="124" width="12" height="4" fill="#FAF8F6"/>
            </g>
            <g className="cg">
              <rect x="370" y="104" width="30" height="22" fill="#FAF8F6"/>
              <rect x="372" y="90" width="26" height="18" fill="#FAF8F6"/>
              <rect x="372" y="84" width="7" height="8" fill="#FAF8F6"/>
              <rect x="391" y="84" width="7" height="8" fill="#FAF8F6"/>
              <rect x="373" y="85" width="5" height="5" fill="#F6B8D0"/>
              <rect x="392" y="85" width="5" height="5" fill="#F6B8D0"/>
              <rect x="376" y="96" width="5" height="5" fill="#A4D8D8"/>
              <rect x="389" y="96" width="5" height="5" fill="#A4D8D8"/>
              <rect x="377" y="97" width="3" height="3" fill="#2d2040"/>
              <rect x="390" y="97" width="3" height="3" fill="#2d2040"/>
              <rect x="383" y="102" width="4" height="2" fill="#F6B8D0"/>
              <rect x="358" y="101" width="14" height="1" fill="#CFCFC4"/>
              <rect x="398" y="101" width="14" height="1" fill="#CFCFC4"/>
              <rect x="373" y="108" width="7" height="7" fill="#EBCCFF"/>
              <rect x="386" y="112" width="5" height="5" fill="#D1FEB8"/>
              <rect x="372" y="124" width="7" height="4" fill="#FAF8F6"/>
              <rect x="382" y="124" width="7" height="4" fill="#FAF8F6"/>
              <rect x="392" y="124" width="7" height="4" fill="#FAF8F6"/>
              <rect x="398" y="110" width="5" height="16" fill="#FAF8F6"/>
              <rect x="398" y="106" width="10" height="5" fill="#FAF8F6"/>
              <rect x="404" y="102" width="5" height="6" fill="#FAF8F6"/>
              <rect x="404" y="100" width="7" height="4" fill="#EBCCFF"/>
            </g>
            <rect x="585" y="90" width="14" height="36" fill="#BEDDF1"/>
            <rect x="580" y="118" width="24" height="8" fill="#A4D8D8"/>
            <rect x="562" y="72" width="50" height="24" fill="#D1FEB8"/>
            <rect x="554" y="52" width="56" height="26" fill="#D1FEB8"/>
            <rect x="566" y="34" width="42" height="22" fill="#D1FEB8"/>
            <rect x="574" y="22" width="26" height="16" fill="#D1FEB8"/>
            <rect x="568" y="80" width="10" height="8" fill="#A4D8D8"/>
            <rect x="558" y="62" width="10" height="8" fill="#A4D8D8"/>
            <rect x="594" y="58" width="8" height="6" fill="#A4D8D8"/>
            <rect x="578" y="44" width="8" height="6" fill="#A4D8D8"/>
            <rect x="580" y="72" width="6" height="6" fill="#EBCCFF"/>
            <rect x="564" y="56" width="6" height="6" fill="#EBCCFF"/>
            <rect x="596" y="50" width="4" height="4" fill="#EBCCFF"/>
          </svg>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:32,background:"repeating-linear-gradient(90deg,var(--lime) 0px,var(--lime) 32px,var(--aqua) 32px,var(--aqua) 64px)"}}/>
      </section>

      {started && (
        <div className="site-content">
          <Ticker/>

          <section id="about" className="section">
            <div className="about-top">
              <div className="about-level-block">
                <div className="about-level-num">Level<br/>01</div>
                <div className="about-level-sub">Meet the<br/>player</div>
                <div className="about-player-name">Hiva<br/>Shah</div>
              </div>
              <div className="ds-console-wrap">
                <span className="star-deco left">⭐</span>
                <span className="star-deco right">⭐</span>
                <div className="ds-frame">
                  <div className="ds-hinge"/>
                  <div className="ds-screen-top">
                    <img src="/avatar.png" alt="Hiva Shah" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
                    <div style={{display:'none',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,background:'#1a4428'}}>
                      <span style={{fontSize:60}}>👾</span>
                      <span style={{fontFamily:"var(--pixel)",fontSize:7,color:'#6bcb77'}}>HIVA SHAH</span>
                    </div>
                  </div>
                  <div className="ds-screen-bottom"><div className="ds-bottom-dot"/></div>
                  <div className="ds-buttons">
                    <div className="ds-dpad"><div className="ds-center-btn"/></div>
                    <div className="ds-mid-btns">
                      <span className="ds-small-btn">SELECT</span>
                      <span className="ds-small-btn">START</span>
                    </div>
                    <div className="ds-ab">
                      <div className="ds-btn" style={{background:"#e04060"}}>B</div>
                      <div className="ds-btn" style={{background:"#40a060"}}>A</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-windows-grid">
              <div className="mini-window" style={{border:"2px solid var(--gold)",boxShadow:"4px 4px 0 var(--gold)55"}}>
                <div className="mini-titlebar" style={{background:"var(--gold)"}}>
                  <div className="mini-dots"><div className="mini-dot" style={{background:"#ff6b6b"}}/><div className="mini-dot" style={{background:"#ffd93d"}}/><div className="mini-dot" style={{background:"#6bcb77"}}/></div>Hello !!
                </div>
                <div className="mini-body">
                  {[["Player","Hiva Shah"],["Role","UI/UX and visual Designer"],["Mission","Create thoughtful, interesting and user friendly designs."],["Status","Ready to explore, build, and win."],["Let's start the game!",""]].map(([k,v])=>(
                    <div key={k} className="mini-row"><span className="mini-label">{k}{v?":":""}</span>{v&&` ${v}`}</div>
                  ))}
                </div>
              </div>
              <div className="mini-window" style={{border:"2px solid var(--rose)",boxShadow:"4px 4px 0 var(--flesh)"}}>
                <div className="mini-titlebar" style={{background:"var(--rose)"}}>
                  <div className="mini-dots"><div className="mini-dot" style={{background:"#ff6b6b"}}/><div className="mini-dot" style={{background:"#ffd93d"}}/><div className="mini-dot" style={{background:"#6bcb77"}}/></div>Known Tools
                </div>
                <div className="mini-body">
                  <div className="tools-grid">
                    {["Figma 🎨","Illustrator ✏️","Canva 🌸","Framer 🚀"].map(t=><div key={t} className="tool-chip">{t}</div>)}
                  </div>
                </div>
              </div>
              <div className="mini-window" style={{border:"2px solid var(--lime)",boxShadow:"4px 4px 0 var(--sand)"}}>
                <div className="mini-titlebar" style={{background:"var(--lime)"}}>
                  <div className="mini-dots"><div className="mini-dot" style={{background:"#ff6b6b"}}/><div className="mini-dot" style={{background:"#ffd93d"}}/><div className="mini-dot" style={{background:"#6bcb77"}}/></div>Training Log
                </div>
                <div className="mini-body">
                  <div className="mini-row"><span className="mini-label">B.Tech in Comp Sci & Design</span></div>
                  <div className="mini-row">G H Patel College of Engineering & Technology</div>
                  <div className="mini-row">2023–27</div>
                </div>
              </div>
              <div className="mini-window" style={{border:"2px solid var(--mauve)",boxShadow:"4px 4px 0 var(--mauve)88"}}>
                <div className="mini-titlebar" style={{background:"var(--mauve)"}}>
                  <div className="mini-dots"><div className="mini-dot" style={{background:"#ff6b6b"}}/><div className="mini-dot" style={{background:"#ffd93d"}}/><div className="mini-dot" style={{background:"#6bcb77"}}/></div>Skills Mastery
                </div>
                <div className="mini-body">
                  <ul className="skills-list">
                    {["User Interface Design (UI)","User Research","Design Thinking","Prototyping","Usability testing","Visual design","Graphic Design","User empathy","Visual thinking","Reliability"].map(s=><li key={s}>{s}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="section section-bg-alt" style={{maxWidth:"100%",padding:"80px 0"}}>
            <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}>
              <div className="section-header">
                <div className="level-badge">LEVEL 02</div>
                <h2 className="section-title">ACTIVE MISSIONS</h2>
              </div>
              <div className="project-card" style={{border:"3px solid var(--amber)",boxShadow:"6px 6px 0 var(--amber)"}}>
                <div className="case-study-header" style={{background:"var(--lemon)"}}>
                  <div className="case-study-mission-num">MISSION 01</div>
                  <div className="case-study-tags">
                    <span className="tag-pill" style={{background:"var(--lime)",border:"2px solid var(--sand)"}}>BRAND IDENTITY</span>
                    <span className="tag-pill" style={{background:"var(--aqua)",border:"2px solid var(--sky)"}}>ACTIVE ●</span>
                  </div>
                </div>
                <div className="case-study-body">
                  <div className="case-left" style={{background:"var(--blond)"}}>
                    <div className="case-mission-label">Mission 01</div>
                    <div className="case-title">ZENLY</div>
                    <div className="case-subtitle">Brand Identity · Brochure · Visual Design</div>
                    <div className="cs-section"><div className="cs-section-label">Overview</div><div className="cs-section-text">Zenly is a streetwear brand rooted in real movement and urban culture — prioritising authenticity, comfort, and self-expression over status.</div></div>
                    <div className="cs-section"><div className="cs-section-label">Objective</div><div className="cs-section-text">Build a raw, expressive, community-driven visual identity that speaks to youth culture and feels genuinely street-born, not trend-chasing.</div></div>
                    <div className="cs-section"><div className="cs-section-label">Challenge</div><div className="cs-section-text">Streetwear consumers are overwhelmed by brands chasing trends rather than building culture. Zenly needed a visual language that stands apart.</div></div>
                    <div className="cs-section"><div className="cs-section-label">Solution</div><div className="cs-section-text">Bold groovy wordmark, asymmetric grids, layered photography, and large typographic watermarks — delivered across a full 6-panel brochure.</div></div>
                    <div className="cs-section"><div className="cs-section-label">Impact</div><div className="cs-section-text">A cohesive brand system covering manifesto, product photography, promotional pricing, creator stories, and a QR-linked digital storefront.</div></div>
                    <div className="case-btn-row">
                      {/* ✅ THIS IS THE KEY CHANGE — Link instead of <a> */}
                      <Link to="/zenly" className="case-btn case-btn-primary">▶ VIEW PROJECT</Link>
                    </div>
                  </div>
                  <div className="case-right" style={{background:"var(--white)",padding:0}}>
                    <img src="/zenly-case-study.png" alt="Zenly case study" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",display:"block"}}/>
                  </div>
                </div>
              </div>
              {[{n:2,color:"var(--rose)"},{n:3,color:"var(--gold)"},{n:4,color:"var(--cyan)"}].map(({n,color})=>(
                <div key={n} className="project-card locked-card" style={{border:`3px dashed ${color}`,boxShadow:"none",opacity:0.65}}>
                  <div style={{background:"var(--pearl)",padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`2px dashed ${color}`}}>
                    <div style={{fontFamily:"var(--pixel)",fontSize:9,color:"var(--text-dark)"}}>MISSION {String(n).padStart(2,"0")}</div>
                    <div style={{fontFamily:"var(--pixel)",fontSize:7,color:"var(--text-dark)",padding:"4px 10px",border:"2px dashed var(--khaki)",borderRadius:2}}>LOCKED 🔒</div>
                  </div>
                  <div className="locked-inner">COMING SOON 🪙</div>
                </div>
              ))}
              <div className="more-projects-note">▼ MORE MISSIONS LOADING...</div>
            </div>
          </section>

          <section id="contact" className="section section-bg-contact" style={{maxWidth:"100%",padding:"80px 0"}}>
            <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}>
              <div className="section-header">
                <div className="level-badge">LEVEL 03</div>
                <h2 className="section-title">LET'S CONNECT</h2>
              </div>
              <div className="contact-grid">
                <div className="contact-window">
                  <div className="window-titlebar" style={{background:"var(--sky)",color:"var(--text-dark)"}}>
                    <div className="win-dots"><div className="win-dot" style={{background:"#ff6b6b"}}/><div className="win-dot" style={{background:"#ffd93d"}}/><div className="win-dot" style={{background:"#6bcb77"}}/></div>
                    SEND A MESSAGE
                  </div>
                  <div className="contact-form">
                    <div><label className="form-label">YOUR NAME</label><input className="form-input" placeholder="Your Name..." value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/></div>
                    <div><label className="form-label">EMAIL</label><input className="form-input" placeholder="your@email.com" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/></div>
                    <div><label className="form-label">MESSAGE</label><textarea className="form-input form-textarea" placeholder="Type your quest here..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}/></div>
                    <button className="send-btn" onClick={handleSend}>▶ SEND MESSAGE</button>
                  </div>
                </div>
                <Window title="FIND ME HERE" color="var(--peach)" style={{border:"2px solid var(--tan)"}}>
                  <div className="social-links">
                    {[{icon:"✉",label:"Email",href:"mailto:hivashah2021@gmail.com"},{icon:"🔗",label:"LinkedIn",href:"https://github.com/hivashah29"},{icon:"👨🏻‍💻",label:"Github",href:"#"}].map(s=>(
                      <a key={s.label} href={s.href} className="social-link"><span className="social-icon">{s.icon}</span>{s.label}</a>
                    ))}
                  </div>
                  <div style={{margin:"0 24px 24px",background:"var(--blond)",border:"2px dashed var(--gold)",borderRadius:6,padding:"16px",textAlign:"center"}}>
                    <div style={{fontFamily:"var(--pixel)",fontSize:7,color:"var(--darker)",marginBottom:8}}>CURRENT STATUS</div>
                    <div style={{fontFamily:"var(--mono)",fontSize:20,color:"#4a3a80"}}>OPEN TO INTERNSHIPS<br/>&amp; FREELANCE PROJECTS!</div>
                  </div>
                </Window>
              </div>
            </div>
          </section>

          <footer>
            <div style={{marginBottom:8}}>★ ★ ★ &nbsp; GAME OVER? NEVER. &nbsp; ★ ★ ★</div>
            <div>HIVA SHAH · UI/UX DESIGNER · 2026</div>
            <div style={{marginTop:8,fontSize:6,opacity:0.4}}>DESIGNED WITH ♥ AND WAY TOO MANY FIGMA COMPONENTS</div>
          </footer>
        </div>
      )}

      {lightbox && (
        <div className="lightbox" onClick={()=>setLightbox(null)}>
          <img src={lightbox} alt="Expanded"/>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

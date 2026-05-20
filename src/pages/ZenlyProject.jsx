import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── shared font (same as Home) ───────────────────────────────────────────────
const FONT_LINK = `@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&family=DM+Sans:wght@300;400;500&display=swap');`;

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
${FONT_LINK}

:root {
  --cream:   #FFFEE0; --white:  #FAF8F6; --blond: #FFF8D5;
  --aqua:    #D5F6FB; --lemon:  #F6F3A9; --snow:  #E5ECF8;
  --pearl:   #F0EBD8; --lime:   #D1FEB8; --skin:  #EFDFD8;
  --peach:   #F7DFC2; --mauve:  #EBCCFF; --sky:   #BEDDF1;
  --gold:    #E7D27C; --rose:   #F6B8D0; --flesh: #F1BEB5;
  --amber:   #F8C57C; --cyan:   #A4D8D8; --sand:  #D3C7A2;
  --tan:     #E9C9AA; --khaki:  #DAD4B6; --gray:  #CFCFC4;
  --dark:    #3a3060; --darker: #2e2550; --text-dark: #2d2040;
  --pixel: 'Press Start 2P', monospace;
  --mono:  'VT323', monospace;
  --body:  'DM Sans', sans-serif;
}

*{margin:0;padding:0;box-sizing:border-box;}
body,html{
  background:var(--blond); color:var(--text-dark);
  font-family:var(--body); overflow-x:hidden; cursor:crosshair;
}
::-webkit-scrollbar{width:8px;}
::-webkit-scrollbar-track{background:var(--blond);}
::-webkit-scrollbar-thumb{background:var(--rose);border-radius:4px;}

body::before{
  content:''; position:fixed; inset:0; pointer-events:none; z-index:9999;
  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.02) 2px,rgba(0,0,0,.02) 4px);
}

/* ── STARS ── */
.stars{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
.star{position:absolute;border-radius:50%;animation:twinkle 2s infinite alternate;}
@keyframes twinkle{from{opacity:.3;transform:scale(.8)}to{opacity:.9;transform:scale(1.4)}}

/* ── NAV ── */
.zp-nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  display:flex;justify-content:space-between;align-items:center;
  padding:12px 32px;
  background:rgba(255,254,224,.96);
  backdrop-filter:blur(8px);
  border-bottom:3px solid var(--rose);
  box-shadow:0 2px 0 var(--mauve);
}
.zp-nav-logo{
  font-family:var(--pixel);font-size:10px;
  color:var(--darker);text-shadow:2px 2px var(--rose);letter-spacing:1px;
}
.zp-back-btn{
  display:flex;align-items:center;gap:8px;
  font-family:var(--pixel);font-size:8px;
  color:var(--text-dark);text-decoration:none;
  padding:8px 16px;
  background:var(--lime);border:2px solid var(--sand);
  box-shadow:3px 3px 0 var(--tan);
  transition:transform .1s,box-shadow .1s;
}
.zp-back-btn:hover{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--tan);}

/* ── TICKER ── */
.zp-ticker{
  background:var(--rose);padding:10px 0;overflow:hidden;
  border-bottom:2px solid var(--flesh);
}
.zp-ticker-inner{
  display:flex;gap:60px;
  animation:scroll-left 18s linear infinite;white-space:nowrap;
}
@keyframes scroll-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.zp-ticker-item{
  font-family:var(--pixel);font-size:8px;
  color:var(--text-dark);letter-spacing:2px;
}

/* ── HERO BANNER ── */
.zp-hero{
  background:linear-gradient(135deg,var(--lemon) 0%,var(--lime) 50%,var(--aqua) 100%);
  padding:120px 32px 60px;
  display:flex;flex-direction:column;align-items:center;
  text-align:center;position:relative;overflow:hidden;
  border-bottom:4px solid var(--amber);
}
.zp-hero::before{
  content:'ZENLY';
  position:absolute;
  font-family:var(--pixel);font-size:clamp(80px,18vw,200px);
  color:rgba(255,255,255,.25);
  top:50%;left:50%;transform:translate(-50%,-50%);
  pointer-events:none;letter-spacing:8px;
  white-space:nowrap;
}
.zp-breadcrumb{
  font-family:var(--pixel);font-size:7px;
  color:var(--darker);opacity:.6;margin-bottom:16px;
}
.zp-hero-title{
  font-family:var(--pixel);font-size:clamp(32px,7vw,80px);
  color:var(--darker);
  text-shadow:4px 4px 0 var(--),8px 8px 0 var(--flesh);
  letter-spacing:4px;margin-bottom:12px;position:relative;z-index:1;
}
.zp-hero-sub{
  font-family:var(--mono);font-size:clamp(18px,3vw,28px);
  color:var(--dark);margin-bottom:24px;letter-spacing:2px;
}
.zp-hero-tags{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:0;}
.zp-tag{
  font-family:var(--pixel);font-size:7px;
  padding:6px 12px;border-radius:2px;
  border:2px solid var(--darker);
}

/* ── MAIN CONTENT ── */
.zp-content{max-width:1200px;margin:0 auto;padding:60px 24px 80px;}

/* ── SECTION HEADER ── */
.zp-section-head{
  display:flex;align-items:center;gap:14px;margin-bottom:32px;
}
.zp-level-badge{
  font-family:var(--pixel);font-size:8px;
  color:var(--text-dark);background:var(--lemon);
  border:2px solid var(--gold);padding:7px 12px;white-space:nowrap;
}
.zp-section-title{
  font-family:var(--pixel);font-size:clamp(11px,2vw,17px);
  color:var(--darker);text-shadow:2px 2px var(--cyan);
}

/* ── CASE STUDY GRID ── */
.zp-case-grid{
  display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;
  margin-bottom:60px;
}
.zp-case-card{
  background:var(--white);border-radius:8px;overflow:hidden;
  border:2px solid var(--amber);
  box-shadow:4px 4px 0 var(--flesh);
  padding:0;
}
.zp-case-card-head{
  background:var(--lemon);
  padding:10px 16px;
  font-family:var(--pixel);font-size:7px;
  color:var(--text-dark);
  border-bottom:2px solid var(--amber);
  display:flex;align-items:center;gap:6px;
}
.zp-case-card-icon{font-size:16px;}
.zp-case-card-body{
  padding:16px;
  font-family:var(--mono);font-size:19px;
  color:var(--text-dark);line-height:1.6;
}
.zp-case-card-body strong{
  display:block;
  font-family:var(--pixel);font-size:7px;
  color:var(--amber);margin-bottom:6px;
}

/* ── DIVIDER ── */
.zp-divider{
  height:3px;
  background:repeating-linear-gradient(90deg,var(--rose) 0px,var(--rose) 20px,var(--lime) 20px,var(--lime) 40px);
  margin:48px 0;border-radius:2px;
}

/* ── BROCHURE SECTION ── */
.zp-brochure-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}
.zp-brochure-panel{
  position:relative;
  border-radius:8px;overflow:hidden;
  border:3px solid var(--rose);
  box-shadow:4px 4px 0 var(--flesh);
  cursor:pointer;
  transition:transform .2s,box-shadow .2s;
  aspect-ratio:3/4;
  background:var(--pearl);
}
.zp-brochure-panel:hover{
  transform:translateY(-6px) rotate(1deg);
  box-shadow:8px 12px 0 var(--flesh);
}
.zp-brochure-panel img{
  width:100%;height:100%;
  object-fit:cover;
  display:block;
}
.zp-panel-label{
  position:absolute;bottom:0;left:0;right:0;
  background:rgba(255,248,213,.92);
  padding:6px 10px;
  font-family:var(--pixel);font-size:6px;
  color:var(--text-dark);
  border-top:2px solid var(--rose);
  display:flex;justify-content:space-between;align-items:center;
}
.zp-panel-num{
  background:var(--rose);color:var(--text-dark);
  padding:2px 6px;border-radius:2px;
  font-family:var(--pixel);font-size:6px;
}

/* ── WIREFRAME SECTION ── */
.zp-wireframe-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:14px;
}
.zp-wf-slot{
  border-radius:8px;overflow:hidden;
  border:2px dashed var(--mauve);
  background:var(--snow);
  aspect-ratio:9/16;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  gap:10px;padding:16px;text-align:center;
  cursor:pointer;
  transition:background .2s,border-color .2s;
  position:relative;
}
.zp-wf-slot:hover{background:var(--pearl);border-color:var(--dark);}
.zp-wf-slot.has-image{border:3px solid var(--mauve);padding:0;}
.zp-wf-slot.has-image img{
  width:100%;height:100%;object-fit:cover;display:block;
}
.zp-wf-slot.has-image:hover{transform:translateY(-4px);box-shadow:0 8px 20px rgba(201,184,245,.5);}
.zp-wf-icon{font-size:32px;}
.zp-wf-label{
  font-family:var(--pixel);font-size:6px;
  color:var(--darker);line-height:1.8;
}
.zp-wf-num{
  position:absolute;top:8px;left:8px;
  background:var(--mauve);
  font-family:var(--pixel);font-size:6px;
  color:var(--text-dark);padding:3px 7px;border-radius:2px;
}
.zp-wf-input{
  width:100%;max-width:260px;
  background:var(--white);
  border:2px solid var(--mauve);border-radius:4px;
  padding:6px 10px;
  font-family:var(--mono);font-size:17px;
  color:var(--text-dark);outline:none;
  margin-top:4px;
}
.zp-wf-input::placeholder{color:rgba(0,0,0,.3);}
.zp-wf-submit{
  font-family:var(--pixel);font-size:6px;
  background:var(--mauve);color:var(--text-dark);
  border:none;padding:7px 14px;
  cursor:pointer;border-radius:2px;
  box-shadow:2px 2px 0 rgba(0,0,0,.12);
}

/* ── TOOLS USED ── */
.zp-tools-row{
  display:flex;gap:10px;flex-wrap:wrap;margin-top:4px;
}
.zp-tool{
  font-family:var(--pixel);font-size:7px;
  padding:6px 12px;
  background:var(--snow);border:2px solid var(--mauve);
  border-radius:2px;color:var(--darker);
  transition:background .15s;
}
.zp-tool:hover{background:var(--mauve);}

/* ── PROCESS TIMELINE ── */
.zp-timeline{
  display:flex;flex-direction:column;gap:0;
  position:relative;
  padding-left:32px;
}
.zp-timeline::before{
  content:'';position:absolute;left:10px;top:0;bottom:0;
  width:3px;
  background:repeating-linear-gradient(180deg,var(--rose) 0px,var(--rose) 12px,var(--lime) 12px,var(--lime) 24px);
}
.zp-tl-item{
  position:relative;
  margin-bottom:28px;
}
.zp-tl-dot{
  position:absolute;left:-26px;top:4px;
  width:16px;height:16px;border-radius:50%;
  border:3px solid var(--white);
  box-shadow:0 0 0 2px var(--rose);
}
.zp-tl-label{
  font-family:var(--pixel);font-size:7px;
  color:var(--amber);margin-bottom:5px;
}
.zp-tl-text{
  font-family:var(--mono);font-size:19px;
  color:var(--text-dark);line-height:1.6;
}

/* ── LIGHTBOX ── */
.zp-lightbox{
  position:fixed;inset:0;
  background:rgba(46,37,80,.9);
  z-index:9000;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
}
.zp-lightbox img{
  max-width:90vw;max-height:90vh;
  object-fit:contain;
  border:4px solid var(--rose);border-radius:8px;
}
.zp-lightbox-close{
  position:absolute;top:24px;right:32px;
  font-family:var(--pixel);font-size:10px;
  color:var(--rose);background:none;border:none;cursor:pointer;
}

/* ── FOOTER ── */
.zp-footer{
  border-top:3px solid var(--rose);background:var(--blond);
  padding:24px;text-align:center;
  font-family:var(--pixel);font-size:7px;
  color:rgba(46,37,80,.5);line-height:2.5;
}

/* ── PAGE FADE-IN ── */
.zp-page{animation:zp-fade .6s ease forwards;}
@keyframes zp-fade{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  .zp-case-grid{grid-template-columns:1fr 1fr;}
  .zp-brochure-grid{grid-template-columns:repeat(2,1fr);}
  .zp-wireframe-grid{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:600px){
  .zp-nav{padding:10px 16px;}
  .zp-hero{padding:90px 16px 48px;}
  .zp-content{padding:40px 16px 60px;}
  .zp-case-grid{grid-template-columns:1fr;}
  .zp-brochure-grid{grid-template-columns:repeat(2,1fr);gap:10px;}
  .zp-wireframe-grid{grid-template-columns:repeat(2,1fr);gap:10px;}
  .zp-section-head{flex-direction:column;align-items:flex-start;gap:6px;}
}
`;

// ─── Star field (same as Home) ────────────────────────────────────────────────
const STAR_COLORS = ["#F6B8D0","#EBCCFF","#D5F6FB","#D1FEB8","#F6F3A9","#BEDDF1"];
const Stars = () => {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    size: Math.random() > 0.8 ? "6px" : "3px",
    color: STAR_COLORS[i % STAR_COLORS.length],
  }));
  return (
    <div className="stars">
      {stars.map((s) => (
        <div key={s.id} className="star" style={{ top:s.top, left:s.left, animationDelay:s.delay, width:s.size, height:s.size, background:s.color }} />
      ))}
    </div>
  );
};

// ─── Ticker ───────────────────────────────────────────────────────────────────
const tickerItems = [
  "★ ZENLY STREETWEAR","✦ BRAND IDENTITY","★ VISUAL DESIGN","✦ MISSION 01",
  "★ ZENLY STREETWEAR","✦ BRAND IDENTITY","★ VISUAL DESIGN","✦ MISSION 01",
];
const Ticker = () => (
  <div className="zp-ticker">
    <div className="zp-ticker-inner">
      {tickerItems.map((t, i) => <span key={i} className="zp-ticker-item">{t}</span>)}
    </div>
  </div>
);

// ─── Wireframe slot ───────────────────────────────────────────────────────────
const WfSlot = ({ num, label, imgSrc, onLightbox }) => {
  const [url, setUrl]   = useState(imgSrc || "");
  const [saved, setSaved] = useState(!!imgSrc);

  if (saved && url) {
    return (
      <div className="zp-wf-slot has-image" onClick={() => onLightbox(url)}>
        <div className="zp-wf-num">WF {String(num).padStart(2,"0")}</div>
        <img src={url} alt={label} />
      </div>
    );
  }
  return (
    <div className="zp-wf-slot">
      <div className="zp-wf-num">WF {String(num).padStart(2,"0")}</div>
      <div className="zp-wf-icon">🖼</div>
      <div className="zp-wf-label">{label}<br/>PASTE IMAGE URL BELOW</div>
      <input
        className="zp-wf-input"
        placeholder="https://..."
        value={url}
        onChange={e => setUrl(e.target.value)}
        onClick={e => e.stopPropagation()}
      />
      <button className="zp-wf-submit" onClick={e => { e.stopPropagation(); if(url) setSaved(true); }}>
        ADD ▶
      </button>
    </div>
  );
};

// ─── 6 individual brochure panel images ──────────────────────────────────────
const PANELS = [
  { img: "/panel1.png", label: "Front Cover — ZNY SS24" },
  { img: "/panel2.png", label: "Community Grid — Crafted for Creators" },
  { img: "/panel3.png", label: "About the Movement" },
  { img: "/panel4.png", label: "Promo Drop — Upto 50% Off" },
  { img: "/panel5.png", label: "Find Your Flow · Shop the Drop" },
  { img: "/panel6.png", label: "Join Your Tribe · QR Connect" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ZenlyProject() {
  const [lightbox, setLightbox] = useState(null);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <style>{CSS}</style>
      <Stars />

      <div className="zp-page">

        {/* ── NAV ── */}
        

        <Ticker />

        {/* ── HERO BANNER ── */}
        <div className="zp-hero">
          <div className="zp-breadcrumb">PORTFOLIO → MISSION 01</div>
          <img
  src="/zenly-logo.png"
  alt="ZENLY"
  style={{
    height: "clamp(60px, 12vw, 140px)",
    width: "auto",
    marginBottom: "12px",
    filter: "drop-shadow(4px 4px 0 rgba(246,184,208,0.8))",
    position: "relative",
    zIndex: 1,
  }}
/>
         
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="zp-content">

          {/* ══ SECTION 1: CASE STUDY ══ */}
          <div className="zp-section-head">
            <div className="zp-level-badge">STAGE 01</div>
            <h2 className="zp-section-title">CASE STUDY</h2>
          </div>

          <div className="zp-case-grid">

            <div className="zp-case-card">
              <div className="zp-case-card-head">
                <span className="zp-case-card-icon">🔍</span> OVERVIEW
              </div>
              <div className="zp-case-card-body">
                <strong>What is Zenly?</strong>
                Zenly is a streetwear brand rooted in real movement and urban culture.
                It prioritises authenticity, comfort, and self-expression over status —
                style shaped by real life, not runways. The streets drive culture, not price tags.
              </div>
            </div>

            <div className="zp-case-card">
              <div className="zp-case-card-head">
                <span className="zp-case-card-icon">⚠️</span> PROBLEM STATEMENT
              </div>
              <div className="zp-case-card-body">
                <strong>The Gap</strong>
                Streetwear consumers are overwhelmed by brands that chase trends rather than
                build culture. Most labels feel corporate, polished, and disconnected from the
                community they claim to represent. There was no brand for those who
                <em> create their own rules</em> and value identity over conformity.
              </div>
            </div>

            <div className="zp-case-card">
              <div className="zp-case-card-head">
                <span className="zp-case-card-icon">💡</span> HOW THIS SOLVES IT
              </div>
              <div className="zp-case-card-body">
                <strong>The Solution</strong>
                Zenly's visual identity is intentionally raw and expressive — a bold groovy
                wordmark, asymmetric grid layouts, layered photography, and large typographic
                watermarks across all touchpoints. The result is a brand system that feels
                street-born, not designed in a boardroom.
              </div>
            </div>

            <div className="zp-case-card">
              <div className="zp-case-card-head">
                <span className="zp-case-card-icon">🎯</span> TARGET AUDIENCE
              </div>
              <div className="zp-case-card-body">
                <strong>Who is it for?</strong>
                Creators, breakers, rule-benders. Young adults aged 18–28 who live in motion —
                skaters, artists, dancers, and everyday people who treat the street as their canvas.
                People who choose movement over labels.
              </div>
            </div>

            <div className="zp-case-card">
              <div className="zp-case-card-head">
                <span className="zp-case-card-icon">🎨</span> DESIGN DECISIONS
              </div>
              <div className="zp-case-card-body">
                <strong>Key Choices</strong>
                A vibrant palette of reds, forest greens, and acid yellows evokes street-art energy.
                The groovy wordmark adds personality without losing legibility. Photography is layered
                and overlapping — mirroring the energy of movement. The ZNY monogram creates a
                recognisable sub-mark.
              </div>
            </div>

            <div className="zp-case-card">
              <div className="zp-case-card-head">
                <span className="zp-case-card-icon">📦</span> DELIVERABLES
              </div>
              <div className="zp-case-card-body">
                <strong>What was created?</strong>
                A 6-panel brochure covering brand manifesto, product photography, community grid,
                promotional pricing, creator stories, and a QR-linked digital storefront. Plus a
                full set of high-fidelity wireframes for the digital brand experience.
              </div>
            </div>

          </div>

          {/* ── TOOLS ── */}
          <div style={{ marginBottom: 48 }}>
            <div className="zp-section-head" style={{ marginBottom: 16 }}>
              <div className="zp-level-badge">WEAPONS</div>
              <h2 className="zp-section-title">TOOLS USED</h2>
            </div>
            <div className="zp-tools-row">
              {["Figma 🎨","Adobe Illustrator ✏️","Adobe Photoshop 📷","Canva 🌸"].map(t => (
                <div key={t} className="zp-tool">{t}</div>
              ))}
            </div>
          </div>

          {/* ── PROCESS TIMELINE ── */}
          <div style={{ marginBottom: 48 }}>
            <div className="zp-section-head">
              <div className="zp-level-badge">STAGE 02</div>
              <h2 className="zp-section-title">DESIGN PROCESS</h2>
            </div>
            <div className="zp-timeline">
              {[
                { label:"01 · RESEARCH", color:"var(--rose)",
                  text:"Audited competitor brands (Supreme, Palace, Stüssy) for tone, layout patterns, and brand language. Identified the gap: most streetwear brands have clean, safe visuals that don't reflect actual street culture." },
                { label:"02 · MOODBOARDING", color:"var(--amber)",
                  text:"Built a palette inspired by street art and urban murals — vibrant reds, forest greens, and acid lime. Referenced retro groovy typography from the 70s as a nod to timeless cool." },
                { label:"03 · TYPOGRAPHY", color:"var(--mauve)",
                  text:"Chose a bold groovy display font for the ZENLY wordmark to feel expressive and ownable. Paired with utility-style body copy for contrast — premium feel without losing street credibility." },
                { label:"04 · LAYOUT DESIGN", color:"var(--cyan)",
                  text:"Used asymmetric grids, diagonal crops, layered photography, and large typographic ZNY watermarks to create visual tension and energy across every panel of the brochure." },
                { label:"05 · BROCHURE PRODUCTION", color:"var(--lime)",
                  text:"Delivered 6 panels: front cover, community grid, brand manifesto, promo drop, creator story, and a QR-linked digital storefront — each with a distinct visual moment tied by the core brand system." },
              ].map((step, i) => (
                <div key={i} className="zp-tl-item">
                  <div className="zp-tl-dot" style={{ background: step.color }} />
                  <div className="zp-tl-label">{step.label}</div>
                  <div className="zp-tl-text">{step.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="zp-divider" />

          {/* ══ SECTION 2: BROCHURE ══ */}
          <div className="zp-section-head">
            <div className="zp-level-badge">STAGE 03</div>
            <h2 className="zp-section-title">BROCHURE — 6 PANELS</h2>
          </div>
          <p style={{ fontFamily:"var(--mono)", fontSize:20, color:"var(--text-dark)", marginBottom:24, lineHeight:1.6 }}>
            CLICK ANY PANEL TO VIEW THE FULL .
          </p>

          <div className="zp-brochure-grid">
            {PANELS.map((panel, i) => (
              <div
                key={i}
                className="zp-brochure-panel"
                onClick={() => setLightbox(panel.img)}
                style={{ borderColor: ["var(--rose)","var(--amber)","var(--mauve)","var(--lime)","var(--cyan)","var(--gold)"][i] }}
              >
                <img
                  src={panel.img}
                  alt={panel.label}
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", position:"absolute", inset:0 }}
                />
                <div className="zp-panel-label">
                  <span>{panel.label}</span>
                  <span className="zp-panel-num">P{i + 1}</span>
                </div>
              </div>
            ))}
          </div>

          

          <div className="zp-divider" />

          {/* ══ SECTION 3: HI-FI WIREFRAMES ══ */}
          <div className="zp-section-head">
            <div className="zp-level-badge">STAGE 04</div>
            <h2 className="zp-section-title">HIGH-FIDELITY WIREFRAMES</h2>
          </div>
         

          <div className="zp-wireframe-grid">
  {[
    { img: "/wireframes/wf-01.png", label: "Screen 01" },
    { img: "/wireframes/wf-02.png", label: "Screen 02" },
    { img: "/wireframes/wf-03.png", label: "Screen 03" },
    { img: "/wireframes/wf-04.png", label: "Screen 04" },
    { img: "/wireframes/wf-05.png", label: "Screen 05" },
    { img: "/wireframes/wf-06.png", label: "Screen 06" },
    { img: "/wireframes/wf-07.png", label: "Screen 07" },
    { img: "/wireframes/wf-08.png", label: "Screen 08" },
  ].map((frame, i) => (
    <div key={i} style={{ display:"flex", flexDirection:"column", gap:8 }}
      onClick={() => setLightbox(frame.img)}
    >
      <div style={{ fontFamily:"var(--pixel)", fontSize:6, color:"var(--mauve)", letterSpacing:1 }}>
        WF {String(i + 1).padStart(2,"0")} — {frame.label}
      </div>
      <img
        src={frame.img}
        alt={frame.label}
        style={{
          width: "100%",
          border: "3px solid var(--mauve)",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.target.style.transform = "translateY(-4px)"}
        onMouseLeave={e => e.target.style.transform = "translateY(0)"}
      />
    </div>
  ))}
</div>

        </div>

        {/* ── FOOTER ── */}
        <footer className="zp-footer">
  <div style={{ marginBottom:8 }}>★ ★ ★ &nbsp; MISSION 01 COMPLETE &nbsp; ★ ★ ★</div>
  <div>HIVA SHAH · UI/UX DESIGNER · 2026</div>
  <div style={{ marginTop:8, fontSize:6, opacity:.4 }}>ZENLY STREETWEAR — FIND YOUR FLOW · RULE THE STREETS</div>
  <div style={{ marginTop:-155 }}>
    <Link to="/" className="zp-back-btn" style={{ display:"inline-flex", margin:"0 auto" }}>
      ◀ BACK TO PORTFOLIO
    </Link>
  </div>
</footer>

      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="zp-lightbox" onClick={() => setLightbox(null)}>
          <button className="zp-lightbox-close" onClick={() => setLightbox(null)}>✕ CLOSE</button>
          <img src={lightbox} alt="Expanded view" />
        </div>
      )}
    </>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Star {
  id: string;
  cx: number;
  cy: number;
  r: number;
  label: string;
  name: string;
  desc: string;
}

const STARS: Star[] = [
  { id: 'vega',    cx: 150, cy: 52,  r: 7,   label: 'Intentional', name: 'Vega',          desc: "Every frame, every session, every decision is made with purpose. We don't shoot for volume. We shoot for meaning." },
  { id: 'zeta',    cx: 96,  cy: 140, r: 4.5, label: 'Editorial',   name: 'Zeta Lyrae',    desc: "We approach every shoot like a photo editorial — concept, direction, execution. Your photos should look like they belong in a magazine." },
  { id: 'epsilon', cx: 204, cy: 140, r: 4,   label: 'Present',     name: 'Epsilon Lyrae', desc: "We show up fully — no distractions, no shortcuts. Every client gets our complete attention from inquiry to delivery." },
  { id: 'sheliak', cx: 112, cy: 218, r: 5,   label: 'Personal',    name: 'Sheliak',       desc: "Built around who you actually are, not a template. No two sessions look the same because no two clients are the same." },
  { id: 'sulafat', cx: 188, cy: 218, r: 5,   label: 'Lasting',     name: 'Sulafat',       desc: "We make images you'll still love in thirty years. Work that holds up. Work that means something long after the day is over." },
  { id: 'delta',   cx: 150, cy: 268, r: 3.5, label: 'Selective',   name: 'Delta Lyrae',   desc: "We take on a limited number of clients each year — because doing fewer things exceptionally well is always better than doing everything adequately." },
];

const LINES = [
  ['vega', 'zeta'],
  ['vega', 'epsilon'],
  ['zeta', 'sheliak'],
  ['epsilon', 'sulafat'],
  ['sheliak', 'sulafat'],
  ['sheliak', 'delta'],
  ['sulafat', 'delta'],
];

const starMap = Object.fromEntries(STARS.map(s => [s.id, s]));

const BG_POSITIONS = [
  [8, 12], [22, 78], [45, 5], [67, 88], [82, 22],
  [91, 55], [15, 45], [58, 32], [74, 70], [35, 90],
  [6, 65], [88, 8], [50, 50], [30, 15], [70, 40]
];

export default function Home() {
  const [activeStar, setActiveStar] = useState<string | null>(null);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Setup Scroll Reveal animations and Keyboard events
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setLightboxImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // HoneyBook widget async loader
  useEffect(() => {
    const w = window as any;
    w['HoneyBook'] = 'HoneyBook';

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://widget.honeybook.com/assets/vendor/honeybooker.js';
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Handle locking page scroll when Modal or Lightbox is open
  useEffect(() => {
    if (isModalOpen || lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, lightboxImage]);

  const activeStarId = hoveredStar || activeStar;
  const activeStarData = STARS.find(s => s.id === activeStarId);
  const isStarActive = (id: string) => activeStar === id || hoveredStar === id;

  return (
    <div className="home-page-wrapper">
      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-logo">Haus of <span>Lyra</span></Link>
        <ul className="nav-links">
          <li><Link href="/" className="active">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><Link href="/seniors">Seniors</Link></li>
          <li><a href="#weddings">Weddings</a></li>
          <li><a href="#services">Brand</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>Contact</a></li>
        </ul>
        <button className="btn btn-gold nav-cta" onClick={() => setIsModalOpen(true)}>Start Your Inquiry</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <span className="hero-star" style={{ left: '8%', top: '18%', width: '2px', height: '2px', opacity: 0.22 }}></span>
          <span className="hero-star" style={{ left: '22%', top: '62%', width: '2px', height: '2px', opacity: 0.15 }}></span>
          <span className="hero-star" style={{ left: '40%', top: '30%', width: '1.5px', height: '1.5px', opacity: 0.18 }}></span>
          <span className="hero-star" style={{ left: '55%', top: '72%', width: '2px', height: '2px', opacity: 0.12 }}></span>
          <span className="hero-star" style={{ left: '72%', top: '14%', width: '1.5px', height: '1.5px', opacity: 0.2 }}></span>

          <span className="hero-eyebrow eg">Des Moines, Iowa</span>
          <h1 className="hero-h1">
            <span className="line"><span>Where your</span></span>
            <span className="line"><span><em>story</em> becomes</span></span>
            <span className="line"><span>art.</span></span>
          </h1>
          <div className="hero-rule"></div>
          <p className="hero-p">We're Haus of Lyra — a creative studio in Des Moines for the people who want their photos to actually feel like them. Not stiff. Not overdone. Just intentional, editorial, and a little bit magnetic.</p>
          <div className="hero-btns">
            <button className="btn btn-gold" onClick={() => setIsModalOpen(true)}>Start Your Inquiry</button>
            <a href="#about" className="btn btn-ol">Our Story</a>
          </div>
        </div>

        <div className="hero-mosaic">
          <div className="hero-mosaic-top">
            <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="Haus of Lyra photography" />
          </div>
          <div className="hero-mosaic-bot">
            <div className="mosaic-photo">
              <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/bb4033b1-6acf-4b6e-8d17-4fd089492473/ADA-270.JPG" alt="Senior portrait" />
            </div>
            <div className="mosaic-mono">
              <span className="hl-label">Haus of Lyra</span>
              <span className="hl">HL</span>
              <span className="hl-city">Des Moines</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item"><div className="stat-num">10+</div><div className="stat-lbl">Years of Craft</div></div>
        <div className="stat-item"><div className="stat-num">Des Moines</div><div className="stat-lbl">Iowa + Beyond</div></div>
        <div className="stat-item"><div className="stat-num">4</div><div className="stat-lbl">Service Areas</div></div>
        <div className="stat-item"><div className="stat-num">100%</div><div className="stat-lbl">Intentional</div></div>
      </div>

      {/* TICKER */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-track">
          <span className="t-item">Senior Portraits</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Wedding Photography</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Wedding Films</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Brand + Commercial</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Des Moines Iowa</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Haus of Lyra</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Senior Portraits</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Wedding Photography</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Wedding Films</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Brand + Commercial</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Des Moines Iowa</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Haus of Lyra</span><span className="t-dot">&#9679;</span>
        </div>
      </div>

      {/* WHO WE ARE */}
      <div id="about" className="who">
        <div className="who-text reveal">
          <span className="eyebrow ed">Who We Are</span>
          <h2>Artistry meets <em>real life.</em></h2>
          <span className="gold-bar" style={{ margin: '4px 0 24px' }}></span>
          <p>Haus of Lyra is where artistry meets real life. We photograph seniors who want more than a yearbook photo and weddings that deserve more than a highlight reel.</p>
          <p><strong>Every session is styled, directed, and crafted with intention</strong> — because your story is worth more than a quick click and a filter.</p>
          <a href="#services" className="btn btn-ol-dark" style={{ marginTop: '32px', alignSelf: 'flex-start' }}>Our Services</a>
        </div>
        <div className="who-dark reveal d2">
          <blockquote className="who-quote">
            "We don't do cookie-cutter.<br />We do once-in-a-lifetime."
          </blockquote>
          <cite className="who-attr">— Dakota, Founder</cite>
        </div>
      </div>

      {/* CONSTELLATION */}
      <section className="constellation-section">
        {/* Background star speckles */}
        <div id="bgStars">
          {BG_POSITIONS.map(([x, y], i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: i % 3 === 0 ? '2px' : '1.5px',
                height: i % 3 === 0 ? '2px' : '1.5px',
                borderRadius: '50%',
                backgroundColor: 'white',
                opacity: 0.06 + ((i * 7) % 20) * 0.008,
                pointerEvents: 'none',
                animation: `starPulse ${2 + i * 0.3}s ease-in-out infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>

        <div className="const-inner">
          <div className="const-text reveal">
            <span className="eyebrow eg">The Constellation</span>
            <h2>The stars we <em>navigate by.</em></h2>
            <span className="gold-bar" style={{ margin: '4px 0 22px' }}></span>
            <p>Lyra is a constellation built around Vega — one of the brightest stars in the sky. These are the values that shape every session, every film, and every client relationship we build.</p>
            <span className="const-hint">Hover or click a star to explore</span>

            {/* Value reveal panel */}
            <div className={`const-reveal ${!activeStarId ? 'empty' : ''}`} id="constReveal">
              {activeStarData ? (
                <>
                  <span className="const-reveal-star">{activeStarData.name}</span>
                  <span className="const-reveal-label">{activeStarData.label}</span>
                  <p className="const-reveal-desc">{activeStarData.desc}</p>
                </>
              ) : (
                <p className="const-empty-hint">Select any star in the constellation to reveal a core value.</p>
              )}
            </div>
          </div>

          <div className="const-svg-wrap reveal d2">
            <svg id="constSvg" viewBox="0 0 300 320" width="320" height="340">
              <defs>
                <radialGradient id="sglow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FAF8F5" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0"/>
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="cb"/>
                  <feMerge>
                    <feMergeNode in="cb"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Lines */}
              {LINES.map(([a, b], idx) => {
                const s1 = starMap[a];
                const s2 = starMap[b];
                const isActiveLine = activeStarId === a || activeStarId === b;
                return (
                  <line
                    key={idx}
                    x1={s1.cx}
                    y1={s1.cy}
                    x2={s2.cx}
                    y2={s2.cy}
                    stroke={isActiveLine ? 'rgba(250, 248, 245, 0.65)' : 'rgba(250, 248, 245, 0.18)'}
                    strokeWidth="1"
                  />
                );
              })}

              {/* Stars */}
              {STARS.map((star) => {
                const isActive = isStarActive(star.id);
                const isSelected = activeStar === star.id;
                return (
                  <g
                    key={star.id}
                    onClick={() => setActiveStar(isSelected ? null : star.id)}
                    onMouseEnter={() => setHoveredStar(star.id)}
                    onMouseLeave={() => setHoveredStar(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {isActive && (
                      <circle cx={star.cx} cy={star.cy} r={star.r * 5} fill="rgba(250, 248, 245, 0.12)" />
                    )}
                    <circle
                      cx={star.cx}
                      cy={star.cy}
                      r={star.r}
                      fill={isActive ? '#FAF8F5' : 'rgba(250, 248, 245, 0.45)'}
                      filter={isActive ? 'url(#glow)' : undefined}
                      style={{ transition: 'all 0.25s' }}
                    />
                    {/* Hit target */}
                    <circle cx={star.cx} cy={star.cy} r={star.r + 12} fill="transparent" />
                    {isActive && (
                      <text
                        x={star.cx}
                        y={star.cy - star.r - 10}
                        textAnchor="middle"
                        fontFamily="'Josefin Sans', sans-serif"
                        fontSize="8"
                        letterSpacing="2"
                        fill="#FAF8F5"
                      >
                        {star.label.toUpperCase()}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services">
        <div className="services-header reveal">
          <span className="eyebrow ew">What We Do</span>
          <h2>Four Ways We Work</h2>
        </div>
        <div className="svc-grid reveal d1">
          <Link href="/seniors" className="svc-item">
            <div className="svc-num">01</div>
            <h3>Senior Portraits</h3>
            <div className="svc-rule"></div>
            <p>Your senior year only happens once. Styled, directed, and designed around who you actually are — not some template.</p>
            <span className="svc-link">Explore →</span>
          </Link>
          <a href="#weddings" className="svc-item">
            <div className="svc-num">02</div>
            <h3>Wedding Photography</h3>
            <div className="svc-rule"></div>
            <p>Over a decade behind the lens. We find the moments that matter — the ones you'll still be crying over in 20 years.</p>
            <span className="svc-link">Explore →</span>
          </a>
          <a href="#weddings" className="svc-item">
            <div className="svc-num">03</div>
            <h3>Wedding Videography</h3>
            <div className="svc-rule"></div>
            <p>Cinematic films that capture the energy, the laughter, and the chaos of the best day of your life.</p>
            <span className="svc-link">Explore →</span>
          </a>
          <a href="#about" className="svc-item">
            <div className="svc-num">04</div>
            <h3>Brand + Commercial</h3>
            <div className="svc-rule"></div>
            <p>Your brand has a story. We'll help you tell it with editorial-quality visuals that actually convert.</p>
            <span className="svc-link">Explore →</span>
          </a>
        </div>
      </section>

      {/* SENIOR PREVIEW */}
      <div className="split">
        <div className="split-photo">
          <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/2fe4a0bd-d543-4fcf-a72f-548edb06df86/untitled-1.JPG" alt="Senior session" />
        </div>
        <div className="split-text cream reveal">
          <span className="eyebrow ed">Seniors</span>
          <h2>Not your mom's senior photos.</h2>
          <span className="gold-bar" style={{ margin: '4px 0 24px' }}></span>
          <p>Fully styled editorial sessions, creative direction, and images that actually capture your personality — not just your outfit. This is the session your friends are going to ask about.</p>
          <div className="split-btns">
            <Link href="/seniors" className="btn btn-ol-dark">The Senior Experience</Link>
          </div>
        </div>
      </div>

      {/* WEDDING PREVIEW */}
      <div id="weddings" className="split">
        <div className="split-text dark reveal">
          <span className="eyebrow eg">Weddings</span>
          <h2>Your wedding deserves an <em>artist</em>, not just a vendor.</h2>
          <span className="gold-bar" style={{ margin: '4px 0 24px' }}></span>
          <p>A decade of weddings. Every single one has reminded us why we do this. Your day is chaotic, emotional, and beautiful — and we know exactly how to capture all of it without making you pose for 45 minutes during cocktail hour.</p>
          <div className="split-btns">
            <a href="#work" className="btn btn-ol">Photography</a>
            <a href="#" className="btn btn-ol" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>Films &amp; Inquiry</a>
          </div>
        </div>
        <div className="split-photo">
          <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="Wedding photography" />
        </div>
      </div>

      {/* PHOTO RIVER */}
      <div id="work" className="photo-river">
        <div className="river-header reveal">
          <h2>Selected <em>Work</em></h2>
          <p style={{ color: 'rgba(241,239,238,0.4)', fontFamily: "'Josefin Sans', sans-serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '6px' }}>Click any photo to expand</p>
        </div>
        <div className="river-track">
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/93307ba2-7ade-4dfe-bccd-6122e60c6fc8/42.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/93307ba2-7ade-4dfe-bccd-6122e60c6fc8/42.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c3f200fc-4ea4-421a-8099-19661a0899fb/untitled-274-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c3f200fc-4ea4-421a-8099-19661a0899fb/untitled-274-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/18ec6f0e-562a-4d19-b022-fc0c0311cece/untitled-372-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/18ec6f0e-562a-4d19-b022-fc0c0311cece/untitled-372-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/d85b391b-3f69-41a2-9267-be21ab4c2e96/senior-1.jpg")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/d85b391b-3f69-41a2-9267-be21ab4c2e96/senior-1.jpg" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ccc269e-ecdc-4cad-b263-1afde14cd1b9/untitled-121-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ccc269e-ecdc-4cad-b263-1afde14cd1b9/untitled-121-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/1511f3da-17dd-41d3-8d2c-dfd91ee84987/senior-2.jpg")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/1511f3da-17dd-41d3-8d2c-dfd91ee84987/senior-2.jpg" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/a4f35431-328e-4d71-b0cf-748416ac12ba/untitled-36-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/a4f35431-328e-4d71-b0cf-748416ac12ba/untitled-36-RT.JPG" alt="" /></div>
          {/* duplicate for seamless loop */}
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/93307ba2-7ade-4dfe-bccd-6122e60c6fc8/42.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/93307ba2-7ade-4dfe-bccd-6122e60c6fc8/42.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c3f200fc-4ea4-421a-8099-19661a0899fb/untitled-274-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c3f200fc-4ea4-421a-8099-19661a0899fb/untitled-274-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/18ec6f0e-562a-4d19-b022-fc0c0311cece/untitled-372-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/18ec6f0e-562a-4d19-b022-fc0c0311cece/untitled-372-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/d85b391b-3f69-41a2-9267-be21ab4c2e96/senior-1.jpg")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/d85b391b-3f69-41a2-9267-be21ab4c2e96/senior-1.jpg" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ccc269e-ecdc-4cad-b263-1afde14cd1b9/untitled-121-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ccc269e-ecdc-4cad-b263-1afde14cd1b9/untitled-121-RT.JPG" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/1511f3da-17dd-41d3-8d2c-dfd91ee84987/senior-2.jpg")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/1511f3da-17dd-41d3-8d2c-dfd91ee84987/senior-2.jpg" alt="" /></div>
          <div className="river-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxImage("https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/a4f35431-328e-4d71-b0cf-748416ac12ba/untitled-36-RT.JPG")}><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/a4f35431-328e-4d71-b0cf-748416ac12ba/untitled-36-RT.JPG" alt="" /></div>
        </div>
      </div>

      {/* TESTIMONIAL */}
      <section className="testimonial">
        <div className="test-ring" style={{ width: '520px', height: '520px' }}></div>
        <div className="test-ring" style={{ width: '320px', height: '320px' }}></div>
        <div className="test-inner reveal">
          <span className="test-quote-mark">"</span>
          <blockquote className="test-quote">
            We didn't just get photos — we got art. Working with Haus of Lyra felt like working with a friend who also happens to be ridiculously talented.
          </blockquote>
          <span className="gold-bar-c" style={{ marginBottom: '20px' }}></span>
          <cite className="test-cite">— Wedding Client, Des Moines</cite>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="cta-bg">
          <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c512a4bb-4b6f-4120-a2f2-a45e8a089f36/ADA-418.JPG" alt="" />
        </div>
        <div className="cta-content reveal">
          <span className="eyebrow eg">Ready?</span>
          <h2>Let's make something <em>you'll never forget.</em></h2>
          <p>We take on a limited number of clients each year because doing fewer things exceptionally well is always better than doing everything adequately. If this feels like a fit — reach out.</p>
          <div className="cta-btns">
            <button className="btn btn-gold" onClick={() => setIsModalOpen(true)}>Start Your Inquiry</button>
            <a href="#about" className="btn btn-ol">Our Story</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-brand">Haus of <span>Lyra</span></div>
            <div className="footer-tag">Des Moines, Iowa</div>
          </div>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><Link href="/seniors">Seniors</Link></li>
            <li><a href="#weddings">Weddings</a></li>
            <li><a href="#services">Brand</a></li>
            <li><a href="mailto:hello@thehausoflyra.com">Email</a></li>
            <li><a href="https://instagram.com/thehausoflyra" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <p className="footer-copy">&copy; 2026 Haus of Lyra Creative Studios. All rights reserved.</p>
      </footer>

      {/* CONTACT MODAL WITH HONEYBOOK */}
      <div id="contactModal" className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={(e) => { if(e.target === e.currentTarget) setIsModalOpen(false); }}>
        <div className="modal-box">
          <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close">&times;</button>
          <span className="eyebrow em" style={{ marginBottom: '12px' }}>Inquiry</span>
          <h3>Let's start the conversation.</h3>
          <p>Tell us what you're looking for and we'll be back to you within 48 hours.</p>
          <div className="hb-p-69362501a7b735000728c367-2" style={{ marginTop: '24px' }}></div>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.honeybook.com/p.png?pid=69362501a7b735000728c367" alt="" />
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX FOR PHOTO RIVER */}
      {lightboxImage && (
        <div 
          className="modal-overlay open" 
          onClick={() => setLightboxImage(null)} 
          style={{ zIndex: 600, background: 'rgba(10,9,8,0.96)' }}
        >
          <div style={{ position: 'relative', width: '90vw', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button 
              className="modal-close" 
              onClick={() => setLightboxImage(null)} 
              style={{ top: '0px', right: '0px', color: '#FAF8F5' }}
              aria-label="Close"
            >
              &times;
            </button>
            <img 
              src={lightboxImage} 
              alt="Selected work from Haus of Lyra" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
                border: '1px solid rgba(var(--gold-rgb),0.2)' 
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

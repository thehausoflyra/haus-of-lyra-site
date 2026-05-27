'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const FAQ_ITEMS = [
  { q: 'How far in advance should I book?', a: 'Most people are scheduling April through August. Availability books up early — peak season is in demand for both senior sessions and weddings. If you\'re eyeing a fall session, booking in spring is strongly recommended.' },
  { q: 'What if I\'m awkward in front of a camera?', a: 'Almost everyone says this. That\'s why we ease into it — no pressure from the jump. I coach you through every shot. By the end you\'ll forget the camera is there. That\'s the goal.' },
  { q: 'How many outfits can I bring?', a: 'As many as you want. Most seniors bring 2–4 looks. More variety means a better gallery. Outfit changes are built into the session — it\'s expected, not an add-on.' },
  { q: 'How do we pick locations?', a: 'Together. We\'ll talk through your vibe — urban, natural, industrial, moody, bright — and I\'ll bring location ideas. I have connections around Des Moines that open up spots most people don\'t have access to.' },
  { q: 'How long until I get my photos?', a: 'Sneak peek within 72 hours — shareable straight to social. Full gallery in 4 weeks. Every image is individually edited. Rush delivery available if you need it sooner.' },
  { q: 'Can I bring friends or family?', a: 'Absolutely. A couple of people for energy and moral support is welcome. Just keep it small — too big a crew shifts the vibe. One or two people is the sweet spot.' },
  { q: 'Do you offer prints?', a: 'Yes — prints available directly through the website. No package requires a purchase. Always optional, never a hard sell.' }
];

export default function Seniors() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Setup Scroll Reveal animations & Keyboard events
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
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Parallax Hero effect
  useEffect(() => {
    const heroBg = heroBgRef.current;
    if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = heroBg.closest('.hero') as HTMLElement;
    if (!hero) return;

    const handleScroll = () => {
      const heroH = hero.offsetHeight;
      if (window.scrollY < heroH * 1.5) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Drag Scroll for Process cards
  useEffect(() => {
    const ps = scrollRef.current;
    if (!ps) return;
    let down = false;
    let startX: number;
    let left: number;

    const handleMouseDown = (e: MouseEvent) => {
      down = true;
      setIsGrabbing(true);
      startX = e.pageX - ps.offsetLeft;
      left = ps.scrollLeft;
    };

    const handleMouseLeaveUp = () => {
      down = false;
      setIsGrabbing(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!down) return;
      e.preventDefault();
      const x = e.pageX - ps.offsetLeft;
      const walk = (x - startX) * 1.6;
      ps.scrollLeft = left - walk;
    };

    ps.addEventListener('mousedown', handleMouseDown);
    ps.addEventListener('mouseleave', handleMouseLeaveUp);
    ps.addEventListener('mouseup', handleMouseLeaveUp);
    ps.addEventListener('mousemove', handleMouseMove);

    return () => {
      ps.removeEventListener('mousedown', handleMouseDown);
      ps.removeEventListener('mouseleave', handleMouseLeaveUp);
      ps.removeEventListener('mouseup', handleMouseLeaveUp);
      ps.removeEventListener('mousemove', handleMouseMove);
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

  // Modal body scroll lock
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <div className="seniors-page-wrapper">
      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-logo">Haus of <span>Lyra</span></Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><a href="/about">About</a></li>
          <li><Link href="/seniors" className="active">Seniors</Link></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>Book Now</a></li>
        </ul>
        <button className="btn btn-gold nav-cta" onClick={() => setIsModalOpen(true)}>Book Now</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" ref={heroBgRef}>
          <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/bb4033b1-6acf-4b6e-8d17-4fd089492473/ADA-270.JPG" alt="Senior portrait session by Haus of Lyra" />
        </div>
        <div className="hero-content">
          <span className="hero-eyebrow">Senior Sessions &mdash; Des Moines, Iowa</span>
          <h1 className="hero-h1">
            <span className="line"><span>Your photos</span></span>
            <span className="line"><span>should be as</span></span>
            <span className="line"><span className="accent">interesting</span></span>
            <span className="line"><span>as you are.</span></span>
          </h1>
          <p className="hero-p">This isn't 15 minutes at a park with a reflector. This is a fully directed editorial experience built around who you actually are. The kind of photos your friends will ask about.</p>
          <div className="hero-btns">
            <button className="btn btn-gold" onClick={() => setIsModalOpen(true)}>Book Your Session</button>
            <a href="#process" className="btn btn-ol">How It Works</a>
          </div>
        </div>
        <div className="scroll-ind">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-track">
          <span className="t-item">Senior Sessions</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Des Moines Iowa</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Fully Directed</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Editorial Experience</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Class of 2026</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Haus of Lyra</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Book Your Session</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Senior Sessions</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Des Moines Iowa</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Fully Directed</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Editorial Experience</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Class of 2026</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Haus of Lyra</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Book Your Session</span><span className="t-dot">&#9679;</span>
        </div>
      </div>

      {/* INTRO */}
      <section className="intro">
        <div className="intro-inner">
          <div className="intro-text reveal">
            <div className="intro-label">Why Haus of Lyra</div>
            <h2 className="intro-h2">Not a volume studio. <em>Not a template session.</em></h2>
            <p className="intro-p">Most senior photographers run 5 sessions a weekend. They've got a spot, a pose, and a preset. You show up, you smile, you leave. The photos look fine. You forget about them in a week.</p>
            <p className="intro-p">That's not what we do. <strong>We take the time to get to know you</strong> — what makes you feel like yourself, what you're actually into, where you actually want to be. The session gets built around that.</p>
            <p className="intro-p">We're selective because that's the only way to deliver something that actually means something. If you want something people are going to ask about — this is the place.</p>
            <button className="btn btn-dark" onClick={() => setIsModalOpen(true)} style={{ marginTop: '28px' }}>Let's Talk</button>
          </div>
          <div className="intro-photos reveal d2">
            <div className="pz p1">
              <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/2fe4a0bd-d543-4fcf-a72f-548edb06df86/untitled-1.JPG" alt="Senior portrait" />
            </div>
            <div className="pz p2">
              <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/2f6268ae-ccaa-4771-8a57-5718876b39b9/ADA-222.JPG" alt="Senior portrait" />
            </div>
            <div className="pz p3">
              <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/ecf8b50b-e731-4a8c-ba7c-0a72d4bff85a/ADA-34.jpg" alt="Senior portrait" />
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO RIVER */}
      <div className="photo-river">
        <div className="river-header reveal">
          <h2>A few sessions worth <em>talking about.</em></h2>
        </div>
        <div className="river-track">
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/1511f3da-17dd-41d3-8d2c-dfd91ee84987/senior-2.jpg" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/93307ba2-7ade-4dfe-bccd-6122e60c6fc8/42.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/18ec6f0e-562a-4d19-b022-fc0c0311cece/untitled-372-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ccc269e-ecdc-4cad-b263-1afde14cd1b9/untitled-121-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/a4f35431-328e-4d71-b0cf-748416ac12ba/untitled-36-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/4e73af64-4d0d-431f-87cf-f3a12206b55a/untitled-21.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/d85b391b-3f69-41a2-9267-be21ab4c2e96/senior-1.jpg" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c3f200fc-4ea4-421a-8099-19661a0899fb/untitled-274-RT.JPG" alt="" /></div>
          {/* duplicate for seamless loop */}
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/1511f3da-17dd-41d3-8d2c-dfd91ee84987/senior-2.jpg" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/93307ba2-7ade-4dfe-bccd-6122e60c6fc8/42.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/18ec6f0e-562a-4d19-b022-fc0c0311cece/untitled-372-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ccc269e-ecdc-4cad-b263-1afde14cd1b9/untitled-121-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/a4f35431-328e-4d71-b0cf-748416ac12ba/untitled-36-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/4e73af64-4d0d-431f-87cf-f3a12206b55a/untitled-21.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/d85b391b-3f69-41a2-9267-be21ab4c2e96/senior-1.jpg" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c3f200fc-4ea4-421a-8099-19661a0899fb/untitled-274-RT.JPG" alt="" /></div>
        </div>
      </div>

      {/* CALLOUT */}
      <section className="callout">
        <div className="callout-inner">
          <div className="callout-photo pz reveal">
            <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c512a4bb-4b6f-4120-a2f2-a45e8a089f36/ADA-418.JPG" alt="Senior portrait session" />
          </div>
          <div className="callout-text reveal d2">
            <span className="eyebrow eg" style={{ marginBottom: '18px' }}>The Real Experience</span>
            <h2>We ease into it. <em>No pressure the second you walk in.</em></h2>
            <p>A lot of seniors are nervous. That's completely normal — most people aren't used to being in front of a camera.</p>
            <p><strong>So we don't start that way.</strong> We grab coffee. We talk. We let the session build naturally until you stop thinking about the camera and start actually being yourself. That's when the real photos happen.</p>
            <p>I use prompts and coaching instead of rigid posing. You'll look like you're actually living — not like you're trying to pose for a photo.</p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="process">
        <div className="process-header reveal">
          <span className="eyebrow em">The Experience</span>
          <h2>Here's exactly how it works.</h2>
          <p className="drag-hint">Swipe to explore &rarr;</p>
        </div>
        <div className={`proc-scroll ${isGrabbing ? 'grabbing' : ''}`} id="procScroll" ref={scrollRef}>
          <div className="proc-track">
            <div className="proc-card">
              <div className="proc-card-img pz">
                <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/d07d40a3-753c-4d9f-b910-89208bf0bfa5/untitled-15+2.JPG" alt="" />
              </div>
              <div className="proc-card-body">
                <div className="step-num">01</div>
                <h3>The Consultation</h3>
                <p>A real conversation — not an intake form. I want to know your vibe, your interests, what makes you feel like yourself. That's how we build a session around you.</p>
              </div>
            </div>
            <div className="proc-card">
              <div className="proc-card-img pz">
                <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/154d0a4e-998d-48ba-a6de-b18a62a71c5d/ADA-312-Edit.JPG" alt="" />
              </div>
              <div className="proc-card-body">
                <div className="step-num">02</div>
                <h3>Styling + Planning</h3>
                <p>We build your looks together, plan locations (I have local connections), and set the mood. You don't figure this out solo — that's literally my job.</p>
              </div>
            </div>
            <div className="proc-card">
              <div className="proc-card-img pz">
                <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c504dfa0-4803-4fdc-8f5b-76052eb6e107/untitled-27.JPG" alt="" />
              </div>
              <div className="proc-card-body">
                <div className="step-num">03</div>
                <h3>The Session</h3>
                <p>Show up, be yourself, trust the process. No rigid timelines, no outfit limits. I direct everything. We go until we've got something great.</p>
              </div>
            </div>
            <div className="proc-card">
              <div className="proc-card-img pz">
                <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/67e9f4f6-5dce-4438-aec7-04bd3825c34d/ADA-246.JPG" alt="" />
              </div>
              <div className="proc-card-body">
                <div className="step-num">04</div>
                <h3>The Gallery</h3>
                <p>Sneak peek within 72 hours — shareable straight to social. Full gallery in 4 weeks. Download everything, order prints, share freely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="pull-quote">
        <div className="pq-inner reveal">
          <span className="eyebrow eg">Kind Words</span>
          <div className="pq-bar"></div>
          <blockquote className="pq-quote">"I went in nervous and came out <strong>genuinely shocked</strong> at how good the photos were. It didn't feel like a photoshoot — it felt like hanging out with someone who just happened to be really good at capturing moments."</blockquote>
          <div className="pq-bar"></div>
          <cite className="pq-cite">— Senior Client, Class of 2025</cite>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="included">
        <div className="included-inner">
          <div className="included-header reveal">
            <span className="eyebrow eg">What's Included</span>
            <h2>The things that actually set this apart.</h2>
          </div>
          <div className="inc-grid">
            <div className="inc-item reveal d1"><span className="inc-icon">✦</span><h3>Flexible Session Time</h3><p>No hard stop. We keep going until we've got something great. No clock pressure, no rushing through looks.</p></div>
            <div className="inc-item reveal d2"><span className="inc-icon">◈</span><h3>Outfit Guidance</h3><p>After years in fashion and styling, I know what photographs well — and what will still look great in 20 years.</p></div>
            <div className="inc-item reveal d3"><span className="inc-icon">⊕</span><h3>Creative Location Planning</h3><p>I know Des Moines. I have connections. We'll find spots that actually fit your personality, not just what's convenient.</p></div>
            <div className="inc-item reveal d4"><span className="inc-icon">▶</span><h3>Video Reel Option</h3><p>Mid and Top packages include a short video reel. Content that moves is content that gets shared.</p></div>
            <div className="inc-item reveal d5"><span className="inc-icon">✧</span><h3>Hair &amp; Makeup Available</h3><p>I work with a vetted local H&amp;M artist. Included in Top, add-on for Base and Mid. No outside vendors needed.</p></div>
            <div className="inc-item reveal d6"><span className="inc-icon">◎</span><h3>Referral Credit</h3><p>Refer a friend who books? You get a $100 print credit. Simple.</p></div>
          </div>
        </div>
      </section>

      {/* SECOND STRIP (reverse) */}
      <div className="strip2" aria-hidden="true">
        <div className="strip2-track">
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/fed07b35-d762-49dc-a3aa-09bd8345290e/ADA-86+2.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/8c8358b4-5d62-443e-b06b-4b24ba0a10d1/untitled-2.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ad9f943-b53c-45e6-ba63-30e707d74c07/ADA-199+2.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/9348465d-d4b6-41be-a150-519ba416675e/untitled-42-RT.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/42893845-854c-4505-a794-823aea0ecc7f/untitled-230-RT.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/22e3c764-02bd-412d-a61c-9f64656f120b/Untitled+design+-+66.JPG" alt="" /></div>
          {/* duplicate */}
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/fed07b35-d762-49dc-a3aa-09bd8345290e/ADA-86+2.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/8c8358b4-5d62-443e-b06b-4b24ba0a10d1/untitled-2.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ad9f943-b53c-45e6-ba63-30e707d74c07/ADA-199+2.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/9348465d-d4b6-41be-a150-519ba416675e/untitled-42-RT.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/42893845-854c-4505-a794-823aea0ecc7f/untitled-230-RT.JPG" alt="" /></div>
          <div className="strip2-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/22e3c764-02bd-412d-a61c-9f64656f120b/Untitled+design+-+66.JPG" alt="" /></div>
        </div>
      </div>

      {/* PRICING */}
      <section className="pricing">
        <div className="pricing-hdr reveal">
          <span className="eyebrow ed">Investment</span>
          <h2>Transparent pricing. No surprises.</h2>
          <p className="pricing-sub">No "inquire for pricing" games. Here's exactly what you get.</p>
        </div>
        <div className="p-cards">
          <div className="p-card reveal d1">
            <div className="p-img pz"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/0d7d2374-4665-4166-9631-462ac88dde5a/untitled-480.JPG" alt="" /></div>
            <div className="p-body">
              <p className="p-tier">The Session</p>
              <h3 className="p-name">Base</h3>
              <div className="p-price"><sup>$</sup>600</div>
              <ul className="p-list">
                <li>1.5 hours of coverage</li><li>1 location</li><li>50+ edited images</li>
                <li>Private online gallery</li><li>Personal print release</li>
                <li>HoneyBook client portal</li><li>H&amp;M add-on (+$250)</li>
              </ul>
              <p className="p-delivery">Delivery: 4 weeks</p>
              <button className="btn btn-dark btn-full" onClick={() => setIsModalOpen(true)}>Book This Package</button>
            </div>
          </div>
          <div className="p-card feat reveal d2">
            <div className="p-img pz"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c37f5222-1c54-40c7-a3f2-9c69e3e3963b/untitled-302-RT.JPG" alt="" /></div>
            <div className="p-body">
              <span className="p-badge">Most Popular</span>
              <p className="p-tier">The Experience</p>
              <h3 className="p-name">Mid</h3>
              <div className="p-price"><sup>$</sup>1,000</div>
              <ul className="p-list">
                <li className="hi">2.5 hours of coverage</li><li className="hi">2 locations</li>
                <li className="hi">100+ edited images</li><li>Private online gallery</li>
                <li>Personal print release</li><li>HoneyBook client portal</li>
                <li className="hi">Short video reel included</li>
                <li>H&amp;M add-on (+$250)</li><li>Multi-season add-on (+$400)</li>
              </ul>
              <p className="p-delivery">Delivery: 4 weeks</p>
              <button className="btn btn-gold btn-full" onClick={() => setIsModalOpen(true)}>Book This Package</button>
            </div>
          </div>
          <div className="p-card reveal d3">
            <div className="p-img pz"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/19d9289b-a5d2-4489-b216-058d2adf7dc4/untitled-361-Edit-RT.JPG" alt="" /></div>
            <div className="p-body">
              <p className="p-tier">The Editorial</p>
              <h3 className="p-name">Top</h3>
              <div className="p-price"><sup>$</sup>1,800</div>
              <ul className="p-list">
                <li>4 hours of coverage</li><li>Up to 3 locations</li>
                <li>150+ edited images</li><li>Private online gallery</li>
                <li>Personal print release</li><li>HoneyBook client portal</li>
                <li className="hi">Video reel included</li><li className="hi">Hair &amp; makeup included</li>
                <li>Multi-season add-on (+$400)</li>
              </ul>
              <p className="p-delivery">Delivery: 4 weeks</p>
              <button className="btn btn-dark btn-full" onClick={() => setIsModalOpen(true)}>Book This Package</button>
            </div>
          </div>
        </div>
        <div className="addons-bar reveal">
          <p>
            <strong>Add-Ons</strong>
            Hair &amp; makeup +$250 &nbsp;&bull;&nbsp; Multi-season return session +$400 &nbsp;&bull;&nbsp; Rush delivery (2 weeks) +$150 &nbsp;&bull;&nbsp; Extended gallery time +$100. All confirmed before your session.
          </p>
          <button className="btn btn-ol" style={{ borderColor: 'rgba(var(--gold-rgb),0.4)', color: 'var(--gold)', flexShrink: 0 }} onClick={() => setIsModalOpen(true)}>Ask About Add-Ons</button>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="faq-inner">
          <div className="faq-hdr reveal">
            <span className="eyebrow eg">Questions</span>
            <h2>The things everyone actually asks.</h2>
          </div>
          {FAQ_ITEMS.map((item, idx) => (
            <div className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`} key={idx}>
              <button className="faq-btn" onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}>
                <span className="faq-q">{item.q}</span>
                <span className="faq-icon">{openFaqIndex === idx ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <div className="faq-ans">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="cta-bg">
          <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" />
        </div>
        <div className="cta-content reveal">
          <span className="eyebrow eg">Ready?</span>
          <h2>Let's make something <em>worth posting.</em></h2>
          <p>We take a limited number of seniors each season. If this feels like your thing, reach out early and let's see if we're a good fit.</p>
          <div className="cta-btns">
            <button className="btn btn-gold" onClick={() => setIsModalOpen(true)}>Book Your Senior Session</button>
            <Link href="/" className="btn btn-ol">See More Work</Link>
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
            <li><a href="/about">About</a></li>
            <li><Link href="/seniors">Seniors</Link></li>
            <li><a href="mailto:hello@thehausoflyra.com">Email</a></li>
            <li><a href="https://instagram.com/thehausoflyra" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <p className="footer-copy">&copy; 2026 Haus of Lyra Creative Studios. All rights reserved.</p>
      </footer>

      {/* MOBILE STICKY CTA */}
      <button className="sticky-cta" onClick={() => setIsModalOpen(true)}>Book Your Senior Session &rarr;</button>

      {/* MODAL */}
      <div id="contactModal" className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={(e) => { if(e.target === e.currentTarget) setIsModalOpen(false); }}>
        <div className="modal-box">
          <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close">&times;</button>
          <span className="eyebrow em" style={{ marginBottom: '12px' }}>Senior Session Inquiry</span>
          <h3>Let's start the conversation.</h3>
          <p>Fill this out and I'll be back to you within 48 hours.</p>
          <div className="hb-p-69362501a7b735000728c367-2" style={{ marginTop: '24px' }}></div>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.honeybook.com/p.png?pid=69362501a7b735000728c367" alt="" />
        </div>
      </div>
    </div>
  );
}

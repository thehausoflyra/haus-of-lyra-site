'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const FAQ_ITEMS = [
  { q: 'Do you offer both photography and videography?', a: 'Yes. We designed Haus of Lyra to offer both as a cohesive experience. Hiring our combined team ensures a single, unified visual style, synchronized timelines, and a collaborative crew that works together seamlessly rather than competing for shots.' },
  { q: 'How far in advance should we book?', a: 'Most couples book 8 to 14 months in advance. Peak wedding months (May, June, September, and October) book out very quickly. Since we only shoot a limited number of weddings per year to maintain high artistic quality, we recommend reaching out as soon as you have your date.' },
  { q: 'Do you travel for weddings?', a: 'Absolutely. While we are based in Des Moines, Iowa, we travel nationwide and internationally. Travel packages are custom-quoted based on location, coverage time, and accommodation requirements.' },
  { q: 'What is your turnaround time for photos and films?', a: 'A sneak peek of 20-30 images is delivered within 72 hours of your wedding day. The full digital gallery of images is delivered within 6 weeks, and your cinematic highlight film is delivered within 8 weeks.' },
  { q: 'Do we get print rights to our photos?', a: 'Yes. Every photography package includes a private online gallery with full-resolution digital downloads and a personal print release. You can print them anywhere you like, or order heirloom prints directly through our professional lab integration in your gallery.' },
  { q: 'Do you offer custom packages?', a: 'Yes. While our three core packages cover what 90% of our couples need, we can custom-tailor any package for multi-day celebrations, destination elopements, or intimate backyard weddings.' }
];

export default function Weddings() {
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
    <div className="weddings-page-wrapper">
      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-logo">Haus of <span>Lyra</span></Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/seniors">Seniors</Link></li>
          <li><Link href="/weddings" className="active">Weddings</Link></li>
          <li><Link href="/brand">Brand</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <button className="btn btn-gold nav-cta" onClick={() => setIsModalOpen(true)}>Start Your Inquiry</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" ref={heroBgRef}>
          <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="Wedding photography session by Haus of Lyra" />
        </div>
        <div className="hero-content">
          <span className="hero-eyebrow">Wedding Photo &amp; Film &mdash; Des Moines, Iowa</span>
          <h1 className="hero-h1">
            <span className="line"><span>Your day isn&apos;t</span></span>
            <span className="line"><span>a production.</span></span>
            <span className="line"><span>It&apos;s a <span className="accent">story</span>.</span></span>
          </h1>
          <p className="hero-p">Editorial-quality photography and cinematic wedding films for couples who want their day documented with intention, artistry, and an honest documentary heart.</p>
          <div className="hero-btns">
            <Link href="/weddings/photography" className="btn btn-gold">Wedding Photography</Link>
            <Link href="/weddings/film" className="btn btn-ol">Wedding Videography</Link>
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
          <span className="t-item">Wedding Photography</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Cinematic Wedding Films</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Des Moines Iowa</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Documentary Artistry</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Nationwide + Travel</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Haus of Lyra</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Book Your Date</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Wedding Photography</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Cinematic Wedding Films</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Des Moines Iowa</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Documentary Artistry</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Nationwide + Travel</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Haus of Lyra</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Book Your Date</span><span className="t-dot">&#9679;</span>
        </div>
      </div>

      {/* INTRO */}
      <section className="intro">
        <div className="intro-inner">
          <div className="intro-text reveal">
            <div className="intro-label">Our Philosophy</div>
            <h2 className="intro-h2">An editorial eye. <em>A documentary heart.</em></h2>
            <p className="intro-p">Your wedding day shouldn&apos;t feel like a 10-hour photoshoot. You shouldn&apos;t be posing on a hill missing your cocktail hour, or following a rigid script that someone else wrote.</p>
            <p className="intro-p">We approach your day as observers first. <strong>We document the quiet, unprompted moments</strong>—the ones you don&apos;t even know are happening. When it is time for portraits, we direct you with ease and style, creating imagery that looks like a high-fashion editorial, not a template postcard.</p>
            <p className="intro-p">By bringing both photography and videography under one visual lead, we ensure a unified brand style. No competing crew. No clashing timelines. Just one cohesive visual heritage.</p>
            <button className="btn btn-dark" onClick={() => setIsModalOpen(true)} style={{ marginTop: '28px' }}>Start the Conversation</button>
          </div>
          <div className="intro-photos reveal d2">
            <div className="pz p1">
              <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="Wedding couple portrait" />
            </div>
            <div className="pz p2">
              <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="Wedding details" />
            </div>
            <div className="pz p3">
              <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG" alt="Wedding reception dance" />
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO RIVER */}
      <div className="photo-river">
        <div className="river-header reveal">
          <h2>Selected Wedding <em>Visuals</em></h2>
        </div>
        <div className="river-track">
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/22e3c764-02bd-412d-a61c-9f64656f120b/Untitled+design+-+66.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG" alt="" /></div>
          {/* duplicate for seamless loop */}
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/22e3c764-02bd-412d-a61c-9f64656f120b/Untitled+design+-+66.JPG" alt="" /></div>
          <div className="river-item"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="" /></div>
        </div>
      </div>

      {/* PROCESS */}
      <section className="process" id="process">
        <div className="process-header reveal">
          <span className="eyebrow em">The Journey</span>
          <h2>Our Unified Process</h2>
          <p className="drag-hint">Swipe to explore &rarr;</p>
        </div>
        <div className={`proc-scroll ${isGrabbing ? 'grabbing' : ''}`} id="procScroll" ref={scrollRef}>
          <div className="proc-track">
            <div className="proc-card">
              <div className="proc-card-img pz">
                <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" />
              </div>
              <div className="proc-card-body">
                <div className="step-num">01</div>
                <h3>Visual Design</h3>
                <p>We connect over your vision, discuss aesthetic direction, and coordinate timelines. We align on how you want your day to feel visual-wise.</p>
              </div>
            </div>
            <div className="proc-card">
              <div className="proc-card-img pz">
                <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="" />
              </div>
              <div className="proc-card-body">
                <div className="step-num">02</div>
                <h3>Timeline Design</h3>
                <p>We work with your planner to build a seamless timeline that prioritizes your experience. No rushing between events; we build breathing room.</p>
              </div>
            </div>
            <div className="proc-card">
              <div className="proc-card-img pz">
                <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" />
              </div>
              <div className="proc-card-body">
                <div className="step-num">03</div>
                <h3>The Wedding Day</h3>
                <p>We document your day unobtrusively, capturing raw candidate moments alongside styled editorial portraits. High-end visuals, zero stress.</p>
              </div>
            </div>
            <div className="proc-card">
              <div className="proc-card-img pz">
                <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/22e3c764-02bd-412d-a61c-9f64656f120b/Untitled+design+-+66.JPG" alt="" />
              </div>
              <div className="proc-card-body">
                <div className="step-num">04</div>
                <h3>The Deliverables</h3>
                <p>Receive your digital photo archives, cinematic highlight films, and bespoke print layout releases. Art that lasts a lifetime.</p>
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
          <blockquote className="pq-quote">&ldquo;They were invisible when they needed to be, and felt like part of the family when we were celebrating. The photos and highlight film felt like <strong>a cinematic masterpiece</strong>.&rdquo;</blockquote>
          <div className="pq-bar"></div>
          <cite className="pq-cite">— Wedding Client, Des Moines</cite>
        </div>
      </section>

      {/* INVESTMENT (PRICING) */}
      <section className="pricing" id="pricing">
        <div className="pricing-hdr reveal">
          <span className="eyebrow ed">Investment</span>
          <h2>Bespoke Wedding Collections</h2>
          <p className="pricing-sub">Straightforward luxury options. Custom travel packages available.</p>
        </div>
        <div className="p-cards">
          <div className="p-card reveal d1">
            <div className="p-img pz"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" /></div>
            <div className="p-body">
              <p className="p-tier">The Archive</p>
              <h3 className="p-name">Photography Only</h3>
              <div className="p-price"><sup>$</sup>4,200</div>
              <ul className="p-list">
                <li>8 Hours of Coverage</li><li>Single Primary Photographer</li>
                <li>500+ Professionally Edited Images</li><li>Private Online Gallery</li>
                <li>Personal Print Release</li><li>Timeline Assistance &amp; Planning</li>
              </ul>
              <p className="p-delivery">Delivery: 6 weeks</p>
              <button className="btn btn-dark btn-full" onClick={() => setIsModalOpen(true)}>Book Photography Collection</button>
            </div>
          </div>
          <div className="p-card feat reveal d2">
            <div className="p-img pz"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="" /></div>
            <div className="p-body">
              <span className="p-badge">Most Popular</span>
              <p className="p-tier">The Complete Story</p>
              <h3 className="p-name">Photo &amp; Video Combo</h3>
              <div className="p-price"><sup>$</sup>7,800</div>
              <ul className="p-list">
                <li className="hi">9 Hours of Joint Coverage</li><li className="hi">Two Photographers &amp; Two Filmmakers</li>
                <li className="hi">600+ Edited Images in Gallery</li><li>6-8 Minute Cinematic Highlight Film</li>
                <li>Full Ceremony &amp; Speeches Document Films</li><li className="hi">Complimentary Engagement Session</li>
                <li>Drone Coverage (Weather Permitting)</li>
              </ul>
              <p className="p-delivery">Delivery: 8 weeks</p>
              <button className="btn btn-gold btn-full" onClick={() => setIsModalOpen(true)}>Book Combined Experience</button>
            </div>
          </div>
          <div className="p-card reveal d3">
            <div className="p-img pz"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" /></div>
            <div className="p-body">
              <p className="p-tier">The Film</p>
              <h3 className="p-name">Videography Only</h3>
              <div className="p-price"><sup>$</sup>4,500</div>
              <ul className="p-list">
                <li>8 Hours of Coverage</li><li>Single Primary Filmmaker</li>
                <li>5-7 Minute Cinematic Highlight Film</li><li>Full Ceremony &amp; Speeches document films</li>
                <li>Drone Coverage (Weather Permitting)</li><li>Raw footage delivery option</li>
              </ul>
              <p className="p-delivery">Delivery: 8 weeks</p>
              <button className="btn btn-dark btn-full" onClick={() => setIsModalOpen(true)}>Book Videography Collection</button>
            </div>
          </div>
        </div>
        <div className="addons-bar reveal">
          <p>
            <strong>Enhancements</strong>
            Engagement Session +$500 &nbsp;&bull;&nbsp; Additional Hour +$400/hr &nbsp;&bull;&nbsp; Custom Fine Art Wedding Album +$800 &nbsp;&bull;&nbsp; Second Photographer +$600. Custom destination rates upon inquiry.
          </p>
          <button className="btn btn-ol" style={{ borderColor: 'rgba(var(--gold-rgb),0.4)', color: 'var(--gold)', flexShrink: 0 }} onClick={() => setIsModalOpen(true)}>Ask About Add-Ons</button>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="faq-inner">
          <div className="faq-hdr reveal">
            <span className="eyebrow eg">Questions</span>
            <h2>Wedding FAQ</h2>
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
          <span className="eyebrow eg">Get in Touch</span>
          <h2>Let&apos;s document <em>your history.</em></h2>
          <p>We shoot a maximum of 12 weddings per season to guarantee that every single couple receives our complete creative focus and dedication. Check our availability for your date today.</p>
          <div className="cta-btns">
            <button className="btn btn-gold" onClick={() => setIsModalOpen(true)}>Check Your Date</button>
            <Link href="/" className="btn btn-ol">Back to Home</Link>
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
            <li><Link href="/seniors">Seniors</Link></li>
            <li><Link href="/weddings">Weddings</Link></li>
            <li><a href="mailto:hello@thehausoflyra.com">Email</a></li>
            <li><a href="https://instagram.com/thehausoflyra" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <p className="footer-copy">&copy; 2026 Haus of Lyra Creative Studios. All rights reserved.</p>
      </footer>

      {/* MOBILE STICKY CTA */}
      <button className="sticky-cta" onClick={() => setIsModalOpen(true)}>Check Availability &rarr;</button>

      {/* MODAL */}
      <div id="contactModal" className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={(e) => { if(e.target === e.currentTarget) setIsModalOpen(false); }}>
        <div className="modal-box">
          <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close">&times;</button>
          <span className="eyebrow em" style={{ marginBottom: '12px' }}>Wedding Inquiry</span>
          <h3>Let's start the conversation.</h3>
          <p>Provide a few details and we will get back to you within 48 hours.</p>
          <div className="hb-p-69362501a7b735000728c367-2" style={{ marginTop: '24px' }}></div>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.honeybook.com/p.png?pid=69362501a7b735000728c367" alt="" />
        </div>
      </div>
    </div>
  );
}

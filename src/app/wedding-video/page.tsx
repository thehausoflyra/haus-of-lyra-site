'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const FAQ_ITEMS = [
  { q: 'What is a custom original song?', a: 'For each film, we construct a custom sound design using licensed, highly cinematic, and original music tracks structured to match the visual pacing and emotional beats of your specific day. We don\'t just overlay generic radio tracks; we score the film.' },
  { q: 'Do you offer RAW footage?', a: 'No RAW footage is included in our standard collections. We deliver polished, cinematically graded and sound-designed highlight, feature, or memoir films. If you are interested in documentary archives, please ask about our custom documentary edits.' },
  { q: 'How far in advance should we book?', a: 'Most couples book 8 to 14 months in advance. Peak wedding months (May, June, September, and October) book out very quickly. Since we only shoot a limited number of weddings per year to maintain high artistic quality, we recommend reaching out as soon as you have your date.' },
  { q: 'Do you travel for weddings?', a: 'Absolutely. While we are based in Des Moines, Iowa, we travel nationwide and internationally. Travel packages are custom-quoted based on location, coverage time, and accommodation requirements.' },
  { q: 'What is your turnaround time for films?', a: 'Your cinematic highlight, feature, or memoir film is delivered within 8 weeks of your wedding day.' }
];

export default function WeddingVideo() {
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
          <li><Link href="/senior-photo">Seniors</Link></li>
          <li><Link href="/wedding-photo">Wedding Photo</Link></li>
          <li><Link href="/wedding-video" className="active">Wedding Film</Link></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>Book Now</a></li>
        </ul>
        <button className="btn btn-gold nav-cta" onClick={() => setIsModalOpen(true)}>Book Now</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" ref={heroBgRef}>
          <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/22e3c764-02bd-412d-a61c-9f64656f120b/Untitled+design+-+66.JPG" alt="Wedding film session by Haus of Lyra" />
        </div>
        <div className="hero-content">
          <span className="hero-eyebrow">Wedding Films &mdash; Des Moines, Iowa</span>
          <h1 className="hero-h1">
            <span className="line"><span>Cinematography.</span></span>
            <span className="line"><span>Documentary</span></span>
            <span className="line"><span><span className="accent">focus</span>.</span></span>
          </h1>
          <p className="hero-p">Cinema-grade wedding films built with original custom songs, close-up emotional storytelling, and full ceremony + speeches audio. We capture the true rhythm of your day.</p>
          <div className="hero-btns">
            <button className="btn btn-gold" onClick={() => setIsModalOpen(true)}>Check Your Date</button>
            <a href="#pricing" className="btn btn-ol">View Investment</a>
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
          <span className="t-item">Wedding Films</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Des Moines Iowa</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Cinematography</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Custom Sound Design</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Haus of Lyra</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Book Your Date</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Wedding Films</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Des Moines Iowa</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Cinematography</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Custom Sound Design</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Haus of Lyra</span><span className="t-dot">&#9679;</span>
          <span className="t-item">Book Your Date</span><span className="t-dot">&#9679;</span>
        </div>
      </div>

      {/* INTRO */}
      <section className="intro">
        <div className="intro-inner">
          <div className="intro-text reveal">
            <div className="intro-label">Our Philosophy</div>
            <h2 className="intro-h2">Movement. Sound. <em>Atmosphere.</em></h2>
            <p className="intro-p">Photos capture a freeze-frame, but films capture the laughter, the gasps, the movement, and the real atmosphere.</p>
            <p className="intro-p">We construct your highlight film using a custom original song, creating a visual flow that matches the emotion and tempo of your celebration. Premium, drone-assisted footage combined with close-up storytelling and full ceremony audio + speeches.</p>
            <p className="intro-p">We coordinate timelines and pacing so you get the best of both worlds without feeling crowded. Wedding film and wedding photography are always separate bookings.</p>
            <button className="btn btn-dark" onClick={() => setIsModalOpen(true)} style={{ marginTop: '28px' }}>Start the Conversation</button>
          </div>
          <div className="intro-photos reveal d2">
            <div className="pz p1">
              <img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG" alt="Wedding couple portrait" />
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
      <div id="work" className="photo-river">
        <div className="river-header reveal">
          <h2>Selected Film <em>Stills</em></h2>
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
        </div>
      </div>

      {/* INVESTMENT (PRICING) */}
      <section className="pricing" id="pricing">
        <div className="pricing-hdr reveal">
          <span className="eyebrow ed">Investment</span>
          <h2>Wedding Film Collections</h2>
          <p className="pricing-sub">Cinema-grade wedding films. All collections include custom original songs. Custom travel rates upon request.</p>
        </div>
        <div className="p-cards">
          <div className="p-card reveal d1">
            <div className="p-img pz"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG" alt="" /></div>
            <div className="p-body">
              <p className="p-tier">Collection I</p>
              <h3 className="p-name">The Story</h3>
              <div className="p-price"><sup>$</sup>2,500</div>
              <ul className="p-list">
                <li>Highlight film: 3–5 minutes</li>
                <li>1 videographer</li>
                <li>Ceremony audio included</li>
                <li>Custom original song</li>
                <li>Hi-res online delivery</li>
                <li>Personal use license</li>
                <li>Drone footage (when permitted)</li>
              </ul>
              <p className="p-delivery">Delivery: 8 weeks</p>
              <button className="btn btn-dark btn-full" onClick={() => setIsModalOpen(true)}>Book Package</button>
            </div>
          </div>
          <div className="p-card feat reveal d2">
            <div className="p-img pz"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/22e3c764-02bd-412d-a61c-9f64656f120b/Untitled+design+-+66.JPG" alt="" /></div>
            <div className="p-body">
              <span className="p-badge">Most Popular</span>
              <p className="p-tier">Collection II</p>
              <h3 className="p-name">The Chapter</h3>
              <div className="p-price"><sup>$</sup>3,200</div>
              <ul className="p-list">
                <li className="hi">Feature film: 5–8 minutes</li>
                <li className="hi">2 videographers</li>
                <li>Lead filmmaker + assistant</li>
                <li className="hi">Full ceremony audio + speeches</li>
                <li>Custom original song</li>
                <li>Hi-res online delivery</li>
                <li>Personal use license</li>
                <li className="hi">Drone footage (when permitted)</li>
              </ul>
              <p className="p-delivery">Delivery: 8 weeks</p>
              <button className="btn btn-gold btn-full" onClick={() => setIsModalOpen(true)}>Book Package</button>
            </div>
          </div>
          <div className="p-card reveal d3">
            <div className="p-img pz"><img src="https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG" alt="" /></div>
            <div className="p-body">
              <p className="p-tier">Collection III</p>
              <h3 className="p-name">The Memoir</h3>
              <div className="p-price"><sup>$</sup>5,000</div>
              <ul className="p-list">
                <li>Cinematic film: 8–12 minutes</li>
                <li>Lead filmmaker + assistant</li>
                <li>Full ceremony audio + speeches</li>
                <li>Custom original song</li>
                <li>Hi-res online delivery</li>
                <li>Personal use license</li>
                <li className="hi">Drone footage (when permitted)</li>
              </ul>
              <p className="p-delivery">Delivery: 8 weeks</p>
              <button className="btn btn-dark btn-full" onClick={() => setIsModalOpen(true)}>Book Package</button>
            </div>
          </div>
        </div>
        <div className="addons-bar reveal">
          <p>
            <strong>Note:</strong> Wedding film and wedding photography are always separate bookings. No RAW footage is included in the base packages. Custom travel rates upon request.
          </p>
          <button className="btn btn-ol" style={{ borderColor: 'rgba(var(--gold-rgb),0.4)', color: 'var(--gold)', flexShrink: 0 }} onClick={() => setIsModalOpen(true)}>Ask About Travel</button>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="faq-inner">
          <div className="faq-hdr reveal">
            <span className="eyebrow eg">Questions</span>
            <h2>Film FAQ</h2>
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
            <li><Link href="/senior-photo">Seniors</Link></li>
            <li><Link href="/wedding-photo">Wedding Photo</Link></li>
            <li><Link href="/wedding-video">Wedding Film</Link></li>
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

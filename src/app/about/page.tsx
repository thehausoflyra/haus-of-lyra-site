'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroBgRef = useRef<HTMLDivElement | null>(null);

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
    <div className="home-page-wrapper">
      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-logo">Haus of <span>Lyra</span></Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about" className="active">About</Link></li>
          <li><Link href="/senior-photo">Seniors</Link></li>
          <li><Link href="/wedding-photo">Wedding Photo</Link></li>
          <li><Link href="/wedding-video">Wedding Film</Link></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>Book Now</a></li>
        </ul>
        <button className="btn btn-gold nav-cta" onClick={() => setIsModalOpen(true)}>Book Now</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" ref={heroBgRef}>
          <img src="https://thehausoflyra.com/wp-content/uploads/2026/06/IMG_6223.jpg" alt="Dakota, founder of Haus of Lyra" />
        </div>
        <div className="hero-content">
          <span className="hero-eyebrow">Meet the Founder &mdash; Des Moines, Iowa</span>
          <h1 className="hero-h1">
            <span className="line"><span>Preserving stories.</span></span>
            <span className="line"><span>Turning moments</span></span>
            <span className="line"><span>into <span className="accent">art</span>.</span></span>
          </h1>
          <p className="hero-p">I've always believed that the best stories aren't found in movies, books, or songs. They're found in people. The real, raw, emotional, once-in-a-lifetime moments.</p>
          <div className="hero-btns">
            <button className="btn btn-gold" onClick={() => setIsModalOpen(true)}>Start Your Story</button>
            <a href="#story" className="btn btn-ol">Read My Journey</a>
          </div>
        </div>
        <div className="scroll-ind">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="intro" style={{ background: 'var(--black)', color: 'var(--cream)', padding: '100px 0' }}>
        <div className="intro-inner" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '80px', alignItems: 'start' }}>
          
          <div className="intro-text reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="intro-label" style={{ color: 'var(--gold)' }}>The Story</div>
            <h2 className="intro-h2" style={{ color: 'var(--cream)', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}>Artistry meets strategy.</h2>
            <span className="gold-bar" style={{ margin: '4px 0 12px' }}></span>
            
            <p className="intro-p" style={{ fontSize: '1.12rem', lineHeight: 1.8, color: 'rgba(241, 239, 238, 0.82)' }}>
              Born and raised in Iowa, I've always been fascinated by those moments and the stories behind them. That fascination has shaped nearly every creative path I've pursued throughout my life.
            </p>
            <p className="intro-p" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(241, 239, 238, 0.72)' }}>
              Photography, filmmaking, songwriting, marketing, design, and branding may seem like different worlds, but to me they've always been connected by one thing: <strong>storytelling</strong>.
            </p>
            <p className="intro-p" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(241, 239, 238, 0.72)' }}>
              While Haus of Lyra is new, my experience behind the camera isn't. I've been photographing people since 2012 and creating video content since 2015. For years, creative work lived alongside a career in retail development, marketing, and creative leadership.
            </p>
            <p className="intro-p" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(241, 239, 238, 0.72)' }}>
              That career gave me opportunities many photographers never get — working with visual styling, advertising campaigns, and commercial direction. I learned how color influences emotion, how styling changes perception, and how composition guides attention. Every single detail within a frame tells a story.
            </p>
          </div>

          <div className="reveal d2" style={{ display: 'grid', gap: '24px' }}>
            <div className="pz" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(var(--gold-rgb), 0.15)', height: '450px' }}>
              <img src="https://thehausoflyra.com/wp-content/uploads/2026/06/IMG_4105.jpg" alt="Dakota creative session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="pz" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(var(--gold-rgb), 0.15)', height: '320px' }}>
              <img src="https://thehausoflyra.com/wp-content/uploads/2026/06/IMG_2623.jpg" alt="Dakota working" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

        </div>
      </section>

      {/* CONTINUED STORY (SPLIT GRID) */}
      <section style={{ background: 'var(--dark)', padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '80px', alignItems: 'center' }}>
          
          <div className="reveal" style={{ position: 'relative' }}>
            <div className="pz" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(var(--gold-rgb), 0.15)', height: '550px' }}>
              <img src="https://thehausoflyra.com/wp-content/uploads/2026/06/010A3208-C726-4046-BAB5-4351A48C5A2A.png" alt="Dakota profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div className="reveal d2" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div className="intro-label" style={{ color: 'var(--gold)' }}>The Leap</div>
            <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '2.5rem', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.15 }}>Taking the leap to build something personal.</h2>
            
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(241, 239, 238, 0.76)' }}>
              For more than a decade, I helped businesses tell their stories. I built brands, directed creative projects, and developed marketing campaigns. But eventually, I realized something: I was spending so much time helping others pursue their dreams that I had never fully pursued one of my own.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(241, 239, 238, 0.76)' }}>
              So in 2026, I took the leap and launched <strong>Haus of Lyra</strong>. 
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(241, 239, 238, 0.76)' }}>
              The name comes from the Lyra constellation. Its five primary stars represent the values that guide every single project: <strong>Intentionality, Creativity, Connection, Artistry, and Storytelling</strong>.
            </p>
            <blockquote className="who-quote" style={{ margin: '20px 0 0 0', paddingLeft: '24px', borderLeft: '3px solid var(--gold)', fontSize: '1.25rem', fontFamily: "'Josefin Sans', sans-serif", fontStyle: 'italic', color: 'var(--cream)' }}>
              "Your story deserves more than documentation. It deserves to become art."
            </blockquote>
          </div>

        </div>
      </section>

      {/* CREATIVE OUTLETS & CAT TEAM */}
      <section style={{ background: 'var(--black)', padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '70px' }}>
            <span className="eyebrow eg" style={{ marginBottom: '14px' }}>Behind the Scenes</span>
            <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, color: 'var(--cream)' }}>Cats &amp; Creative Outlets</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '44px' }}>
            
            {/* Songwriting card */}
            <div className="reveal d1" style={{ background: 'var(--panel)', padding: '44px', borderRadius: '12px', borderTop: '2px solid rgba(var(--gold-rgb), 0.15)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{ fontSize: '2rem', color: 'var(--gold)' }}>✦</span>
              <h3 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.6rem', color: 'var(--cream)', fontWeight: 300 }}>Songwriting</h3>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.8, color: 'rgba(241, 239, 238, 0.7)' }}>
                When I'm not behind the camera, you'll usually find me chasing another creative outlet. I'm an avid songwriter who loves the challenge of turning emotions, experiences, and memories into music. Both songwriting and photography are attempts to preserve a feeling before it slips away.
              </p>
            </div>

            {/* Uncle card */}
            <div className="reveal d2" style={{ background: 'var(--panel)', padding: '44px', borderRadius: '12px', borderTop: '2px solid rgba(var(--gold-rgb), 0.15)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{ fontSize: '2rem', color: 'var(--gold)' }}>✧</span>
              <h3 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.6rem', color: 'var(--cream)', fontWeight: 300 }}>Family &amp; Heritage</h3>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.8, color: 'rgba(241, 239, 238, 0.7)' }}>
                One of my favorite roles in life is being an uncle. My niece and nephew remind me constantly how quickly life moves and how important it is to document the moments that matter. The photos and videos we create today become the memories we hold onto tomorrow.
              </p>
            </div>

          </div>

          {/* Cats Bio Section */}
          <div className="reveal" style={{ marginTop: '100px', background: 'var(--panel)', padding: '50px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h3 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.8rem', color: 'var(--cream)', fontWeight: 300 }}>The Studio Assistants</h3>
              <p style={{ color: 'var(--mid)', fontSize: '0.94rem', marginTop: '6px' }}>Sleeping through work hours and demanding snacks.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', justifyItems: 'center' }} className="cat-grid">
              
              {/* Smokey */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', maxWidth: '340px' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--gold)' }}>
                  <img src="https://thehausoflyra.com/wp-content/uploads/2026/06/Smokey.png" alt="Smokey the cat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.3rem', color: 'var(--cream)', margin: 0 }}>Smokey</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'rgba(241, 239, 238, 0.64)' }}>
                  Co-Lead Editor. Interruption specialist. Demands snacks with great urgency and sleeps directly on the keyboard when compilation is active.
                </p>
              </div>

              {/* Storm */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', maxWidth: '340px' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--gold)' }}>
                  <img src="https://thehausoflyra.com/wp-content/uploads/2026/06/Storm.png" alt="Storm the cat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.3rem', color: 'var(--cream)', margin: 0 }}>Storm</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'rgba(241, 239, 238, 0.64)' }}>
                  Moral support lead. Exceptional at napping through meetings and providing silent, soft encouragement only when it suits her.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="cta-bg">
          <img src="https://thehausoflyra.com/wp-content/uploads/2026/06/IMG_6223.jpg" alt="" />
        </div>
        <div className="cta-content reveal">
          <span className="eyebrow eg">Let's Connect</span>
          <h2>Your story deserves to become <em>art.</em></h2>
          <p>Every wedding, senior session, and film is treated with absolute care and artistic intentionality. If this approach resonates with you, let's talk.</p>
          <div className="cta-btns">
            <button className="btn btn-gold" onClick={() => setIsModalOpen(true)}>Start a Project</button>
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
            <li><Link href="/about">About</Link></li>
            <li><Link href="/senior-photo">Seniors</Link></li>
            <li><Link href="/wedding-photo">Wedding Photo</Link></li>
            <li><Link href="/wedding-video">Wedding Film</Link></li>
            <li><a href="mailto:hello@thehausoflyra.com">Email</a></li>
            <li><a href="https://instagram.com/thehausoflyra" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <p className="footer-copy">&copy; 2026 Haus of Lyra Creative Studios. All rights reserved.</p>
      </footer>

      {/* MODAL */}
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
    </div>
  );
}

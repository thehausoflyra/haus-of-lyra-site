import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      fontFamily: "'Nunito Sans', sans-serif",
      backgroundColor: '#0F0E0C',
      color: '#FAF8F5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      position: 'relative',
    }}>
      {/* Background star speckles overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.035,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
        <span style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#CEAD6F',
          marginBottom: '24px',
          display: 'block',
        }}>
          Error 404
        </span>
        <h1 style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: 'clamp(80px, 15vw, 120px)',
          fontWeight: 300,
          lineHeight: 1,
          color: '#FAF8F5',
          marginBottom: '20px',
          letterSpacing: '-0.02em',
        }}>
          4<em style={{ color: '#CEAD6F', fontStyle: 'italic', fontWeight: 300 }}>0</em>4
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: 1.8,
          color: 'rgba(241, 239, 238, 0.65)',
          marginBottom: '40px',
        }}>
          The page you are looking for has either been moved, deleted, or never existed in the constellation.
        </p>
        <Link href="/" style={{
          display: 'inline-block',
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          padding: '15px 36px',
          border: '2px solid #CEAD6F',
          background: '#CEAD6F',
          color: '#1A1816',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          lineHeight: 1,
        }}>
          Return Home
        </Link>
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
        }}>
          <Link href="/seniors" style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
            textDecoration: 'none',
          }}>
            Seniors Experience
          </Link>
          <a href="mailto:hello@thehausoflyra.com" style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
            textDecoration: 'none',
          }}>
            Contact Studio
          </a>
        </div>
      </div>
    </div>
  );
}

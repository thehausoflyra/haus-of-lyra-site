import Link from "next/link";

const FILM_FRAMES = [
  "/weddings/img_3724-2.jpg",
  "/weddings/img_3731-2.jpg",
  "/weddings/img_3729-2.jpg",
];

export default function WeddingFilmPage() {
  return (
    <main className="weddings-page-wrapper" style={{ paddingTop: 80 }}>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 44px" }}>
        <p className="eyebrow eg" style={{ marginBottom: 14 }}>Wedding Videography</p>
        <h1 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, fontSize: "clamp(2rem,5vw,4rem)", color: "var(--cream)", lineHeight: 1.05 }}>
          Cinematic wedding films, no filler.
        </h1>
        <p style={{ marginTop: 14, maxWidth: 760, color: "rgba(250,248,245,0.84)", lineHeight: 1.8 }}>
          This page is wedding film only. Real audio, real pacing, real emotion. We build films that feel like your day instead of an over-edited montage.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
          <Link href="/contact" className="btn btn-gold">Inquire for Film</Link>
          <Link href="/weddings/photography" className="btn btn-ol">Photography Page</Link>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 44px" }}>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {FILM_FRAMES.map((src) => (
            <div key={src} style={{ border: "1px solid rgba(229,229,229,0.22)", background: "#13110e" }}>
              <img src={src} alt="Wedding film frame" style={{ width: "100%", height: 360, objectFit: "cover", objectPosition: "center" }} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

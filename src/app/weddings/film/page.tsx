import Link from "next/link";

const FILM_FRAMES = [
  "https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG",
  "https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG",
  "https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG",
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

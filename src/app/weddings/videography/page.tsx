import Link from "next/link";

const WEDDING_FRAMES = [
  "https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/6899d2d8-852c-49b4-aea9-b4792551f8d0/untitled-4-RT.JPG",
  "https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG",
  "https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/7ed5fe20-09a0-4ce5-a01e-54eabec5c60d/untitled-28-RT.JPG",
];

export default function WeddingVideographyPage() {
  return (
    <main className="weddings-page-wrapper" style={{ paddingTop: 80 }}>
      <section className="container-pad" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 56px" }}>
        <p className="eyebrow eg" style={{ marginBottom: 16 }}>
          Wedding Videography · Des Moines, Iowa
        </p>
        <h1 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.05 }}>
          Wedding films with real emotion.
        </h1>
        <p style={{ marginTop: 18, color: "rgba(250,248,245,0.8)", maxWidth: 780, lineHeight: 1.8 }}>
          This page is dedicated to wedding videography only. We focus on movement, sound, vows, speeches, and all the in-between moments that still
          feel alive years later. No templates, no generic highlight edits.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/inquiry?service=wedding-film" className="btn btn-gold">
            Book Videography
          </Link>
          <Link href="/weddings" className="btn btn-ol">
            Wedding Overview
          </Link>
        </div>
      </section>

      <section className="container-pad" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 56px" }}>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {WEDDING_FRAMES.map((src) => (
            <div key={src} style={{ overflow: "hidden", border: "1px solid rgba(229,229,229,0.2)", background: "#12110f" }}>
              <img src={src} alt="Wedding videography frame" style={{ width: "100%", height: 360, objectFit: "cover", objectPosition: "center" }} />
            </div>
          ))}
        </div>
      </section>

      <section className="container-pad" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "clamp(1.6rem,3vw,2.5rem)", fontWeight: 300, color: "var(--cream)" }}>
          Videography Collections
        </h2>
        <div style={{ marginTop: 20, display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <article style={{ border: "1px solid rgba(229,229,229,0.2)", padding: 18, background: "#161411" }}>
            <p className="eyebrow eg" style={{ marginBottom: 10 }}>Wedding Film I</p>
            <p style={{ color: "var(--cream)" }}>$2,500 · Essential coverage</p>
          </article>
          <article style={{ border: "1px solid rgba(229,229,229,0.2)", padding: 18, background: "#161411" }}>
            <p className="eyebrow eg" style={{ marginBottom: 10 }}>Wedding Film II</p>
            <p style={{ color: "var(--cream)" }}>$3,900 · Extended coverage + elevated edit</p>
          </article>
          <article style={{ border: "1px solid rgba(229,229,229,0.2)", padding: 18, background: "#161411" }}>
            <p className="eyebrow eg" style={{ marginBottom: 10 }}>Wedding Film III</p>
            <p style={{ color: "var(--cream)" }}>$5,400 · Full story production</p>
          </article>
        </div>
      </section>
    </main>
  );
}


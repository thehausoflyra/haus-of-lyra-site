import Link from "next/link";

const PHOTO_FRAMES = [
  "https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/3ba987e8-0f56-4c22-bcb1-22696ef84525/untitled-163-Edit-RT.JPG",
  "https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/c08dc64a-58d0-4391-800c-b466eb9320fa/untitled-395.JPG",
  "https://images.squarespace-cdn.com/content/v1/6917ac5a8e78b57cd3f9287c/22e3c764-02bd-412d-a61c-9f64656f120b/Untitled+design+-+66.JPG",
];

export default function WeddingPhotographyPage() {
  return (
    <main className="weddings-page-wrapper" style={{ paddingTop: 80 }}>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 44px" }}>
        <p className="eyebrow eg" style={{ marginBottom: 14 }}>Wedding Photography</p>
        <h1 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, fontSize: "clamp(2rem,5vw,4rem)", color: "var(--cream)", lineHeight: 1.05 }}>
          Editorial wedding photography, built around your people.
        </h1>
        <p style={{ marginTop: 14, maxWidth: 760, color: "rgba(250,248,245,0.84)", lineHeight: 1.8 }}>
          This page is wedding photography only. Direction when needed, documentary instincts all day, and images that stay honest.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
          <Link href="/contact" className="btn btn-gold">Inquire for Photo</Link>
          <Link href="/weddings/film" className="btn btn-ol">Videography Page</Link>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 44px" }}>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {PHOTO_FRAMES.map((src) => (
            <div key={src} style={{ border: "1px solid rgba(229,229,229,0.22)", background: "#13110e" }}>
              <img src={src} alt="Wedding photography frame" style={{ width: "100%", height: 360, objectFit: "cover", objectPosition: "center" }} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function BrandPage() {
  return (
    <main className="home-page-wrapper" style={{ paddingTop: 80, minHeight: "100vh" }}>
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px 70px" }}>
        <p className="eyebrow eg" style={{ marginBottom: 14 }}>Brand + Commercial</p>
        <h1 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, fontSize: "clamp(2rem,5vw,4rem)", color: "var(--cream)", lineHeight: 1.06 }}>
          Editorial visuals for brands that need to move people.
        </h1>
        <p style={{ marginTop: 16, color: "rgba(250,248,245,0.84)", lineHeight: 1.9 }}>
          We create brand imagery and campaign content with the same intentional approach we use in weddings: clarity, emotion, and strong art direction.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/contact" className="btn btn-gold">Start a Brand Project</Link>
          <Link href="/" className="btn btn-ol">Back Home</Link>
        </div>
      </section>
    </main>
  );
}

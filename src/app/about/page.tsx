import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="home-page-wrapper" style={{ paddingTop: 80, minHeight: "100vh" }}>
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px 70px" }}>
        <p className="eyebrow eg" style={{ marginBottom: 14 }}>About Haus of Lyra</p>
        <h1 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, fontSize: "clamp(2rem,5vw,4rem)", color: "var(--cream)", lineHeight: 1.06 }}>
          We make work that feels like people, not templates.
        </h1>
        <p style={{ marginTop: 16, color: "rgba(250,248,245,0.84)", lineHeight: 1.9 }}>
          Haus of Lyra is a Des Moines creative studio focused on wedding photography, wedding films, and senior portraits. We keep direction simple,
          stay present, and build images that still feel right years later.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/weddings" className="btn btn-gold">Weddings</Link>
          <Link href="/seniors" className="btn btn-ol">Seniors</Link>
          <Link href="/contact" className="btn btn-ol">Contact</Link>
        </div>
      </section>
    </main>
  );
}

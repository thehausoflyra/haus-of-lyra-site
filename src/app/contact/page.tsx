import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="home-page-wrapper" style={{ paddingTop: 80, minHeight: "100vh" }}>
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 70px" }}>
        <p className="eyebrow eg" style={{ marginBottom: 14 }}>Contact</p>
        <h1 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, fontSize: "clamp(2rem,5vw,4rem)", color: "var(--cream)", lineHeight: 1.06 }}>
          Tell us what you're planning.
        </h1>
        <p style={{ marginTop: 16, color: "rgba(250,248,245,0.84)", lineHeight: 1.9 }}>
          Email us at <a href="mailto:hello@thehausoflyra.com" style={{ color: "var(--gold)" }}>hello@thehausoflyra.com</a>. We reply within 1-2 business days.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/weddings" className="btn btn-gold">Wedding Services</Link>
          <Link href="/seniors" className="btn btn-ol">Senior Services</Link>
        </div>
      </section>
    </main>
  );
}

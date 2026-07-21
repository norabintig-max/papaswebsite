import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import studioDesk from "@/assets/studio-desk.asset.json";
import studioSide from "@/assets/studio-side.asset.json";
import studioFront from "@/assets/studio-front.asset.json";
import moritzStudio from "@/assets/moritz-studio.asset.json";
import moritzPortrait from "@/assets/moritz-portrait.asset.json";
import studioOverview from "@/assets/studio-overview.asset.json";
import studioBwDesk from "@/assets/studio-bw-desk.jpeg.asset.json";
import studioBwOverview from "@/assets/studio-bw-overview.jpeg.asset.json";
import studioBwFront from "@/assets/studio-bw-front.jpeg.asset.json";
import studioMoritzChair from "@/assets/DSC04719.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moritz Bintig Mixing Engineer & Musikproduktion Hannover" },
      {
        name: "description",
        content:
          "Professionelles Mixing, Recording und Musikproduktion in Hannover. Workshops und 1:1 Coaching mit Moritz Bintig.",
      },
      { property: "og:title", content: "Moritz Bintig Mixing Engineer & Musikproduktion Hannover" },
      {
        property: "og:description",
        content:
          "Professionelles Mixing, Recording und Musikproduktion in Hannover. Workshops und 1:1 Coaching mit Moritz Bintig.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: moritzStudio.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: moritzStudio.url },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@200;300;400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

const GOLD = "#6FA3D0";

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMsg, setFormMsg] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Progress line fill on scroll
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = progressRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = Math.min(Math.max(vh - rect.top, 0), total);
      const ratio = Math.min(passed / total, 1);
      el.style.setProperty("--fill", `${ratio * 100}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Dienstleistungen" },
    { href: "#workshops", label: "Workshops" },
    { href: "#booking", label: "Buchen" },
    { href: "#pricing", label: "Preise" },
    { href: "#contact", label: "Kontakt" },
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || name.length > 100) return setFormMsg("Bitte gib deinen Namen ein (max. 100 Zeichen).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return setFormMsg("Bitte gib eine gültige E-Mail-Adresse ein.");
    if (!message || message.length > 2000) return setFormMsg("Bitte schreibe eine Nachricht (max. 2000 Zeichen).");
    const subject = encodeURIComponent(`Anfrage: ${fd.get("subject") || "Sonstiges"} ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    setFormMsg("Danke! Dein Mail-Programm öffnet sich gleich.");
    window.location.href = `mailto:bintig@mb-produktion.de?subject=${subject}&body=${body}`;
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <div className="mb-site">
      <style>{css}</style>

      {/* NAV */}
      <header className={`mb-nav ${scrolled ? "is-solid" : ""}`}>
        <div className="mb-container mb-nav-inner">
          <a href="#top" className="mb-logo">MORITZ BINTIG</a>
          <nav className="mb-nav-links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <button
            aria-label="Menü öffnen"
            className="mb-burger"
            onClick={() => setMenuOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div className={`mb-overlay ${menuOpen ? "is-open" : ""}`}>
        <button aria-label="Menü schließen" className="mb-close" onClick={() => setMenuOpen(false)}>×</button>
        <nav>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </nav>
      </div>

      {/* HERO */}
      <section id="top" className="mb-hero" style={{ backgroundImage: `url(${moritzStudio.url})` }}>
        <div className="mb-hero-overlay" />
        <div className="mb-container mb-hero-content" data-reveal>
          <span className="mb-overline">Hannover · Professional Recording Studio</span>
          <h1 className="mb-h1">Shape Your Sound.</h1>
          <p className="mb-sub">
            Professionelles Mixing & Recording und die Ausbildung, die dich dorthin bringt.
          </p>
          <div className="mb-cta-row">
            <a className="mb-btn mb-btn-fill" href="#services">Dienstleistungen buchen</a>
            <a className="mb-btn mb-btn-outline" href="#workshops">Workshops entdecken</a>
          </div>
        </div>
        <a href="#about" className="mb-scroll" aria-label="Nach unten scrollen">
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
            <path d="M10 2v26M3 21l7 7 7-7" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="mb-section">
        <div className="mb-container mb-about">
          <div className="mb-about-img" data-reveal>
            <img src={moritzPortrait.url} alt="Moritz Bintig Portrait" loading="lazy" />
          </div>
          <div className="mb-about-text" data-reveal>
            <span className="mb-overline">Über den Produzenten</span>
            <h2 className="mb-h2">Moritz Bintig</h2>
            <p className="mb-gold-sub">Komponist · Produzent · Mixing Engineer</p>
            <p className="mb-body">
              Seit <strong>2004</strong> ist Moritz Bintig als Komponist, Produzent und Mixing
              Engineer in der internationalen Musik- und Medienbranche tätig. Von seinem Studio in
              Hannover aus arbeitet er für renommierte Musikverlage, Werbefirmen und
              Production-Music-Libraries wie <strong>Warner Chappell Music</strong>,{" "}
              <strong>Sonoton</strong>, <strong>Intervox</strong>, <strong>NINJA TRACKS</strong>,{" "}
              <strong>Supreme Music</strong> und <strong>Earmotion</strong>. Sein umfangreicher
              Katalog umfasst mittlerweile mehr als <strong>4.000 veröffentlichte Werke</strong>,
              die weltweit in Film-, TV-, Werbe- und Medienproduktionen eingesetzt werden.
            </p>
            <p className="mb-body">
              Neben seiner Arbeit für Production Music und Werbemusik realisiert Moritz Bintig
              Produktionen für Künstler:innen unterschiedlichster Genres und verbindet dabei mühelos
              Einflüsse aus Pop, Rock, Electronic, Jazz und orchestralem Scoring. Seine
              Vielseitigkeit dokumentieren Veröffentlichungen mit dem{" "}
              <strong>Armel Dupas Trio</strong>, <strong>Avilan&apos;s Alight</strong>,{" "}
              <strong>Marina Baranova</strong>, <strong>Damian Marhulets</strong>,{" "}
              <strong>Ehrlich Brothers</strong>, <strong>Marie Awadis</strong>,{" "}
              <strong>Rainer Scheurenbrand</strong> und vielen anderen Künstlern.
            </p>
            <p className="mb-body">
              Für seine kompositorische Arbeit wurde Moritz Bintig erst kürzlich ausgezeichnet. 2025
              erhielt er gemeinsam mit Friedrich Gattermann den renommierten{" "}
              <strong>Mark Award</strong> in der Kategorie <em>„Fantasy Track of the Year“</em> für
              die Komposition <em>Symphony of Fatalities</em> eine internationale Anerkennung für
              herausragende Leistungen im Bereich Production Music. Im Jahr 2024 entstand Musik und
              Mix der Werbekampagne <em>„Tail Orchestra“</em> ebenfalls in den Studios von Moritz
              Bintig, die mit <strong>2 Bronze Lions Awards</strong> beim Cannes Lions International
              Festival Of Creativity ausgezeichnet wurde.
            </p>
            <p className="mb-body">
              Mit seiner Kombination aus musikalischer Kreativität, technischem Know-how und
              stilistischer Vielseitigkeit zählt Moritz Bintig zu den gefragten Produzenten,{" "}
              <strong>Mixing Engineers</strong> und Komponisten im Spannungsfeld zwischen Production
              Music, Künstlerproduktion und Werbemusik.
            </p>
            <div className="mb-stats-line">
              {[
                ["20+", "Jahre Branche"],
                ["5.000+", "Veröffentlichte Titel"],
                ["2025", "Mark Award Winner"],
              ].map(([n, l]) => (
                <div key={l} className="mb-stat-min">
                  <span className="mb-stat-n">{n}</span>
                  <span className="mb-stat-l">{l}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>




      {/* SERVICES */}
      <section id="services" className="mb-section mb-section-alt">
        <div className="mb-container">
          <div className="mb-section-head" data-reveal>
            <span className="mb-overline">Für Künstler & Bands</span>
            <h2 className="mb-h2">Professionelle Studio-Dienstleistungen</h2>
            <p className="mb-body mb-center">
              Du willst deinen Sound auf das nächste Level bringen? Buche Moritz direkt als deinen
              Mixing Engineer, Produzenten oder Recording-Engineer.
            </p>
          </div>
          <div className="mb-grid-3">
            {[
              {
                title: "Mixing & Mastering",
                text: "Moritz mischt und mastert deinen Track auf professionellem Niveau radio-ready und release-tauglich. Von Indie bis Electronic, von Pop bis Rock.",
                tags: ["Mixing", "Mastering", "Stem Mixing"],
                cta: "Anfrage stellen",
              },
              {
                title: "Recording Session",
                text: "Produziere deine Aufnahmen in Moritz' eigenem Studio in Hannover. Professionelle Technik, akustisch optimierter Raum, kreativer Flow.",
                tags: ["Vocals", "Instrumente", "Band-Recording"],
                cta: "Session buchen",
              },
              {
                title: "Produktion & Arrangement",
                text: "Von der Idee zum fertigen Song. Moritz arbeitet als Co-Produzent oder übernimmt die komplette Produktion deines Tracks.",
                tags: ["Beat Production", "Arrangement", "Co-Writing"],
                cta: "Projekt besprechen",
              },
            ].map((c, i) => (
              <article key={c.title} className="mb-service" data-reveal>
                <span className="mb-service-rule" aria-hidden />
                <span className="mb-service-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mb-h3 mb-service-title">{c.title}</h3>
                <p className="mb-body">{c.text}</p>
                <div className="mb-tags">
                  {c.tags.map((t) => <span key={t} className="mb-tag">{t}</span>)}
                </div>
                <a href="#contact" className="mb-link-arrow">{c.cta} →</a>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* WORKSHOPS */}
      <section id="workshops" className="mb-section">
        <div className="mb-container">
          <div className="mb-section-head" data-reveal>
            <span className="mb-overline">Für Musiker & Produzenten</span>
            <h2 className="mb-h2">Workshops · Seminare · Coaching</h2>
            <p className="mb-body mb-center">
              Lerne von einem aktiven Profi kein trockenes Lehrbuchwissen, sondern echtes Studio-Know-how.
            </p>
          </div>
          <div className="mb-grid-4">
            {[
              ["1:1 Mixing Coaching", "Intensives Einzelcoaching: Gain-Staging, EQ, Kompression, Räumlichkeit, Automation auf dein Level zugeschnitten."],
              ["Recording Seminar", "Mikrofonierung, Signalfluss, Preamps, Raumakustik du lernst, wie professionelle Aufnahmen entstehen."],
              ["Produktion & Songwriting", "Von der leeren DAW zum fertigen Track: Arrangement, Sound Design, Komposition und Workflow."],
              ["Branchenmentorat", "Labels, Publishing, Networking: Moritz teilt sein Wissen über die Musikbranche und öffnet Türen."],
            ].map(([t, d]) => (
              <article key={t} className="mb-glass mb-card" data-reveal>
                <h3 className="mb-h4">{t}</h3>
                <p className="mb-body">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO GALLERY (visual break) */}
      <section className="mb-section mb-section-alt">
        <div className="mb-container">
          <div className="mb-section-head" data-reveal>
            <span className="mb-overline">Das Studio</span>
            <h2 className="mb-h2">Wo dein Sound entsteht</h2>
          </div>
          <div className="mb-gallery">
            {[studioBwOverview, studioBwDesk, studioBwFront, studioMoritzChair].map((img, i) => (
              <div key={i} className="mb-gallery-item" data-reveal>
                <img src={img.url} alt={`Studio ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING (Progress + CTA only) */}
      <section id="booking" className="mb-section">
        <div className="mb-container">
          <div className="mb-section-head" data-reveal>
            <h2 className="mb-h2">Dein Weg zum Pro</h2>
            <p className="mb-body mb-center">
              Egal ob du gerade anfängst oder schon produzierst Moritz holt dich genau dort ab.
            </p>
          </div>
          <div className="mb-progress" ref={progressRef}>
            <div className="mb-progress-track"><div className="mb-progress-fill" /></div>
            <div className="mb-progress-steps">
              {[
                ["Grundlagen", "Du kennst deine DAW und weißt, wie Mixing funktioniert"],
                ["Techniken", "EQ, Kompression, Räumlichkeit du weißt, was du tust"],
                ["Workflow", "Du produzierst schnell, sicher, mit professionellem Ergebnis"],
                ["Profi-Level", "Release-ready Qualität. Bereit für Labels & Playlists."],
              ].map(([t, d], i) => (
                <div className="mb-progress-step" key={t} data-reveal>
                  <div className="mb-progress-circle">{i + 1}</div>
                  <h4 className="mb-h4">{t}</h4>
                  <p className="mb-body mb-small">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-cta-row mb-center-row">
            <a className="mb-btn mb-btn-outline" href="#pricing">Für Einsteiger</a>
            <a className="mb-btn mb-btn-outline" href="#pricing">Für Profis</a>
          </div>
        </div>
      </section>

      {/* PRICING 4 BLOCKS */}
      <section id="pricing" className="mb-section mb-section-alt">
        <div className="mb-container">
          <div className="mb-section-head" data-reveal>
            <span className="mb-overline">Preise & Pakete</span>
            <h2 className="mb-h2">Klare Pakete. Faire Preise.</h2>
          </div>

          {/* BLOCK 1: REMOTE MIXING */}
          <div className="mb-block" data-reveal>
            <div className="mb-block-head">
              <span className="mb-overline">100% Remote · Deutschland & International</span>
              <h3 className="mb-h3 mb-block-title">Remote Mixing</h3>
              <p className="mb-body mb-center">
                Du schickst deine Stems Moritz liefert den professionellen Mix.
                Keine Anreise, keine Terminbindung.
              </p>
            </div>
            <div className="mb-grid-3">
              {[
                {
                  t: "Mix Basic",
                  price: "299 €",
                  items: ["Bis zu 32 Stems", "1 Revision", "Lieferung in 5 Werktagen", "WAV + MP3"],
                  cta: "Jetzt buchen",
                  featured: false,
                },
                {
                  t: "Mix Premium",
                  price: "599 €",
                  items: ["Unbegrenzte Stems", "3 Revisionen", "Lieferung in 3 Werktagen", "WAV + MP3 + Stems zurück", "Persönliches Feedback"],
                  cta: "Jetzt buchen",
                  featured: true,
                },
                {
                  t: "Mix + Master",
                  price: "799 €",
                  items: ["Alles aus Mix Premium", "Professionelles Mastering", "Release-ready für Apple Music, YouTube", "ISRC-kompatibel"],
                  cta: "Jetzt buchen",
                  featured: false,
                },
              ].map((p) => (
                <article key={p.t} className={`mb-glass mb-price ${p.featured ? "is-featured" : ""}`} data-reveal>
                  {p.featured && <span className="mb-badge">Empfohlen</span>}
                  <h4 className="mb-h3">{p.t}</h4>
                  <div className="mb-price-tag">{p.price}</div>
                  <ul className="mb-list mb-list-check">
                    {p.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                  <a href="#contact" className="mb-btn mb-btn-fill mb-btn-block">{p.cta}</a>
                </article>
              ))}
            </div>
            <p className="mb-note mb-note-gold">
              Alle Lieferungen als WAV (24bit/48kHz). Auf Anfrage: Stem-Mastering & Dolby Atmos.
            </p>
          </div>

          {/* BLOCK 2: WORKSHOPS */}
          <div className="mb-block" data-reveal>
            <div className="mb-block-head">
              <span className="mb-overline">Hannover · Live · Gruppenformat</span>
              <h3 className="mb-h3 mb-block-title">Workshops & Seminare</h3>
            </div>
            <div className="mb-grid-2">
              {[
                {
                  t: "Weekend Mixing Workshop",
                  price: "399 € / Person",
                  meta: "max. 6 Teilnehmer",
                  items: [
                    "Samstag: Gain Staging · EQ · Kompression · Vocals",
                    "Sonntag: Automation · Effekte · Masterbus · Mix-Kritik",
                  ],
                  badge: "Nächste Termine auf Anfrage",
                  cta: "Platz sichern",
                },
                {
                  t: "Producing Camp",
                  price: "ab 999 €",
                  meta: "5 Tage intensiv · Kleine Gruppe",
                  items: [
                    "Songwriting · Recording · Editing",
                    "Mixing · Mastering · Mix-Kritik",
                  ],
                  badge: null,
                  cta: "Infos anfragen",
                },
              ].map((p) => (
                <article key={p.t} className="mb-glass mb-price" data-reveal>
                  {p.badge && <span className="mb-badge mb-badge-soft">{p.badge}</span>}
                  <h4 className="mb-h3">{p.t}</h4>
                  <div className="mb-price-tag">{p.price}</div>
                  <p className="mb-body mb-small" style={{ margin: "0 0 1rem" }}>{p.meta}</p>
                  <ul className="mb-list mb-list-check">
                    {p.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                  <a href="#contact" className="mb-btn mb-btn-outline mb-btn-block">{p.cta}</a>
                </article>
              ))}
            </div>
          </div>

          {/* BLOCK 3: 1:1 MENTORING */}
          <div className="mb-block" data-reveal>
            <div className="mb-block-head">
              <span className="mb-overline">Individuell · Dein Projekt. Dein Tempo.</span>
              <h3 className="mb-h3 mb-block-title">1:1 Mentoring</h3>
              <p className="mb-body mb-center">
                Kein Theorieunterricht Moritz hört sich deinen Mix an und zeigt dir live,
                warum er klingt wie er klingt. Und wie du es besser machst.
              </p>
            </div>
            <div className="mb-grid-2">
              {[
                {
                  t: "Online Mentoring",
                  price: "ab 80 €/h",
                  items: ["Via Zoom · Screen Share · DAW-Session", "Flexibel buchbar · weltweit"],
                  cta: "Online-Session buchen",
                },
                {
                  t: "Vor Ort im Studio",
                  price: "ab 100 €/h",
                  items: ["Voßstraße 12, 30161 Hannover", "Professionelle Studioumgebung"],
                  cta: "Studio-Session buchen",
                },
              ].map((p) => (
                <article key={p.t} className="mb-glass mb-price" data-reveal>
                  <h4 className="mb-h3">{p.t}</h4>
                  <div className="mb-price-tag">{p.price}</div>
                  <ul className="mb-list mb-list-check">
                    {p.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                  <a href="#contact" className="mb-btn mb-btn-outline mb-btn-block">{p.cta}</a>
                </article>
              ))}
            </div>
          </div>

          {/* BLOCK 4: PRODUZENTEN-RETAINER */}
          <div className="mb-block" data-reveal>
            <article className="mb-retainer">
              <div className="mb-retainer-glow" />
              <div className="mb-retainer-inner">
                <div className="mb-retainer-head">
                  <span className="mb-overline">Monatsmitgliedschaft</span>
                  <h3 className="mb-h2" style={{ margin: "0.25rem 0" }}>
                    Produzenten-Retainer <span className="mb-star">★</span>
                  </h3>
                  <div className="mb-retainer-price">
                    <span className="mb-price-tag" style={{ fontSize: 40, margin: 0 }}>499 €</span>
                    <span className="mb-body">/ Monat</span>
                  </div>
                </div>
                <ul className="mb-list mb-list-check mb-retainer-list">
                  <li>2 professionelle Mix-Reviews pro Monat (Tracks + schriftliches Feedback)</li>
                  <li>WhatsApp-Support während deiner Sessions</li>
                  <li>1 Zoom-Call pro Monat (60 Min. · deine Agenda)</li>
                  <li>Monatlich kündbar · keine Vertragsbindung</li>
                </ul>
                <p className="mb-body mb-small mb-center">
                  Für Produzenten, die konstant besser werden wollen ohne jedes Mal neu buchen zu müssen.
                </p>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".75rem", marginTop: "1.5rem" }}>
                  <a href="#contact" className="mb-btn mb-btn-fill mb-btn-xl">Retainer starten</a>
                  <span className="mb-body mb-small" style={{ color: "var(--gold)" }}>Nur 5 Plätze verfügbar.</span>
                </div>
              </div>
            </article>
          </div>

          <p className="mb-note">Alle Preise inkl. MwSt. · Individuelle Angebote auf Anfrage.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mb-section mb-section-alt">
        <div className="mb-container">
          <div className="mb-section-head" data-reveal>
            <h2 className="mb-h2">Lass uns reden.</h2>
            <p className="mb-body mb-center">
              Ob Projekt, Coaching oder einfach eine Frage Moritz antwortet persönlich.
            </p>
          </div>
          <div className="mb-contact">
            <form className="mb-glass mb-form" onSubmit={handleSubmit} noValidate data-reveal>
              <label>
                Name*
                <input name="name" type="text" required maxLength={100} />
              </label>
              <label>
                E-Mail*
                <input name="email" type="email" required maxLength={255} />
              </label>
              <label>
                Betreff
                <select name="subject" defaultValue="Mixing/Mastering">
                  <option>Mixing/Mastering</option>
                  <option>Recording</option>
                  <option>Coaching</option>
                  <option>Workshop</option>
                  <option>Sonstiges</option>
                </select>
              </label>
              <label>
                Nachricht*
                <textarea name="message" rows={5} required maxLength={2000} />
              </label>
              {formMsg && <p className="mb-form-msg">{formMsg}</p>}
              <button type="submit" className="mb-btn mb-btn-fill mb-btn-block">Nachricht senden</button>
            </form>

            <aside className="mb-glass mb-contact-card" data-reveal>
              <a className="mb-contact-row" href="mailto:bintig@mb-produktion.de">
                <span className="mb-ic">✉</span> bintig@mb-produktion.de
              </a>
              <a className="mb-contact-row" href="tel:+4901773946407">
                <span className="mb-ic">☎</span> +49 0177 3946407
              </a>
              <div className="mb-contact-row">
                <span className="mb-ic">◉</span> Voßstraße 12, 30161 Hannover
              </div>
              <iframe
                title="Karte"
                className="mb-map"
                src="https://www.google.com/maps?q=Vo%C3%9Fstra%C3%9Fe%2012%2C%2030161%20Hannover&output=embed"
                loading="lazy"
              />
              <div className="mb-socials">
                {[
                  ["Instagram", "https://www.instagram.com/moritzbintig/"],
                  ["YouTube", "https://www.youtube.com/@moritzbintig"],
                  ["SoundCloud", "https://soundcloud.com/moritzbintig"],
                ].map(([n, h]) => (
                  <a key={n} href={h} target="_blank" rel="noopener noreferrer" className="mb-social">{n}</a>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* RECOGNITION dezent, kurz vor Footer */}
      <section className="mb-recognition" data-reveal>
        <div className="mb-container">
          <div className="mb-recognition-award">
            <span className="mb-recognition-rule" aria-hidden />
            <p className="mb-recognition-title">
              Mark Awards 2025 <em>Fantasy Track of the Year</em>
            </p>
            <p className="mb-recognition-sub">
              Symphony of Fatalities · with Friedrich Gattermann
            </p>
            <span className="mb-recognition-rule" aria-hidden />
          </div>

          <div className="mb-recognition-credits">
            <span className="mb-overline mb-recognition-label">Selected Credits</span>
            <p className="mb-credits-line">
              {[
                "Warner Chappell Music",
                "Sonoton",
                "Intervox",
                "Ninja Tracks",
                "Earmotion",
                "Armel Dupas Trio",
                "Avilan's Alight",
                "Marina Baranova",
                "Damian Marhulets",
                "Marie Awadis",
              ].join("  ·  ")}
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="mb-footer">
        <div className="mb-container mb-footer-inner">
          <div>
            <div className="mb-logo">MORITZ BINTIG</div>
            <p className="mb-claim">Shape Your Sound.</p>
          </div>
          <div className="mb-footer-links">
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
          </div>
          <div className="mb-socials">
            {[
              ["Instagram", "https://www.instagram.com/moritzbintig/"],
              ["YouTube", "https://www.youtube.com/@moritzbintig"],
              ["SoundCloud", "https://soundcloud.com/moritzbintig"],
            ].map(([n, h]) => (
              <a key={n} href={h} target="_blank" rel="noopener noreferrer" className="mb-social">{n}</a>
            ))}
          </div>
        </div>
        <div className="mb-copy">© 2025 Moritz Bintig. Alle Rechte vorbehalten.</div>
      </footer>
    </div>
  );
}

const css = `
:root {
  --bg: #0A0A0A;
  --surface: #1A1A1A;
  --gold: #6FA3D0;
  --gold-soft: rgba(111,163,208,0.2);
  --text: #F0F0F0;
  --muted: #9a9a9a;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
.mb-site {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 300;
  line-height: 1.6;
  overflow-x: hidden;
}
.mb-site a { color: inherit; text-decoration: none; cursor: pointer; }
.mb-site button { cursor: pointer; font-family: inherit; }
.mb-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* Reveal */
[data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1); }
[data-reveal].is-visible { opacity: 1; transform: none; }


/* Typography */
.mb-h1, .mb-h2, .mb-h3, .mb-h4 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-style: normal;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.08;
}
.mb-h1 { font-size: clamp(42px, 8vw, 80px); font-weight: 500; }
.mb-h2 { font-size: clamp(32px, 5vw, 52px); margin-bottom: 1rem; font-weight: 500; }
.mb-h3 { font-size: 26px; margin: 0 0 .75rem; font-weight: 600; letter-spacing: -0.01em; }
.mb-h4 { font-size: 20px; margin: 0 0 .5rem; font-weight: 600; letter-spacing: -0.01em; }
.mb-overline {
  display: inline-block;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.28em;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 1rem;
}
.mb-body { color: var(--muted); font-size: 16px; }
.mb-small { font-size: 14px; }
.mb-center { text-align: center; max-width: 640px; margin-left: auto; margin-right: auto; }
.mb-gold-sub {
  color: var(--gold); font-weight: 500; margin: .5rem 0 1.25rem;
  font-family: 'Inter', sans-serif; font-size: 12px;
  text-transform: uppercase; letter-spacing: 0.28em;
}
.mb-about-text em { font-style: normal; color: var(--gold); font-weight: 500; }

/* NAV */
.mb-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  transition: background .3s ease, box-shadow .3s ease;
  background: transparent;
}
.mb-nav.is-solid {
  background: rgba(10,10,10,0.92);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 30px rgba(0,0,0,0.5);
}
.mb-nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; }
.mb-logo {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: var(--gold);
  letter-spacing: 0.32em;
}
.mb-nav-links { display: flex; gap: 2rem; }
.mb-nav-links a { font-size: 14px; transition: color .2s ease; }
.mb-nav-links a:hover { color: var(--gold); }
.mb-burger {
  display: none; background: transparent; border: 0; width: 32px; height: 32px;
  flex-direction: column; justify-content: center; gap: 5px;
}
.mb-burger span { display: block; height: 2px; background: var(--gold); }

/* Overlay */
.mb-overlay {
  position: fixed; inset: 0; z-index: 60; background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none; transition: opacity .3s ease;
}
.mb-overlay.is-open { opacity: 1; pointer-events: auto; }
.mb-overlay nav { display: flex; flex-direction: column; gap: 1.75rem; text-align: center; }
.mb-overlay a {
  font-family: 'Inter', sans-serif; font-weight: 400;
  font-size: 28px; color: var(--gold); letter-spacing: 0.02em;
}
.mb-close {
  position: absolute; top: 1rem; right: 1.25rem; background: transparent; border: 0;
  color: var(--gold); font-size: 40px; line-height: 1;
}

/* HERO */
.mb-hero {
  position: relative; min-height: 100vh;
  background-size: cover; background-position: center;
  display: flex; align-items: center; justify-content: center;
}
.mb-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%);
}
.mb-hero-content {
  position: relative; z-index: 2; text-align: center; padding: 6rem 1.5rem;
}
.mb-sub { color: var(--text); opacity: .75; font-size: clamp(16px, 2vw, 20px); max-width: 640px; margin: 1.5rem auto 2.5rem; }
.mb-cta-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.mb-center-row { justify-content: center; margin-top: 3rem; }
.mb-scroll {
  position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
  z-index: 2; animation: bob 2s ease-in-out infinite;
}
@keyframes bob { 0%,100% { transform: translate(-50%,0); } 50% { transform: translate(-50%,8px); } }

/* Buttons */
.mb-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.95rem 1.75rem; font-size: 14px; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase; border-radius: 2px;
  transition: all .25s ease; border: 1px solid transparent;
}
.mb-btn-fill { background: var(--gold); color: #0A0A0A; }
.mb-btn-fill:hover { box-shadow: 0 0 24px rgba(111,163,208,0.45); transform: translateY(-1px); }
.mb-btn-outline { border-color: var(--gold); color: var(--gold); background: transparent; }
.mb-btn-outline:hover { background: var(--gold); color: #0A0A0A; box-shadow: 0 0 24px rgba(111,163,208,0.35); }
.mb-btn-block { width: 100%; }

/* Sections */
.mb-section { padding: 6rem 0; }
.mb-section-alt { background: linear-gradient(180deg, #0A0A0A 0%, #111 50%, #0A0A0A 100%); }
.mb-section-head { text-align: center; margin-bottom: 3.5rem; }

/* Glass */
.mb-glass {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  border: 1px solid var(--gold-soft);
  border-radius: 12px;
  transition: all .25s ease;
}
.mb-glass:hover { box-shadow: 0 0 24px rgba(111,163,208,0.25); border-color: rgba(111,163,208,0.4); }

/* About */
.mb-about { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.mb-about-img { position: relative; }
.mb-about-img img { width: 100%; height: auto; border-radius: 8px; display: block; filter: grayscale(0.2); }
.mb-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0 0; }
.mb-stat { padding: 1.25rem; text-align: center; display: flex; flex-direction: column; gap: .25rem; }
.mb-stat-n { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 32px; color: var(--gold); letter-spacing: -0.02em; }
.mb-stat-l { font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--muted); }

/* Grids */
.mb-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.mb-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.mb-card { padding: 2rem; height: 100%; }
.mb-card-lg { padding: 2.5rem; }
.mb-card-icon { font-size: 36px; margin-bottom: 1rem; }
.mb-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.25rem 0; }
.mb-tag { font-size: 11px; text-transform: uppercase; letter-spacing: .12em; padding: .35rem .75rem; border: 1px solid var(--gold-soft); border-radius: 999px; color: var(--gold); }
.mb-link-arrow { color: var(--gold); font-size: 14px; font-weight: 600; letter-spacing: 0.08em; transition: gap .2s ease; }
.mb-link-arrow:hover { text-shadow: 0 0 12px rgba(111,163,208,0.6); }

/* Gallery */
.mb-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.mb-gallery-item { overflow: hidden; border-radius: 8px; border: 1px solid var(--gold-soft); aspect-ratio: 4/3; }
.mb-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; filter: grayscale(0.3); }
.mb-gallery-item:hover img { transform: scale(1.05); filter: grayscale(0); }

/* Pricing cards */
.mb-price { padding: 2.5rem 2rem; position: relative; display: flex; flex-direction: column; }
.mb-price.is-featured { border-color: var(--gold); box-shadow: 0 0 32px rgba(111,163,208,0.2); }
.mb-badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: var(--gold); color: #0A0A0A; padding: .35rem 1rem; font-size: 11px;
  letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; border-radius: 2px;
}
.mb-list { list-style: none; padding: 0; margin: 1rem 0 1.5rem; color: var(--muted); font-size: 15px; }
.mb-list li { padding: .5rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.mb-price-tag { font-family: 'Inter', sans-serif; font-weight: 300; color: var(--gold); font-size: 26px; letter-spacing: -0.02em; margin: 1rem 0 1.5rem; }

/* Progress */
.mb-progress { position: relative; padding: 2rem 0; }
.mb-progress-track {
  position: absolute; top: 50px; left: 5%; right: 5%; height: 2px;
  background: rgba(255,255,255,0.08);
}
.mb-progress-fill {
  height: 100%; width: var(--fill, 0%);
  background: linear-gradient(90deg, var(--gold), rgba(111,163,208,0.6));
  transition: width .2s linear;
}
.mb-progress-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; position: relative; }
.mb-progress-step { text-align: center; }
.mb-progress-circle {
  width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 1rem;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg); border: 2px solid var(--gold); color: var(--gold);
  font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 500; letter-spacing: 0.02em;
  position: relative; z-index: 2;
}

/* Price list */
.mb-price-list { display: flex; flex-direction: column; gap: .75rem; }
.mb-price-row {
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem;
  padding: 1.25rem 1.5rem; align-items: center;
}
.mb-price-l { font-weight: 400; }
.mb-price-f { color: var(--muted); font-size: 14px; }
.mb-price-p { color: var(--gold); text-align: right; font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px; letter-spacing: 0.02em; }
.mb-note { text-align: center; color: var(--muted); font-size: 13px; margin-top: 1.5rem; }

/* Contact */
.mb-contact { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.mb-form { padding: 2rem; display: flex; flex-direction: column; gap: 1rem; }
.mb-form label { display: flex; flex-direction: column; gap: .4rem; font-size: 13px; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }
.mb-form input, .mb-form select, .mb-form textarea {
  background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08);
  color: var(--text); padding: .85rem 1rem; border-radius: 4px;
  font-family: inherit; font-size: 15px; font-weight: 300;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.mb-form input:focus, .mb-form select:focus, .mb-form textarea:focus {
  outline: 0; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(111,163,208,0.15);
}
.mb-form-msg { color: var(--gold); font-size: 14px; margin: 0; }
.mb-contact-card { padding: 2rem; display: flex; flex-direction: column; gap: 1rem; }
.mb-contact-row { display: flex; align-items: center; gap: .75rem; padding: .5rem 0; font-size: 15px; }
.mb-contact-row:hover { color: var(--gold); }
.mb-ic { color: var(--gold); width: 24px; display: inline-flex; justify-content: center; }
.mb-map { width: 100%; height: 220px; border: 0; border-radius: 8px; filter: grayscale(0.4) invert(0.9) contrast(0.9); margin-top: .5rem; }
.mb-socials { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1rem; }
.mb-social {
  padding: .5rem 1rem; border: 1px solid var(--gold-soft); border-radius: 999px;
  font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--text);
  transition: all .25s ease;
}
.mb-social:hover { background: var(--gold); color: #0A0A0A; box-shadow: 0 0 16px rgba(111,163,208,0.4); }

/* Footer */
.mb-footer { background: #060606; padding: 3rem 0 2rem; border-top: 1px solid var(--gold-soft); }
.mb-footer-inner { display: flex; flex-wrap: wrap; gap: 2rem; justify-content: space-between; align-items: center; }
.mb-claim { font-family: 'Inter', sans-serif; font-weight: 300; color: var(--muted); font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase; margin: .5rem 0 0; }
.mb-footer-links { display: flex; gap: 1.5rem; }
.mb-footer-links a { font-size: 13px; color: var(--muted); }
.mb-footer-links a:hover { color: var(--gold); }
.mb-copy { text-align: center; color: var(--muted); font-size: 12px; margin-top: 2rem; padding: 0 1.5rem; }

/* Responsive */
@media (max-width: 960px) {
  .mb-nav-links { display: none; }
  .mb-burger { display: flex; }
  .mb-about { grid-template-columns: 1fr; gap: 3rem; }
  .mb-grid-3, .mb-grid-4 { grid-template-columns: 1fr; }
  .mb-gallery { grid-template-columns: repeat(2, 1fr); }
  .mb-progress-steps { grid-template-columns: 1fr 1fr; }
  .mb-progress-track { display: none; }
  .mb-contact { grid-template-columns: 1fr; }
  .mb-price-row { grid-template-columns: 1fr; text-align: left; gap: .25rem; }
  .mb-price-p { text-align: left; }
  .mb-section { padding: 4rem 0; }
}
@media (max-width: 480px) {
  .mb-stats { grid-template-columns: 1fr; }
  .mb-progress-steps { grid-template-columns: 1fr; }
}

/* ===== Awards / Credits ===== */
.mb-section-credits { padding: 4rem 0; background: linear-gradient(180deg, #0A0A0A 0%, #0d0d0d 100%); }
.mb-award { display: flex; justify-content: center; margin-bottom: 3rem; }
.mb-award-badge {
  display: flex; align-items: center; gap: 1.5rem;
  padding: 1.5rem 2.25rem;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(111,163,208,0.12), rgba(111,163,208,0.04));
  border: 1px solid var(--gold);
  box-shadow: 0 0 40px rgba(111,163,208,0.18), inset 0 1px 0 rgba(255,255,255,0.05);
  max-width: 640px;
}
.mb-award-star {
  font-size: 44px; color: var(--gold);
  text-shadow: 0 0 24px rgba(111,163,208,0.6);
  line-height: 1;
}
.mb-credit-block { text-align: center; margin: 2.5rem 0; }
.mb-marquee-row {
  display: flex; flex-wrap: wrap; justify-content: center; gap: .65rem;
  margin-top: 1rem;
}
.mb-credit-chip {
  font-family: 'Inter', sans-serif; font-weight: 500;
  font-size: 13px; color: var(--gold); letter-spacing: 0.15em; text-transform: uppercase;
  padding: .5rem 1.25rem;
  border: 1px solid var(--gold-soft); border-radius: 999px;
  background: rgba(111,163,208,0.04);
  transition: all .25s ease;
}
.mb-credit-chip:hover { background: rgba(111,163,208,0.15); box-shadow: 0 0 18px rgba(111,163,208,0.3); }
.mb-credit-chip-soft { color: var(--text); font-style: normal; font-weight: 400; font-family: 'Inter', sans-serif; font-size: 14px; letter-spacing: .05em; }

/* ===== Pricing blocks ===== */
.mb-block { margin: 4rem 0; }
.mb-block:first-of-type { margin-top: 2rem; }
.mb-block-head { text-align: center; margin-bottom: 2.5rem; }
.mb-block-title {
  font-size: 36px !important;
  background: linear-gradient(180deg, #A9C7E8 0%, #6FA3D0 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
.mb-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.mb-list-check { list-style: none; padding: 0; }
.mb-list-check li {
  position: relative; padding: .5rem 0 .5rem 1.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  color: var(--text); font-size: 15px;
}
.mb-list-check li::before {
  content: "✓"; position: absolute; left: 0; top: .5rem;
  color: var(--gold); font-weight: 700;
}
.mb-badge-soft {
  background: rgba(111,163,208,0.15) !important;
  color: var(--gold) !important;
  border: 1px solid var(--gold);
}
.mb-note-gold {
  color: var(--gold) !important;
  font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;
  margin-top: 2rem;
}

/* ===== Retainer (Block 4) ===== */
.mb-retainer {
  position: relative;
  border-radius: 18px;
  padding: 2px;
  background: linear-gradient(135deg, #6FA3D0 0%, rgba(111,163,208,0.3) 40%, rgba(111,163,208,0.6) 70%, #A9C7E8 100%);
  overflow: hidden;
}
.mb-retainer-glow {
  position: absolute; inset: -50%;
  background: radial-gradient(circle at 30% 30%, rgba(111,163,208,0.35), transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(240,215,140,0.25), transparent 50%);
  animation: spin 18s linear infinite;
  pointer-events: none;
}
@keyframes spin { to { transform: rotate(360deg); } }
.mb-retainer-inner {
  position: relative;
  background: #0A0A0A;
  border-radius: 16px;
  padding: 3rem 2.5rem;
  backdrop-filter: blur(20px);
}
.mb-retainer-head { text-align: center; margin-bottom: 2rem; }
.mb-retainer-price { display: flex; align-items: baseline; justify-content: center; gap: .5rem; margin-top: 1rem; }
.mb-star { color: var(--gold); text-shadow: 0 0 18px rgba(111,163,208,0.7); }
.mb-retainer-list { max-width: 560px; margin: 0 auto 1.5rem; font-size: 16px; }
.mb-retainer-list li { padding-top: .75rem; padding-bottom: .75rem; }
.mb-btn-xl { padding: 1.1rem 2.5rem; font-size: 15px; letter-spacing: .18em; }

@media (max-width: 768px) {
  .mb-grid-2 { grid-template-columns: 1fr; }
  .mb-award-badge { flex-direction: column; text-align: center; gap: 1rem; padding: 1.5rem; }
  .mb-retainer-inner { padding: 2rem 1.25rem; }
  .mb-credit-chip { font-size: 16px; padding: .4rem 1rem; }
  .mb-block-title { font-size: 28px !important; }
}

/* ===== Stats (typografisch, ohne Karten) ===== */
.mb-stats-line {
  display: grid; grid-template-columns: repeat(3, 1fr);
  margin: 2.5rem 0 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  perspective: 1200px;
}
.mb-stat-min {
  text-align: center; padding: 1.5rem .5rem;
  display: flex; flex-direction: column; gap: .4rem;
  transform-style: preserve-3d;
  transition: background 400ms ease, box-shadow 400ms ease;
}
.mb-stat-min + .mb-stat-min { border-left: 1px solid rgba(255,255,255,0.08); }
.mb-stat-min .mb-stat-n {
  font-size: 42px;
  display: inline-block;
  transform-style: preserve-3d;
  transform: translateZ(0) rotateX(0) rotateY(0);
  transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1), text-shadow 900ms cubic-bezier(0.16, 1, 0.3, 1), color 600ms ease;
  text-shadow:
    0 1px 0 rgba(255,255,255,0.05),
    0 2px 0 rgba(255,255,255,0.04),
    0 3px 0 rgba(255,255,255,0.03);
  will-change: transform;
  animation: mb-stat-float 6s ease-in-out infinite;
}
.mb-stat-min:nth-child(2) .mb-stat-n { animation-delay: -2s; }
.mb-stat-min:nth-child(3) .mb-stat-n { animation-delay: -4s; }
.mb-stat-min:hover {
  background: rgba(111,163,208,0.05);
  box-shadow: inset 0 0 60px rgba(111,163,208,0.08);
}
.mb-stat-min:hover .mb-stat-n {
  color: var(--gold);
  transform: translateZ(64px) rotateX(-14deg) rotateY(10deg) scale(1.12);
  text-shadow:
    0 1px 0 rgba(255,255,255,0.12),
    0 2px 0 rgba(255,255,255,0.10),
    0 3px 0 rgba(255,255,255,0.08),
    0 8px 24px rgba(111,163,208,0.45),
    0 18px 40px rgba(0,0,0,0.55),
    0 0 70px rgba(111,163,208,0.25);
}
.mb-stat-min .mb-stat-l { font-size: 11px; letter-spacing: .2em; transition: color 300ms ease; }
.mb-stat-min:hover .mb-stat-l { color: var(--gold); }

@keyframes mb-stat-float {
  0%, 100% { transform: translateZ(0) rotateX(0) rotateY(0); }
  25%      { transform: translateZ(18px) rotateX(-4deg) rotateY(4deg); }
  50%      { transform: translateZ(26px) rotateX(-2deg) rotateY(6deg); }
  75%      { transform: translateZ(14px) rotateX(-5deg) rotateY(2deg); }
}
@media (prefers-reduced-motion: reduce) {
  .mb-stat-min .mb-stat-n { animation: none; transition: none; }
}


/* ===== Service cards (no emoji, numbered, quieter) ===== */
.mb-service {
  position: relative;
  padding: 2.75rem 2.25rem;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 4px;
  height: 100%;
  display: flex; flex-direction: column;
  transition: border-color .4s ease, background .4s ease;
}
.mb-service:hover { border-color: rgba(111,163,208,0.35); background: rgba(255,255,255,0.015); }
.mb-service-rule {
  display: block; width: 36px; height: 1px;
  background: var(--gold); margin-bottom: 1.25rem; opacity: .8;
}
.mb-service-num {
  display: block; font-size: 11px; letter-spacing: .3em;
  color: var(--muted); text-transform: uppercase; margin-bottom: .65rem;
  font-weight: 400;
}
.mb-service-title { margin-bottom: 1rem; }

/* ===== Recognition (dezent, vor Footer) ===== */
.mb-recognition {
  padding: 5rem 0 4rem;
  background: #060606;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.mb-recognition-award {
  display: flex; flex-direction: column; align-items: center;
  gap: 1rem; text-align: center;
  max-width: 720px; margin: 0 auto 4rem;
}
.mb-recognition-rule {
  display: block; width: 64px; height: 1px;
  background: rgba(111,163,208,0.5);
}
.mb-recognition-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; color: var(--text);
  margin: 0; letter-spacing: .02em;
}
.mb-recognition-title em {
  color: var(--gold); font-style: normal; font-weight: 500;
}
.mb-recognition-sub {
  margin: 0; font-size: 12px; letter-spacing: .15em;
  color: var(--muted); text-transform: uppercase;
}
.mb-recognition-credits { text-align: center; max-width: 920px; margin: 0 auto; }
.mb-recognition-label { color: var(--muted) !important; font-size: 10px; }
.mb-credits-line {
  margin: .75rem 0 0;
  font-size: 11px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(240,240,240,0.55);
  line-height: 2.4;
}

@media (max-width: 768px) {
  .mb-stats-line { grid-template-columns: 1fr; }
  .mb-stat-min + .mb-stat-min { border-left: 0; border-top: 1px solid rgba(255,255,255,0.08); }
  .mb-service { padding: 2rem 1.5rem; }
  .mb-credits-line { font-size: 10px; letter-spacing: .15em; }
}
`;



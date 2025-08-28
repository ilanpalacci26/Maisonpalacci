import React, { useMemo, useState } from "react";

// =====================
// Données du site
// =====================
const CATALOG_IMAGES = [
  { src: "https://images.unsplash.com/photo-1516763299515-cf4bde41a4f2?q=80&w=1600&auto=format&fit=crop", alt: "Atelier couture — mannequin" },
  { src: "https://images.unsplash.com/photo-1520975693411-94f797bb3c1b?q=80&w=1600&auto=format&fit=crop", alt: "Détails de tissu soie" },
  { src: "https://images.unsplash.com/photo-1542060748-10c28b62716d?q=80&w=1600&auto=format&fit=crop", alt: "Table de coupe couture" },
  { src: "https://images.unsplash.com/photo-1520975842173-8b6835f2f1b4?q=80&w=1600&auto=format&fit=crop", alt: "Broderie main haute couture" },
  { src: "https://images.unsplash.com/photo-1542060747-8b8a9b5fbd69?q=80&w=1600&auto=format&fit=crop", alt: "Épingles et patron papier" },
  { src: "https://images.unsplash.com/photo-1520975962035-1282d8f7f1c1?q=80&w=1600&auto=format&fit=crop", alt: "Dentelle et perles" },
  { src: "https://images.unsplash.com/photo-1495401862217-02fa3a3dc639?q=80&w=1600&auto=format&fit=crop", alt: "Roulette et mètre ruban" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop", alt: "Couturière au travail" },
  { src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop", alt: "Tissus suspendus pastel" },
  { src: "https://images.unsplash.com/photo-1520975693411-7f3bd1ca03d1?q=80&w=1600&auto=format&fit=crop", alt: "Silhouette robe en toile" },
  { src: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1600&auto=format&fit=crop", alt: "Aiguilles et bobines" },
  { src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop", alt: "Tissus plissés" }
];

const FORMULES = [
  { title: "Sur-mesure", img: "https://images.unsplash.com/photo-1515734674582-29010bb37906?q=80&w=1600&auto=format&fit=crop", details: "Création unique, toile et essayages. Idéal pour une pièce iconique Maison Palacci." },
  { title: "Demi-mesure", img: "https://images.unsplash.com/photo-1516763299515-cf4bde41a4f2?q=80&w=1600&auto=format&fit=crop", details: "Base de collection adaptée à votre morphologie et votre style." },
  { title: "Retouches premium", img: "https://images.unsplash.com/photo-1520975693411-94f797bb3c1b?q=80&w=1600&auto=format&fit=crop", details: "Ajustements raffinés et finitions haute couture." },
];

const TESTIMONIALS = [
  { quote: "Pièce sublime, service impeccable. On se sent réellement écoutée et guidée.", author: "Sarah B." },
  { quote: "Détails impeccables, tombé parfait. Une expérience maison de couture.", author: "Maya R." },
  { quote: "Du croquis au dernier essayage, un accompagnement très professionnel.", author: "Léa K." },
];

const WHATSAPP_INTL = "972587786721";
const WHATSAPP_MESSAGE = encodeURIComponent("Bonjour, je souhaite une recommandation et plus de détails sur vos créations.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_INTL}?text=${WHATSAPP_MESSAGE}`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("3 David Pinkas")}`;

// =====================
// Composants utilitaires
// =====================
function SectionTitle({ children, id }) {
  return <h2 id={id} className="text-2xl md:text-3xl font-semibold mb-6 tracking-tight">{children}</h2>;
}
function Card({ children }) {
  return <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur p-6 shadow-sm">{children}</div>;
}

// =====================
// Header
// =====================
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#accueil", label: "Accueil" },
    { href: "#catalogue", label: "Catalogue" },
    { href: "#formules", label: "Nos formules" },
    { href: "#recommandations", label: "Recommandations" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#F6EEE9]/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#accueil" className="text-lg md:text-xl font-semibold tracking-wide text-black">
          MAISON <span className="tracking-[0.3em]">PALACCI</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-black">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:opacity-70">{l.label}</a>
          ))}
        </nav>

        {/* Burger (mobile) */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="text-2xl leading-none">≡</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-black/5 bg-[#F6EEE9]">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-black">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// =====================
// Hero
// =====================
function Hero() {
  return (
    <section
      id="accueil"
      className="min-h-[90vh] flex items-center bg-[#F6EEE9]"
    >
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.15em] text-black">
            MAISON PALACCI
          </h1>
          <p className="mt-4 text-sm md:text-base text-black/70 tracking-wide">
            ARTISANAL HAUTE COUTURE · JERUSALEM
          </p>

          {/* Boutons (optionnels) */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#catalogue"
              className="px-6 py-3 rounded-xl border border-black/20 text-black hover:bg-black hover:text-white transition"
            >
              Découvrir le catalogue
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-black text-white hover:opacity-90 transition"
            >
              Book a consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================
// Lazy image + Carousel
// =====================
function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="w-full h-full relative">
      {!loaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
      <img src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} className={`w-full h-full object-cover transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
function Carousel() {
  const [index, setIndex] = useState(0);
  const last = CATALOG_IMAGES.length - 1;
  const prev = () => setIndex(index === 0 ? last : index - 1);
  const next = () => setIndex(index === last ? 0 : index + 1);
  const current = CATALOG_IMAGES[index];
  const prevIndex = index === 0 ? last : index - 1;
  const nextIndex = index === last ? 0 : index + 1;
  const preload = useMemo(() => [CATALOG_IMAGES[prevIndex], CATALOG_IMAGES[nextIndex]], [prevIndex, nextIndex]);

  return (
    <div className="relative">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
        <LazyImage src={current.src} alt={current.alt} />
      </div>
      <div className="hidden">{preload.map((p, i) => (<img key={i} src={p.src} alt="" aria-hidden="true" />))}</div>
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 border">‹</button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 border">›</button>
      <div className="mt-3 flex items-center justify-center gap-2">
        {CATALOG_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-2 w-2 rounded-full ${i === index ? "bg-gray-900" : "bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
}

// =====================
// Sections
// =====================
function CatalogueSection() { return <section id="catalogue" className="max-w-6xl mx-auto px-4 py-14"><SectionTitle>Catalogue</SectionTitle><Card><Carousel /></Card></section>; }
function FormulesSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="formules" className="max-w-6xl mx-auto px-4 py-14">
      <SectionTitle>Nos formules</SectionTitle>
      <div className="grid md:grid-cols-3 gap-6">
        {FORMULES.map((f, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)} className="cursor-pointer">
            <img src={f.img} alt={f.title} className="rounded-3xl h-64 w-full object-cover border" />
            <h3 className="mt-3 font-semibold">{f.title}</h3>
            {open === i && <p className="mt-2 text-sm text-gray-600">{f.details}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
function RecommandationsSection() {
  return (
    <section id="recommandations" className="max-w-6xl mx-auto px-4 py-14">
      <SectionTitle>Recommandations</SectionTitle>
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <Card key={idx}>
            <p className="italic">“{t.quote}”</p>
            <p className="mt-3 text-sm text-gray-500">— {t.author}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
function ContactSection() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-14">
      <SectionTitle>Contact</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-2">WhatsApp</h3>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl bg-emerald-500 text-white">Ouvrir WhatsApp</a>
          <p className="mt-2 text-sm text-gray-500">Numéro : 058 778 6721</p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2">Adresse</h3>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl border border-gray-300">Ouvrir dans Google Maps</a>
        </Card>
      </div>
    </section>
  );
}
function Footer() { return <footer className="border-t"><div className="max-w-6xl mx-auto px-4 py-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} MAISON PALACCI • Haute couture — Tel-Aviv</div></footer>; }
function WhatsAppFab() { return <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 rounded-full px-5 py-3 bg-emerald-500 text-white shadow-lg">WhatsApp</a>; }

// =====================
// App
// =====================
export default function App() {
  return (
    <div className="text-gray-900">
      <Header />
      <Hero />
      <CatalogueSection />
      <FormulesSection />
      <RecommandationsSection />
      <ContactSection />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

import React, { useMemo, useState } from "react";
import { MapPin, MessageCircle, Instagram } from "lucide-react";


// Icône WhatsApp (SVG)
function IconWhatsApp({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.54 4.08 1.49 5.8L0 24l6.35-1.66A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.96 9.96 0 01-5.08-1.39l-.36-.21-3.77.99.99-3.77-.21-.36A9.96 9.96 0 012 12C2 6.49 6.49 2 12 2s10 4.49 10 10-4.49 10-10 10zm5.2-7.2c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.3-.74.93-.9 1.12-.17.2-.33.22-.62.07-.29-.15-1.23-.45-2.35-1.44-.87-.77-1.45-1.72-1.62-2-.17-.3 0-.46.14-.61.14-.14.3-.37.45-.56.15-.19.2-.33.3-.55.1-.22.05-.41-.02-.56-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.37-.26.3-1 1-1 2.44s1.03 2.83 1.17 3.03c.15.2 2.03 3.1 4.91 4.34.69.3 1.22.48 1.64.62.69.22 1.32.19 1.82.12.56-.08 1.7-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
    </svg>
  );
}

// Icône Instagram (SVG)
function IconInstagram({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2.2A2.8 2.8 0 1014.8 12 2.8 2.8 0 0012 9.2zM17.5 6.75a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25z" />
    </svg>
  );
}

// Icône épingle (MapPin) (SVG)
function IconMapPin({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z" />
    </svg>
  );
}


// =====================
// Données du site
// =====================
const CATALOG_IMAGES = [
  { src: "/galerie/Dream3.jpeg", alt: "Dream" },
  { src: "/galerie/Dream1.jpeg", alt: "Dream" },
  { src: "/galerie/Dream2.jpeg", alt: "Dream" },
  { src: "/galerie/Purple1.jpeg", alt: "Purple" },
  { src: "/galerie/Ocean1.jpeg", alt: "Purple" },
  { src: "/galerie/Casual1.jpeg", alt: "Purple" }
];

const FORMULES = [
  {
    key: "custom_buy",
    title: "Création personnalisée",
    variant: "Achat",
    details:
      "Pièce conçue pour vous, propriété finale. Croquis, toile, essayages et finitions haute couture.",
  },
  {
    key: "custom_rent",
    title: "Création personnalisée",
    variant: "Location",
    details:
      "Pièce sur-mesure pour l’événement, restitution après usage. Entretien et ajustements inclus.",
  },

  {
    key: "demi_buy",
    title: "Demi-mesure",
    variant: "Achat",
    details:
      "Base existante adaptée à votre morphologie, finitions personnalisées. Vous gardez la pièce.",
  },
  
  {
    key: "demi_rent",
    title: "Demi-mesure",
    variant: "Location",
    details:
      "Modèle de collection ajusté à vos mesures pour la location. Idéal pour une soirée unique.",
  },
  
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
    { href: "#catalogue", label: "Galerie" },
    { href: "#formules", label: "Nos offres" },
    { href: "#recommandations", label: "avis" },
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
      className="min-h-[90vh] flex items-center"
    >
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.15em] text-black">
            MAISON PALACCI
          </h1>
          <p className="mt-4 text-sm md:text-base text-black/70 tracking-wide">
           SUR-MESURE • ROBE DE MARIÉE - ROBE DE SOIRÉE • JERUSALEM
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
              Prendre un rendez-vous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================
// smart image + Carousel
// =====================
// Affiche toujours l'image entière, en s'adaptant au format (portrait/paysage)
function SmartImage({ src, alt, eager = false }) {
  const [loaded, setLoaded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  return (
    <div className="relative w-full flex items-center justify-center bg-black/[.03] rounded-3xl border border-black/10">
      {/* Skeleton */}
      {!loaded && <div className="absolute inset-0 animate-pulse bg-black/[.03] rounded-3xl" />}

      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={(e) => {
          const { naturalWidth, naturalHeight } = e.currentTarget;
          setIsPortrait(naturalHeight > naturalWidth);
          setLoaded(true);
        }}
        // Portrait : limité en hauteur ; Paysage : limité en largeur
        className={[
          "transition-opacity",
          loaded ? "opacity-100" : "opacity-0",
          isPortrait
            ? "max-h-[60vh] w-auto h-auto object-contain"
            : "max-h-[60vh] w-auto h-auto object-contain"
        ].join(" ")}
      />
    </div>
  );
}
function Carousel() {
  const [index, setIndex] = useState(0);
  const total = CATALOG_IMAGES.length;

  const go = (i) => setIndex((i + total) % total);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const current = CATALOG_IMAGES[index];
  const prevIdx = (index - 1 + total) % total;
  const nextIdx = (index + 1) % total;

  return (
    <div className="relative">
      {/* Image principale — hauteur auto selon image (pas d'aspect forcé) */}
      <div className="w-full flex justify-center">
        <SmartImage src={current.src} alt={current.alt || `Image ${index + 1}`} eager />
      </div>

      {/* Flèches */}
      <button
        aria-label="Précédent"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-black"
      >
        ‹
      </button>
      <button
        aria-label="Suivant"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-black"
      >
        ›
      </button>

      {/* Bandeau d’aperçus : AVANT / APRÈS (petit) + bullets */}
      <div className="mt-3 grid grid-cols-3 gap-3 items-center">
        {/* Avant */}
        <button
          onClick={prev}
          className="w-full h-20 md:h-24 overflow-hidden rounded-xl border border-black/10 bg-white/40"
          aria-label="Voir l’image précédente"
          title="Précédent"
        >
          <img
            src={CATALOG_IMAGES[prevIdx].src}
            alt=""
            className="w-full h-full object-cover opacity-80 hover:opacity-100"
          />
        </button>

        {/* Bullets */}
        <div className="flex items-center justify-center gap-2">
          {CATALOG_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Aller à l’image ${i + 1}`}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-black" : "bg-black/30"}`}
            />
          ))}
        </div>

        {/* Après */}
        <button
          onClick={next}
          className="w-full h-20 md:h-24 overflow-hidden rounded-xl border border-black/10 bg-white/40"
          aria-label="Voir l’image suivante"
          title="Suivant"
        >
          <img
            src={CATALOG_IMAGES[nextIdx].src}
            alt=""
            className="w-full h-full object-cover opacity-80 hover:opacity-100"
          />
        </button>
      </div>
    </div>
  );
}
// =====================
// Sections
// =====================
function CatalogueSection() { return <section id="catalogue" className="max-w-6xl mx-auto px-4 py-14"><SectionTitle>Catalogue</SectionTitle><Card><Carousel /></Card></section>; }
function FormulesSection() {
  const [active, setActive] = useState(FORMULES[0].key);

  // pour ouvrir WhatsApp avec la formule choisie
  const selected = FORMULES.find(f => f.key === active);
  const wa = `${WHATSAPP_URL}&text=${encodeURIComponent(
    `Bonjour, je suis intéressé par: ${selected.title} — ${selected.variant}.`
  )}`;

  return (
    <section id="formules" className="max-w-6xl mx-auto px-4 py-14">
      <SectionTitle>Nos formules</SectionTitle>

      {/* Grille compacte: mobile 2x2, desktop 4 colonnes — sans grosses images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {FORMULES.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={[
                "aspect-square rounded-2xl border text-left p-3 md:p-4",
                "transition hover:shadow-sm",
                isActive ? "border-black bg-black text-white" : "border-black/15 bg-transparent text-black"
              ].join(" ")}
              aria-pressed={isActive}
            >
              <span className="block text-xs uppercase tracking-wide opacity-70">
                {f.title}
              </span>
              <span className="block mt-1 text-sm md:text-base font-semibold">
                {f.variant}
              </span>
            </button>
          );
        })}
      </div>

      {/* Détail concis de l’option sélectionnée + CTA — reste compact sur mobile */}
      <div className="mt-6 md:mt-8 max-w-3xl">
        <h3 className="font-semibold text-black">
          {selected.title} — {selected.variant}
        </h3>
        <p className="mt-2 text-sm text-black/70">{selected.details}</p>
        <div className="mt-4 flex gap-3">
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-black text-white hover:opacity-90"
          >
            Demander un devis sur WhatsApp
          </a>
          <a href="#catalogue" className="px-5 py-3 rounded-xl border border-black/20 hover:bg-black hover:text-white">
            Voir le catalogue
          </a>
        </div>
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
function ContactSection({ lang }) {
  const waUrl = makeWhatsAppUrl({ lang, source: "contact", meta: { pageUrl: location.href } });

  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 py-20 text-center">
      <SectionTitle>{t("sections.contact", lang)}</SectionTitle>

      {/* Adresse */}
      <div className="flex items-center justify-center gap-2 mt-4 text-black/80">
        <MapPin className="w-5 h-5 text-black/60" />
        <span>{t("contact.address", lang)}</span>
      </div>

     {/* Boutons */}
<div className="mt-8 flex items-center justify-center gap-6">
  {/* WhatsApp bouton circulaire */}
  <a
    href={waUrl}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 transition"
    aria-label="WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-white" />
  </a>

  {/* Instagram bouton circulaire */}
  <a
    href={INSTA_URL}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90 transition"
    aria-label="Instagram"
  >
    <Instagram className="w-7 h-7 text-white" />
  </a>

  {/* Google Maps bouton rectangulaire */}
  <a
    href={MAPS_URL}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-black/20 text-black hover:bg-black hover:text-white transition"
  >
    <MapPin className="w-5 h-5" />
    {t("contact.maps", lang)}
  </a>
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
    <div className="text-gray-900 bg-[#F6EEE9]">   {/* <- ICI */}
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

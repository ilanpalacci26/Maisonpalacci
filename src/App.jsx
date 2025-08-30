import React, { useMemo, useState } from "react";

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
      "Conçue spécialement pour vous, du croquis jusqu'à sa réalisation: une création unique que vous gardez.",
  },
  {
    key: "custom_rent",
    title: "Création personnalisée",
    variant: "Location",
    details:
      "Conçue spécialement pour vous, du croquis jusqu'à sa réalisation: une création unique que vous porterez pour une unqiue occasion.",
  },

  {
    key: "demi_buy",
    title: "Demi-mesure",
    variant: "Achat",
    details:
      "Choisissez votre modèle coup de coeur parmi nos créations uniques tout en l'adaptant à vos mensurations.",
  },
  
  {
    key: "demi_rent",
    title: "Demi-mesure",
    variant: "Location",
    details:
      "Choisissez votre modèle coup de coeur parmi nos créations uniques en l'adaptant à vos mensurations, profitez en pour une occasion d'un soir.",
  },
  
];

const TESTIMONIALS = [
  { quote: "Pièce sublime, service impeccable. On se sent réellement écoutée et guidée.", author: "Sarah B." },
  { quote: "Détails impeccables, tombé parfait. Une expérience maison de couture.", author: "Maya R." },
  { quote: "Du croquis au dernier essayage, un accompagnement très professionnel.", author: "Léa K." },
];

const WHATSAPP_INTL = "972587786722";
const WHATSAPP_MESSAGE = encodeURIComponent("Bonjour, je serais ravie d’avoir plus de détails sur vos créations et vos conseils.");
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
function ContactSection() {
  // Message WhatsApp pré-rempli en français
  const msg = encodeURIComponent(
    "Bonjour, je serais ravie d’avoir plus de détails sur vos créations et vos conseils personnalisés, et je vous remercie par avance de me recontacter."
  );
  const waUrl = `https://wa.me/${WHATSAPP_INTL}?text=${msg}`;

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-20">
      {/* Titre + sous-titre */}
      <div className="text-center">
        <SectionTitle>Contact</SectionTitle>
        <p className="text-sm md:text-base text-black/70">
          Nous revenons vers vous rapidement — par WhatsApp, sur Instagram ou à l’atelier.
        </p>
      </div>

      {/* Grille pro : Adresse / WhatsApp / Instagram */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {/* Bloc Adresse */}
        <div className="text-center md:text-left">
          <div className="flex md:inline-flex items-center justify-center md:justify-start gap-2 text-black">
            <IconMapPin className="w-5 h-5 text-black/70" />
            <span className="font-medium">3 David Pinkas — Jérusalem</span>
          </div>
          <div className="mt-4">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/20 text-black hover:bg-black hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            >
              <IconMapPin className="w-5 h-5" />
              Ouvrir dans Google Maps
            </a>
          </div>
          <p className="mt-3 text-xs text-black/50">Stationnement à proximité</p>
        </div>

        {/* Bloc WhatsApp */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            >
              <IconWhatsApp className="w-8 h-8 text-white" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium">WhatsApp — réponse rapide</p>
            <p className="text-xs text-black/60 mt-1">
              Message pré-rempli pour un premier échange
            </p>
          </div>
        </div>

        {/* Bloc Instagram */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <a
              href={INSTA_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-700"
            >
              <IconInstagram className="w-8 h-8 text-white" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium">Suivez notre univers</p>
            <p className="text-xs text-black/60 mt-1">
              Actualités, coulisses de l’atelier, nouveautés
            </p>
          </div>
        </div>
      </div>

      {/* Ligne de réassurance */}
      <p className="mt-10 text-center text-xs text-black/50">
        Messages lus quotidiennement — réponse rapide.
      </p>
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

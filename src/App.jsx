import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";

// =====================
// Données du site
// =====================
// ---- Collections + images taguées ----
const COLLECTIONS = [
  { key: "all",    label: "Tout" },
  { key: "soiree", label: "Robe de soirée" },
  { key: "mariee", label: "Robe de mariée" },
  { key: "shabbat hatan", label: "Shabat Hatan" },
  { key: "autre",  label: "Autre" },
];

const CATALOG_IMAGES = [
  // tague chaque image avec cat: "soiree" | "mariee" | "autre"
  { src: "/galerie/Dream3.jpeg",  alt: "Dream",   cat: "mariee" },
  { src: "/galerie/Dream1.jpeg",  alt: "Dream",   cat: "mariee" },
  { src: "/galerie/Dream2.jpeg",  alt: "Dream",   cat: "mariee" },
  { src: "/galerie/Empire1.jpeg", alt: "Empire",  cat: "shabbat hatan" },
  { src: "/galerie/Empire2.jpeg", alt: "Empire",  cat: "shabbat hatan" },
  { src: "/galerie/Purple1.jpeg", alt: "Purple",  cat: "soiree"  },
  { src: "/galerie/Purple2.jpeg", alt: "Purple",  cat: "soiree"  },
  { src: "/galerie/Ocean1.jpeg",  alt: "Ocean",   cat: "soiree"  },
  { src: "/galerie/Casual1.jpeg", alt: "Casual",  cat: "autre"  },
];
const FORMULES = [
  {
    key: "custom_buy",
    title: "Création sur-mesure",
    variant: "Achat",
    details:
      "Conçue spécialement pour vous, du croquis jusqu'à sa réalisation: une création unique que vous gardez.",
  },
  {
    key: "custom_rent",
    title: "Création sur-mesure",
    variant: "Location",
    details:
      "Conçue spécialement pour vous, du croquis jusqu'à sa réalisation: une création unique que vous porterez pour une unique occasion.",
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
const WHATSAPP_MESSAGE = encodeURIComponent("Bonjour, je serais ravie d’avoir plus de détails sur vos créations.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_INTL}?text=${WHATSAPP_MESSAGE}`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("3 David Pinkas, Jérusalem")}`;
// =====================
// Composants utilitaires
// =====================
function SectionTitle({ children, id }) {
  return (
    <h2
      id={id}
      className="
        text-lg md:text-xl           /* plus petit */
        font-light                   /* finesse */
        tracking-[0.25em]            /* espace entre lettres */
        uppercase                    /* optionnel si tu veux TOUT en capitales */
        mb-8
        text-black/80
      "
    >
      {children}
    </h2>
  );
}
function Card({ children }) {
  return <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur p-6 shadow-sm">{children}</div>;
}

// =====================
// Header
// =====================
function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // si on est sur specialis, on doit renvoyer vers "/#section"
  const base = pathname === "/catalogue" ? "/#" : "#";

  const links = [
    { href: `/#accueil`, label: "Accueil" },
    // la page galerie est la route /catalogue
    { href: "/catalogue", label: "Galerie", route: true },
    { href: `/#formules`, label: "Nos formules" },
    { href: `/#recommandations`, label: "Avis" },
    { href: `/#rendezvous`, label: "Prendre rendez-vous" },
    { href: `/#contact`, label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#F6EEE9]/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo renvoie toujours à la home */}
        <Link to="/" className="text-xl md:text-2xl font-normal text-black tracking-[0.15em]">
          MAISON PALACCI
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-black">
          {links.map((l) =>
            l.route ? (
              <Link key={l.label} to={l.href} className="hover:opacity-70">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="hover:opacity-70">
                {l.label}
              </a>
            )
          )}
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
            {links.map((l) =>
              l.route ? (
                <Link key={l.label} to={l.href} className="py-1" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} className="py-1" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
// =====================
// Hero
// =====================
// =====================
// Hero (version responsive compacte)
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
          {/* Sous-titre plus petit */}
          <p className="mt-3 text-xs md:text-sm text-black/70 tracking-[0.25em] uppercase">
            JÉRUSALEM
          </p>
          {/* Sous-titre plus petit */}
          <p className="mt-3 text-xs md:text-sm text-black/70 tracking-[0.25em] uppercase">
            SUR-MESURE | ROBE DE MARIÉE • ROBE DE SOIRÉE | 
          </p>

          {/* Boutons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="/catalogue"
              className="px-6 py-3 rounded-xl border border-[#E5D0C5] text-black hover:bg-[#E5D0C5] transition"
            >
              Découvrir la galerie
            </a>
            <a
  href="#rendezvous"
  className="px-6 py-3 rounded-xl border border-[#E5D0C5] text-black hover:bg-[#E5D0C5] transition"
>
  Prendre rendez-vous
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
// Cadre uniforme (même taille/ratio) + image jamais rognée
// Cadre uniforme (max 3/5 de la page) + image jamais rognée
function SmartImage({ src, alt, eager = false }) {
  return (
    <div
      className="
        relative mx-auto
        w-full max-w-[720px]
        aspect-[4/5]                   /* ratio uniforme */
        max-h-[60vh]                   /* max 3/5 de la page */
        rounded-3xl overflow-hidden
        
        bg-[#F6EEE9]
        flex items-center justify-center
      "
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}

function Carousel() {
  const [index, setIndex] = useState(0);
  const total = CATALOG_IMAGES.length;

  const go   = (i) => setIndex((i + total) % total);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const current = CATALOG_IMAGES[index];
  const prevIdx = (index - 1 + total) % total;
  const nextIdx = (index + 1) % total;

  return (
    <div className="relative">
      {/* Image principale */}
      <div className="w-full flex justify-center">
        <SmartImage
          src={current.src}
          alt={current.alt || `Image ${index + 1}`}
          eager
        />
      </div>

      {/* Flèches */}
      <button
        aria-label="Précédent"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#E5D0C5] text-black hover:bg-[#D9BFB2]"
      >
        ‹
      </button>
      <button
        aria-label="Suivant"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#E5D0C5] text-black hover:bg-[#D9BFB2]"
      >
        ›
      </button>

      {/* Bandeau d’aperçus */}
      <div className="mt-4 grid grid-cols-3 gap-3 items-center">
        {/* Vignette précédente */}
        <button
          onClick={prev}
          className="w-full aspect-[4/5] max-h-[20vh] overflow-hidden rounded-xl bg-[#F6EEE9]/40"
          aria-label="Voir l’image précédente"
          title="Précédent"
        >
          <img
            src={CATALOG_IMAGES[prevIdx].src}
            alt=""
            className="w-full h-full object-contain"
          />
        </button>

        {/* Bullets */}
        <div className="flex items-center justify-center gap-2">
          {CATALOG_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Aller à l’image ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-black" : "bg-black/30"
              }`}
            />
          ))}
        </div>

        {/* Vignette suivante */}
        <button
          onClick={next}
          className="w-full aspect-[4/5] max-h-[20vh] overflow-hidden rounded-xl /10 bg-[#F6EEE9]/40"
          aria-label="Voir l’image suivante"
          title="Suivant"
        >
          <img
            src={CATALOG_IMAGES[nextIdx].src}
            alt=""
            className="w-full h-full object-contain"
          />
        </button>
      </div>
    </div>
  );
}
// =====================
// Sections
// =====================
function CatalogueSection() { return <section id="catalogue" className="bg-[#F6EEE9] max-w-6xl mx-auto px-4 py-14 rounded-3xl"><SectionTitle>Galerie</SectionTitle><Carousel /></section>; }
function FormulesSection() {
  // aucune sélection par défaut
  const [active, setActive] = useState(null);

  // formule choisie (ou undefined si rien)
  const selected = FORMULES.find((f) => f.key === active);

  return (
    <section id="formules" className="max-w-6xl mx-auto px-4 py-14">
      <SectionTitle>Nos formules</SectionTitle>

      {/* Grille compacte : mobile 2x2, desktop 4 colonnes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {FORMULES.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              aria-pressed={isActive}
              className={[
                "w-full rounded-2xl border text-left p-3 md:p-4",
                "h-[calc(100vh/15)] min-h-[72px]",             // ~1/15 d'écran, garde-fou mobile
                "flex flex-col justify-center gap-0.5 leading-tight",
                "transition-colors duration-300 ease-in-out",
                isActive
                  ? "border-[#E5D0C5] bg-[#E5D0C5] text-black shadow-sm"
                  : "border-black/15 bg-transparent text-black hover:bg-black/[.03]"
              ].join(" ")}
            >
              <span className="block text-xs uppercase tracking-wide opacity-70">
                {f.title}
              </span>
              <span className="block mt-1 text-sm md:text-base font-normal">
                {f.variant}
              </span>
            </button>
          );
        })}
      </div>

      {/* Détails + CTA : affichés uniquement après sélection */}
      {selected && (
        <div className="mt-6 md:mt-8 max-w-3xl">
          <h3 className="font-normal text-black">
            {selected.title} — {selected.variant}
          </h3>
          <p className="mt-2 text-sm text-black/70">{selected.details}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`${WHATSAPP_URL}&text=${encodeURIComponent(
                `Bonjour, je suis intéressé par: ${selected.title} — ${selected.variant}.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl border border-[#E5D0C5] text-black transition-colors duration-300 ease-in-out hover:bg-[#E5D0C5]"
            >
              Demander un devis sur WhatsApp
            </a>

            <a
              href="/catalogue"
              className="px-5 py-3 rounded-xl border border-[#E5D0C5] text-black transition-colors duration-300 ease-in-out hover:bg-[#E5D0C5]"
            >
              Voir la galerie
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
function RecommandationsSection() {
  return (
    <section id="recommandations" className="max-w-6xl mx-auto px-4 py-14">
      <SectionTitle>Nos clientes ont aimé</SectionTitle>

      {/* 1 carte par ligne */}
      <div className="grid grid-cols-1 gap-4">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="
              rounded-2xl
              bg-[#E5D0C5]/35
              backdrop-blur-sm
              px-5 py-4
              shadow-sm
              border border-[#E5D0C5]/60
              max-h-[calc(100vh/13)]
              overflow-hidden
            "
          >
            <p className="italic text-black/80 leading-snug">
              “{t.quote}”
            </p>
            <p className="mt-1 text-xs text-black/60">— {t.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RendezVousSection() {
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [motif, setMotif] = React.useState("Conseil & découverte");

  const phoneIntl = "972587786722"; // ton numéro au format international

  const formatFr = (isoDate, isoTime) => {
    if (!isoDate) return "";
    // isoDate = "2025-09-06", isoTime = "14:30"
    const [y,m,d] = isoDate.split("-");
    const hhmm = isoTime || "—";
    return `${d}/${m}/${y} à ${hhmm}`;
  };

  const openWhatsApp = () => {
    if (!date) { alert("Choisis une date."); return; }
    const when = formatFr(date, time);
    const msg = `Bonjour, j’aimerais prendre rendez-vous.\n• Date souhaitée : ${when}\n• Motif : ${motif}\nMerci de me confirmer la disponibilité.`;
    const url = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  // (facultatif) Bloquer le samedi (Shabbat) côté UI :
  const disableSaturday = (e) => {
    const val = e.target.value; // "YYYY-MM-DD"
    if (!val) return;
    // 0=Dim ... 6=Sam
    const day = new Date(val + "T12:00:00").getDay();
    if (day === 6) {
      alert("Le samedi n’est pas réservable. Choisis un autre jour.");
      e.target.value = "";
      setDate("");
    }
  };

  return (
    <section id="rendezvous" className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-lg md:text-xl font-light tracking-[0.25em] mb-8 text-black/80 uppercase">
        Prendre rendez-vous
      </h2>

      <div className="rounded-2xl bg-white/50 backdrop-blur px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Date */}
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-black/70">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onBlur={disableSaturday} /* retire si tu ne veux pas bloquer le samedi */
              className="rounded-xl border border-[#E5D0C5] bg-white/70 px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5D0C5]"
            />
          </label>

          {/* Heure (facultatif) */}
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-black/70">Heure (optionnel)</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-xl border border-[#E5D0C5] bg-white/70 px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5D0C5]"
            />
          </label>

          {/* Motif */}
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-black/70">Motif</span>
            <select
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              className="rounded-xl border border-[#E5D0C5] bg-white/70 px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5D0C5]"
            >
              <option>Conseil & découverte</option>
              <option>Création sur-mesure (mariée)</option>
              <option>Création sur-mesure (soirée)</option>
              <option>Demi-mesure (achat)</option>
              <option>Demi-mesure (location)</option>
              <option>Autre</option>
            </select>
          </label>
        </div>

        <div className="mt-6">
          <button
            onClick={openWhatsApp}
            className="px-5 py-3 rounded-xl bg-[#E5D0C5] text-black transition-colors duration-300 ease-in-out hover:opacity-90"
          >
            Envoyer la demande sur WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}


function ContactSection() {
  // Petites icônes locales (SVG inline, aucune dépendance)
  const IconPin = (p) => (
    <svg viewBox="0 0 24 24" className={p.className || "w-5 h-5"} fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z"/>
    </svg>
  );
  const IconPhone = (p) => (
    <svg viewBox="0 0 24 24" className={p.className || "w-5 h-5"} fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.7 15.7 0 006.6 6.6l2.2-2.2a1.5 1.5 0 011.6-.35c1.1.44 2.3.67 3.5.67a1.5 1.5 0 011.5 1.5V20a2 2 0 01-2 2C10.7 22 2 13.3 2 3.5A2 2 0 014 2h2.98A1.5 1.5 0 018.5 3.5c0 1.2.23 2.4.67 3.5.2.54.07 1.15-.35 1.57L6.6 10.8z"/>
    </svg>
  );
  const IconMail = (p) => (
    <svg viewBox="0 0 24 24" className={p.className || "w-5 h-5"} fill="currentColor" aria-hidden="true">
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 3.2l-8 5-8-5V6l8 5 8-5v1.2z"/>
    </svg>
  );

  // Affichages utiles
  const phoneDisplay = "058 778 6722"; // s'affiche tel quel
  const telHref = `tel:${phoneDisplay.replace(/[^0-9+]/g, "")}`;

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-14">
      <SectionTitle>Contact</SectionTitle>

      {/* Grande "carte" pastel en 3 colonnes */}
      <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne 1 — Présentation */}
          <div>
            <h3 className="text-lg font-normal">MAISON PALACCI</h3>
            <p className="text-black/60 mt-1">Finition Haute Couture</p>
            <p className="text-sm text-black/70 leading-relaxed mt-4">
              Maison de couture spécialisée en robes de mariée et de soirée sur-mesure.
              Accompagnement personnalisé, finitions et exigence haute couture.
            </p>
          </div>

          {/* Colonne 2 — Coordonnées avec icônes */}
          <div>
            <h4 className="font-medium text-black mb-2">Contactez-nous</h4>
            <ul className="text-sm text-black/80">
              <li className="py-1.5">
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
                  <IconPin className="w-5 h-5 text-black/70" />
                  <span>3 David Pinkas — Jérusalem</span>
                </a>
              </li>
              <li className="py-1.5">
                <a href={telHref} className="inline-flex items-center gap-2 hover:underline">
                  <IconPhone className="w-5 h-5 text-black/70" />
                  <span>{phoneDisplay}</span>
                </a>
              </li>
              <li className="py-1.5">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
                  {/* On réutilise l’icône téléphone pour rester minimaliste */}
                  <IconPhone className="w-5 h-5 text-black/70" />
                  <span>WhatsApp — réponse rapide</span>
                </a>
              </li>
              {/* Décommente si tu veux afficher un email plus tard
              <li className="py-1.5">
                <a href="mailto:contact@maisonpalacci.com" className="inline-flex items-center gap-2 hover:underline">
                  <IconMail className="w-5 h-5 text-black/70" />
                  <span>contact@maisonpalacci.com</span>
                </a>
              </li>
              */}
            </ul>
          </div>

          {/* Colonne 3 — Navigation interne */}
          <div>
            <h4 className="font-medium text-black mb-2">Navigation</h4>
            <ul className="text-sm text-black/80">
              <li className="py-1.5"><a href="/#accueil" className="hover:underline">Accueil</a></li>
              <li className="py-1.5"><a href="/#formules" className="hover:underline">Nos formules</a></li>
              <li className="py-1.5"><a href="/#recommandations" className="hover:underline">Avis</a></li>
              <li className="py-1.5"><a href="/#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Ligne de note en bas du bloc */}
        <p className="mt-8 text-xs text-black/50">Sur rendez-vous uniquement.</p>
      </div>
    </section>
  );
}
function Footer() { return <footer className="border-t"><div className="max-w-6xl mx-auto px-4 py-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} MAISON PALACCI • Haute couture — Jerusalem</div></footer>; }
function WhatsAppFab() { return <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 rounded-full px-5 py-3 bg-emerald-500 text-white shadow-lg">WhatsApp</a>; }

// =====================
// App
// =====================
function OnePageApp() {
  return (
    <div className="text-gray-900 bg-[#F6EEE9]">   {/* <- ICI */}
      <Header />
      <Hero />
      <CatalogueSection />
      <FormulesSection />
      <RecommandationsSection />
      <RendezVousSection />  
      <ContactSection />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
/* ===== Page /catalogue (grille tabloïdes, même style visuel) ===== */
function CollectionsBar({ value, onChange }) {
  // Icônes minimalistes (SVG inline)
  const IconSoiree = (p) => (
    <svg viewBox="0 0 24 24" className={p.className||"w-5 h-5"} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3c3 0 5 2 5 5 0 4-5 6-5 10 0-4-5-6-5-10 0-3 2-5 5-5z"/><circle cx="12" cy="4.5" r="0.8" fill="currentColor"/>
    </svg>
  );
  const IconMariee = (p) => (
    <svg viewBox="0 0 24 24" className={p.className||"w-5 h-5"} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l4 6H8l4-6zM7 10h10l3 9H4l3-9z"/>
    </svg>
  );
  const IconAutre = (p) => (
    <svg viewBox="0 0 24 24" className={p.className||"w-5 h-5"} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 9h6v6H9z"/>
    </svg>
  );

  const items = [
    { key: "all",    label: "Tout",                                   icon: null },
    { key: "soiree", label: "Robe de soirée",                         icon: null },
    { key: "mariee", label: "Robe de mariée",                         icon: null },
    { key: "mariee", label: "Shabbat Hatan",                          icon: null },
    { key: "autre",  label: "Autre",                                  icon: null },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {items.map(it => {
        const active = value === it.key;
        const Icon = it.icon;
        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className={[
              "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm",
              "border transition-colors duration-200",
              active ? "border-[#E5D0C5] bg-[#E5D0C5]" : "border-black/15 hover:bg-black/[.03]"
            ].join(" ")}
            aria-pressed={active}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
/* ===== Page /catalogue avec Lightbox ===== */
function CataloguePage() {
  const [cat, setCat] = useState("all");
  const items = React.useMemo(
    () => CATALOG_IMAGES.filter(i => cat === "all" ? true : i.cat === cat),
    [cat]
  );
  const [openIndex, setOpenIndex] = useState(null);

  // Nav lightbox (inchangé)
  const prev = () => setOpenIndex(i => (i === null ? null : (i - 1 + items.length) % items.length));
  const next = () => setOpenIndex(i => (i === null ? null : (i + 1) % items.length));
  const close = () => setOpenIndex(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if (openIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    if (openIndex !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <div className="text-gray-900 bg-[#F6EEE9] min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Galerie</h1>

        {/* NOUVELLE barre de collections */}
        <CollectionsBar value={cat} onChange={setCat} />

        {/* Grille tabloïdes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {items.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-black/10 bg-black/[.03] focus:outline-none focus:ring-2 focus:ring-black/30"
              aria-label={`Agrandir l’image ${i + 1}`}
            >
              <img src={img.src} alt={img.alt || `Image ${i + 1}`} className="w-full h-full object-contain" loading="lazy" />
            </button>
          ))}
          {items.length === 0 && (
            <p className="col-span-full text-sm text-black/60">Aucune image dans cette collection pour le moment.</p>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFab />

      {/* Lightbox (inchangé) */}
      {openIndex !== null && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-4" onClick={close}>
          <div className="relative max-w-[90vw] max-h-[90vh] w-full md:w-auto" onClick={(e) => e.stopPropagation()}>
            <img src={items[openIndex].src} alt={items[openIndex].alt || `Image ${openIndex + 1}`}
                 className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-black/20 bg-black/[.03]" />
            <button onClick={close} aria-label="Fermer" className="absolute -top-3 -right-3 md:top-2 md:right-2 h-10 w-10 rounded-full bg-black text-white hover:opacity-90">×</button>
            <button onClick={prev} aria-label="Précédent" className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black text-white hover:opacity-90">‹</button>
            <button onClick={next} aria-label="Suivant" className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black text-white hover:opacity-90">›</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Router : on sert ta one-page à "/" et la nouvelle page à "/catalogue" ===== */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OnePageApp />} />
      <Route path="/catalogue" element={<CataloguePage />} />
      <Route path="*" element={<OnePageApp />} />
    </Routes>
  );
}


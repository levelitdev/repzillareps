import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import StarsBackground from "@/components/StarsBackground";
import Collection from "@/components/Collection";
import logo from "@/assets/RR_logo.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#000" }}>
      <StarsBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Collection />
        <HowItWorks />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Nowości", id: "kolekcja" },
    { label: "Kolekcja", id: "kolekcja" },
    { label: "Jak zamawiać", id: "jak" },
    { label: "Kontakt", id: "kontakt" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.25)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {links.map((l, i) => (
            <button
              key={i}
              onClick={() => scrollTo(l.id)}
              className="text-white text-sm font-heading uppercase tracking-widest hover:text-[#4a7fff] transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button onClick={scrollToTop} className="flex-shrink-0">
          <img src={logo} alt="Repzilla Reps" className="h-[64px] w-auto" />
        </button>
        <div className="hidden md:flex items-center justify-end flex-1">
          <button
            onClick={() => scrollTo("kontakt")}
            className="btn-ghost-navy px-5 py-2 rounded text-sm font-heading uppercase tracking-widest"
          >
            Zamów teraz
          </button>
        </div>
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#2040a0]/40 bg-black/80 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col gap-4">
            {links.map((l, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollTo(l.id);
                  setOpen(false);
                }}
                className="text-white text-sm font-heading uppercase tracking-widest text-left hover:text-[#4a7fff]"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                scrollTo("kontakt");
                setOpen(false);
              }}
              className="btn-ghost-navy px-5 py-2 rounded text-sm font-heading uppercase tracking-widest"
            >
              Zamów teraz
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 text-center">
      <div className="max-w-4xl">
        <p className="text-[#aac4ff] text-xs sm:text-sm tracking-[0.5em] mb-6 font-heading">
          PREMIUM STREETWEAR REPLICAS
        </p>
        <h1 className="font-display chrome-text text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none">
          REPZILLA<br />REPS
        </h1>
        <p className="mt-8 text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
          Najlepsze repliki streetwear. Szybka wysyłka. Dyskretnie.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo("kolekcja")}
            className="btn-navy px-8 py-3.5 rounded text-sm font-heading uppercase tracking-widest"
          >
            Przeglądaj kolekcję
          </button>
          <button
            onClick={() => scrollTo("jak")}
            className="btn-ghost-navy px-8 py-3.5 rounded text-sm font-heading uppercase tracking-widest"
          >
            Jak to działa
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#aac4ff] text-xs tracking-[0.4em] animate-pulse">
        SCROLL ↓
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Wybierz produkt", desc: "Przeglądaj kolekcję i wybierz co Cię interesuje." },
    { n: "02", title: "Skontaktuj się", desc: "Napisz do nas przez formularz lub social media." },
    { n: "03", title: "Odbierz paczkę", desc: "Szybka i dyskretna wysyłka pod Twój adres." },
  ];
  return (
    <section id="jak" className="relative z-10 px-4 sm:px-8 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[#aac4ff] text-xs tracking-[0.4em] mb-3 font-heading">PROCES</p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">JAK ZAMAWIAĆ</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div
            key={s.n}
            className="navy-glow rounded-lg p-8 text-center"
            style={{ background: "#0a0a0f", border: "1.5px solid #2040a0" }}
          >
            <div
              className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center font-display text-2xl font-black chrome-text"
              style={{ border: "2px solid #2040a0", background: "rgba(26,42,108,0.2)" }}
            >
              {s.n}
            </div>
            <h3 className="font-heading text-xl font-semibold text-white uppercase tracking-wider mb-3">
              {s.title}
            </h3>
            <p className="text-gray-400 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    {
      user: "KamilKS",
      tag: "#4821",
      time: "dziś o 14:32",
      msg: "Szybka wysyłka, towar 1:1 z oryginałem. Polecam każdemu na tym serwerze 🔥",
      color: "#5865f2",
      initials: "KK",
    },
    {
      user: "Michał_Tee",
      tag: "#2137",
      time: "wczoraj o 21:08",
      msg: "Już 3. zamówienie i zawsze bez zarzutu. Pan ogarnia temat, zero stresu 💯",
      color: "#eb459e",
      initials: "MT",
    },
    {
      user: "anon_buyer",
      tag: "#0001",
      time: "3 dni temu",
      msg: "Dyskretna paczka, kontakt sprawny i szybki. 10/10 wbijajcie śmiało",
      color: "#57f287",
      initials: "AB",
    },
  ];
  return (
    <section className="relative z-10 px-4 sm:px-8 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#5865f2">
            <path d="M19.27 5.33A19.4 19.4 0 0 0 14.5 4l-.24.45c1.95.44 2.92 1.05 3.92 1.79-1.69-.88-3.36-1.71-6.18-1.71-2.82 0-4.49.83-6.18 1.71 1-.74 2.15-1.4 3.92-1.79L9.5 4a19.6 19.6 0 0 0-4.77 1.33C2.36 8.97 1.59 12.5 1.99 16c1.97 1.46 3.88 2.36 5.76 2.96.46-.62.87-1.29 1.22-2-.65-.24-1.28-.55-1.87-.92.16-.12.32-.24.47-.37 3.61 1.69 7.51 1.69 11.07 0 .15.13.31.25.47.37-.6.37-1.22.68-1.87.92.35.71.76 1.38 1.22 2 1.88-.6 3.79-1.5 5.76-2.96.46-4.06-.74-7.56-2.95-10.67ZM8.52 14.32c-1.13 0-2.07-1.05-2.07-2.34s.92-2.34 2.07-2.34c1.16 0 2.09 1.06 2.07 2.34 0 1.29-.92 2.34-2.07 2.34Zm6.96 0c-1.13 0-2.07-1.05-2.07-2.34s.92-2.34 2.07-2.34c1.16 0 2.09 1.06 2.07 2.34 0 1.29-.91 2.34-2.07 2.34Z"/>
          </svg>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Co mówią nasi klienci</h2>
        </div>
        <p className="text-gray-500 text-sm">Opinie z naszego serwera Discord</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r.user}
            className="navy-glow rounded-lg p-5"
            style={{ background: "#1e1f22", border: "1.5px solid #2040a0" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: r.color }}
              >
                {r.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-bold text-sm">
                    {r.user}
                    <span className="text-gray-500 font-normal">{r.tag}</span>
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded text-white font-semibold"
                    style={{ background: "#1a2a6c" }}
                  >
                    ✓ Zweryfikowany kupujący
                  </span>
                  <span className="text-gray-500 text-xs">{r.time}</span>
                </div>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">{r.msg}</p>
                <div className="text-yellow-400 text-sm mt-3 tracking-widest">★★★★★</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="kontakt" className="relative z-10 px-4 sm:px-8 py-24 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-[#aac4ff] text-xs tracking-[0.4em] mb-3 font-heading">KONTAKT</p>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">
          Masz pytania? Napisz do nas.
        </h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          setTimeout(() => setSent(false), 4000);
        }}
        className="navy-glow rounded-lg p-6 sm:p-8 space-y-4"
        style={{ background: "#0a0a0f", border: "1.5px solid #2040a0" }}
      >
        <div>
          <label className="block text-xs text-[#aac4ff] mb-2 tracking-widest font-heading">IMIĘ</label>
          <input
            required
            className="w-full bg-black border border-[#2040a0] text-white px-4 py-3 rounded outline-none focus:border-[#4a7fff] transition-colors"
            placeholder="Jan Kowalski"
          />
        </div>
        <div>
          <label className="block text-xs text-[#aac4ff] mb-2 tracking-widest font-heading">EMAIL</label>
          <input
            required
            type="email"
            className="w-full bg-black border border-[#2040a0] text-white px-4 py-3 rounded outline-none focus:border-[#4a7fff] transition-colors"
            placeholder="jan@example.com"
          />
        </div>
        <div>
          <label className="block text-xs text-[#aac4ff] mb-2 tracking-widest font-heading">WIADOMOŚĆ</label>
          <textarea
            required
            rows={5}
            className="w-full bg-black border border-[#2040a0] text-white px-4 py-3 rounded outline-none focus:border-[#4a7fff] transition-colors resize-none"
            placeholder="Twoja wiadomość..."
          />
        </div>
        <button
          type="submit"
          className="btn-navy w-full py-3.5 rounded text-sm font-heading uppercase tracking-widest"
        >
          {sent ? "Wysłano ✓" : "Wyślij"}
        </button>
      </form>
      <div className="flex items-center justify-center gap-4 mt-10">
        {[
          { label: "Instagram", icon: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 8.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm5.2-8.4a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" },
          { label: "Telegram", icon: "M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.5 3.64 12.2c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42Z" },
          { label: "WhatsApp", icon: "M20 3.4A10.4 10.4 0 0 0 3.6 16l-1.5 5.4 5.5-1.4A10.4 10.4 0 1 0 20 3.4Zm-8 18.9a8.6 8.6 0 0 1-4.4-1.2l-.3-.2-3.3.9.9-3.2-.2-.3a8.6 8.6 0 1 1 7.3 4Zm4.7-6.5c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.6.1-1.5-.8-2.5-1.4-3.5-3.1-.3-.5.3-.4.7-1.4 0-.2 0-.4-.1-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.8 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" },
        ].map((s) => (
          <a
            key={s.label}
            href="#"
            aria-label={s.label}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(26,42,108,0.3)", border: "1.5px solid #2040a0", color: "#aac4ff" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d={s.icon} />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#2040a0]/60 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col items-center gap-4">
        <button onClick={scrollToTop}>
          <img src={logo} alt="Repzilla Reps" className="h-[60px] w-auto" />
        </button>
        <p className="text-gray-500 text-xs tracking-wider text-center">
          © 2025 Repzilla Reps — Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}

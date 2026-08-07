import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ClipboardList,
  FileText,
  HeartPulse,
  Menu,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
  Zap,
} from "lucide-react";

type Role = "gp" | "endo";

const roleContent = {
  gp: {
    eyebrow: "Ģimenes ārstiem",
    title: "Mazāk meklēšanas. Vairāk sarunas.",
    description:
      "Prakses Asistents sakārto pacienta informāciju pirms vizītes, lai katram lēmumam paliktu vairāk skaidrības un laika.",
    cta: "Pieteikties demonstrācijai",
    features: [
      {
        icon: ClipboardList,
        title: "Pacientu atlase profilaksei",
        text: "Vienuviet atlasiet pacientus, kuriem tuvojas skrīnings, sirds un asinsvadu riska izvērtēšana vai profilaktiskā apskate.",
        detail: "Filtrējiet pēc vecuma, pēdējās vizītes, diagnozes vai analīžu termiņa. Sagatavojiet nākamās nedēļas profilakses zvanu sarakstu dažu minūšu laikā.",
      },
      {
        icon: FileText,
        title: "Drīzumā — izrakstu kopsavilkumi",
        text: "Būtiskākā informācija par pacienta izrakstiem vienuviet — ātrākai, kopainā balstītai ģimenes ārsta praksei.",
        detail: "Svarīgākie notikumi, rekomendācijas un turpmākie soļi parādās vienā pārskatāmā skatā, saglabājot iespēju pārbaudīt avota dokumentu.",
      },
      {
        icon: HeartPulse,
        title: "Pacienta pārskats",
        text: "Būtiskākais par pacientu bez lēkāšanas starp cilnēm — dinamika, riski un medikamentu vienuviet.",
        detail: "Pārskatā redzamas pēdējās analīzes, aktīvie medikamenti un vizīšu hronoloģija. Jūs izlemjat, kam pievērst uzmanību.",
      },
    ],
    proof: [
      ["+32%", "Lielāka atsaucība", "Atgādinājumi palīdz sarunai nonākt līdz pacientam, nevis pazust ikdienas steigā."],
      ["6", "Mērķēti algoritmi", "Automatizēta atlase un datu apkopošana palīdz ārstam ietaupīt ikdienas laiku."],
      ["100%", "Datu drošība", "Pacientu dati tiek apstrādāti atbilstoši GDPR prasībām, nodrošinot pilnīgu konfidencialitāti."],
    ],
    valueTitle: "Kāpēc ģimenes ārsti izvēlas Prakses Asistentu?",
    valueText: "Mazs, praktisks atbalsts tajos brīžos, kad pacientu ir daudz un uzmanība ir jānotur pie svarīgākā.",
    ctaText: "Sāciet izmantot Prakses Asistentu jau šodien",
    ctaSub: "Izvēlieties to, kas der jūsu praksei — no pacientu atlases līdz pārskatam pirms konsultācijas.",
  },
  endo: {
    eyebrow: "Endokrinologiem",
    title: "Kopaina, kas palīdz sarunai kļūt precīzākai.",
    description:
      "Pārskatiet diabēta un vairogdziedzera pacientu dinamiku vienuviet, lai konsultācija sāktos ar būtisko, nevis datu meklēšanu.",
    cta: "Apskatīt endokrinoloģijas iespējas",
    features: [
      {
        icon: BarChart3,
        title: "Pacienta pārskats",
        text: "Būtiskākais vienuviet — analīžu dinamika, terapijas izmaiņas un medikamentu lietošanas konteksts.",
        detail: "Salīdziniet mērījumus laika griezumā un ātri pamaniet, kas mainījies kopš iepriekšējās konsultācijas.",
      },
      {
        icon: Zap,
        title: "Analīžu dinamika",
        text: "Sakārtots skats uz rādītājiem, kas palīdz sagatavoties sarunai un uzdot nākamo labāko jautājumu.",
        detail: "Iezīmējiet sev svarīgākos rādītājus un sekojiet to tendencēm bez manuālas tabulu veidošanas.",
      },
      {
        icon: Stethoscope,
        title: "Konsultācijas sagatave",
        text: "Sāciet vizīti ar koncentrētu darba virsmu — pacientam svarīgais un iespējamie turpmākie soļi.",
        detail: "Veidojiet savu konsultācijas ritmu: pārskats, jautājumi, rekomendācijas un piezīmes vienā plūsmā.",
      },
    ],
    proof: [
      ["1 skats", "Mazāk pārslēgšanās", "Pacienta stāsts, analīžu izmaiņas un terapijas konteksts sakārtoti vienā darba virsmā."],
      ["Pēc jūsu ritma", "Pielāgojams pārskats", "Izvēlieties, kādi rādītāji konsultācijas sākumā ir jūsu uzmanības centrā."],
      ["Skaidri", "Pārbaudāmi ieteikumi", "Katrs kopsavilkums paliek pārskatāms — ārsts saglabā profesionālo lēmumu un kontroli."],
    ],
    valueTitle: "Vairāk uzmanības tam, ko pacients stāsta.",
    valueText: "Endokrinoloģijā svarīgas ir izmaiņas laikā. Prakses Asistents palīdz tās ieraudzīt pirms konsultācijas, lai saruna varētu būt konkrētāka.",
    ctaText: "Iepazīstiet Prakses Asistentu endokrinoloģijā",
    ctaSub: "Īsa demonstrācija parāda, kā pacienta pārskats iederas jūsu ikdienas konsultācijā.",
  },
} as const;

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[610px] rotate-[1deg] rounded-[22px] border border-[#d8d8e8] bg-[#fbfbfe] p-2 shadow-[0_24px_70px_rgba(36,35,93,0.16)] transition-transform duration-500 hover:rotate-0">
      <div className="overflow-hidden rounded-[15px] border border-[#e8e7f0] bg-white">
        <div className="flex items-center justify-between border-b border-[#ecebf2] px-4 py-3 text-[9px] text-[#78768c]">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#17175b] text-white"><HeartPulse size={12} /></div>
            <span className="font-semibold text-[#202052]">Prakses Asistents</span>
          </div>
          <div className="flex gap-3"><span>Pacienti</span><span className="font-semibold text-[#23235f]">Pārskati</span><span>Iestatījumi</span></div>
          <div className="h-5 w-5 rounded-full bg-[#ecebff]" />
        </div>
        <div className="flex min-h-[285px]">
          <aside className="hidden w-[116px] border-r border-[#eeeef4] bg-[#fafaff] p-3 sm:block">
            <p className="mb-4 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#9a98b0]">Mana prakse</p>
            {["Pārskats", "Pacienti", "Uzdevumi", "Analīzes"].map((item, i) => (
              <div key={item} className={`mb-2 rounded-lg px-2 py-2 text-[9px] ${i === 0 ? "bg-[#e9e8ff] font-semibold text-[#17175b]" : "text-[#8d8ba1]"}`}>{item}</div>
            ))}
            <div className="mt-14 rounded-xl bg-[#f0efff] p-2 text-[8px] leading-3 text-[#57558d]"><Sparkles size={11} className="mb-1 text-[#7772d6]" />3 pacienti gaida jūsu uzmanību</div>
          </aside>
          <main className="flex-1 p-4 sm:p-6">
            <div className="mb-5 flex items-end justify-between">
              <div><p className="text-[9px] text-[#8e8ca1]">Otrdiena, 14. maijs</p><h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#202052]">Labdien, Dace</h3></div>
              <button className="rounded-lg bg-[#17175b] px-3 py-2 text-[9px] font-semibold text-white">+ Jauns uzdevums</button>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {[["24", "Pacienti šodien"], ["7", "Gaidāmas analīzes"], ["3", "Profilakses atgādnes"]].map(([n, l]) => <div key={l} className="rounded-xl border border-[#ecebf3] bg-[#fdfdff] p-3"><p className="text-lg font-semibold text-[#202052]">{n}</p><p className="mt-1 text-[8px] leading-3 text-[#8a889c]">{l}</p></div>)}
            </div>
            <div className="rounded-xl border border-[#e9e8f0] p-3">
              <div className="mb-3 flex items-center justify-between"><p className="text-[10px] font-semibold text-[#24245f]">Pacienta pārskats</p><span className="rounded-full bg-[#f0f0ff] px-2 py-1 text-[8px] text-[#5f5ca7]">Atjaunots šodien</span></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-[#f8f8fc] p-2"><p className="text-[8px] text-[#9290a2]">Pēdējā vizīte</p><p className="mt-1 text-[10px] font-semibold text-[#34336d]">12. maijs, 2024</p></div>
                <div className="rounded-lg bg-[#f8f8fc] p-2"><p className="text-[8px] text-[#9290a2]">Glikozes dinamika</p><p className="mt-1 text-[10px] font-semibold text-[#34336d]">Stabila <span className="text-[#6b9b82]">↗</span></p></div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-xl border border-[#e4e3ef] bg-white px-3 py-2 text-[9px] text-[#494773] shadow-lg sm:flex"><div className="rounded-full bg-[#e4f2ec] p-1 text-[#4e896b]"><Check size={11} /></div> Pārskats sagatavots</div>
    </div>
  );
}

export function PraksesHomepage() {
  const [role, setRole] = useState<Role>("gp");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const content = roleContent[role];

  const changeRole = (nextRole: Role) => {
    setRole(nextRole);
    setExpanded(null);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fcfcfb] text-[#202052] selection:bg-[#dfdefa] selection:text-[#17175b]">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes rise { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        .rise { animation: rise .65s ease both; }
        .delay-1 { animation-delay: .08s } .delay-2 { animation-delay: .16s } .delay-3 { animation-delay: .24s }
      `}</style>
      <header className="sticky top-0 z-30 border-b border-[#ecebf0]/80 bg-[#fcfcfb]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#17175b] text-white shadow-[0_5px_14px_rgba(23,23,91,.18)]"><HeartPulse size={16} /></div>
            <span className="text-[15px] font-semibold tracking-[-0.03em] text-[#202052]">Prakses Asistents</span>
          </a>
          <nav className="hidden items-center gap-8 text-[12px] font-medium text-[#77758a] md:flex">
            <a href="#funkcionalitate" className="transition-colors hover:text-[#17175b]">Funkcionalitāte</a>
            <a href="#parskats" className="transition-colors hover:text-[#17175b]">Kā tas strādā</a>
            <a href="#sakt" className="transition-colors hover:text-[#17175b]">Par mums</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex"><button className="px-3 py-2 text-[12px] font-semibold text-[#575577] transition-colors hover:text-[#17175b]">Ienākt</button><a href="#sakt" className="rounded-lg bg-[#17175b] px-4 py-2.5 text-[12px] font-semibold text-white shadow-[0_7px_16px_rgba(23,23,91,.16)] transition hover:-translate-y-0.5 hover:bg-[#282879]">Kļūt par klientu</a></div>
          <button aria-label="Atvērt izvēlni" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-[#303061] md:hidden">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
        {menuOpen && <div className="border-t border-[#ecebf0] px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm text-[#575577]"><a href="#funkcionalitate" onClick={() => setMenuOpen(false)}>Funkcionalitāte</a><a href="#parskats" onClick={() => setMenuOpen(false)}>Kā tas strādā</a><a href="#sakt" onClick={() => setMenuOpen(false)}>Kļūt par klientu</a></div></div>}
      </header>

      <main id="top">
        <section className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-24 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-[#f0efff] blur-3xl" />
          <div className="relative">
            <div className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-[#e3e2ef] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6a679b]"><span className="h-1.5 w-1.5 rounded-full bg-[#759f85]" /> Digitāls atbalsts Latvijas ārstiem</div>
            <h1 className="rise delay-1 max-w-xl font-['DM_Serif_Display'] text-[clamp(3rem,7vw,5.7rem)] leading-[.96] tracking-[-0.055em] text-[#202052]">Skaidrāks skats uz <span className="text-[#6f6abe]">katru pacientu.</span></h1>
            <p className="rise delay-2 mt-7 max-w-md text-[16px] leading-7 text-[#6d6b7d]">Prakses Asistents palīdz pārvērst izkaisītu pacienta informāciju pārskatāmos nākamajos soļos — mierīgākai, sagatavotākai darba dienai.</p>
            <div className="rise delay-3 mt-8 flex flex-wrap items-center gap-3"><a href="#funkcionalitate" className="group inline-flex items-center gap-3 rounded-xl bg-[#17175b] px-5 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(23,23,91,.18)] transition hover:-translate-y-0.5 hover:bg-[#292976]">Iepazīt iespējas <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></a><a href="#parskats" className="inline-flex items-center gap-2 rounded-xl border border-[#dedde8] bg-white px-5 py-3.5 text-[13px] font-semibold text-[#48466d] transition hover:border-[#aaa8d0]">Kā tas strādā <ArrowDown size={15} /></a></div>
            <div className="mt-10 flex items-center gap-5 text-[11px] text-[#89879a]"><span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#6f9b82]" /> Datu drošība pirmajā vietā</span><span className="hidden h-4 w-px bg-[#dbdae3] sm:block" /><span className="hidden sm:block">Veidots Latvijas praksēm</span></div>
          </div>
          <div className="relative pt-4 lg:pt-8"><ProductPreview /><div className="absolute -right-5 -top-2 hidden rounded-full border border-[#e2e0ee] bg-white px-4 py-2 text-[10px] font-semibold text-[#5c5a91] shadow-md sm:block"><MousePointer2 size={12} className="mr-1 inline text-[#8580d2]" /> Mazāk meklēšanas</div></div>
        </section>

        <section id="parskats" className="border-y border-[#ecebf0] bg-[#f4f3ff] px-5 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7975bd]">Pacienta pārskats — būtiskais vienuviet</p><h2 className="max-w-md font-['DM_Serif_Display'] text-4xl leading-[1.03] tracking-[-0.045em] text-[#202052] sm:text-5xl">Dati, kas palīdz sagatavoties sarunai.</h2><p className="mt-5 max-w-md text-[15px] leading-7 text-[#6c6a80]">Strukturēts kopsavilkums palīdz pirms konsultācijas ātri ieraudzīt pacienta būtiskākās izmaiņas, analizēt dinamiku un atkārtot svarīgo.</p><a href="#funkcionalitate" className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-[#282870] underline decoration-[#b9b6e3] underline-offset-4 transition hover:text-[#6e69ba]">Apskatīt funkcionalitāti <ArrowRight size={15} /></a></div>
            <ProductPreview />
          </div>
        </section>

        <section id="funkcionalitate" className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl text-center"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7975bd]">Viena platforma, dažādi darba ritmi</p><h2 className="mt-4 font-['DM_Serif_Display'] text-4xl tracking-[-0.045em] text-[#202052] sm:text-5xl">Funkcionalitāte, kas pielāgojas jums.</h2><p className="mt-4 text-[15px] leading-7 text-[#777589]">Izvēlieties savu specialitāti, lai redzētu, kā Prakses Asistents palīdz ikdienas darbā.</p></div>
          <div className="mx-auto mt-10 flex max-w-[440px] rounded-full border border-[#dfdee8] bg-[#f8f8fa] p-1.5 shadow-inner">
            {([["gp", "Ģimenes ārstiem"], ["endo", "Endokrinologiem"]] as const).map(([id, label]) => <button key={id} onClick={() => changeRole(id)} className={`relative flex-1 rounded-full px-3 py-3 text-[12px] font-semibold transition-all duration-300 ${role === id ? "bg-[#17175b] text-white shadow-[0_5px_14px_rgba(23,23,91,.2)]" : "text-[#868497] hover:text-[#3f3d67]"}`}>{label}</button>)}
          </div>
          <div key={role} className="mt-12 animate-[rise_.45s_ease_both]">
            <div className="grid gap-4 md:grid-cols-3">
              {content.features.map((feature, index) => { const Icon = feature.icon; const isOpen = expanded === index; return <div key={feature.title} className={`group rounded-2xl border p-6 transition-all duration-300 ${isOpen ? "border-[#bab7e4] bg-[#f9f8ff] shadow-[0_14px_35px_rgba(64,62,125,.09)]" : "border-[#e4e3eb] bg-white hover:-translate-y-1 hover:border-[#c8c6e4] hover:shadow-[0_12px_30px_rgba(64,62,125,.07)]"}`}><div className="mb-7 flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#efeeff] text-[#716dc2]"><Icon size={19} /></div><span className="text-[11px] font-bold text-[#b1aec2]">0{index + 1}</span></div><h3 className="font-['DM_Serif_Display'] text-[24px] leading-tight tracking-[-0.035em] text-[#29285e]">{feature.title}</h3><p className="mt-3 text-[13px] leading-6 text-[#777588]">{feature.text}</p><button onClick={() => setExpanded(isOpen ? null : index)} className="mt-5 flex items-center gap-2 text-[11px] font-bold text-[#6561a8] transition hover:text-[#17175b]">{isOpen ? "Paslēpt detaļas" : "Uzzināt vairāk"} <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} /></button>{isOpen && <p className="mt-3 border-t border-[#e6e4f2] pt-3 text-[12px] leading-5 text-[#66647b]">{feature.detail}</p>}</div> })}
            </div>
            <div className="mt-5 rounded-2xl border border-[#dedde9] bg-[#fbfbfe] p-7 sm:p-9">
              <div className="mb-7 text-center"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7975bd]">{content.eyebrow}</p><h3 className="mt-3 font-['DM_Serif_Display'] text-3xl tracking-[-0.045em] text-[#202052] sm:text-4xl">{content.valueTitle}</h3><p className="mx-auto mt-3 max-w-2xl text-[13px] leading-6 text-[#777588]">{content.valueText}</p></div>
              <div className="grid gap-3 md:grid-cols-3">{content.proof.map(([big, label, text]) => <div key={label} className="rounded-xl border border-[#e8e7ef] bg-white p-5"><p className="text-[26px] font-semibold tracking-[-0.05em] text-[#29286b]">{big}</p><p className="mt-1 text-[12px] font-bold text-[#39375e]">{label}</p><p className="mt-3 text-[11px] leading-5 text-[#858396]">{text}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section id="sakt" className="mx-5 mb-16 overflow-hidden rounded-[28px] bg-[#17175b] px-6 py-16 text-center text-white sm:px-10 lg:mx-auto lg:max-w-6xl lg:py-20">
          <div className="relative mx-auto max-w-2xl"><div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6362bd]/30 blur-3xl" /><p className="relative text-[11px] font-bold uppercase tracking-[0.16em] text-[#b9b8ee]">{content.eyebrow}</p><h2 className="relative mt-4 font-['DM_Serif_Display'] text-4xl leading-[1.05] tracking-[-0.04em] sm:text-5xl">{content.ctaText}</h2><p className="relative mx-auto mt-5 max-w-lg text-[14px] leading-6 text-[#c9c9e4]">{content.ctaSub}</p><button onClick={() => alert("Paldies! Sazināsimies ar jums par demonstrāciju.")} className="relative mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-[13px] font-bold text-[#20205f] transition hover:-translate-y-0.5 hover:bg-[#f0efff]">{content.cta} <ArrowRight size={16} /></button></div>
        </section>
      </main>

      <footer className="border-t border-[#ecebf0] px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row"><div className="flex items-center gap-2 text-[12px] font-semibold text-[#353364]"><div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#17175b] text-white"><HeartPulse size={12} /></div> Prakses Asistents</div><p className="text-[11px] text-[#9693a3]">Digitāls atbalsts, kas respektē ārsta laiku.</p><div className="flex gap-5 text-[11px] text-[#858294]"><a href="#funkcionalitate" className="hover:text-[#17175b]">Funkcionalitāte</a><a href="#sakt" className="hover:text-[#17175b]">Kontakti</a><span>© 2024</span></div></div></footer>
    </div>
  );
}
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, BarChart3, Check, ChevronDown, ChevronUp, ClipboardList, Clock3,
  HeartPulse, ImageIcon, Linkedin, Mail, Menu, MessageCircle, ShieldCheck,
  ExternalLink, FileText, LockKeyhole, Stethoscope, Syringe, X
} from "lucide-react";
import originalPatientOverview from "../../../attached_assets/original-patient-overview.png";
import brandLogo from "../../../attached_assets/prakses-asistents-logo.png";
import dischargeSummaryDemo from "../../../attached_assets/discharge-summary.gif";
import score2Demo from "../../../attached_assets/score2.gif";
import screeningList from "../../../attached_assets/screening-list.png";
import vaccinationsDemo from "../../../attached_assets/vaccinations.gif";

type Role = "gp" | "endo";

const roleContent = {
  gp: {
    label: "Ģimenes ārstiem",
    title: "Prakses Asistents",
    body: "Palīdzam ārstiem efektīvāk atlasīt pacientus, automatizējot datu apstrādi un apkopojot būtiskāko informāciju vienā skatā.",
    features: [
      ["Vēža skrīningi", "Atlasām pacientus, kuriem nepieciešami dzemdes kakla, krūts, zarnu un prostatas vēža skrīningi.", ClipboardList],
      ["Sirds un asinsvadu slimību risks", "Atlasām pacientus, kuriem nepieciešams sirds un asinsvadu slimību skrīnings, izmantojot SCORE metodi.", HeartPulse],
      ["Vakcinācijas", "Palīdzam atrast pacientus, kuriem nepieciešama vakcinācija vai tās aktualizēšana.", Syringe],
      ["Izrakstu kopsavilkumi", "Apkopojam būtiskāko no izrakstiem, lai informācija būtu ātri pārskatāma.", FileText],
      ["Vairāk laika pacientam", "Automatizējam atkārtojošos datu apkopošanas uzdevumus, lai ārsts varētu vairāk laika veltīt pacientiem.", Clock3],
      ["Atbilstība prasībām", "Palīdzam praksēm pārskatāmi izpildīt ar profilaksi, skrīningiem un datu apstrādi saistītās prasības.", ShieldCheck],
      ["Proaktīva uzraudzība", "Savlaicīgi atgādinājumi palīdz uzturēt pacientu veselības stāvokļa proaktīvu uzraudzību.", HeartPulse],
      ["Vienkārša lietošana", "Risinājums veidots ārsta darba ritmam — ar būtisko informāciju priekšplānā.", Check],
    ],
    stats: [["+32%", "augstāka pacientu atsaucība"], ["6+", "algoritmi mērķētai pacientu atlasei"], ["100%", "datu drošība, atbilstoša GDPR datu apstrādes prasībām"]],
  },
  endo: {
    label: "Endokrinologiem",
    title: "Prakses Asistents",
    body: "Palīdzam ārstiem ātrāk ieraudzīt būtisko par pacientu, automatizējot datu apstrādi un veidojot pārskatāmu kopainu.",
    features: [
      ["Pacienta pārskats", "Analīžu dinamika, aktuālā terapija, medikamenti un būtiskākais veselības konteksts vienā pārskatāmā skatā.", BarChart3],
      ["Mazāk informācijas meklēšanas", "Būtiskākā informācija ir apkopota vienuviet, nevis jāmeklē vairākos avotos.", Clock3],
      ["Skaidri redzama dinamika", "Analīžu izmaiņas laika gaitā ir vieglāk pamanīt un izvērtēt.", BarChart3],
      ["Aktuālā terapija vienuviet", "Medikamenti un ārstēšanas konteksts ir pieejams vienā pārskatā.", FileText],
      ["Vairāk laika pacientam", "Mazāk laika datu apkopošanai nozīmē vairāk laika sarunai un klīniskajam darbam.", Clock3],
    ],
    stats: [["1 skats", "analīzes, terapija un veselības konteksts vienviet"], ["Jūsu ritms", "pielāgojams pārskats un izkārtojums Jūsu vajadzībām"], ["Ātrāk", "pārskatāma sagatavošanās konsultācijai"]],
  },
} as const;

const gpProductFeatures = [
  {title:"Vēža skrīningu pārskats",text:"Automātiski atlasīti pacienti, kuriem nepieciešams dzemdes kakla, krūts, zarnu vai prostatas vēža skrīnings. Saraksts ir gatavs ikdienas darbam un ērti pārskatāms.",image:screeningList,alt:"Vēža skrīningu pacientu saraksts Prakses Asistentā"},
  {title:"SCORE2 riska novērtēšana",text:"Vienuviet redzami pacienti, kuriem jāizvērtē sirds un asinsvadu slimību risks, kā arī iepriekšējie rezultāti un kalkulators nākamajam solim.",image:score2Demo,alt:"SCORE2 skrīninga pārskats Prakses Asistentā"},
  {title:"Vakcināciju pārvaldība",text:"Pārskatāmi pacientu saraksti valsts imunizācijas programmām, vecuma grupām un nākamajām devām — bez manuālas datu apkopošanas.",image:vaccinationsDemo,alt:"Vakcināciju pārskats Prakses Asistentā"},
  {title:"Izrakstu kopsavilkumi",text:"Svarīgākā informācija no stacionāra izraksta ir sakārtota vienā skatā: veiktie izmeklējumi, terapija un turpmākā uzraudzība.",image:dischargeSummaryDemo,alt:"Stacionāra izraksta kopsavilkums Prakses Asistentā"},
] as const;

const serviceFaq = [
  ["Cik bieži tiek izsūtīti saraksti?", "Sarakstu sagatavošanas un nosūtīšanas regularitāti pielāgojam izvēlētajam pakalpojumam un prakses vajadzībām."],
  ["Kā var piekļūt pie sarakstiem?", "Pēc ieviešanas prakse saņem drošu piekļuvi un skaidras instrukcijas par visu darba procesu."],
  ["Kā un vai ir jāslēdz līgums?", "Pirms pakalpojuma uzsākšanas vienojamies par apjomu, datu apstrādi un sadarbības nosacījumiem."],
  ["Kā tiek aizsargāti pacientu dati, un kurš par to ir atbildīgs?", "Pacientu dati tiek apstrādāti konfidenciāli un atbilstoši GDPR prasībām. Pušu atbildība tiek skaidri noteikta sadarbības un datu apstrādes nosacījumos."],
  ["Cik maksā Prakses Asistenta risinājums?", "Izmaksas ir atkarīgas no ārsta specialitātes, izvēlētajiem pakalpojumiem un prakses vajadzībām. Precīzu piedāvājumu sagatavojam pēc pieteikuma saņemšanas."],
  ["Kāds ir ziņojumu formāts un cik viegli tos var izmantot?", "Informācija tiek pasniegta skaidrā, pārskatāmā formātā, lai būtiskāko varētu ātri izmantot ārsta ikdienas darbā."],
  ["Cik daudz laika būs nepieciešams no manas prakses personāla, lai to ieviestu un uzturētu?", "Ieviešanas procesu organizējam tā, lai prakses personāla iesaiste būtu pēc iespējas neliela. Nodrošinām skaidrus nākamos soļus un atbalstu."],
  ["Kāda ir prakses loma Prakses Asistenta izmantošanā?", "Prakse nodrošina sadarbībai nepieciešamo informāciju un izmanto sagatavotos pārskatus savā klīniskajā darba procesā."],
  ["Kāpēc dažiem pacientiem nav redzami visi laboratoriskie rezultāti?", "Pieejamā informācija var atšķirties atkarībā no datu avotiem, izmeklējuma veida un tā, vai rezultāts ir pieejams digitāli."],
  ["Vai šī rīka izmantošana man palīdzēs izpildīt normatīvās saistības ar NVD?", "Risinājums palīdz strukturēt ar profilaksi un skrīningiem saistīto darbu, taču prakse saglabā atbildību par konkrēto normatīvo prasību izpildi."],
  ["Kā es varu pārliecināties, ka sistēma darbojas un uzlabo rezultātus?", "Pakalpojuma rezultātus iespējams vērtēt pēc sagatavotajiem pārskatiem, paveiktajām aktivitātēm un pacientu atsaucības dinamikas."],
  ["Vai izmaksas ir pamatotas, ja es jau šobrīd sekoju līdzi pacientu skrīningu kalendāram?", "Prakses Asistents samazina manuālo datu apkopošanu un atkārtojošos administratīvos darbus, ļaujot vairāk laika veltīt pacientiem."],
] as const;

const priceFaq = [
  ["Vai cena ir par katru lietotāju?", "Nē. Norādītā cena ir par visu ārsta praksi neatkarīgi no lietotāju skaita."],
  ["Vai cenā ir iekļauts PVN?", "Jā. Visas cenas ir norādītas ar 21% PVN."],
  ["Kurš plāns ir piemērots manai praksei?", "Tas atkarīgs no jūsu specialitātes un nepieciešamās funkcionalitātes. Pēc pieteikuma saņemšanas palīdzēsim izvēlēties piemērotāko plānu."],
  ["Vai plānu vēlāk var mainīt?", "Jā. Praksei mainoties, varēsiet pāriet uz plānu ar plašāku vai mazāku funkcionalitāti."],
] as const;

const nav = [
  ["/", "Sākums"],
  ["/#pakalpojumi", "Pakalpojumi"], ["/#cenas", "Cenas"],
  ["/#klut-par-klientu", "Kļūt par klientu"],
  ["/prakses-dienasgramata", "Prakses dienasgrāmata"], ["/kontakti", "Kontakti"],
];

const basePrefix = import.meta.env.BASE_URL.replace(/\/$/, "");
const specialtyKey = "prakses-asistents-specialty";
const specialtyTargetKey = "prakses-asistents-specialty-target";
const specialtyTargets = new Set(["/#pakalpojumi", "/#funkcionalitate", "/#cenas"]);

function storedSpecialty(): Role | null {
  const value = window.localStorage.getItem(specialtyKey);
  return value === "gp" || value === "endo" ? value : null;
}

function withBase(path: string) {
  return `${basePrefix}${path}` || "/";
}

function routePath(pathname = window.location.pathname) {
  if (basePrefix && pathname.startsWith(basePrefix)) return pathname.slice(basePrefix.length) || "/";
  return pathname;
}

function go(path: string) {
  window.history.pushState({}, "", withBase(path));
  window.dispatchEvent(new PopStateEvent("popstate"));
  const hash = new URL(path, window.location.origin).hash;
  window.setTimeout(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, 30);
}

function Link({ href, children, className = "", onClick }: { href: string; children: ReactNode; className?: string; onClick?: () => void }) {
  return <a href={href.startsWith("/")?withBase(href):href} className={className} onClick={(e) => {
    onClick?.();
    if (!href.startsWith("/")) return;
    e.preventDefault();
    if (specialtyTargets.has(href) && !storedSpecialty()) {
      window.sessionStorage.setItem(specialtyTargetKey, href);
      go("/#specialitate");
      return;
    }
    go(href);
  }}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const currentY = Math.max(0, window.scrollY);
        if (currentY < 96 || currentY < previousY) setHidden(false);
        else if (currentY > previousY) setHidden(true);
        previousY = currentY;
        frame = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, {passive:true});
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  const currentPath = routePath();
  const mobileNav = nav;
  const headerNav = mobileNav.filter(([href])=>href!=="/#klut-par-klientu");
  const activeHref = `${currentPath}${location.hash}`;
  return <>
    <a className="skip" href="#main">Pāriet uz saturu</a>
    <div className="announcement">Jaunums endokrinologiem — Pacienta pārskats <Link href="/#pakalpojumi">Uzzināt vairāk <ArrowRight size={14}/></Link></div>
    <header className={`header${hidden&&!open?" header--hidden":""}`} onFocusCapture={()=>setHidden(false)}>
      <Link href="/" className="brand" aria-label="Prakses Asistents — sākums"><img src={brandLogo} alt="Prakses Asistents"/></Link>
      <nav className="desktop-nav" aria-label="Galvenā navigācija">
        {headerNav.map(([href, label]) => {
          const isActive = href === "/" ? currentPath === "/" && !location.hash : activeHref === href || currentPath === href;
          return <Link key={href} href={href} className={`${isActive ? "active" : ""}${href==="/#klut-par-klientu"?" nav-cta":""}`}>{label}</Link>;
        })}
      </nav>
      <Link href="/#klut-par-klientu" className="btn small desktop-cta">Kļūt par klientu</Link>
      <button className="menu" aria-label={open ? "Aizvērt izvēlni" : "Atvērt izvēlni"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      {open && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobilā navigācija">{mobileNav.map(([href, label]) => <Link key={href} href={href} onClick={()=>setOpen(false)} className={currentPath === href ? "active" : ""}>{label}</Link>)}</nav>}
    </header>
  </>;
}

function BackToTop() {
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const handleScroll=()=>setVisible(window.scrollY>520);
    handleScroll();
    window.addEventListener("scroll",handleScroll,{passive:true});
    return()=>window.removeEventListener("scroll",handleScroll);
  },[]);
  return <button type="button" className={`back-to-top${visible?" is-visible":""}`} aria-label="Atgriezties lapas augšā" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}><span className="back-to-top-label" aria-hidden="true">Uz augšu</span><ChevronUp size={20}/></button>;
}

function RequiredMark() {
  return <span className="required-mark" aria-hidden="true">*</span>;
}

function Footer() {
  return <footer>
    <div className="footer-grid">
      <div className="footer-about"><b>Prakses Asistents</b><p>Palīdzam ārstiem efektīvāk atlasīt pacientus, automatizējot datu apstrādi un apkopojot būtiskāko informāciju vienā skatā.</p><p>SIA Prakses Asistents<br/>Reģ. Nr. 50203532261</p><a className="footer-social" href="https://www.linkedin.com" aria-label="Prakses Asistents LinkedIn"><Linkedin size={24}/></a></div>
      <div><b>Saites</b><Link href="/">Sākums</Link><Link href="/prakses-dienasgramata">Prakses dienasgrāmata</Link><Link href="/#pakalpojumi">Pakalpojumi</Link><Link href="/kontakti">Kontakti</Link></div>
      <div><b>Dokumenti</b><a href="https://www.praksesasistents.lv/privatuma-politika">Privātuma politika</a><a href="https://www.praksesasistents.lv/lietosanas-noteikumi">Lietošanas noteikumi</a><a href="https://www.praksesasistents.lv/datu-apstrades-noteikumi">Datu apstrādes noteikumi</a></div>
      <div className="footer-support"><b>Atbalsts</b><div className="support-marks" aria-label="Eiropas Savienības un Nacionālā attīstības plāna 2027 atbalsts"><span className="eu-mark">✦ ✦ ✦<small>Līdzfinansē<br/>Eiropas Savienība</small></span><span className="nap-mark"><i></i><strong>2027</strong><small>Nacionālais<br/>attīstības plāns</small></span></div><p>Prakses Asistents saņem Latvijas Investīciju un attīstības aģentūras atbalstu, saskaņā ar līgumu DTM/2025/235/LG/1, kas noslēgts 20.06.2026.</p></div>
    </div>
    <div className="footer-bottom">© 2026 Prakses Asistents. Visas tiesības aizsargātas.</div>
  </footer>;
}

function ProductPreview({ role }: { role: Role }) {
  return <div className="preview-wrap">
    <div className="preview-tag">{role === "gp" ? "Ģimenes ārsta prakse" : "Endokrinologa prakse"}</div>
    <div className="preview">
      <div className="preview-top"><span><HeartPulse size={14}/> Prakses Asistents</span><span>Pacienti · Pārskati · Iestatījumi</span></div>
      <div className="preview-body">
        <aside><b>Mana prakse</b><span className="selected">Pārskats</span><span>Pacienti</span><span>Uzdevumi</span><span>Analīzes</span></aside>
        <div className="dash"><small>Otrdiena, 14. maijs</small><h3>Labdien, Dace</h3>
          <div className="mini-grid"><div><b>24</b><span>Pacienti šodien</span></div><div><b>7</b><span>Gaidāmas analīzes</span></div><div><b>3</b><span>Profilakses atgādnes</span></div></div>
          <div className="patient"><b>Pacienta pārskats</b><span>Atjaunots šodien</span><p>Analīžu dinamika · terapija · nākamie soļi</p></div>
        </div>
      </div>
    </div>
    <div className="preview-note"><Check size={13}/> Pārskats sagatavots</div>
  </div>;
}

function OriginalPatientOverview() {
  return <div className="original-preview" aria-label="Pacienta pārskata saskarne"><img src={originalPatientOverview} alt="Pacienta pārskata saskarne ar klīnisko profilu, medikamentiem un analīžu dinamiku"/></div>;
}

function RoleSwitch({ role, setRole }: { role: Role; setRole: (r: Role)=>void }) {
  return <div className="role-switch" aria-label="Izvēlieties specialitāti">
    <button type="button" className={`role-gp ${role === "gp" ? "selected" : ""}`} aria-pressed={role === "gp"} onClick={()=>setRole("gp")}>Ģimenes ārstiem</button>
    <button type="button" className={`role-endo ${role === "endo" ? "selected" : ""}`} aria-pressed={role === "endo"} onClick={()=>setRole("endo")}>Endokrinologiem</button>
  </div>;
}

function PriceBlock({ price, annual }: { price: string; annual: boolean }) {
  const monthlyPrice = Number(price);
  const annualPrice = monthlyPrice * 10;
  const monthlyWithVat = monthlyPrice * 1.21;
  const annualMonthlyWithVat = annualPrice * 1.21 / 12;
  const formatPrice = (value:number, minimumFractionDigits=0) => value.toLocaleString("lv-LV", {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  });
  return <div className="price-block">
    {annual&&<p className="annual-label">Efektīvā mēneša cena</p>}
    <div className={`price${annual?" price--annual":""}`}><strong>€{formatPrice(annual?annualMonthlyWithVat:monthlyWithVat,2)}</strong><span>/ mēnesī<br/>ar PVN</span></div>
  </div>;
}

function PlanHelp({compact=false}:{compact?:boolean}) {
  return <section className={`plan-help${compact?" plan-help--compact":" plan-help--large"}`} aria-label="Palīdzība plāna izvēlē">
    {compact&&<span className="plan-help-icon" aria-hidden="true"><MessageCircle size={22}/></span>}
    <div>{!compact&&<p className="plan-help-kicker">Vajadzīga palīdzība izvēlē?</p>}{compact?<h3 className="plan-help-title">Neesat pārliecināts, kuru plānu izvēlēties?</h3>:<h2 className="plan-help-title">Atradīsim jūsu praksei piemērotāko plānu</h2>}{compact&&<p>Pastāstiet par savu praksi, un palīdzēsim atrast piemērotāko risinājumu.</p>}</div>
    <Link href="/#klut-par-klientu" className={compact?"text-link":"btn"}>Sazināties ar mums <ArrowRight size={16}/></Link>
  </section>;
}

function Home() {
  const [role, setRole] = useState<Role | null>(()=>storedSpecialty());
  const [annual, setAnnual] = useState(false);
  const [sent, setSent] = useState(false);
  const [signupValid, setSignupValid] = useState(false);
  const [gateVisible,setGateVisible]=useState(false);
  const gateRef=useRef<HTMLElement>(null);
  const activeRole: Role = role ?? "gp";
  const c = roleContent[activeRole];
  const primaryServiceCount = activeRole === "gp" ? 4 : 1;
  const visiblePlans = activeRole === "gp" ? plans : [plans[2]];
  useEffect(()=>{
    if(role||gateVisible)return;
    const gate=gateRef.current;
    if(!gate)return;
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setGateVisible(true);observer.disconnect()}},{threshold:.32});
    observer.observe(gate);
    return()=>observer.disconnect();
  },[role,gateVisible]);
  const chooseSpecialty=(nextRole:Role)=>{
    window.localStorage.setItem(specialtyKey,nextRole);
    setRole(nextRole);
    window.dispatchEvent(new CustomEvent("specialtychange",{detail:nextRole}));
    const target=window.sessionStorage.getItem(specialtyTargetKey) || "/#pakalpojumi";
    window.sessionStorage.removeItem(specialtyTargetKey);
    window.setTimeout(()=>go(target),50);
  };
  const changeSpecialty=()=>{
    window.localStorage.removeItem(specialtyKey);
    window.sessionStorage.setItem(specialtyTargetKey,"/#pakalpojumi");
    setRole(null);
    window.dispatchEvent(new CustomEvent("specialtychange",{detail:null}));
    window.setTimeout(()=>document.querySelector("#specialitate")?.scrollIntoView({behavior:"smooth",block:"start"}),30);
  };
  return <main id="main" className="home-page">
    <section className="hero">
      <div className="hero-copy reveal">
        <div className="static-pills" aria-label="Paredzēts specialitātēm"><span className="specialty-pill specialty-pill--gp">Ģimenes ārsti</span><span className="specialty-pill specialty-pill--endo">Endokrinologi</span></div>
        <h1>Prakses Asistents</h1><p className="lead">{roleContent.gp.body}</p>
        <div className="actions"><Link href="/#klut-par-klientu" className="btn">Kļūt par klientu</Link><Link href="/#pakalpojumi" className="btn ghost">Apskatīt pakalpojumus</Link></div>
      </div>
      <OriginalPatientOverview/>
    </section>
    <section className="feature-band" id="pacienta-parskats">
      <div><h2>Pacienta pārskats — būtiskais vienuviet</h2><p>Analīžu dinamika, aktuālie medikamenti un būtiskākais veselības kopsavilkums vienuviet, lai konsultācijai varētu sagatavoties ātrāk un pārliecinošāk.</p><Link href="/#funkcionalitate" className="text-link">Apskatīt, kā tas darbojas <ArrowRight size={15}/></Link></div>
      <OriginalPatientOverview/>
    </section>
    <section ref={gateRef} className={`specialty-gate${role?" specialty-gate--selected":" specialty-gate--locked"}`} id="specialitate" aria-labelledby="specialty-title">
      {role?<div className="specialty-context"><span>Jūsu skats</span><strong>{c.label}</strong><button type="button" onClick={changeSpecialty}>Mainīt specialitāti</button></div>:<><div className="specialty-lock-preview" aria-hidden="true"><h2>Pakalpojumi</h2><div><article><span>01</span><strong>Pacientu atlase</strong></article><article><span>02</span><strong>Pārskatāms darba saraksts</strong></article><article><span>03</span><strong>Rezultāti ikdienas darbā</strong></article></div></div><div className={`specialty-choice${gateVisible?" specialty-choice--visible":""}`} role="group" aria-describedby="specialty-description"><div className="specialty-choice-copy"><span className="specialty-lock-icon"><LockKeyhole size={20}/></span><h2 id="specialty-title">Izvēlieties savu specialitāti</h2></div><div className="specialty-options"><button type="button" onClick={()=>chooseSpecialty("gp")}><Stethoscope size={26}/><span><strong>Ģimenes ārsts</strong><small>Skrīningi, SCORE2, vakcinācijas un profilakse</small></span><ArrowRight size={19}/></button><button type="button" onClick={()=>chooseSpecialty("endo")}><HeartPulse size={26}/><span><strong>Endokrinologs</strong><small>Pacienta pārskats, analīžu dinamika un terapija</small></span><ArrowRight size={19}/></button></div><p id="specialty-description" className="specialty-choice-note">Lai turpinātu, izvēlieties savu specialitāti.</p></div></>}
    </section>
    {role&&<>
    <section className={`section functionality specialty-services specialty-services--${role}`} id="pakalpojumi">
      <div className="specialty-section-head"><div><h2>Pakalpojumi {role==="gp"?"ģimenes ārstiem":"endokrinologiem"}</h2><p>{role==="gp"?"Mērķēta pacientu atlase un pārskatāms profilakses darbs vienā secīgā procesā.":"Būtiskākā informācija pirms konsultācijas — apkopota vienā pārskatāmā skatā."}</p></div></div>
      {role==="gp"?<div className="gp-product-showcase">{gpProductFeatures.map((feature,index)=><article className="product-feature" key={feature.title}><div className="product-feature-copy"><span>{String(index+1).padStart(2,"0")}</span><h3>{feature.title}</h3><p>{feature.text}</p></div><div className="product-media"><img src={feature.image} alt={feature.alt}/></div></article>)}</div>:<ol className="service-sequence">
        <li><div className="sequence-title"><span>1</span><h3>Apkopojiet būtiskāko pirms konsultācijas</h3></div><div className="service-list">{c.features.slice(0,primaryServiceCount).map(([title,text,Icon])=><article key={title}><Icon size={20}/><div><h4>{title}</h4><p>{text}</p></div></article>)}</div></li>
        <li><div className="sequence-title"><span>2</span><h3>Sagatavojieties konsultācijai ātrāk</h3></div><div className="service-list service-list--benefits">{c.features.slice(primaryServiceCount).map(([title,text,Icon])=><article key={title}><Icon size={20}/><div><h4>{title}</h4><p>{text}</p></div></article>)}</div></li>
        <li><div className="sequence-title"><span>3</span><h3>Redziet ieguvumu ikdienas darbā</h3></div><div className="service-results" aria-label={`${c.label} ieguvumi`}>{c.stats.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></li>
      </ol>}
    </section>
    <section className={`home-pricing home-pricing--${role}`} id="cenas">
      <div className="section-head"><h2>{role==="gp"?"Plāni ģimenes ārsta praksei":"Cenas endokrinologa praksei"}</h2><p>{role==="gp"?"Viena cena ģimenes ārsta praksei līdz 2 500 pacientiem.":"Pacienta pārskata plāns endokrinologa praksei. PVN ir iekļauts."}</p></div>
      <div className="billing" role="group" aria-label="Izvēlieties abonēšanas periodu"><button type="button" aria-pressed={!annual} className={!annual?"selected":""} onClick={()=>setAnnual(false)}>Mēnesī</button><button type="button" aria-pressed={annual} className={annual?"selected":""} onClick={()=>setAnnual(true)}>Gadā · 2 mēneši bez maksas</button></div>
      <div className={`pricing-grid home-pricing-grid${role==="endo"?" home-pricing-grid--single":""}`}>{visiblePlans.map(([name,price,text,items])=>{const planIndex=plans.findIndex(plan=>plan[0]===name);const displayItems=role==="endo"?["Pacienta pārskats","Analīžu dinamika un aktuālā terapija","Automātiski SMS atgādinājumi pacientiem","Prioritārs klientu atbalsts"]:items;return <article className={planIndex===1?"featured":""} key={name}><div className="plan-card-heading"><h3>{name}</h3>{planIndex===1&&<span className="popular">Populārākā izvēle</span>}</div><p>{text}</p><PriceBlock price={price} annual={annual}/><Link href="/#klut-par-klientu" className={`btn${planIndex===1?"":" ghost"}`}>Izvēlēties plānu</Link><div className="plan-features"><span>Plānā iekļauts</span><ul className="check-list">{displayItems.map(x=><li key={x}><Check size={16}/><span>{x}</span></li>)}</ul></div></article>})}</div>
      {role==="gp"&&<section className="pricing-conditions" aria-labelledby="pricing-conditions-title"><h2 id="pricing-conditions-title">Cenu nosacījumi</h2><div><p><strong>Vairāk nekā 2 500 pacientu?</strong> Par katriem nākamajiem 1 000 pacientiem mēneša cenai bez PVN tiek pieskaitīti 10 € Pamata, 15 € Standarta vai 25 € Pilnais plānam.</p><p><strong>Esošajiem klientiem.</strong> Jaunās cenas stājas spēkā 01.01.2027. Līdz 31.12.2026. var saglabāt esošo cenu vēl 12 mēnešus, izvēloties gada maksājumu.</p></div></section>}
    </section>
    <PlanHelp compact/>
    <FAQ title="Par cenām un plāniem" items={priceFaq}/>
    <section className="form-section home-form" id="klut-par-klientu"><div><h2>Sāciet izmantot Prakses Asistentu</h2><p>Aizpildiet īso pieteikumu. Sazināsimies ar jums 1–2 darba dienu laikā, lai pārrunātu prakses vajadzības un piemērotāko risinājumu.</p><ol className="signup-benefits"><li><span>01</span>Risinājumi ģimenes ārstiem un endokrinologiem.</li><li><span>02</span>Jūsu specialitātei pielāgots piedāvājums.</li><li><span>03</span>Skaidri ieviešanas un sadarbības soļi.</li></ol></div><form onInput={(e)=>setSignupValid(e.currentTarget.checkValidity())} onChange={(e)=>setSignupValid(e.currentTarget.checkValidity())} onSubmit={(e)=>{e.preventDefault();setSent(true)}}>
      <div className="field-grid"><label>Vārds <RequiredMark/><input name="firstName" autoComplete="given-name" required placeholder="Jānis"/></label><label>Uzvārds <RequiredMark/><input name="lastName" autoComplete="family-name" required placeholder="Bērziņš"/></label><label>E-pasta adrese <RequiredMark/><input name="email" autoComplete="email" required type="email" placeholder="epasts@prakse.lv"/></label><label>Telefona numurs <RequiredMark/><input name="phone" autoComplete="tel" required placeholder="+371 20000000"/></label></div>
      <fieldset><legend>Klienta veids <RequiredMark/></legend><div className="inline-choices"><label><input type="radio" name="clientType" defaultChecked/> Juridiska persona</label><label><input type="radio" name="clientType"/> Privātpersona</label></div></fieldset>
      <label>Prakses vai ārstniecības iestādes nosaukums <RequiredMark/><input name="practiceName" autoComplete="organization" required placeholder="Prakses nosaukums"/></label>
      <div className="consent-group"><label className="consent"><input type="checkbox" required/> <span>Es piekrītu <a href="https://www.praksesasistents.lv/privatuma-politika">Privātuma politikai <ExternalLink size={12}/></a>.</span></label><label className="consent"><input type="checkbox" required/> <span>Esmu iepazinies ar <a href="https://www.praksesasistents.lv/lietosanas-noteikumi">Lietošanas noteikumiem <ExternalLink size={12}/></a> un <a href="https://www.praksesasistents.lv/datu-apstrades-noteikumi">Datu apstrādes noteikumiem <ExternalLink size={12}/></a> un tiem piekrītu.</span></label></div>
      <button className="btn signup-submit" type="submit" disabled={!signupValid}>{sent ? "Pieteikums sagatavots" : "Kļūt par klientu"} <ArrowRight size={16}/></button>
      {sent && <p className="form-status" role="status">Demonstrācijas versijā dati netiek nosūtīti.</p>}
    </form></section>
    <FAQ title="Biežāk uzdotie jautājumi" items={serviceFaq}/>
    <section className="section home-journal" id="dienasgramatas-ieskats"><div className="home-section-title"><div><h2>Prakses dienasgrāmata</h2><p>Sarunas ar ārstiem un veselības aprūpes ekspertiem par ikdienas prakses realitāti Latvijā.</p></div><Link href="/prakses-dienasgramata" className="text-link">Apskatīt visus rakstus <ArrowRight size={15}/></Link></div><div className="post-grid">{posts.slice(0,3).map(([date,title,text,tags],i)=><article key={title}><div className="post-art photo-placeholder" role="img" aria-label="Raksta foto vietturis"><ImageIcon/><span>Raksta foto</span></div><div className="post-meta"><small>{date} · {3+i%3} min</small><PostTags tags={tags}/></div><h3>{title}</h3><p>{text}</p><Link href="/prakses-dienasgramata">Lasīt rakstu <ArrowRight size={14}/></Link></article>)}</div></section>
    </>}
  </main>;
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-hero reveal"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{text}</p></section>;
}

function Services() {
  const [role,setRole]=useState<Role>("gp");
  const [sent,setSent]=useState(false);
  const c=roleContent[role];
  return <main id="main"><PageHero eyebrow="Pakalpojumi" title="Ārsta laiks pieder pacientam." text="Prakses Asistents sakārto datu apkopošanu un atkārtojošos darbus, lai konsultācijā priekšplānā būtu cilvēks."/>
    <section className="section split"><div><p className="eyebrow">Pacienta pārskats</p><h2>Pacienta stāsts vienā pārskatā.</h2><p>Analīžu dinamika, aktuālā terapija un svarīgākais aprūpes konteksts vienuviet.</p><ul className="check-list"><li>Būtiskākie dati vienā skatā</li><li>Skaidri redzama dinamika</li><li>Aktuālie medikamenti</li></ul></div><ProductPreview role={role}/></section>
    <section className="section"><div className="section-head"><p className="eyebrow">Funkcionalitāte</p><h2>Izvēlieties savas prakses darba ritmu.</h2><RoleSwitch role={role} setRole={setRole}/></div><div className="feature-grid">{c.features.map(([t,x,I],i)=><article key={t}><span className="icon"><I size={20}/></span><small>0{i+1}</small><h3>{t}</h3><p>{x}</p></article>)}</div></section>
    <section className="section impact"><div><p className="eyebrow">Mūsu ietekme</p><h2>Savlaicīgāks kontakts. Labāka atsaucība.</h2><p>Atgādinājumi palīdz mērķtiecīgāk organizēt profilakses darbu.</p></div><div className="bars">{[["Krūts",50,81],["Dzemdes kakla",43,88],["Zarnu",20,45],["Prostatas",40,65]].map(([l,a,b])=><div key={String(l)}><span>{l}</span><i style={{width:`${a}%`}}></i><i className="after" style={{width:`${b}%`}}></i><b>{b}%</b></div>)}</div></section>
    <section className="form-section" id="klut-par-klientu"><div><p className="eyebrow">Kļūt par klientu</p><h2>Sāciet ar īsu sarunu.</h2><p>Pastāstiet par savu praksi — nosūtīsim skaidrus nākamos soļus.</p></div><form onSubmit={(e)=>{e.preventDefault();setSent(true)}}><div className="field-grid"><label>Vārds<input required placeholder="Jānis"/></label><label>Uzvārds<input required placeholder="Bērziņš"/></label><label>E-pasta adrese<input required type="email" placeholder="epasts@prakse.lv"/></label><label>Telefona numurs<input placeholder="+371 20000000"/></label></div><label>Prakses vai iestādes nosaukums<input required placeholder="Prakses nosaukums"/></label><label>Papildu informācija<textarea placeholder="Jūsu jautājums vai komentārs"/></label><button className="btn" type="submit">{sent ? "Paldies — pieteikums sagatavots" : "Nosūtīt pieteikumu"} <ArrowRight size={16}/></button></form></section>
    <FAQ items={["Cik bieži tiek sagatavoti pārskati?","Kā tiek aizsargāti pacientu dati?","Cik laika vajadzīgs ieviešanai?","Vai risinājums palīdz izpildīt NVD saistības?"]}/></main>;
}

const plans = [
  ["Pamata","30","Svarīgākais vēža skrīningu savlaicīgai uzraudzībai.",["Vēža skrīningu pārvaldība","Ceturkšņa pārskati"]],
  ["Standarta","45","Pilnvērtīgs profilaktiskā darba komplekts ģimenes ārsta praksei.",["Viss, kas iekļauts Pamata plānā","SCORE2 riska novērtēšana","Vakcinācijas un profilaktiskās apskates","Izrakstu kopsavilkumi"]],
  ["Pilnais","110","Plašāks pacienta veselības pārskats un prioritārs atbalsts prakses darbam.",["Viss, kas iekļauts Standarta plānā","Pacienta pārskats","Automātiski SMS atgādinājumi pacientiem","Prioritārs klientu atbalsts"]],
] as const;

const posts = [
  ["06.03.2026","Kāpēc pacienti uzticas digitāliem risinājumiem?","Skaidra komunikācija un pārskatāma informācija palīdz pacientam justies drošāk.",["gp","endo"]],
  ["27.02.2026","Vienkārša frāze, kas maina sarunu ar pacientu","Praktiska pieredze precīzākai un cilvēcīgākai sarunai konsultācijas laikā.",["gp","endo"]],
  ["20.02.2026","Kā likt e-veselībai strādāt ārsta labā","Par datu sakārtošanu un mazajiem uzlabojumiem, kas ietaupa ārsta laiku.",["gp"]],
  ["13.02.2026","Atklāti par e-veselību un ārsta ikdienu","Godīga saruna par digitālajiem rīkiem, kas palīdz, un šķēršļiem, kas paliek.",["gp"]],
  ["06.02.2026","Ko pamanīt pirms endokrinologa konsultācijas","Analīžu dinamika, terapijas konteksts un pacienta stāsts vienā kopainā.",["endo"]],
  ["30.01.2026","Profilakse bez lieka administratīvā sloga","Kā pacientu atlase palīdz ģimenes ārsta praksei saglabāt fokusu.",["gp"]],
] as const;

function PostTags({tags}:{tags:readonly ("gp"|"endo")[]}) {
  return <div className="post-tags" aria-label="Raksta specialitātes">{tags.map(tag=><span className={`post-tag post-tag--${tag}`} key={tag}>{tag==="gp"?"Ģimenes ārstiem":"Endokrinologiem"}</span>)}</div>;
}

function Journal() {
  return <main id="main"><PageHero eyebrow="Prakses dienasgrāmata" title="Sarunas no prakses. Nevis teorija." text="Sarunas starp ģimenes ārstiem par ikdienas prakses realitāti Latvijā — praktiska pieredze un pārdomas, nevis teorija."/><section className="journal-intro"><div><MessageCircle/><b>Profesionāla saruna</b></div><div><Clock3/><b>Reizi nedēļā</b></div><div><Stethoscope/><b>Latvijā</b></div></section><section className="section"><div className="section-head left"><p className="eyebrow">Jaunākie ieraksti</p><h2>Rakstu arhīvs</h2></div><div className="post-grid">{posts.map(([date,title,text,tags],i)=><article key={title}><div className="post-art photo-placeholder" role="img" aria-label="Raksta foto vietturis"><ImageIcon/><span>Raksta foto</span></div><div className="post-meta"><small>{date} · {3+i%3} min</small><PostTags tags={tags}/></div><h3>{title}</h3><p>{text}</p>{i===3?<a href="https://praksesasistents.lv/prakses-dienasgramata/andris-baumanis-atklati-par-e-veselibu">Lasīt rakstu <ArrowRight size={14}/></a>:<span className="post-status">Raksts drīzumā</span>}</article>)}</div></section><CTA title="Ir pieredze, ar ko dalīties?" text="Piedalieties sarunā un palīdziet veidot Latvijas prakses kopienas zināšanas."/></main>;
}

function Contact() {
  const [sent,setSent]=useState(false);
  return <main id="main" className="contact-page"><section className="contact-shell"><header className="contact-intro"><h1>Sazinies ar mums</h1><p>Ja jums ir jautājumi par pakalpojumu vai nepieciešama palīdzība, rakstiet mums. Atbildēsim 1–2 darba dienu laikā.</p></header><div className="contact-body"><aside className="contact-copy"><p className="contact-client-note">Vēlaties kļūt par Prakses Asistents klientu? <Link href="/#klut-par-klientu">Aizpildiet reģistrācijas formu <ArrowRight size={14}/></Link></p><div className="contact-methods"><div className="contact-detail"><Mail size={20}/><div><small>E-pasts</small><strong>sveiki@praksesasistents.lv</strong></div></div><div className="contact-detail"><MessageCircle size={20}/><div><small>Tālrunis</small><strong>+371 25765595</strong></div></div></div></aside><form className="contact-form" onSubmit={(e)=>{e.preventDefault();setSent(true)}}><div className="contact-name-fields"><label>Vārds <RequiredMark/><input name="firstName" autoComplete="given-name" required placeholder="Jānis"/></label><label>Uzvārds <RequiredMark/><input name="lastName" autoComplete="family-name" required placeholder="Bērziņš"/></label></div><label>E-pasta adrese <RequiredMark/><input name="email" autoComplete="email" required type="email" placeholder="epasts@epasts.lv"/></label><label>Jūsu ziņa <RequiredMark/><textarea name="message" required placeholder="Kā varam palīdzēt?"/></label><button className="btn" type="submit">{sent?"Paldies — ziņa sagatavota":"Sūtīt ziņu"} <ArrowRight size={16}/></button>{sent&&<p className="form-status" role="status">Demonstrācijas versijā dati netiek nosūtīti.</p>}</form></div></section><FAQ title="Biežāk uzdotie jautājumi" items={["Cik ātri saņemšu atbildi?","Kur pieteikties pakalpojumam?","Vai varu uzdot jautājumu par datu drošību?"]}/></main>;
}

function FAQ({items,title="Skaidras atbildes."}:{items:ReadonlyArray<string | readonly [string,string]>;title?:string}) {
  const [open,setOpen]=useState(0);
  const [showAll,setShowAll]=useState(false);
  const uid=useId();
  const hasMore=items.length>4;
  const visibleItems=showAll?items:items.slice(0,4);
  return <section className="faq"><div><h2>{title}</h2></div><div>{visibleItems.map((item,i)=>{const q=typeof item==="string"?item:item[0];const answer=typeof item==="string"?(i===0?"Risinājumu un sadarbības ritmu pielāgojam jūsu prakses vajadzībām.":"Sazinieties ar mums — izskaidrosim konkrēto procesu un vienosimies par drošāko nākamo soli."):item[1];const panelId=`${uid}-answer-${i}`;return <article key={q}><button type="button" aria-expanded={open===i} aria-controls={panelId} onClick={()=>setOpen(open===i?-1:i)}>{q}<ChevronDown aria-hidden="true" className={open===i?"rotate":""}/></button>{open===i&&<p id={panelId}>{answer}</p>}</article>})}{hasMore&&<button type="button" className="faq-more" aria-expanded={showAll} onClick={()=>{setShowAll(!showAll);if(showAll&&open>3)setOpen(-1)}}>{showAll?"Rādīt mazāk":"Rādīt visus jautājumus"}<ArrowRight aria-hidden="true"/></button>}</div></section>;
}

function CTA({title,text}:{title:string;text:string}) {
  return <section className="cta"><p className="eyebrow">Nākamais solis</p><h2>{title}</h2><p>{text}</p><Link href="/#klut-par-klientu" className="btn light-btn">Kļūt par klientu <ArrowRight size={16}/></Link></section>;
}

function App() {
  const [path,setPath]=useState(routePath());
  const [specialtySelected,setSpecialtySelected]=useState(()=>storedSpecialty()!==null);
  useEffect(()=>{const fn=()=>setPath(routePath());addEventListener("popstate",fn);return()=>removeEventListener("popstate",fn)},[]);
  useEffect(()=>{const fn=(event:Event)=>setSpecialtySelected((event as CustomEvent<Role|null>).detail!==null);addEventListener("specialtychange",fn);return()=>removeEventListener("specialtychange",fn)},[]);
  useEffect(()=>{if(path==="/cenas"){window.history.replaceState({},"",withBase("/#cenas"));setPath("/")}},[path]);
  useEffect(()=>{if(location.hash)setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView({behavior:"smooth"}),80)},[path]);
  let page = path==="/pakalpojumi"?<Services/>:path==="/prakses-dienasgramata"?<Journal/>:path==="/kontakti"?<Contact/>:<Home/>;
  const homeLocked=path==="/"&&!specialtySelected;
  return <><Header/>{page}{!homeLocked&&<Footer/>}<BackToTop/></>;
}

export default App;

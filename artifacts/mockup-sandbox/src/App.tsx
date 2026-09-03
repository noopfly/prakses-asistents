import { useEffect, useId, useState, type ReactNode } from "react";
import {
  ArrowRight, BarChart3, Check, ChevronDown, ChevronUp, ClipboardList, Clock3,
  HeartPulse, Linkedin, Mail, Menu, MessageCircle, ShieldCheck,
  Stethoscope, X
} from "lucide-react";
import originalPatientOverview from "../../../attached_assets/original-patient-overview.png";

type Role = "gp" | "endo";

const roleContent = {
  gp: {
    label: "Ģimenes ārstiem",
    title: "Prakses Asistents",
    body: "Palīdzam ārstiem efektīvāk rūpēties par pacientiem, automatizējot datu apstrādi un izceļot būtiskāko ikdienas darbam.",
    features: [
      ["Vēža skrīningi", "Atlasām pacientus, kuriem nepieciešami dzemdes kakla, krūts, zarnu un prostatas vēža skrīningi.", ClipboardList],
      ["Sirds un asinsvadu slimību risks", "Atlasām pacientus, kuriem nepieciešams sirds un asinsvadu slimību skrīnings, izmantojot SCORE metodi.", HeartPulse],
      ["Vairāk laika pacientam", "Automatizējam atkārtojošos datu apkopošanas uzdevumus, lai ārsts varētu vairāk laika veltīt pacientiem.", Clock3],
      ["Atbilstība prasībām", "Palīdzam praksēm pārskatāmi izpildīt ar profilaksi, skrīningiem un datu apstrādi saistītās prasības.", ShieldCheck],
      ["Proaktīva uzraudzība", "Savlaicīgi atgādinājumi palīdz uzturēt pacientu veselības stāvokļa proaktīvu uzraudzību.", HeartPulse],
      ["Vienkārša lietošana", "Risinājums veidots ārsta darba ritmam — ar būtisko informāciju priekšplānā.", Check],
    ],
    stats: [["+32%", "Lielāka atsaucība"], ["6", "Mērķēti algoritmi"], ["100%", "Datu drošība"]],
  },
  endo: {
    label: "Endokrinologiem",
    title: "Prakses Asistents",
    body: "Palīdzam ārstiem ātrāk ieraudzīt būtisko par pacientu, automatizējot datu apstrādi un veidojot pārskatāmu kopainu.",
    features: [
      ["Pacienta pārskats", "Būtiskākie pacienta dati, analīžu dinamika un medikamenti vienuviet — īpaši endokrinologa konsultācijai.", BarChart3],
      ["Vairāk laika pacientam", "Samazinām manuālu datu apkopošanu, lai konsultācijā vairāk laika paliktu pacientam.", Clock3],
      ["Vienkārša lietošana", "Būtiskā informācija ir priekšplānā un pielāgota ārsta darba ritmam.", Check],
      ["Droša datu apstrāde", "Pacienta informācija tiek apstrādāta pārskatāmi un ar uzmanību datu drošībai.", ShieldCheck],
    ],
    stats: [["1 skats", "Mazāk pārslēgšanās"], ["Jūsu ritms", "Pielāgojams pārskats"], ["Skaidri", "Pārbaudāma informācija"]],
  },
} as const;

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
  ["Vai cenai ir pieskaitīts PVN?", "Plāna galvenā cena ir norādīta bez PVN, un zem tās vienmēr redzama arī gala summa ar 21% PVN."],
  ["Kurš plāns ir piemērots manai praksei?", "Tas atkarīgs no jūsu specialitātes un nepieciešamās funkcionalitātes. Pēc pieteikuma saņemšanas palīdzēsim izvēlēties piemērotāko plānu."],
  ["Vai plānu vēlāk var mainīt?", "Jā. Praksei mainoties, varēsiet pāriet uz plānu ar plašāku vai mazāku funkcionalitāti."],
] as const;

const nav = [
  ["/#pakalpojumi", "Pakalpojumi"], ["/#cenas", "Cenas"],
  ["/#klut-par-klientu", "Kļūt par klientu"],
  ["/prakses-dienasgramata", "Prakses dienasgrāmata"], ["/kontakti", "Kontakti"],
];

const basePrefix = import.meta.env.BASE_URL.replace(/\/$/, "");

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
  return <a href={href.startsWith("/")?withBase(href):href} className={className} onClick={(e) => { onClick?.(); if (href.startsWith("/")) { e.preventDefault(); go(href); } }}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let previousY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 96) setHidden(false);
      else if (currentY > previousY + 4) setHidden(true);
      else if (currentY < previousY - 4) setHidden(false);
      previousY = currentY;
    };
    window.addEventListener("scroll", handleScroll, {passive:true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const currentPath = routePath();
  const mobileNav = currentPath === "/" ? nav : [["/", "Sākums"], ...nav];
  const headerNav = mobileNav.filter(([href])=>href!=="/#klut-par-klientu");
  const activeHref = `${currentPath}${location.hash}`;
  return <>
    <a className="skip" href="#main">Pāriet uz saturu</a>
    <div className="announcement">Jaunums endokrinologiem — Pacienta pārskats <Link href="/#pakalpojumi">Uzzināt vairāk <ArrowRight size={14}/></Link></div>
    <header className={`header${hidden&&!open?" header--hidden":""}`}>
      <Link href="/" className="brand"><span className="brandmark"><HeartPulse size={17}/></span><span>Prakses Asistents</span></Link>
      <nav className="desktop-nav" aria-label="Galvenā navigācija">
        {headerNav.map(([href, label]) => <Link key={href} href={href} className={`${activeHref === href || currentPath === href ? "active" : ""}${href==="/#klut-par-klientu"?" nav-cta":""}`}>{label}</Link>)}
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

function Footer() {
  return <footer>
    <div className="footer-grid">
      <div className="footer-about"><b>Prakses Asistents</b><p>Palīdzam ārstiem efektīvāk rūpēties par pacientiem, automatizējot datu apstrādi un atbalstot savlaicīgu veselības aprūpi.</p><p>SIA Prakses Asistents<br/>Reģ. Nr. 50203532261</p><a className="footer-social" href="https://www.linkedin.com" aria-label="Prakses Asistents LinkedIn"><Linkedin size={24}/></a></div>
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
  const formatPrice = (value:number, minimumFractionDigits=0) => value.toLocaleString("lv-LV", {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  });
  const priceWithVat = ((annual ? annualPrice : monthlyPrice) * 1.21).toLocaleString("lv-LV", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <div className="price-block">
    {annual&&<p className="annual-label">Maksa gadā</p>}
    <div className={`price${annual?" price--annual":""}`}><strong>€{annual?formatPrice(annualPrice):formatPrice(monthlyPrice)}</strong><span>{annual?"+ PVN":<><span>/ mēnesī</span><br/>+ PVN</>}</span></div>
    {annual?<p className="annual-payment">Apmaksai <strong>€{priceWithVat}</strong> gadā ar PVN</p>:<p className="price-with-vat"><strong>€{priceWithVat}</strong> mēnesī ar 21% PVN</p>}
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
  const [role, setRole] = useState<Role>("gp");
  const [signupRole, setSignupRole] = useState<Role>("gp");
  const [annual, setAnnual] = useState(false);
  const [sent, setSent] = useState(false);
  const c = roleContent[role];
  return <main id="main">
    <section className="hero">
      <div className="hero-copy reveal">
        <div className="static-pills" aria-label="Paredzēts specialitātēm"><span className="specialty-pill specialty-pill--gp">Ģimenes ārsti</span><span className="specialty-pill specialty-pill--endo">Endokrinologi</span></div>
        <h1>{c.title}</h1><p className="lead">{c.body}</p>
        <div className="actions"><Link href="/#klut-par-klientu" className="btn">Kļūt par klientu</Link><Link href="/#pakalpojumi" className="btn ghost">Uzzināt vairāk</Link></div>
      </div>
      <OriginalPatientOverview/>
    </section>
    <section className="feature-band" id="pakalpojumi">
      <div><h2>Pacienta pārskats — būtiskais vienuviet</h2><p>Strukturēts kopsavilkums palīdz pirms konsultācijas ātri ieraudzīt pacienta būtiskākos datus, analīžu dinamiku un aktuālos medikamentus.</p><Link href="/#funkcionalitate" className="text-link">Uzzināt vairāk <ArrowRight size={15}/></Link></div>
      <OriginalPatientOverview/>
    </section>
    <section className="section functionality" id="funkcionalitate">
      <div className="section-head"><h2>Pakalpojumi</h2><RoleSwitch role={role} setRole={setRole}/></div>
      <div className={`primary-services primary-services--${role}`}>{c.features.slice(0,role==="gp"?2:1).map(([title,text,Icon])=><article key={title}><span className="icon"><Icon size={22}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      <div className="practice-benefits"><p className="practice-benefits-label">Ko iegūst prakse</p><div className="practice-benefits-grid">{c.features.slice(role==="gp"?2:1).map(([title,text,Icon])=><article key={title}><Icon size={18}/><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      <div className="proof"><div><h2>Kāpēc {role==="gp"?"ģimenes ārsti":"endokrinologi"} izvēlas Prakses Asistentu?</h2></div>{c.stats.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
    </section>
    <section className="home-pricing" id="cenas">
      <div className="section-head"><h2>Izvēlieties plānu savai praksei</h2><p>Viena cena visai praksei — neatkarīgi no lietotāju skaita.</p></div>
      <div className="billing" role="group" aria-label="Izvēlieties abonēšanas periodu"><button type="button" aria-pressed={!annual} className={!annual?"selected":""} onClick={()=>setAnnual(false)}>Mēnesī</button><button type="button" aria-pressed={annual} className={annual?"selected":""} onClick={()=>setAnnual(true)}>Gadā · 2 mēneši bez maksas</button></div>
      <div className="pricing-grid home-pricing-grid">{plans.map(([name,price,text,items],i)=><article className={`${i===1?"featured ":""}${annual?"annual-tier":""}`} key={name}>{annual&&<span className="annual-ribbon"><span>2 mēneši<br/>bez maksas</span></span>}<h3>{name}</h3>{i===1&&<span className="popular">Populārākā izvēle</span>}<p>{text}</p><PriceBlock price={price} annual={annual}/><ul className="check-list">{items.map(x=><li key={x}>{x}</li>)}</ul><Link href="/#klut-par-klientu" className="btn ghost">Izvēlēties plānu</Link></article>)}</div>
    </section>
    <PlanHelp compact/>
    <FAQ title="Par cenām un plāniem" items={priceFaq}/>
    <section className="form-section home-form" id="klut-par-klientu"><div><h2>Sāciet izmantot Prakses Asistentu</h2><p>Aizpildiet formu. Pēc pieteikuma saņemšanas uz jūsu norādīto e-pastu nosūtīsim nākamos soļus un sazināsimies ar jums.</p><ul className="check-list"><li>Ģimenes ārstiem un endokrinologiem</li><li>Specialitātei atbilstošs piedāvājums</li><li>Skaidri sadarbības nākamie soļi</li></ul></div><form onSubmit={(e)=>{e.preventDefault();setSent(true)}}>
      <fieldset><legend>Es esmu:</legend><div className="choice-grid"><label className="choice"><input type="radio" name="speciality" checked={signupRole==="gp"} onChange={()=>setSignupRole("gp")}/><span><b>Ģimenes ārsts</b><small>Skrīningi, SCORE un profilakse</small></span></label><label className="choice"><input type="radio" name="speciality" checked={signupRole==="endo"} onChange={()=>setSignupRole("endo")}/><span><b>Endokrinologs</b><small>Pacienta pārskats</small></span></label></div></fieldset>
      <div className="field-grid"><label>Vārds *<input name="firstName" autoComplete="given-name" required placeholder="Jānis"/></label><label>Uzvārds *<input name="lastName" autoComplete="family-name" required placeholder="Bērziņš"/></label><label>E-pasta adrese *<input name="email" autoComplete="email" required type="email" placeholder="epasts@prakse.lv"/></label><label>Telefona numurs *<input name="phone" autoComplete="tel" required placeholder="+371 20000000"/></label></div>
      <fieldset><legend>Klienta veids *</legend><div className="inline-choices"><label><input type="radio" name="clientType" defaultChecked/> Juridiska persona</label><label><input type="radio" name="clientType"/> Privātpersona</label></div></fieldset>
      <label>Prakses vai ārstniecības iestādes nosaukums *<input name="practiceName" autoComplete="organization" required placeholder="Prakses nosaukums"/></label>
      <label>Uzņēmējdarbības forma *<select name="businessType" required defaultValue=""><option value="" disabled>Izvēlieties uzņēmējdarbības formu</option><option>Sabiedrība ar ierobežotu atbildību (SIA)</option><option>Individuālais komersants / pašnodarbinātais</option><option>Cits</option></select></label>
      <label>Papildu informācija<textarea name="message" placeholder="Jūsu jautājums vai komentārs"/></label>
      <fieldset className="service-options"><legend>Interesējošie pakalpojumi:</legend>{signupRole==="gp"?<><label><input type="checkbox" name="services" value="patient-overview"/> Pacienta pārskats</label><label><input type="checkbox" name="services" value="screening"/> Vēža skrīningi</label><label><input type="checkbox" name="services" value="score"/> Sirds un asinsvadu slimību risks</label><label><input type="checkbox" name="services" value="prevention"/> Profilaktiskās apskates</label><label><input type="checkbox" name="services" value="vaccination"/> Vakcinācijas</label></>:<label><input type="checkbox" name="services" value="patient-overview" defaultChecked/> Pacienta pārskats</label>}</fieldset>
      <div className="consent-group"><label className="consent"><input type="checkbox" required/> <span>Es piekrītu <a href="https://www.praksesasistents.lv/privatuma-politika">privātuma politikai</a>.</span></label><label className="consent"><input type="checkbox" required/> <span>Es esmu izlasījis un piekrītu <a href="https://www.praksesasistents.lv/lietosanas-noteikumi">lietošanas noteikumiem</a>.</span></label></div>
      <button className="btn" type="submit">{sent ? "Pieteikums sagatavots" : "Kļūt par klientu"} <ArrowRight size={16}/></button>
      {sent && <p className="form-status" role="status">Demonstrācijas versijā dati netiek nosūtīti.</p>}
    </form></section>
    <FAQ title="Biežāk uzdotie jautājumi" items={serviceFaq}/>
    <section className="section home-journal" id="dienasgramatas-ieskats"><div className="home-section-title"><div><h2>Prakses dienasgrāmata</h2><p>Sarunas ar ārstiem un veselības aprūpes ekspertiem par ikdienas prakses realitāti Latvijā.</p></div><Link href="/prakses-dienasgramata" className="text-link">Apskatīt visus rakstus <ArrowRight size={15}/></Link></div><div className="post-grid">{posts.slice(0,3).map(([date,title,text,tags],i)=><article key={title}><div className={`post-art art-${i%3}`}><HeartPulse/></div><div className="post-meta"><small>{date} · {3+i%3} min</small><PostTags tags={tags}/></div><h3>{title}</h3><p>{text}</p><Link href="/prakses-dienasgramata">Lasīt rakstu <ArrowRight size={14}/></Link></article>)}</div></section>
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
  ["Standarta","45","Pilnvērtīgs profilaktiskā darba komplekts ģimenes ārsta praksei.",["Viss, kas iekļauts Pamata plānā","SCORE riska novērtēšana","Vakcinācijas un profilaktiskās apskates"]],
  ["Pilnais","75","Pilnīgāks pacienta veselības pārskats un prioritārs atbalsts.",["Viss, kas iekļauts Standarta plānā","Pacienta veselības kopsavilkums","SMS atgādinājumi","Prioritārs atbalsts"]],
] as const;

function Pricing() {
  const [annual,setAnnual]=useState(false);
  return <main id="main" className="pricing-page">
    <section className="pricing90" aria-labelledby="pricing-title">
      <header className="pricing90-head">
        <p className="eyebrow">Cenas</p>
        <h1 id="pricing-title">Izvēlieties plānu savai praksei</h1>
        <p>Viena cena visai praksei — neatkarīgi no lietotāju skaita.</p>
        <div className="pricing90-toggle" role="group" aria-label="Izvēlieties abonēšanas periodu">
          <button type="button" aria-pressed={!annual} className={!annual?"selected":""} onClick={()=>setAnnual(false)}>Mēnesī</button>
          <button type="button" aria-pressed={annual} className={annual?"selected":""} onClick={()=>setAnnual(true)}>Gadā <span>2 mēneši bez maksas</span></button>
        </div>
      </header>
      <div className="pricing90-grid">
        {plans.map(([name,price,text,items],i)=><article className={`pricing90-card${i===1?" pricing90-card--featured":""}`} key={name}>
          <div className="pricing90-card-top">
            <div className="pricing90-specialties">
              <span className="specialty-pill specialty-pill--gp">Ģimenes ārstiem</span>
              {i===2&&<span className="specialty-pill specialty-pill--endo">Endokrinologiem</span>}
            </div>
            {i===1&&<span className="pricing90-badge">Populārākā izvēle</span>}
          </div>
          <div className="pricing90-summary"><h2>{name}</h2><p>{text}</p></div>
          <PriceBlock price={price} annual={annual}/>
          <Link href="/#klut-par-klientu" className={`btn pricing90-button${i===1?"":" ghost"}`}>Izvēlēties plānu <ArrowRight size={16}/></Link>
          <div className="pricing90-features"><p>Plānā iekļauts</p><ul>{items.map(x=><li key={x}><Check size={17}/><span>{x}</span></li>)}</ul></div>
        </article>)}
      </div>
    </section>
    <FAQ items={priceFaq}/><PlanHelp/>
  </main>;
}

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
  return <main id="main"><PageHero eyebrow="Prakses dienasgrāmata" title="Sarunas no prakses. Nevis teorija." text="Sarunas starp ģimenes ārstiem par ikdienas prakses realitāti Latvijā — praktiska pieredze un pārdomas, nevis teorija."/><section className="journal-intro"><div><MessageCircle/><b>Profesionāla saruna</b></div><div><Clock3/><b>Reizi nedēļā</b></div><div><Stethoscope/><b>Latvijā</b></div></section><section className="section"><div className="section-head left"><p className="eyebrow">Jaunākie ieraksti</p><h2>Rakstu arhīvs</h2></div><div className="post-grid">{posts.map(([date,title,text,tags],i)=><article key={title}><div className={`post-art art-${i%3}`}><HeartPulse/></div><div className="post-meta"><small>{date} · {3+i%3} min</small><PostTags tags={tags}/></div><h3>{title}</h3><p>{text}</p>{i===3?<a href="https://praksesasistents.lv/prakses-dienasgramata/andris-baumanis-atklati-par-e-veselibu">Lasīt rakstu <ArrowRight size={14}/></a>:<span className="post-status">Raksts drīzumā</span>}</article>)}</div></section><CTA title="Ir pieredze, ar ko dalīties?" text="Piedalieties sarunā un palīdziet veidot Latvijas prakses kopienas zināšanas."/></main>;
}

function Contact() {
  const [sent,setSent]=useState(false);
  return <main id="main"><section className="contact-layout"><div className="contact-copy"><p className="eyebrow">Kontakti</p><h1>Sazinies ar mums</h1><p className="lead">Ja jums ir jautājumi par pakalpojumu vai nepieciešama palīdzība, droši rakstiet mums, un mēs palīdzēsim! Mūsu komanda sazināsies ar jums 1–2 darba dienu laikā.</p><p className="contact-client-link">Ja vēlaties kļūt par Prakses Asistents klientu, aizpildiet anketu, kas pieejama <Link href="/#klut-par-klientu">šeit</Link>.</p><div className="contact-detail"><span><Mail/></span><div><b>E-pasts</b><p><a href="mailto:sveiki@praksesasistents.lv">sveiki@praksesasistents.lv</a></p></div></div><div className="contact-detail"><span><MessageCircle/></span><div><b>Tālrunis</b><p><a href="tel:+37122002839">+371 22002839</a></p></div></div></div><form className="contact-form" onSubmit={(e)=>{e.preventDefault();setSent(true)}}><div className="form-heading"><h2>Uzrakstiet mums</h2><p>Aizpildiet formu, un mēs ar jums sazināsimies.</p></div><label>Vārds *<input name="firstName" autoComplete="given-name" required placeholder="Jānis"/></label><label>Uzvārds *<input name="lastName" autoComplete="family-name" required placeholder="Bērziņš"/></label><label>E-pasta adrese *<input name="email" autoComplete="email" required type="email" placeholder="epasts@epasts.lv"/></label><label>Jūsu ziņa *<textarea name="message" required placeholder="Lūdzu, ievadiet savu ziņu šeit"/></label><button className="btn" type="submit">{sent?"Paldies — ziņa sagatavota":"Sūtīt ziņu"} <ArrowRight size={16}/></button>{sent&&<p className="form-status" role="status">Demonstrācijas versijā dati netiek nosūtīti.</p>}</form></section><FAQ items={["Cik ātri saņemšu atbildi?","Kur pieteikties pakalpojumam?","Vai varu uzdot jautājumu par datu drošību?"]}/></main>;
}

function FAQ({items,title="Skaidras atbildes."}:{items:ReadonlyArray<string | readonly [string,string]>;title?:string}) {
  const [open,setOpen]=useState(0);
  const [showAll,setShowAll]=useState(false);
  const uid=useId();
  const hasMore=items.length>4;
  const visibleItems=showAll?items:items.slice(0,4);
  return <section className="faq"><div><h2>{title}</h2>{hasMore&&<p className="faq-intro">Sākumā parādām biežāk meklētās atbildes.</p>}</div><div>{visibleItems.map((item,i)=>{const q=typeof item==="string"?item:item[0];const answer=typeof item==="string"?(i===0?"Risinājumu un sadarbības ritmu pielāgojam jūsu prakses vajadzībām.":"Sazinieties ar mums — izskaidrosim konkrēto procesu un vienosimies par drošāko nākamo soli."):item[1];const panelId=`${uid}-answer-${i}`;return <article key={q}><button type="button" aria-expanded={open===i} aria-controls={panelId} onClick={()=>setOpen(open===i?-1:i)}>{q}<ChevronDown aria-hidden="true" className={open===i?"rotate":""}/></button>{open===i&&<p id={panelId}>{answer}</p>}</article>})}{hasMore&&<button type="button" className="faq-more" aria-expanded={showAll} onClick={()=>{setShowAll(!showAll);if(showAll&&open>3)setOpen(-1)}}>{showAll?"Rādīt mazāk":"Rādīt visus jautājumus"}<ArrowRight aria-hidden="true"/></button>}</div></section>;
}

function CTA({title,text}:{title:string;text:string}) {
  return <section className="cta"><p className="eyebrow">Nākamais solis</p><h2>{title}</h2><p>{text}</p><Link href="/#klut-par-klientu" className="btn light-btn">Kļūt par klientu <ArrowRight size={16}/></Link></section>;
}

function App() {
  const [path,setPath]=useState(routePath());
  useEffect(()=>{const fn=()=>setPath(routePath());addEventListener("popstate",fn);return()=>removeEventListener("popstate",fn)},[]);
  useEffect(()=>{if(location.hash)setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView({behavior:"smooth"}),80)},[path]);
  let page = path==="/pakalpojumi"?<Services/>:path==="/cenas"?<Pricing/>:path==="/prakses-dienasgramata"?<Journal/>:path==="/kontakti"?<Contact/>:<Home/>;
  return <><Header/>{page}<Footer/><BackToTop/></>;
}

export default App;

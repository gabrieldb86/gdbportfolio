// Direção visual: Arquivo Editorial — preservar assimetria, índices em vermelho, imagens protagonistas e microcopy objetiva.
import { type CSSProperties, type FormEvent, type SyntheticEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { trackPortfolioEvent } from "@/lib/analytics";
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  FileText,
  Layers,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  MoveDownRight,
  Plus,
  Star,
  Users,
  X,
} from "lucide-react";
import { defaultSiteConfig, type ProjectConfig, getSiteConfig } from "@/data/siteConfig";
import { formatMetricValue } from "@/lib/animatedMetric";
import { Link } from "wouter";

function scrollToId(id: string, closeMenu?: () => void) {
  closeMenu?.();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function renderHeadline(headline: string) {
  const [before, after] = headline.split(" e ");
  return after ? <>{before} <em>e {after}</em></> : headline;
}

function markBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  image.style.display = "none";
  image.parentElement?.classList.add("image-fallback");
}

function StaticMetric({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const formattedValue = formatMetricValue(value, decimals);

  return (
    <strong aria-label={`${value.toLocaleString("pt-BR")}${suffix}`}>
      {formattedValue}<span className="proof-number-suffix">{suffix}</span>
    </strong>
  );
}

function ProjectCard({ project, revealDelay }: { project: ProjectConfig; revealDelay: number }) {
  const isLocalCase = project.href.startsWith("/");
  const isCaseInUpdate = project.href === "/cases/blocs-presentation";
  const [imageFailed, setImageFailed] = useState(false);
  const [genericImageFailed, setGenericImageFailed] = useState(false);
  const genericImage = defaultSiteConfig.projects.find((candidate) => candidate.number === "06")?.image || defaultSiteConfig.profilePhoto;
  const imageSource = imageFailed ? genericImage : project.image;
  return (
    <a
      className={`project-card ${project.size}`} data-reveal="project-card" data-reveal-delay={revealDelay}
      href={project.href}
      data-umami-event={isLocalCase ? "case-open" : "behance-open"}
      {...(!isLocalCase ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-label={isLocalCase ? `Abrir estudo de caso ${project.title}` : `Abrir projeto ${project.title} no Behance`}
      onClick={() => trackPortfolioEvent(isLocalCase ? "project_case_open" : "portfolio_behance", { project: project.number })}
    >
      <div className="project-image-wrap" style={{ aspectRatio: project.aspectRatio }}>
        {genericImageFailed ? <div className="project-image-fallback" role="img" aria-label={`Prévia indisponível: ${project.title}`} style={{ backgroundImage: `linear-gradient(135deg, rgba(38, 35, 33, .62), rgba(183, 37, 41, .52)), url("${genericImage}")`, backgroundPosition: "center", backgroundSize: "cover" }}><span>{project.number} · projeto</span><strong>{project.title}</strong><small>Prévia indisponível</small></div> : <img src={imageSource} alt={project.title} className="project-image" width="800" height="600" style={{ objectPosition: project.objectPosition }} loading="lazy" fetchPriority="low" decoding="async" onError={() => { if (imageFailed) setGenericImageFailed(true); else setImageFailed(true); }} />}
        <span className="project-arrow" aria-hidden="true">
          <ArrowUpRight size={19} strokeWidth={1.5} />
        </span>
      </div>
      <div className="project-caption">
        <span className="project-number">{project.number}</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.type}</p>
          <span className="project-credit">{isCaseInUpdate ? "Atualização editorial" : isLocalCase ? "Estudo de caso / Gabriel DB" : "Behance / Gabriel DB"}</span>
        </div>
        <span className="project-year">{project.year}</span>
      </div>
    </a>
  );
}

export default function Home() {
  const siteConfig = getSiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [floatingContactHidden, setFloatingContactHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = [
      ".coordination-focus-band",
      ".recruiter-proof-strip",
      ".work-section",
      ".services-section",
      ".about-section",
      ".statement-section",
      "#contact",
    ]
      .map((selector) => document.querySelector<HTMLElement>(selector))
      .filter((target): target is HTMLElement => Boolean(target));

    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visibleTargets = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleTargets.add(entry.target);
          else visibleTargets.delete(entry.target);
        });
        setFloatingContactHidden(visibleTargets.size > 0);
      },
      { threshold: 0.08 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    elements.forEach((element) => {
      const delay = element.dataset.revealDelay;
      if (delay) element.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => root.classList.remove("reveal-ready");
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("website")) return;
    const company = data.get("company") || "não informada";
    const role = data.get("role") || "não informado";
    const message = `Olá, Gabriel! Meu nome é ${data.get("name")}. Empresa ou consultoria: ${company}. Cargo ou oportunidade: ${role}. Gostaria de conversar sobre ${data.get("message")}. Meu e-mail é ${data.get("email")}.`;
    setSent(true);
    trackPortfolioEvent("contact_form_whatsapp");
    window.open(`https://wa.me/5511945747353?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  };

  return (
    <div id="top" className="site-shell home-revision" style={{ "--primary": siteConfig.brand.accent, "--background": siteConfig.brand.background, "--foreground": siteConfig.brand.foreground, "--site-bg-image": `url(${siteConfig.backgroundImage})` } as CSSProperties}>
      <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>
      <header className={`site-header site-header-redesign ${scrolled ? "site-header-scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}>
          <img className="header-avatar" src={siteConfig.railImage} alt="" width="34" height="34" decoding="async" onError={markBrokenImage} />
          <span className="brand-name" style={{ fontSize: "24px", textAlign: "left" }}>Gabriel Danino Basilio</span>
        </a>

        <button className="menu-trigger" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
        </button>

        <nav className={`site-nav ${menuOpen ? "site-nav-open" : ""}`} aria-label="Navegação principal">
          <a href="#work" onClick={(event) => { event.preventDefault(); scrollToId("work", () => setMenuOpen(false)); }}>Trabalho</a>
          <a href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about", () => setMenuOpen(false)); }}>Sobre</a>
          <a href="/cv">CV</a>
          <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToId("contact", () => setMenuOpen(false)); }}>Contato</a>
        </nav>

        <div className="header-availability"><span className="status-dot" style={{backgroundColor: '#00FF66'}} />Aberto a oportunidades</div>
      </header>

      <aside className="side-rail" aria-label="Informações rápidas">
        <div className="rail-image-block"><img src={siteConfig.railImage} alt="Ilustração em preto e branco de Gabriel" width="120" height="400" loading="lazy" decoding="async" onError={markBrokenImage} /></div>
        <span className="rail-label">Portfólio · 2026</span>
      </aside>

      <main id="main-content" tabIndex={-1}>
        <section className="hero-section hero-redesign" style={{height: '830px'}}>
          <div className="hero-redesign-panel" data-reveal="hero-copy" style={{height: '583px', marginLeft: '-315px', marginRight: '377px', width: '1061px'}}>
            <div className="hero-redesign-copy">
              <p className="eyebrow" style={{fontSize: '14px', width: '682px'}}>{siteConfig.hero.eyebrow}</p>
	              <h1 className="hero-headline"><span className="hero-headline-white">CONTEÚDO,</span><br /><span className="hero-headline-training">treinamento</span><br /><span className="hero-headline-white">&amp; TRADE</span><br /><span className="hero-headline-white">MARKETING.</span></h1>
	              <p className="hero-positioning">{siteConfig.hero.positioning}</p>
	              <p className="hero-redesign-intro" style={{ marginTop: "16px", fontSize: '16px' }}>{siteConfig.hero.intro}</p>
	              <p className="hero-proof-line" style={{fontSize: '14px', width: '691px'}}>17+ anos · 114K+ pessoas capacitadas · 130+ promotores monitorados</p>
	              <div className="hero-actions" style={{marginTop: '24px'}}>
	                <a
	                  className="hero-cta"
	                  href="https://wa.me/5511945747353"
	                  target="_blank"
	                  rel="noreferrer"
	                  data-editor-target="hero-cta"
	                  data-umami-event="hero-whatsapp-click"
	                  onClick={() => trackPortfolioEvent("cta_fale_comigo")}
	                  style={{fontSize: '23px', marginTop: '33px'}}
	                >
	                  <span className="hero-cta-label">FALAR COM GABRIEL</span>
	                  <ArrowUpRight
	                    className="hero-cta-icon"
	                    data-editor-target="hero-cta-icon"
	                    size={15}
	                    style={{fontSize: '23px', marginTop: '-3px', height: '24px', marginLeft: '1px', width: '24px'}}
	                  />
	                </a>
	              </div>
	            </div>
          </div>
          <div className="hero-redesign-portrait hero-redesign-portrait-large" data-reveal="hero-portrait" style={{marginRight: '110px'}}>
            <img src={siteConfig.profilePhoto} alt="Gabriel Danino Basilio" width="800" height="1000" loading="eager" fetchPriority="high" decoding="async" onError={markBrokenImage} style={{ aspectRatio: '0.80', width: '648px' }} />
          </div>
        </section>

        <section className="coordination-focus-band" aria-labelledby="coordination-focus-title">
          <div className="coordination-focus-layout">
            <div className="coordination-focus-label" data-reveal="focus-label" style={{width: '933px'}}>
              <p className="section-kicker" style={{fontSize: '16px'}}>Focos de coordenação</p>
              <h2 id="coordination-focus-title">Três frentes para levar <em>método à prática.</em></h2>
              <p className="coordination-focus-note" style={{fontSize: '16px', width: '879px'}}>Conteúdo, treinamento e campo organizados para apoiar decisões, capacitar equipes e acompanhar a execução.</p>
            </div>
            <div className="coordination-focus-grid">
              <article className="coordination-focus-item" data-reveal="focus-item" data-reveal-delay="80" style={{marginLeft: '190px'}}>
                <div className="coordination-focus-item-top"><span style={{fontSize: '16px'}}>01</span></div>
                <div className="coordination-focus-item-body">
                  <strong style={{fontSize: '18px'}}>Conteúdo &amp; Treinamento</strong>
                  <p style={{fontSize: '16px'}}>Instructional Design com ADDIE, Kirkpatrick e Learning Experience Design (LXD).</p>
                  <ul className="coordination-focus-highlights">
                    <li style={{fontSize: '14px'}}>114K+ pessoas capacitadas ao longo da carreira</li>
                    <li style={{fontSize: '14px'}}>8 anos como pioneiro do Today at Apple no Brasil</li>
                    <li style={{fontSize: '14px'}}>Ferramenta própria de avaliação com IA generativa</li>
                    <li style={{fontSize: '14px'}}>Trilhas de aprendizagem, e-learning e microlearning</li>
                  </ul>
                </div>
              </article>
              <article className="coordination-focus-item" data-reveal="focus-item" data-reveal-delay="140" style={{marginLeft: '190px'}}>
                <div className="coordination-focus-item-top"><span style={{fontSize: '16px'}}>02</span></div>
                <div className="coordination-focus-item-body">
                  <strong style={{fontSize: '18px'}}>Trade Marketing &amp; Campo</strong>
                  <p style={{fontSize: '16px'}}>Campanhas de incentivo de ponta a ponta, do briefing à modelagem financeira.</p>
                  <ul className="coordination-focus-highlights">
                    <li style={{fontSize: '14px'}}>Dashboards de KPI para 130+ promotores em campo</li>
                    <li style={{fontSize: '14px'}}>Nota média de avaliação: 8,3</li>
                    <li style={{fontSize: '14px'}}>Execução em PDV, merchandising e gestão de redes/franquias</li>
                    <li style={{fontSize: '14px'}}>Análise de risco orçamentário e PDCA</li>
                  </ul>
                </div>
	              </article>
	              <article className="coordination-focus-item" data-reveal="focus-item" data-reveal-delay="200">
	                <div className="coordination-focus-item-top" style={{marginLeft: '190px'}}><span style={{fontSize: '16px', marginLeft: '190px'}}>03</span></div>
	                <div className="coordination-focus-item-body" style={{marginLeft: '190px'}}>
	                  <strong style={{fontSize: '18px'}}>T&amp;D de Pessoas</strong>
                  <p style={{fontSize: '16px'}}>Onboarding, avaliação de desempenho e desenvolvimento de equipes de campo.</p>
                  <ul className="coordination-focus-highlights">
                    <li style={{fontSize: '14px'}}>Metodologia 9Box e ciclos de PDCA</li>
                    <li style={{fontSize: '15px'}}>Facilitação premiada (maiores indicadores de NPS na Apple)</li>
                    <li style={{fontSize: '14px'}}>Programas de capacitação e certificação</li>
                    <li style={{fontSize: '14px'}}>Gestão de stakeholders e fornecedores</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="recruiter-proof" className="recruiter-proof-wrap" aria-label="Destaques profissionais para RH e lideranças" style={{ height: '490px', paddingTop: '76px', backgroundColor: '#cf7b73' }}>
          <div className="recruiter-proof-layout">
            <div className="recruiter-proof-header" data-reveal="proof-header">
              <p className="section-kicker" style={{fontSize: '16px'}}>Para RH, headhunters e lideranças</p>
              <h2 className="recruiter-proof-title">Experiência em <em>números.</em></h2>
              <p className="recruiter-proof-desc" style={{fontSize: '16px'}}>Dados da trajetória entre facilitação na Apple, treinamento, conteúdo e gestão de campo na SPOT.</p>
            </div>
            <div className="recruiter-proof-strip" data-reveal="proof-strip" aria-label="Indicadores profissionais">
              <div className="proof-metric" style={{ paddingBottom: '30px', paddingLeft: '39px', paddingRight: '30px', paddingTop: '30px' }}>
                <Briefcase className="proof-metric-icon" size={22} strokeWidth={1.3} aria-hidden="true" />
                <StaticMetric value={17} suffix="+" />
                <span className="proof-metric-label">Anos de experiência</span>
              </div>
              <div className="proof-metric">
                <Users className="proof-metric-icon" size={22} strokeWidth={1.3} aria-hidden="true" />
                <StaticMetric value={114} suffix="K+" />
                <span className="proof-metric-label">Pessoas capacitadas<br />ao longo da carreira</span>
              </div>
              <div className="proof-metric">
                <Activity className="proof-metric-icon" size={22} strokeWidth={1.3} aria-hidden="true" />
                <StaticMetric value={130} suffix="+" />
                <span className="proof-metric-label">Promotores monitorados<br />(operação de campo)</span>
              </div>
              <div className="proof-metric proof-metric-narrative">
                <Layers className="proof-metric-icon" size={22} strokeWidth={1.3} aria-hidden="true" />
                <span className="proof-metric-label">Campanhas de incentivo</span>
                <span className="proof-tagline">Cystex, Enavo Gotas, Culturelle, Duekal e Copa</span>
              </div>
              <div className="proof-metric">
                <Star className="proof-metric-icon" size={22} strokeWidth={1.3} aria-hidden="true" />
                <StaticMetric value={8.3} decimals={1} />
                <span className="proof-metric-label">Média de avaliação</span>
                <span className="proof-tagline">Conteúdo &amp; Treinamento · Trade Marketing · T&amp;D de Pessoas</span>
              </div>
              <div className="proof-actions">
                <FileText className="proof-action-icon" size={20} strokeWidth={1.3} aria-hidden="true" />
                <Link href="/cv" className="proof-link"><span>Abrir trajetória</span><ArrowUpRight size={16} aria-hidden="true" /></Link>
                <Link href="/cv" className="proof-link proof-link-alt"><span>Ver CV</span><ArrowUpRight size={16} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto-section section-pad" aria-labelledby="manifesto-title">
          <div className="manifesto-grid" data-reveal="manifesto">
            <div className="manifesto-heading">
              <p className="section-kicker" style={{fontSize: '16px'}}>Como eu atuo</p>
              <h2 id="manifesto-title">Estratégia só funciona <span>quando chega ao campo.</span></h2>
            </div>
            <div className="manifesto-aside" style={{marginLeft: '-145px'}}>
              <p style={{fontSize: '20px'}}>Porque conteúdo e treinamento só funcionam quando encontram contexto, método e um próximo passo claro — para a equipe, para o campo e para o negócio.</p>
              <a className="text-link" href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about"); }} style={{fontSize: '14px'}}>Conheça meu jeito de trabalhar <ArrowUpRight size={15} style={{fontSize: '14px'}} /></a>
            </div>
          </div>
        </section>

        <section id="work" className="work-section work-redesign section-pad" aria-labelledby="work-title">
          <div className="work-redesign-heading" data-reveal="work-heading">
            <div><p className="section-kicker" style={{ fontSize: '16px' }}>Trabalhos selecionados</p><h2 id="work-title">Projetos que<br /><em>ganharam forma.</em></h2></div>
            <p style={{ fontSize: '16px' }}>Uma seleção de campanhas, trilhas, eventos e materiais criada para comunicar melhor, capacitar equipes e melhorar a execução.</p>
            <a className="behance-link" href="https://www.behance.net/gabrieldb86" data-umami-event="behance-open" target="_blank" rel="noreferrer" onClick={() => trackPortfolioEvent("portfolio_behance")}>Abrir Behance <ArrowUpRight size={15} /></a>
          </div>

          <div className="projects-grid sean-obrien-grid">
            {siteConfig.projects.filter((project) => project.visible).map((project, index) => <ProjectCard key={project.number} project={project} revealDelay={index * 50} />)}
          </div>
        </section>

        <section className="services-section services-redesign section-pad" aria-labelledby="services-title">
          <div className="services-layout" data-reveal="services-layout">
	            <div>
	              <p className="section-kicker" style={{fontSize: '16px'}}>Áreas de atuação</p>
	              <h2 id="services-title" style={{width: '994px'}}>Coordenação para<br style={{width: '994px'}} /><em className="services-result" style={{width: '994px'}}>o trabalho acontecer.</em></h2>
	              <div className="services-editorial-note" style={{fontSize: '25px'}}><strong style={{fontSize: '25px'}}>Do briefing à rotina de campo.</strong><p style={{fontSize: '25px'}}>Coordenação que organiza contexto, método, conteúdo e execução para apoiar a operação.</p></div>
	            </div>
            <div className="services-list">
              {siteConfig.services.map(([number, title, description], index) => (
                <details className="service-item" key={number} data-reveal="service-item" data-reveal-delay={index * 70}>
                  <summary className="service-row" style={{marginLeft: '20px'}}>
                    <span className="service-number" style={{ fontSize: '16px' }}>{number}</span>
                    <div style={{ fontSize: '14px' }}><h3 style={{ fontSize: '14px' }}>{title}</h3><p style={{ fontSize: '14px' }}>{description}</p></div>
                    <Plus className="service-toggle" size={21} strokeWidth={1.4} aria-hidden="true" />
                  </summary>
                  <div className="service-detail" id={`service-detail-${number}`}>
                    <p>{siteConfig.serviceDetails[number]}</p>
                    <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToId("contact"); }}>Conversar sobre este tema <ArrowUpRight size={15} /></a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section section-pad" aria-labelledby="about-title">
          <div className="about-grid">
            <div className="about-art-wrap" data-reveal="about-art">
              <img src={siteConfig.trainingImage} alt="Gabriel conduzindo um treinamento diante de uma equipe" loading="lazy" fetchPriority="low" decoding="async" width="1200" height="900" style={{ aspectRatio: '1.33' }} onError={markBrokenImage} />
              <span className="about-art-label" style={{marginBottom: '-21px', marginRight: '75px'}}>Processo / repertório / intenção</span>
            </div>
            <div className="about-copy" data-reveal="about-copy" style={{marginLeft: '20px'}}>
              <p className="section-kicker" style={{fontSize: '16px'}}>Sobre mim</p>
              <h2 id="about-title">Olá, eu sou<br /><em>Gabriel.</em></h2>
              <p className="about-lead" style={{fontSize: '16px'}}>Tenho 17 anos de experiência em conteúdo, treinamento e trade marketing — e mais de 114K+ pessoas capacitadas ao longo da carreira, incluindo 8 anos como pioneiro do Today at Apple no Brasil.</p>
              <p style={{fontSize: '16px'}}>Minha trajetória cruza coordenação de treinamento, gestão de indicadores de campo e produção de conteúdo — da Apple à SPOT/Grupo EMS. Busco uma próxima posição de coordenação em Conteúdo &amp; Treinamento, Trade Marketing &amp; Performance de Campo, ou Treinamento &amp; Desenvolvimento de Pessoas, aplicando metodologias como ADDIE, Kirkpatrick e Design Thinking.</p>
              <div className="about-skill-list" aria-label="Áreas de atuação"><span>Instructional Design</span><span>Trade Marketing</span><span>Gestão de Campo</span><span>ADDIE / Kirkpatrick</span><span>IA Generativa</span><span>Dashboards &amp; KPIs</span></div>
              <div className="about-principles" aria-label="Princípios de coordenação">
                <div style={{ fontSize: '14px' }}><span style={{ fontSize: '14px' }}>01</span><strong style={{ fontSize: '14px' }}>Contexto antes da solução</strong><p style={{ fontSize: '14px' }}>Entender público, operação e indicador antes de desenhar a resposta.</p></div>
                <div style={{ fontSize: '14px' }}><span style={{ fontSize: '14px' }}>02</span><strong style={{ fontSize: '14px' }}>Método que chega ao campo</strong><p style={{ fontSize: '14px' }}>Transformar estratégia em conteúdo, treinamento, rotina e material aplicável.</p></div>
                <div style={{ fontSize: '14px' }}><span style={{ fontSize: '14px' }}>03</span><strong style={{ fontSize: '14px' }}>Acompanhamento até o resultado</strong><p style={{ fontSize: '14px' }}>Usar avaliação, indicadores, PDCA e feedback para ajustar a execução.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="statement-section" aria-labelledby="statement-title">
          <div className="statement-copy" data-reveal="statement-copy" style={{height: '0px', paddingBottom: '150px', paddingLeft: '215px', paddingRight: '0px', paddingTop: '0px', width: '909px'}}>
            <span style={{width: '451px'}}>Se houver uma vaga ou projeto em que eu possa contribuir:</span>
            <h2 id="statement-title" style={{height: '491px', width: '539px'}}>Vamos colocar<br style={{height: '491px', width: '539px'}} /><em style={{height: '491px', width: '539px'}}>o trabalho em prática.</em></h2>
            <p className="statement-context-box" style={{width: '500px'}}>Conteúdo e treinamento precisam de contexto, método e acompanhamento para apoiar equipes, campo e negócio.</p>
          </div>
          <div className="statement-media-frame">
            <img className="statement-image" src={siteConfig.heroImage} alt="Projeto visual de bonés em preto e vermelho" width="1315" height="643" loading="lazy" decoding="async" onError={markBrokenImage} />
          </div>
        </section>

	        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title" style={{height: '1440px', width: '355px'}}>
	          <div className="contact-grid">
	            <div className="contact-intro" data-reveal="contact-intro">
	              <p className="section-kicker" style={{fontSize: '16px'}}>Vamos conversar</p>
	              <h2 id="contact-title" style={{height: '479px', width: '756px', marginBottom: '111px', marginRight: '-1px'}}>Você está formando<br style={{height: '479px', marginBottom: '111px', marginRight: '-1px', width: '756px'}} />uma equipe de <em style={{height: '479px', marginBottom: '111px', marginRight: '-1px', width: '756px'}}>coordenação?</em></h2>
	              <p style={{fontSize: '16px', marginBottom: '18px', marginTop: '-111px'}}>Estou aberto a oportunidades em conteúdo, treinamento, trade marketing e performance de campo. Envie o contexto da posição ou fale comigo diretamente pelo LinkedIn, e-mail ou WhatsApp.</p>
              <div className="contact-links">
                <a className="contact-direct" href="https://wa.me/5511945747353" data-umami-event="whatsapp-click" target="_blank" rel="noreferrer" onClick={() => trackPortfolioEvent("contact_whatsapp")}><MessageCircle size={17} /> Falar diretamente com Gabriel <ArrowUpRight size={15} /></a>
                <a className="contact-direct" href="https://www.linkedin.com/in/gabrieldb86" data-umami-event="linkedin-click" target="_blank" rel="noreferrer" onClick={() => trackPortfolioEvent("contact_linkedin")}><Linkedin size={17} /> Conectar pelo LinkedIn <ArrowUpRight size={15} /></a>
                <a className="contact-direct" href="mailto:gabrieldb@me.com" data-umami-event="email-click" onClick={() => trackPortfolioEvent("contact_email")}><Mail size={17} /> gabrieldb@me.com <ArrowUpRight size={15} /></a>
              </div>
            </div>
	            <form className="contact-form" data-reveal="contact-form" onSubmit={handleSubmit} style={{marginLeft: '565px', width: '750px'}}>
              <label htmlFor="name">Seu nome</label>
              <input id="name" name="name" type="text" placeholder="Como posso te chamar?" required />
              <label className="form-honeypot" htmlFor="website">Website</label>
              <input className="form-honeypot" id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              <label htmlFor="company">Empresa ou consultoria</label>
              <input id="company" name="company" type="text" placeholder="Onde você atua?" />
              <label htmlFor="role">Cargo ou oportunidade</label>
              <input id="role" name="role" type="text" placeholder="Qual posição ou desafio?" />
              <label htmlFor="email">Seu e-mail</label>
              <input id="email" name="email" type="email" placeholder="voce@empresa.com" required />
              <label htmlFor="message">Conte sobre a oportunidade, a empresa ou o desafio da posição</label>
              <textarea id="message" name="message" rows={3} placeholder="Qual é o contexto da vaga ou do desafio?" required />
              <button className="submit-button" type="submit">Enviar mensagem <ArrowUpRight size={17} /></button>
              {sent && <p className="form-success" role="status">Mensagem preparada. O WhatsApp foi aberto em uma nova aba.</p>}
              <p className="contact-privacy-note">Ao enviar, os dados são usados apenas para responder ao seu contato. <a href="/privacidade">Leia o aviso de privacidade.</a></p>
            </form>
          </div>
        </section>
	      </main>

	      <a className="mobile-sticky-cta" href="https://wa.me/5511945747353" target="_blank" rel="noreferrer" data-umami-event="hero-whatsapp-click" onClick={() => trackPortfolioEvent("cta_fale_comigo")}>FALAR COM GABRIEL <ArrowUpRight size={18} /></a>

	      <a className={`floating-contact ${floatingContactHidden ? "floating-contact-hidden" : ""}`} href="#contact" onClick={(event) => { event.preventDefault(); trackPortfolioEvent("cta_fale_comigo"); scrollToId("contact"); }}><span>Fale comigo</span><ArrowUpRight size={16} /></a>

      <footer className="site-footer">
        <a className="footer-brand" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}><span className="footer-avatar"><img src={siteConfig.railImage} alt="" onError={markBrokenImage} /></span><span style={{fontSize: '24px'}}>Gabriel Danino Basilio</span></a>
        <div className="footer-socials"><a href="https://www.linkedin.com/in/gabrieldb86" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} strokeWidth={1.75} /></a><a href="https://www.behance.net/gabrieldb86" target="_blank" rel="noreferrer" aria-label="Behance"><div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', border: '1.75px solid currentColor', borderRadius: '3px', fontSize: '10px', fontWeight: 800, lineHeight: 1 }}>Be</div></a><a href="https://wa.me/5511945747353" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} strokeWidth={1.75} /></a></div>
        <span className="footer-credit">© 2026 · Foto de <a href="https://unsplash.com/pt-br/@scalzodesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Samuel Scalzo</a> na <a href="https://unsplash.com/pt-br/fotografias/uma-foto-em-preto-e-branco-de-um-edificio-xyuYk9oLA8I?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Unsplash</a></span>
      </footer>

    </div>
  );
}

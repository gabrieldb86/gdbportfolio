// Direção visual: Arquivo Editorial — preservar assimetria, índices em vermelho, imagens protagonistas e microcopy objetiva.
import { type CSSProperties, type FocusEvent, type FormEvent, type SyntheticEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { trackPortfolioEvent } from "@/lib/analytics";
import { validateContactForm, type ContactFormErrors } from "@/lib/contactValidation";
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
import { getSiteConfig } from "@/data/siteConfig";
import { formatMetricValue } from "@/lib/animatedMetric";
import { portfolioPath } from "@/lib/publicPath";
import { Link, useLocation } from "wouter";
import { ProjectAccordionGallery } from "@/components/ProjectAccordionGallery";
import { ImageGlowFrame } from "@/components/ImageGlowFrame";

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

export default function Home() {
  const siteConfig = getSiteConfig();
  const behanceProjects = siteConfig.projects
    .filter((project) => project.visible && project.href.includes("behance.net"))
    .slice(0, 4);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
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
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const contact = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
    const errors = validateContactForm(contact);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    const company = String(data.get("company") || "").trim() || "não informada";
    const role = String(data.get("role") || "").trim() || "não informado";
    const message = `Olá, Gabriel! Meu nome é ${contact.name}. Empresa ou consultoria: ${company}. Cargo ou oportunidade: ${role}. Gostaria de conversar sobre ${contact.message}. Meu e-mail é ${contact.email}.`;
    trackPortfolioEvent("contact_form_whatsapp");
    window.open(`https://wa.me/5511945747353?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    form.reset();
    setLocation("/obrigado");
  };

  const handleFieldBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const form = event.currentTarget.form;
    const field = event.currentTarget.name as keyof ContactFormErrors;
    if (!form || !(field in { name: true, email: true, message: true })) return;

    const data = new FormData(form);
    const errors = validateContactForm({
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
    });
    setFormErrors((current) => {
      const next = { ...current };
      if (errors[field]) next[field] = errors[field];
      else delete next[field];
      return next;
    });
  };

  return (
    <div id="top" className="site-shell home-revision" style={{ "--primary": siteConfig.brand.accent, "--background": siteConfig.brand.background, "--foreground": siteConfig.brand.foreground, "--site-bg-image": `url(${siteConfig.backgroundImage})` } as CSSProperties}>
      <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>
      <header className={`site-header site-header-redesign ${scrolled ? "site-header-scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}>
          <ImageGlowFrame className="header-avatar-glow"><img className="header-avatar" src={siteConfig.railImage} alt="" width="34" height="34" decoding="async" onError={markBrokenImage} /></ImageGlowFrame>
          <span className="brand-name" style={{ fontSize: '17px', textAlign: "left" }}>Gabriel Danino Basilio</span>
        </a>

        <button className="menu-trigger" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
        </button>

        <nav className={`site-nav ${menuOpen ? "site-nav-open" : ""}`} aria-label="Navegação principal">
          <a href="#work" onClick={(event) => { event.preventDefault(); scrollToId("work", () => setMenuOpen(false)); }}>Trabalho</a>
          <a href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about", () => setMenuOpen(false)); }}>Sobre</a>
          <a href={portfolioPath("/cv")}>CV</a>
          <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToId("contact", () => setMenuOpen(false)); }}>Contato</a>
        </nav>

        <div className="header-availability"><span className="status-dot" style={{backgroundColor: '#00FF66'}} />Aberto a oportunidades</div>
      </header>

      <aside className="side-rail" aria-label="Informações rápidas">
        <ImageGlowFrame className="rail-image-block"><img src={siteConfig.railImage} alt="Ilustração em preto e branco de Gabriel" width="120" height="400" loading="lazy" decoding="async" onError={markBrokenImage} /></ImageGlowFrame>
        <span className="rail-label">Portfólio · 2026</span>
      </aside>

      <main id="main-content" tabIndex={-1}>
        <section className="hero-section hero-redesign" style={{height: '870px'}}>
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
          <ImageGlowFrame className="hero-redesign-portrait hero-redesign-portrait-large" data-reveal="hero-portrait" style={{marginRight: '110px'}}>
            <img src={siteConfig.profilePhoto} alt="Gabriel Danino Basilio" width="800" height="1000" loading="eager" fetchPriority="high" decoding="async" onError={markBrokenImage} style={{ aspectRatio: '0.80', width: '648px' }} />
          </ImageGlowFrame>
        </section>

        <section className="coordination-focus-band" aria-labelledby="coordination-focus-title" style={{backgroundColor: '#b72529'}}>
          <div className="coordination-focus-layout">
            <div className="coordination-focus-label" data-reveal="focus-label" style={{width: '933px'}}>
              <p className="section-kicker" style={{fontSize: '16px'}}>Focos de coordenação</p>
              <h2 id="coordination-focus-title" style={{height: '140px', width: '272px', color: '#f4eee6'}}>Três frentes para levar <em style={{height: '140px', width: '272px', color: '#1c1b1a'}}>método à prática.</em></h2>
              <p className="coordination-focus-note" style={{fontSize: '20px', width: '879px', marginTop: '51px'}}>Conteúdo, treinamento e campo organizados para apoiar decisões, capacitar equipes e acompanhar a execução.</p>
            </div>
            <div className="coordination-focus-grid">
              <article className="coordination-focus-item" data-reveal="focus-item" data-reveal-delay="80" style={{marginLeft: '190px'}}>
                <div className="coordination-focus-item-top"><span style={{fontSize: '16px'}}>01</span></div>
                <div className="coordination-focus-item-body" style={{marginTop: '10px'}}>
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
                <div className="coordination-focus-item-body" style={{marginTop: '10px'}}>
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
	                <div className="coordination-focus-item-body" style={{marginLeft: '190px', marginTop: '10px'}}>
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
              <div className="proof-metric" style={{ paddingBottom: '30px', paddingLeft: '39px', paddingRight: '30px', paddingTop: '30px', marginRight: '300px' }}>
                <Briefcase className="proof-metric-icon" size={22} strokeWidth={1.3} aria-hidden="true" style={{marginTop: '-80px'}} />
                <StaticMetric value={17} suffix="+" />
                <span className="proof-metric-label" style={{fontSize: '12px'}}>Anos de experiência</span>
              </div>
              <div className="proof-metric" style={{marginLeft: '-330px'}}>
                <Users className="proof-metric-icon" size={22} strokeWidth={1.3} aria-hidden="true" style={{marginTop: '-47px'}} />
                <StaticMetric value={114} suffix="K+" />
                <span className="proof-metric-label" style={{fontSize: '12px'}}>Pessoas capacitadas<br style={{fontSize: '12px'}} />ao longo da carreira</span>
              </div>
              <div className="proof-metric">
                <Activity className="proof-metric-icon" size={22} strokeWidth={1.3} aria-hidden="true" style={{marginTop: '-49px'}} />
                <StaticMetric value={130} suffix="+" />
                <span className="proof-metric-label" style={{fontSize: '12px'}}>Promotores monitorados<br style={{fontSize: '12px'}} />(operação de campo)</span>
              </div>
              <div className="proof-metric" style={{marginRight: '-120px', marginTop: '-12px'}}>
                <Star className="proof-metric-icon" size={22} strokeWidth={1.3} aria-hidden="true" style={{marginTop: '36px'}} />
                <StaticMetric value={8.3} decimals={1} />
                <span className="proof-metric-label" style={{fontSize: '14px'}}>Média de avaliação</span>
                <span className="proof-tagline" style={{fontSize: '12px', color: '#fff9f2'}}>Conteúdo &amp; Treinamento · Trade Marketing · T&amp;D de Pessoas</span>
              </div>
              <div className="proof-actions" style={{marginRight: '20px', marginLeft: '135px'}}>
                <FileText className="proof-action-icon" size={20} strokeWidth={1.3} aria-hidden="true" />
                <Link href="/cv" className="proof-link" style={{fontSize: '14px'}}><span style={{fontSize: '14px'}}>Abrir trajetória</span><ArrowUpRight size={16} aria-hidden="true" style={{fontSize: '14px'}} /></Link>
                <Link href="/cv" className="proof-link proof-link-alt" style={{fontSize: '14px'}}><span style={{fontSize: '14px'}}>Ver CV</span><ArrowUpRight size={16} aria-hidden="true" style={{fontSize: '14px'}} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto-section section-pad" aria-labelledby="manifesto-title" style={{height: '733px', width: '351px', backgroundColor: '#f4eee6'}}>
          <div className="manifesto-grid" data-reveal="manifesto">
            <div className="manifesto-heading">
              <p className="section-kicker" style={{fontSize: '16px', color: '#b72529'}}>Como eu atuo</p>
              <h2 id="manifesto-title" style={{color: '#1c1b1a'}}>Estratégia só funciona <span style={{color: '#b72529'}}>quando chega ao campo.</span></h2>
            </div>
            <div className="manifesto-aside" style={{marginLeft: '-145px'}}>
              <p style={{fontSize: '16px', color: '#000000', fontWeight: '600'}}>Porque conteúdo e treinamento só funcionam quando encontram contexto, método e um próximo passo claro — para a equipe, para o campo e para o negócio.</p>
              <a className="text-link" href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about"); }} style={{fontSize: '12px', height: '21px', width: '276px', color: '#b72529'}}>Conheça meu jeito de trabalhar <ArrowUpRight size={15} style={{fontSize: '14px', height: '21px', width: '276px', color: '#b72529'}} /></a>
            </div>
          </div>
        </section>

        <section id="work" className="work-section work-redesign section-pad" aria-labelledby="work-title" style={{height: '5139px', width: '358px'}}>
          <div className="work-redesign-heading" data-reveal="work-heading">
            <div><p className="section-kicker" style={{ fontSize: '16px' }}>Trabalhos selecionados</p><h2 id="work-title">Projetos que<br /><em>ganharam forma.</em></h2></div>
            <p style={{ fontSize: '18px', color: '#f4eee6' }}>Uma seleção de campanhas, trilhas, eventos e materiais criada para comunicar melhor, capacitar equipes e melhorar a execução.</p>
            <a className="behance-link" href="https://www.behance.net/gabrieldb86" data-umami-event="behance-open" target="_blank" rel="noreferrer" onClick={() => trackPortfolioEvent("portfolio_behance")} style={{fontSize: '14px'}}>Abrir Behance <ArrowUpRight size={15} /></a>
          </div>

          <div data-reveal="work-gallery">
            <ProjectAccordionGallery projects={behanceProjects} />
          </div>
        </section>

        <section className="services-section services-redesign section-pad" aria-labelledby="services-title">
          <div className="services-layout" data-reveal="services-layout">
	            <div>
	              <p className="section-kicker" style={{fontSize: '16px'}}>Áreas de atuação</p>
	              <h2 id="services-title" style={{width: '994px', color: '#1c1b1a'}}>Coordenação para<br style={{width: '994px'}} /><em className="services-result" style={{width: '994px'}}>o trabalho acontecer.</em></h2>
	              <div className="services-editorial-note" style={{fontSize: '25px'}}><strong style={{fontSize: '20px', color: '#1c1b1a'}}>Do briefing à rotina de campo.</strong><p style={{fontSize: '25px'}}>Coordenação que organiza contexto, método, conteúdo e execução para apoiar a operação.</p></div>
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

        <section id="about" className="about-section section-pad" aria-labelledby="about-title" style={{height: '1685px'}}>
          <div className="about-grid">
            <ImageGlowFrame className="about-art-wrap" data-reveal="about-art">
              <img src={siteConfig.trainingImage} alt="Gabriel conduzindo um treinamento diante de uma equipe" loading="lazy" fetchPriority="low" decoding="async" width="1200" height="900" style={{ aspectRatio: '1.33' }} onError={markBrokenImage} />
	              <span className="about-art-label" style={{marginBottom: '-17px', marginRight: '6px', fontSize: '14px', color: '#b72529'}}>Processo / repertório / intenção</span>
            </ImageGlowFrame>
            <div className="about-copy" data-reveal="about-copy" style={{marginLeft: '20px'}}>
              <p className="section-kicker" style={{fontSize: '16px', color: '#b72529'}}>Sobre mim</p>
	              <h2 id="about-title" style={{color: '#1c1b1a'}}>Olá, eu sou<br /><em style={{color: '#b72529'}}>Gabriel.</em></h2>
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

        <section className="statement-section" aria-labelledby="statement-title" style={{backgroundColor: '#b72529'}}>
          <div className="statement-copy" data-reveal="statement-copy" style={{height: '0px', paddingBottom: '150px', paddingLeft: '215px', paddingRight: '0px', paddingTop: '0px', width: '909px', backgroundColor: '#b72529'}}>
            <span style={{width: '451px', fontSize: '14px', color: '#000000'}}>Se houver uma vaga ou projeto em que eu possa contribuir:</span>
            <h2 id="statement-title" style={{height: '491px', width: '539px'}}>Vamos colocar<br style={{height: '491px', width: '539px'}} /><em style={{height: '491px', width: '539px'}}>o trabalho em prática.</em></h2>
            <p className="statement-context-box" style={{width: '500px', fontSize: '16px'}}>Conteúdo e treinamento precisam de contexto, método e acompanhamento para apoiar equipes, campo e negócio.</p>
          </div>
          <ImageGlowFrame className="statement-media-frame">
            <img className="statement-image" src={siteConfig.heroImage} alt="Projeto visual de bonés em preto e vermelho" width="1315" height="643" loading="lazy" decoding="async" onError={markBrokenImage} />
          </ImageGlowFrame>
        </section>

	        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title" style={{height: '1560px', width: '355px'}}>
	          <div className="contact-grid">
	            <div className="contact-intro" data-reveal="contact-intro">
	              <p className="section-kicker" style={{fontSize: '16px'}}>Vamos conversar</p>
	              <h2 id="contact-title" style={{height: '479px', width: '756px', marginBottom: '111px', marginRight: '-1px', fontSize: '51px'}}>Você está formando<br style={{height: '479px', marginBottom: '111px', marginRight: '-1px', width: '756px'}} />uma equipe de <em style={{height: '479px', marginBottom: '111px', marginRight: '-1px', width: '756px', fontSize: '55px', color: '#b72529'}}>coordenação?</em></h2>
	              <p style={{fontSize: '18px', marginBottom: '18px', marginTop: '-100px'}}>Estou aberto a oportunidades em conteúdo, treinamento, trade marketing e performance de campo. Envie o contexto da posição ou fale comigo diretamente pelo LinkedIn, e-mail ou WhatsApp.</p>
              <div className="contact-links">
                <a className="contact-direct" href="https://wa.me/5511945747353" data-umami-event="whatsapp-click" target="_blank" rel="noreferrer" onClick={() => trackPortfolioEvent("contact_whatsapp")}><MessageCircle size={17} /> Falar diretamente com Gabriel <ArrowUpRight size={15} /></a>
                <a className="contact-direct" href="https://www.linkedin.com/in/gabrieldb86" data-umami-event="linkedin-click" target="_blank" rel="noreferrer" onClick={() => trackPortfolioEvent("contact_linkedin")}><Linkedin size={17} /> Conectar pelo LinkedIn <ArrowUpRight size={15} /></a>
                <a className="contact-direct" href="mailto:gabrieldb@me.com" data-umami-event="email-click" onClick={() => trackPortfolioEvent("contact_email")}><Mail size={17} /> gabrieldb@me.com <ArrowUpRight size={15} /></a>
              </div>
            </div>
	            <form className="contact-form" data-reveal="contact-form" onSubmit={handleSubmit} noValidate aria-describedby={Object.keys(formErrors).length ? "contact-form-errors" : undefined} style={{marginLeft: '130px', width: '750px'}}>
                {Object.keys(formErrors).length > 0 && <p id="contact-form-errors" className="form-error-summary" role="alert">Revise os campos destacados antes de enviar a mensagem.</p>}
              <label htmlFor="name">Seu nome</label>
              <input id="name" name="name" type="text" placeholder="Como posso te chamar?" autoComplete="name" required aria-required="true" aria-invalid={formErrors.name ? "true" : undefined} aria-describedby={formErrors.name ? "name-error" : undefined} onBlur={handleFieldBlur} />
              {formErrors.name && <p className="form-field-error" id="name-error">{formErrors.name}</p>}
              <label className="form-honeypot" htmlFor="website">Website</label>
              <input className="form-honeypot" id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              <label htmlFor="company">Empresa ou consultoria</label>
              <input id="company" name="company" type="text" placeholder="Onde você atua?" />
              <label htmlFor="role">Cargo ou oportunidade</label>
              <input id="role" name="role" type="text" placeholder="Qual posição ou desafio?" />
              <label htmlFor="email">Seu e-mail</label>
              <input id="email" name="email" type="email" placeholder="voce@empresa.com" autoComplete="email" required aria-required="true" aria-invalid={formErrors.email ? "true" : undefined} aria-describedby={formErrors.email ? "email-error" : undefined} onBlur={handleFieldBlur} />
              {formErrors.email && <p className="form-field-error" id="email-error">{formErrors.email}</p>}
              <label htmlFor="message">Conte sobre a oportunidade, a empresa ou o desafio da posição</label>
              <textarea id="message" name="message" rows={3} placeholder="Qual é o contexto da vaga ou do desafio?" required aria-required="true" aria-invalid={formErrors.message ? "true" : undefined} aria-describedby={formErrors.message ? "message-error" : undefined} onBlur={handleFieldBlur} />
              {formErrors.message && <p className="form-field-error" id="message-error">{formErrors.message}</p>}
              <button className="submit-button" type="submit">Preparar mensagem <ArrowUpRight size={17} /></button>
              <p className="contact-privacy-note" style={{fontSize: '14px'}}>Ao prosseguir, seus dados são usados somente para preparar uma mensagem no WhatsApp. Este site não capta nem armazena leads. <a href={portfolioPath("/privacidade")} style={{fontSize: '14px'}}>Leia o aviso de privacidade.</a></p>
            </form>
          </div>
        </section>
	      </main>

	      <a className="mobile-sticky-cta" href="https://wa.me/5511945747353" target="_blank" rel="noreferrer" data-umami-event="hero-whatsapp-click" onClick={() => trackPortfolioEvent("cta_fale_comigo")}>FALAR COM GABRIEL <ArrowUpRight size={18} /></a>

	      <a className={`floating-contact ${floatingContactHidden ? "floating-contact-hidden" : ""}`} href="#contact" onClick={(event) => { event.preventDefault(); trackPortfolioEvent("cta_fale_comigo"); scrollToId("contact"); }}><span>Fale comigo</span><ArrowUpRight size={16} /></a>

      <footer className="site-footer">
        <a className="footer-brand" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}><ImageGlowFrame className="footer-avatar"><img src={siteConfig.railImage} alt="" onError={markBrokenImage} /></ImageGlowFrame><span style={{fontSize: '24px'}}>Gabriel Danino Basilio</span></a>
        <div className="footer-socials"><a href="https://www.linkedin.com/in/gabrieldb86" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} strokeWidth={1.75} /></a><a href="https://www.behance.net/gabrieldb86" target="_blank" rel="noreferrer" aria-label="Behance"><div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', border: '1.75px solid currentColor', borderRadius: '3px', fontSize: '10px', fontWeight: 800, lineHeight: 1 }}>Be</div></a><a href="https://wa.me/5511945747353" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} strokeWidth={1.75} /></a></div>
        <span className="footer-credit">© 2026 · Foto de <a href="https://unsplash.com/pt-br/@scalzodesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Samuel Scalzo</a> na <a href="https://unsplash.com/pt-br/fotografias/uma-foto-em-preto-e-branco-de-um-edificio-xyuYk9oLA8I?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Unsplash</a></span>
      </footer>

    </div>
  );
}

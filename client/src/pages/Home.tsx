// Direção visual: Arquivo Editorial — preservar assimetria, índices em vermelho, imagens protagonistas e microcopy objetiva.
import { type CSSProperties, type FormEvent, type SyntheticEvent, useEffect, useLayoutEffect, useState } from "react";
import { setPageMetadata } from "@/lib/seo";
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  MoveDownRight,
  Plus,
  X,
} from "lucide-react";
import { defaultSiteConfig, type ProjectConfig, getSiteConfig } from "@/data/siteConfig";
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

function ProjectCard({ project, revealDelay }: { project: ProjectConfig; revealDelay: number }) {
  const isLocalCase = project.href.startsWith("/");
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
    >
      <div className="project-image-wrap" style={{ aspectRatio: project.aspectRatio }}>
        {genericImageFailed ? <div className="project-image-fallback" role="img" aria-label={`Capa genérica: ${project.title}`} style={{ backgroundImage: `linear-gradient(135deg, rgba(38, 35, 33, .62), rgba(183, 37, 41, .52)), url("${genericImage}")`, backgroundPosition: "center", backgroundSize: "cover" }}><span>{project.number} · projeto</span><strong>{project.title}</strong><small>Imagem genérica editável no editor</small></div> : <img src={imageSource} alt={project.title} className="project-image" style={{ objectPosition: project.objectPosition }} loading={project.number === "01" ? "eager" : "lazy"} decoding="async" onError={() => { if (imageFailed) setGenericImageFailed(true); else setImageFailed(true); }} />}
        <span className="project-arrow" aria-hidden="true">
          <ArrowUpRight size={19} strokeWidth={1.5} />
        </span>
      </div>
      <div className="project-caption">
        <span className="project-number">{project.number}</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.type}</p>
          <span className="project-credit">{isLocalCase ? "Estudo de caso / Gabriel DB" : "Behance / Gabriel DB"}</span>
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

  useEffect(() => {
    setPageMetadata({
      title: "Gabriel Danino Basilio — Coordenação de Conteúdo, Treinamento e Trade Marketing",
      description: "Gabriel Danino Basilio: profissional com 17 anos de experiência, 114K+ pessoas capacitadas e atuação em conteúdo, treinamento, trade marketing e performance de campo.",
      path: "/",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    window.open(`https://wa.me/5511945747353?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell home-revision" style={{ "--primary": siteConfig.brand.accent, "--background": siteConfig.brand.background, "--foreground": siteConfig.brand.foreground, "--site-bg-image": `url(${siteConfig.backgroundImage})` } as CSSProperties}>
      <header className={`site-header site-header-redesign ${scrolled ? "site-header-scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}>
          <span className="brand-name" style={{ fontSize: "24px", textAlign: "left" }}>Gabriel Danino Basilio</span>
        </a>

        <button className="menu-trigger" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
        </button>

        <nav className={`site-nav ${menuOpen ? "site-nav-open" : ""}`} aria-label="Navegação principal">
          <a href="#work" onClick={(event) => { event.preventDefault(); scrollToId("work", () => setMenuOpen(false)); }} style={{fontSize: '14px'}}>Trabalho</a>
          <a href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about", () => setMenuOpen(false)); }} style={{fontSize: '14px'}}>Sobre</a>
          <a href="/cv" style={{fontSize: '14px'}}>CV</a>
          <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToId("contact", () => setMenuOpen(false)); }} style={{fontSize: '14px'}}>Contato</a>
        </nav>

        <div className="header-availability" style={{ fontSize: "14px", fontWeight: 600 }}><span className="status-dot" style={{ backgroundColor: "#00FF66" }} />Aberto a oportunidades</div>
      </header>

      <aside className="side-rail" aria-label="Informações rápidas">
        <div className="rail-image-block"><img src={siteConfig.railImage} alt="Ilustração em preto e branco de Gabriel" onError={markBrokenImage} /></div>
        <span className="rail-label" style={{fontSize: '12px'}}>Portfólio · 2026</span>
      </aside>

      <main id="top">
        <section className="hero-section hero-redesign">
          <div className="hero-redesign-panel" data-reveal="hero-copy">
            <div className="hero-redesign-copy">
              <p className="eyebrow" style={{fontSize: '14px'}}>{siteConfig.hero.eyebrow}</p>
              <h1 className="hero-headline"><span className="hero-headline-white">CONTEÚDO,</span><br /><span className="hero-headline-training">treinamento</span><br /><span className="hero-headline-white">&amp; TRADE</span><br /><span className="hero-headline-white">MARKETING.</span></h1>
              <p className="hero-positioning">{siteConfig.hero.positioning}</p>
              <p className="hero-redesign-intro" style={{ marginTop: "16px", fontSize: '16px' }}>{siteConfig.hero.intro}</p>
              <p className="hero-proof-line" style={{fontSize: '14px'}}>17+ anos · 114K+ pessoas capacitadas · 130+ promotores monitorados</p>
            </div>
          </div>
          <div className="hero-redesign-portrait" data-reveal="hero-portrait">
            <img src={siteConfig.profilePhoto} alt="Gabriel Danino Basilio" onError={markBrokenImage} />
          </div>
        </section>

        <section className="coordination-focus-band" aria-labelledby="coordination-focus-title">
          <div className="coordination-focus-label" data-reveal="focus-label">
            <p className="section-kicker">Focos de coordenação</p>
            <h2 id="coordination-focus-title">Três frentes para transformar <em>método em execução.</em></h2>
            <p className="coordination-focus-note">Da narrativa do conteúdo à operação de campo, cada frente conecta clareza, capacitação e resultado.</p>
          </div>
          <div className="coordination-focus-grid">
            <article className="coordination-focus-item" data-reveal="focus-item" data-reveal-delay="80">
              <div className="coordination-focus-item-top"><span>01</span><ArrowUpRight size={18} aria-hidden="true" /></div>
              <strong>Conteúdo &amp; Treinamento</strong>
              <p>Instructional Design com ADDIE, Kirkpatrick e Learning Experience Design (LXD).</p>
              <ul className="coordination-focus-highlights">
                <li>114 mil+ pessoas capacitadas ao longo da carreira</li>
                <li>8 anos como pioneiro do Today at Apple no Brasil</li>
                <li>Ferramenta própria de avaliação com IA generativa</li>
                <li>Trilhas de aprendizagem, e-learning e microlearning</li>
              </ul>
            </article>
            <article className="coordination-focus-item" data-reveal="focus-item" data-reveal-delay="140">
              <div className="coordination-focus-item-top"><span>02</span><ArrowUpRight size={18} aria-hidden="true" /></div>
              <strong>Trade Marketing &amp; Campo</strong>
              <p>Campanhas de incentivo de ponta a ponta, do briefing à modelagem financeira.</p>
              <ul className="coordination-focus-highlights">
                <li>Dashboards de KPI para 130+ promotores em campo</li>
                <li>Nota média de avaliação: 8,3</li>
                <li>Execução em PDV, merchandising e gestão de redes/franquias</li>
                <li>Análise de risco orçamentário e PDCA</li>
              </ul>
            </article>
            <article className="coordination-focus-item" data-reveal="focus-item" data-reveal-delay="200">
              <div className="coordination-focus-item-top"><span>03</span><ArrowUpRight size={18} aria-hidden="true" /></div>
              <strong>T&amp;D de Pessoas</strong>
              <p>Onboarding, avaliação de desempenho e desenvolvimento de equipes de campo.</p>
              <ul className="coordination-focus-highlights">
                <li>Metodologia 9Box e ciclos de PDCA</li>
                <li>Facilitação premiada (maiores indicadores de NPS na Apple)</li>
                <li>Programas de capacitação e certificação</li>
                <li>Gestão de stakeholders e fornecedores</li>
              </ul>
            </article>
          </div>
          <a
            className="coordination-focus-feature"
            href={siteConfig.coordinationFeature.href || "#work"}
            aria-label={`Abrir projeto ${siteConfig.coordinationFeature.title}`}
            data-umami-event="coordination-feature-open"
            {...(!siteConfig.coordinationFeature.href.startsWith("/") ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <span className="coordination-focus-feature-media">
              <img
                src={siteConfig.coordinationFeature.image || defaultSiteConfig.generatedAssets.poster}
                alt={siteConfig.coordinationFeature.alt}
                style={{ objectPosition: siteConfig.coordinationFeature.objectPosition }}
                onError={markBrokenImage}
              />
            </span>
            <span className="coordination-focus-feature-copy">
              <span className="coordination-focus-feature-meta">
                {siteConfig.coordinationFeature.category} <span aria-hidden="true">·</span> {siteConfig.coordinationFeature.year}
              </span>
              <strong>{siteConfig.coordinationFeature.title}</strong>
              <span>{siteConfig.coordinationFeature.description}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </a>
        </section>

        <section className="recruiter-proof-wrap" aria-label="Destaques profissionais para RH e lideranças">
          <div className="recruiter-proof-header" data-reveal="proof-header">
            <p className="section-kicker">Para RH, headhunters e lideranças</p>
            <h2 className="recruiter-proof-title">Números que <em>comprovam</em> a experiência.</h2>
            <p className="recruiter-proof-desc">Da facilitação premiada na Apple à gestão de campo na SPOT, cada indicador abaixo representa anos de execução real — não promessa.</p>
          </div>
          <div className="recruiter-proof-strip" data-reveal="proof-strip">
            <div className="proof-metric"><strong>17+</strong><span>anos de experiência</span></div>
            <div className="proof-metric"><strong>114K<span>+</span></strong><span>Pessoas capacitadas<br />ao longo da carreira</span></div>
            <div className="proof-metric"><strong>130<span>+</span></strong><span>Promotores monitorados<br />(operação de campo)</span></div>
            <div className="proof-metric"><strong>5</strong><span>Coordenações de campanha<br />(Cystex, Enavo Gotas, Culturelle, Duekal, Copa)</span></div>
            <div className="proof-metric"><strong>8,3</strong><span>Média de avaliação<br /><span className="proof-tagline">Conteúdo &amp; Treinamento · Trade Marketing · T&amp;D de Pessoas</span></span></div>
            <div className="proof-actions">
              <Link href="/cv" className="proof-link" style={{ backgroundColor: "#d73332", color: "#fff9f2" }}><span>Abrir trajetória</span><ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link href="/cv" className="proof-link proof-link-alt"><span>Acessar CV</span><ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="manifesto-section section-pad" aria-labelledby="manifesto-title" style={{ marginTop: "-25px", backgroundColor: "#ddd0c4" }}>
          <div className="manifesto-grid" data-reveal="manifesto">
            <div className="manifesto-heading">
              <p className="section-kicker" style={{ color: "#d73332", fontSize: "16px" }}>Como eu atuo</p>
              <h2 id="manifesto-title" style={{ color: "#000000" }}>Transformo estratégia em <span style={{ color: "#d73332" }}>experiências</span> que movem pessoas.</h2>
            </div>
            <div className="manifesto-aside">
              <p style={{ fontSize: "16px", color: "#000000" }}>Porque conteúdo e treinamento só funcionam quando encontram contexto, método e um próximo passo claro — para a equipe, para o campo e para o negócio.</p>
              <a className="text-link" href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about"); }} style={{ fontSize: "14px", color: "#d73332" }}>Conheça meu jeito de trabalhar <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section id="work" className="work-section work-redesign section-pad" aria-labelledby="work-title">
          <div className="work-redesign-heading" data-reveal="work-heading">
            <div style={{fontSize: '14px'}}><p className="section-kicker" style={{fontSize: '14px'}}>Trabalhos selecionados</p><h2 id="work-title" style={{fontSize: '14px'}}>Projetos que<br style={{fontSize: '14px'}} /><em style={{fontSize: '14px'}}>ganharam forma.</em></h2></div>
            <p style={{ fontSize: "16px", color: "#ffffff", fontWeight: 600 }}>Uma seleção de campanhas, trilhas, eventos e materiais criada para comunicar melhor, capacitar equipes e melhorar a execução.</p>
            <a className="behance-link" href="https://www.behance.net/gabrieldb86" data-umami-event="behance-open" target="_blank" rel="noreferrer" style={{fontSize: '14px'}}>Abrir Behance <ArrowUpRight size={15} style={{fontSize: '14px'}} /></a>
          </div>

          <div className="projects-grid sean-obrien-grid">
            {siteConfig.projects.filter((project) => project.visible).map((project, index) => <ProjectCard key={project.number} project={project} revealDelay={index * 50} />)}
          </div>
        </section>

        <section className="services-section services-redesign section-pad" aria-labelledby="services-title">
          <div className="services-layout" data-reveal="services-layout">
            <div>
              <p className="section-kicker" style={{fontSize: '14px'}}>Áreas de atuação</p>
              <h2 id="services-title">Coordenação que<br />vira <em className="services-result">resultado.</em></h2>
              <div className="services-editorial-note" style={{fontSize: '16px'}}><strong style={{fontSize: '16px'}}>Do briefing ao resultado.</strong><p style={{fontSize: '16px'}}>Coordenação que organiza contexto, método, conteúdo e execução para o trabalho chegar ao campo.</p></div>
            </div>
            <div className="services-list">
              {siteConfig.services.map(([number, title, description], index) => (
                <details className="service-item" key={number} data-reveal="service-item" data-reveal-delay={index * 70}>
                  <summary className="service-row">
                    <span className="service-number">{number}</span>
                    <div style={{ fontSize: "14px" }}><h3 style={{ fontSize: "14px" }}>{title}</h3><p style={{ fontSize: "14px" }}>{description}</p></div>
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
              <img src={siteConfig.trainingImage} alt="Gabriel conduzindo um treinamento diante de uma equipe" loading="eager" onError={markBrokenImage} />
              <span className="about-art-label" style={{ fontSize: "14px", fontWeight: 700 }}>Processo / repertório / intenção</span>
            </div>
            <div className="about-copy" data-reveal="about-copy">
              <p className="section-kicker" style={{fontSize: '16px'}}>Sobre mim</p>
              <h2 id="about-title">Olá, eu sou<br /><em>Gabriel.</em></h2>
              <p className="about-lead" style={{fontSize: '16px'}}>Tenho 17 anos de experiência em conteúdo, treinamento e trade marketing — e mais de 114K pessoas capacitadas ao longo da carreira, incluindo 8 anos como pioneiro do Today at Apple no Brasil.</p>
              <p style={{fontSize: '16px'}}>Minha trajetória cruza coordenação de treinamento, gestão de indicadores de campo e produção de conteúdo — da Apple à SPOT/Grupo EMS. Busco uma próxima posição de coordenação em Conteúdo &amp; Treinamento, Trade Marketing &amp; Performance de Campo, ou Treinamento &amp; Desenvolvimento de Pessoas, aplicando metodologias como ADDIE, Kirkpatrick e Design Thinking.</p>
              <div className="about-skill-list" aria-label="Áreas de atuação"><span>Instructional Design</span><span>Trade Marketing</span><span>Gestão de Campo</span><span>ADDIE / Kirkpatrick</span><span>IA Generativa</span><span>Dashboards &amp; KPIs</span></div>
              <div className="about-principles" aria-label="Princípios de coordenação">
                <div><span>01</span><strong>Contexto antes da solução</strong><p>Entender público, operação e indicador antes de desenhar a resposta.</p></div>
                <div><span>02</span><strong>Método que chega ao campo</strong><p>Transformar estratégia em conteúdo, treinamento, rotina e material aplicável.</p></div>
                <div><span>03</span><strong>Acompanhamento até o resultado</strong><p>Usar avaliação, indicadores, PDCA e feedback para ajustar a execução.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="statement-section">
          <img src={siteConfig.heroImage} alt="Projeto visual de bonés em preto e vermelho" loading="eager" onError={markBrokenImage} />
          <div className="statement-copy" data-reveal="statement-copy"><span>Uma pergunta para o próximo projeto:</span><h2>O que precisa<br /><em>ganhar forma?</em></h2></div>
        </section>

        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
          <div className="contact-grid">
            <div className="contact-intro" data-reveal="contact-intro">
              <p className="section-kicker">Vamos conversar</p>
              <h2 id="contact-title">Você está formando<br />uma equipe de <em>coordenação?</em></h2>
              <p style={{fontSize: '16px'}}>Estou aberto a oportunidades em conteúdo, treinamento, trade marketing e performance de campo. Envie o contexto da posição ou fale comigo diretamente pelo LinkedIn, e-mail ou WhatsApp.</p>
              <div className="contact-links">
                <a className="contact-direct" href="https://wa.me/5511945747353" data-umami-event="whatsapp-click" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Falar diretamente com Gabriel <ArrowUpRight size={15} /></a>
                <a className="contact-direct" href="https://www.linkedin.com/in/gabrieldb86" data-umami-event="linkedin-click" target="_blank" rel="noreferrer"><Linkedin size={17} /> Conectar pelo LinkedIn <ArrowUpRight size={15} /></a>
                <a className="contact-direct" href="mailto:gabrieldb@me.com" data-umami-event="email-click"><Mail size={17} /> gabrieldb@me.com <ArrowUpRight size={15} /></a>
              </div>
            </div>
            <form className="contact-form" data-reveal="contact-form" onSubmit={handleSubmit}>
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
              <p className="contact-privacy-note" style={{fontSize: '14px'}}>Ao enviar, os dados são usados apenas para responder ao seu contato. <a href="/privacidade" style={{fontSize: '14px'}}>Leia o aviso de privacidade.</a></p>
            </form>
          </div>
        </section>
      </main>

      <a className="floating-contact" href="#contact" onClick={(event) => { event.preventDefault(); scrollToId("contact"); }}><span>Fale comigo</span><ArrowUpRight size={16} /></a>

      <footer className="site-footer">
        <a className="footer-brand" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}><span className="footer-avatar"><img src={siteConfig.railImage} alt="" onError={markBrokenImage} /></span><span style={{fontSize: '24px'}}>Gabriel Danino Basilio</span></a>
        <div className="footer-socials"><a href="https://www.linkedin.com/in/gabrieldb86" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} strokeWidth={1.75} /></a><a href="https://www.behance.net/gabrieldb86" target="_blank" rel="noreferrer" aria-label="Behance"><div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', border: '1.75px solid currentColor', borderRadius: '3px', fontSize: '10px', fontWeight: 800, lineHeight: 1 }}>Be</div></a><a href="https://wa.me/5511945747353" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} strokeWidth={1.75} /></a></div>
        <span className="footer-credit">© 2026 · Feito com intenção. · Foto de <a href="https://unsplash.com/pt-br/@scalzodesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Samuel Scalzo</a> na <a href="https://unsplash.com/pt-br/fotografias/uma-foto-em-preto-e-branco-de-um-edificio-xyuYk9oLA8I?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Unsplash</a></span>
      </footer>

    </div>
  );
}

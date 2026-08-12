// Direção visual: Arquivo Editorial — preservar assimetria, índices em vermelho, imagens protagonistas e microcopy objetiva.
import { type CSSProperties, type FormEvent, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Menu,
  MessageCircle,
  MoveDownRight,
  Plus,
  X,
} from "lucide-react";
import { type ProjectConfig, getSiteConfig } from "@/data/siteConfig";

function scrollToId(id: string, closeMenu?: () => void) {
  closeMenu?.();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function renderHeadline(headline: string) {
  const [before, after] = headline.split(" e ");
  return after ? <>{before} <em>e {after}</em></> : headline;
}

function ProjectCard({ project }: { project: ProjectConfig }) {
  const isInternal = project.image.startsWith("internal:");
  const internalType = project.image.replace("internal:", "");
  return (
    <a
      className={`project-card ${project.size}`}
      href={project.href}
      {...(!isInternal ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-label={isInternal ? `Conversar sobre o case ${project.title}` : `Abrir projeto ${project.title} no Behance`}
    >
      <div className="project-image-wrap" style={{ aspectRatio: project.aspectRatio }}>
        {isInternal ? <div className={`internal-project-cover internal-project-${internalType}`}><span>{project.number}</span><strong>{project.title}</strong><small>Case interno · briefing / método / resultado</small></div> : <img src={project.image} alt={project.title} className="project-image" style={{ objectPosition: project.objectPosition }} loading="lazy" />}
        <span className="project-arrow" aria-hidden="true">
          <ArrowUpRight size={19} strokeWidth={1.5} />
        </span>
      </div>
      <div className="project-caption">
        <span className="project-number">{project.number}</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.type}</p>
          <span className="project-credit">{isInternal ? "Case interno / Gabriel DB" : "Behance / Gabriel DB"}</span>
        </div>
        <span className="project-year">{project.year}</span>
      </div>
    </a>
  );
}

export default function Home() {
  const [siteConfig, setSiteConfig] = useState(() => getSiteConfig());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [openService, setOpenService] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncConfig = () => setSiteConfig(getSiteConfig());
    window.addEventListener("storage", syncConfig);
    return () => window.removeEventListener("storage", syncConfig);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Olá, Gabriel! Meu nome é ${data.get("name")} e gostaria de conversar sobre ${data.get("message")}. Meu e-mail é ${data.get("email")}.`;
    setSent(true);
    window.open(`https://wa.me/5511945747353?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell home-revision" style={{ "--primary": siteConfig.brand.accent, "--background": siteConfig.brand.background, "--foreground": siteConfig.brand.foreground, "--site-bg-image": `url(${siteConfig.backgroundImage})` } as CSSProperties}>
      <header className={`site-header site-header-redesign ${scrolled ? "site-header-scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}>
          <span className="brand-name" style={{fontSize: '24px', textAlign: 'left'}}>Gabriel Danino<br style={{fontSize: '24px', textAlign: 'left'}} />Basilio</span>
        </a>

        <button className="menu-trigger" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
        </button>

        <nav className={`site-nav ${menuOpen ? "site-nav-open" : ""}`} aria-label="Navegação principal">
          <a href="#work" onClick={(event) => { event.preventDefault(); scrollToId("work", () => setMenuOpen(false)); }}>Trabalho <span>01</span></a>
          <a href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about", () => setMenuOpen(false)); }}>Sobre <span>02</span></a>
          <a href="/cv">CV <span>03</span></a>
          <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToId("contact", () => setMenuOpen(false)); }}>Contato <span>04</span></a>
        </nav>

        <div className="header-availability"><span className="status-dot" />Aberto a oportunidades de coordenação</div>
      </header>

      <aside className="side-rail" aria-label="Informações rápidas">
        <div className="rail-image-block"><img src={siteConfig.railImage} alt="Ilustração em preto e branco de Gabriel" /></div>
        <span className="rail-label">Coordenação · 2026</span>
        <span className="rail-line" />
        <div className="rail-ticks" aria-hidden="true"><span>01</span><i /><span>02</span><i /><span>03</span><i /><span>04</span><i /><span>05</span></div>
        <span className="rail-line" />
        <span className="rail-label rail-vertical">São Paulo, Brasil</span>
      </aside>

      <main id="top">
        <section className="hero-section hero-redesign">
          <div className="hero-redesign-meta"><span>GDB / 2026</span><span>São Paulo · Brasil</span></div>
          <div className="hero-redesign-copy">
            <p className="eyebrow"><span className="eyebrow-mark">●</span> {siteConfig.hero.eyebrow}</p>
            <h1>Conteúdo,<br /><em>treinamento</em><br />&amp; trade<br />marketing.</h1>
            <p className="hero-redesign-intro">{siteConfig.hero.intro}</p>
            <a className="hero-cta hero-cta-redesign" href="#work" onClick={(event) => { event.preventDefault(); scrollToId("work"); }}>Explorar trabalho <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-redesign-portrait">
            <img src={siteConfig.profilePhoto} alt="Gabriel Danino Basilio" />
          </div>
          <div className="hero-redesign-bottom"><span>17 anos de experiência</span><span>Conteudista · Facilitador · Coordenador de Treinamento</span><a className="hero-cv-link" href="/cv">Ver CV <ArrowUpRight size={14} /></a><button type="button" onClick={() => scrollToId("work")} aria-label="Descer para os projetos"><MoveDownRight size={20} /></button></div>
        </section>

        <div className="portfolio-marquee" aria-hidden="true">
          <div className="portfolio-marquee-track">
            <div className="portfolio-marquee-group"><span>CONTEÚDO</span><b>•</b><span>TREINAMENTO</span><b>•</b><span>TRADE MARKETING</span><b>•</b><span>CAMPO</span><b>•</b><span>L&amp;D</span><b>•</b><span>ESTRATÉGIA</span><b>•</b><span>CONTEÚDO</span><b>•</b><span>TREINAMENTO</span><b>•</b><span>TRADE MARKETING</span><b>•</b></div>
            <div className="portfolio-marquee-group" aria-hidden="true"><span>CONTEÚDO</span><b>•</b><span>TREINAMENTO</span><b>•</b><span>TRADE MARKETING</span><b>•</b><span>CAMPO</span><b>•</b><span>L&amp;D</span><b>•</b><span>ESTRATÉGIA</span><b>•</b><span>CONTEÚDO</span><b>•</b><span>TREINAMENTO</span><b>•</b><span>TRADE MARKETING</span><b>•</b></div>
          </div>
        </div>

        <section className="recruiter-proof-strip" aria-label="Destaques profissionais">
          <div className="proof-intro"><p className="section-kicker">Para quem recruta</p><p>Uma leitura rápida da experiência que sustenta o trabalho.</p></div>
          <div className="proof-metric"><strong>17</strong><span>anos de experiência</span></div>
          <div className="proof-metric"><strong>300K<span>+</span></strong><span>pessoas capacitadas</span></div>
          <div className="proof-metric"><strong>130<span>+</span></strong><span>promotores monitorados</span></div>
          <div className="proof-metric"><strong>8,3</strong><span>média de avaliação</span></div>
          <a href="/cv" className="proof-link">Abrir trajetória <ArrowUpRight size={15} /></a>
        </section>

        <section className="manifesto-section section-pad" aria-labelledby="manifesto-title">
          <div className="section-index"><span>01</span><span className="index-line" /></div>
          <div className="manifesto-grid">
            <p className="section-kicker">Como eu atuo</p>
            <h2 id="manifesto-title">Transformo estratégia em <span>experiências</span> que movem pessoas.</h2>
            <div className="manifesto-aside">
              <p>Porque conteúdo e treinamento só funcionam quando encontram contexto, método e um próximo passo claro — para a equipe, para o campo e para o negócio.</p>
              <a className="text-link" href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about"); }}>Conheça meu jeito de trabalhar <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section id="work" className="work-section work-redesign section-pad" aria-labelledby="work-title">
          <div className="work-redesign-heading">
            <div className="work-redesign-index"><span>02</span><span>/ WORK</span></div>
            <div><p className="section-kicker">Selected work</p><h2 id="work-title">Projetos que<br /><em>ganharam forma.</em></h2></div>
            <p>Uma seleção de campanhas, trilhas, dashboards, eventos e materiais criada para comunicar melhor, capacitar equipes e melhorar a execução.</p>
            <a className="behance-link" href="https://www.behance.net/gabrieldb86" target="_blank" rel="noreferrer">Abrir Behance <ArrowUpRight size={15} /></a>
          </div>

          <div className="projects-grid">
            {siteConfig.projects.filter((project) => project.visible).map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        </section>

        <section className="services-section services-redesign section-pad" aria-labelledby="services-title">
          <div className="section-index"><span>03</span><span className="index-line" /></div>
          <div className="services-layout">
            <div>
              <p className="section-kicker">Áreas de atuação</p>
              <h2 id="services-title">Coordenação que<br />vira <strong>resultado.</strong></h2>
              <img className="services-art" src={siteConfig.projects[4]?.image} alt="Projeto de apresentação Blocs" loading="lazy" />
            </div>
            <div className="services-list">
              {siteConfig.services.map(([number, title, description]) => (
                <article className={`service-item ${openService === number ? "service-item-open" : ""}`} key={number}>
                  <button className="service-row" type="button" aria-expanded={openService === number} aria-controls={`service-detail-${number}`} onClick={() => setOpenService((current) => current === number ? null : number)}>
                    <span className="service-number">{number}</span>
                    <div><h3>{title}</h3><p>{description}</p></div>
                    <Plus className="service-toggle" size={21} strokeWidth={1.4} />
                  </button>
                  {openService === number && <div className="service-detail" id={`service-detail-${number}`}><p>{siteConfig.serviceDetails[number]}</p><a href="#contact" onClick={(event) => { event.preventDefault(); scrollToId("contact"); }}>Conversar sobre este tema <ArrowUpRight size={15} /></a></div>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section section-pad" aria-labelledby="about-title">
          <div className="section-index"><span>04</span><span className="index-line" /></div>
          <div className="about-grid">
            <div className="about-art-wrap">
              <img src={siteConfig.projects[3]?.image} alt="Projeto Eletrolar Show 2024" loading="lazy" />
              <span className="about-art-label">Processo / repertório / intenção</span>
            </div>
            <div className="about-copy">
              <p className="section-kicker">Sobre mim</p>
              <h2 id="about-title">Olá, eu sou<br /><em>Gabriel.</em></h2>
              <p className="about-lead">Tenho 17 anos de experiência em conteúdo, treinamento e trade marketing — e mais de 300 mil pessoas capacitadas ao longo da carreira, incluindo 8 anos como pioneiro do Today at Apple no Brasil.</p>
              <p>Minha trajetória cruza coordenação de treinamento, gestão de indicadores de campo e produção de conteúdo — da Apple à SPOT/Grupo EMS. Busco uma próxima posição de coordenação em Conteúdo &amp; Treinamento, Trade Marketing &amp; Performance de Campo, ou Treinamento &amp; Desenvolvimento de Pessoas, aplicando metodologias como ADDIE, Kirkpatrick e Design Thinking.</p>
              <div className="about-skill-list" aria-label="Áreas de atuação"><span>Instructional Design</span><span>Trade Marketing</span><span>Gestão de Campo</span><span>ADDIE / Kirkpatrick</span><span>IA Generativa</span><span>Dashboards &amp; KPIs</span></div>
            </div>
          </div>
        </section>

        <section className="statement-section">
          <img src={siteConfig.heroImage} alt="Projeto visual de bonés em preto e vermelho" loading="lazy" />
          <div className="statement-copy"><span>Uma pergunta para o próximo projeto:</span><h2>O que precisa<br /><em>ganhar forma?</em></h2></div>
        </section>

        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
          <div className="section-index"><span>05</span><span className="index-line" /></div>
          <div className="contact-grid">
            <div className="contact-intro">
              <p className="section-kicker">Vamos conversar</p>
              <h2 id="contact-title">Tem uma oportunidade<br />em <em>mente?</em></h2>
              <p>Se você busca alguém para coordenar conteúdo, treinamento ou performance de campo, me conte o contexto. Eu respondo pelo WhatsApp e a gente entende juntos o melhor próximo passo.</p>
              <a className="contact-direct" href="https://wa.me/5511945747353" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Falar diretamente no WhatsApp <ArrowUpRight size={15} /></a>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Seu nome</label>
              <input id="name" name="name" type="text" placeholder="Como posso te chamar?" required />
              <label htmlFor="email">Seu e-mail</label>
              <input id="email" name="email" type="email" placeholder="voce@empresa.com" required />
              <label htmlFor="message">O que você precisa?</label>
              <textarea id="message" name="message" rows={3} placeholder="Conte um pouco sobre o projeto..." required />
              <button className="submit-button" type="submit">Enviar mensagem <ArrowUpRight size={17} /></button>
              {sent && <p className="form-success" role="status">Mensagem preparada. O WhatsApp foi aberto em uma nova aba.</p>}
            </form>
          </div>
        </section>
      </main>

      <a className="floating-contact" href="#contact" onClick={(event) => { event.preventDefault(); scrollToId("contact"); }}><span>Fale comigo</span><ArrowUpRight size={16} /></a>

      <footer className="site-footer">
        <a className="footer-brand" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}><span className="footer-avatar"><img src={siteConfig.railImage} alt="" /></span><span style={{fontSize: '24px'}}>Gabriel Danino Basilio</span></a>
        <a className="footer-editor-link" href="/editor">Editar portfólio</a>
        <div className="footer-socials"><a href="https://www.linkedin.com/in/gabrieldb86" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://instagram.com/gabrieldb1986" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="https://wa.me/5511945747353" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div>
        <span className="footer-credit">© 2026 · Feito com intenção. · Foto de <a href="https://unsplash.com/pt-br/@scalzodesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Samuel Scalzo</a> na <a href="https://unsplash.com/pt-br/fotografias/uma-foto-em-preto-e-branco-de-um-edificio-xyuYk9oLA8I?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Unsplash</a></span>
      </footer>
    </div>
  );
}

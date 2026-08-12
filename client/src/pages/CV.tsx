// Direção visual: Arquivo Editorial — o CV usa índice, marfim, vermelho-carmim e tipografia em camadas para transformar experiência em narrativa.
import { type CSSProperties, useEffect } from "react";
import { setPageMetadata } from "@/lib/seo";
import { ArrowLeft, ArrowUpRight, Linkedin, Mail, MapPin, MessageCircle, Phone, Printer } from "lucide-react";
import { getSiteConfig } from "@/data/siteConfig";

const experience = [
  {
    period: "2025—2026",
    role: "Analista de Conteúdo",
    company: "Agência SPOT · Cliente Grupo EMS",
    area: "Conteúdo, Treinamento e Trade Marketing",
    points: [
      "Criei e liderei campanhas de incentivo de ponta a ponta (Cystex, Enavo Gotas, Culturelle) — do briefing à modelagem financeira e análise de risco orçamentário.",
      "Desenvolvi dashboards interativos (HTML5/Chart.js) para monitoramento de KPIs de mais de 130 promotores.",
      "Criei e apliquei 10 Pílulas de Conhecimento, 10 avaliações mensais e 1 mega avaliação, elevando a nota média para 8,3.",
      "Desenvolvi ferramenta proprietária com IA generativa para geração automatizada de avaliações e trilhas de conteúdo.",
      "Conduzi onboarding institucional e treinamentos técnicos de portfólio para promotores e supervisores.",
      "Representei a equipe no Roadshow DPSP, apresentando novidades de produto a mais de 200 farmacêuticos.",
    ],
  },
  {
    period: "2024—2025",
    role: "Produção Audiovisual",
    company: "Autônomo (PJ)",
    area: "Vídeo · Conteúdo para redes · Pós-produção",
    points: [
      "Produzi 4 episódios de podcast do segmento de varejo e mais de 20 cortes para redes sociais.",
      "Criei e editei videoclipe musical e conduzi pós-produção para clientes de comunicação corporativa e conteúdo educacional.",
    ],
  },
  {
    period: "2023—2024",
    role: "Supervisor de Treinamento e Produtos",
    company: "Ragtech Eletrônica Ltda",
    area: "Treinamento, Marketing e Produtos",
    points: [
      "Implementei o sistema de treinamento da empresa, capacitando cerca de 160 colaboradores de redes varejistas parceiras.",
      "Liderei campanhas de sell-in e sell-out para vendedores internos, parceiros e distribuidores.",
      "Desenvolvi estratégias de trade marketing para ampliar visibilidade de marca e vendas no PDV.",
      "Acompanhei indicadores de desenvolvimento e estruturei agenda de treinamentos via PDI.",
    ],
  },
  {
    period: "2015—2023",
    role: "Criativo PRO",
    company: "Apple Inc.",
    area: "Varejo, Treinamento e Merchandising",
    points: [
      "Facilitei e treinei sessões do Today at Apple por mais de 8 anos, como pioneiro do programa no Brasil — liderando indicadores de NPS e público por sessão.",
      "Treinei equipes de Apple Premium Resellers, padronizando merchandising e materiais de PDV.",
      "Criei sessões de treinamento inclusivas para públicos com necessidades especiais (tetraplegia, síndrome de Down, autismo, deficiência visual e auditiva).",
      "Mapeei treinamentos internos com o sistema FYI (Korn Ferry Leadership Architect).",
    ],
  },
  {
    period: "2011—2014",
    role: "Macintosh Solution Consultant Sênior",
    company: "ITM Channel Marketing (Apple)",
    area: "Varejo, Treinamento e Merchandising",
    points: [
      "Treinei e integrei cerca de 20 novos consultores da marca, com taxa de retenção estimada em ~90%.",
      "Geri indicadores de estoque, vendas e experiência do cliente em 20 lojas parceiras (FNAC, Fast Shop, Walmart, Ponto Frio).",
    ],
  },
];

const capabilities = [
  "Coordenação de Trade Marketing e Performance de Campo",
  "Coordenação de Conteúdo e Treinamento",
  "Coordenação de T&D de Pessoas",
  "Instructional Design & E-learning",
  "Campanhas de Incentivo & Modelagem Financeira",
  "Dashboards, KPIs e Análise de Dados",
];

const education = {
  degree: "Bacharelado em Publicidade, Propaganda e Criação",
  institution: "Universidade Presbiteriana Mackenzie",
  period: "08/2006 – 12/2009",
};

const methodologies = ["ADDIE", "Kirkpatrick", "Design Thinking", "Learning Experience Design (LXD)", "Microlearning", "Blended Learning", "Gamificação Instrucional", "70/20/10", "6D", "9Box", "Andragogia"];

const tools = {
  LMS: ["Moodle", "EMSINA", "Microsiga", "Datasul"],
  Produtividade: ["Excel Avançado (VBA)", "Google Sheets", "PowerPoint", "Trello", "Asana", "ClickUp", "Notion", "Jira"],
  "Audiovisual e IA": ["Adobe (Photoshop, Premiere, After Effects)", "Final Cut Pro", "ChatGPT / Claude", "Midjourney / DALL-E"],
  "Campo e Trade Marketing": ["S3", "Involves (SFA)", "Dashboards"],
};

const languages = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Avançado" },
  { name: "Espanhol", level: "Básico" },
];

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function CV() {
  const siteConfig = getSiteConfig();
  const profilePhoto = siteConfig.profilePhoto;

  useEffect(() => {
    setPageMetadata({
      title: "CV — Gabriel Danino Basilio | Conteúdo, Treinamento e Trade Marketing",
      description: "Experiência profissional, formação, metodologias e competências de Gabriel Danino Basilio para coordenação de conteúdo, treinamento, trade marketing e desenvolvimento de pessoas.",
      path: "/cv",
    });
  }, []);
  return (
    <div className="site-shell cv-page" style={{ "--primary": siteConfig.brand.accent, "--background": siteConfig.brand.background, "--foreground": siteConfig.brand.foreground } as CSSProperties}>
      <header className="site-header site-header-scrolled">
        <a className="brand-lockup" href="/" aria-label="Voltar para o portfólio">
          <img src={siteConfig.railImage} alt="" className="header-avatar" />
          <span className="brand-name">Gabriel Danino<br />Basilio</span>
        </a>
        <nav className="site-nav cv-nav" aria-label="Navegação principal">
          <a href="/">Trabalho <span>01</span></a>
          <a href="/#about">Sobre <span>02</span></a>
          <a className="nav-active" href="/cv">CV <span>03</span></a>
          <a href="/#contact">Contato <span>04</span></a>
        </nav>
        <div className="header-availability"><span className="status-dot" />Aberto a oportunidades de coordenação</div>
      </header>

      <aside className="side-rail" aria-label="Informações rápidas">
        <span className="rail-label">Currículo · 2026</span>
        <span className="rail-line" />
        <div className="rail-ticks" aria-hidden="true"><span>CV</span><i /><span>17</span><i /><span>300K</span></div>
        <span className="rail-line" />
        <span className="rail-label rail-vertical">São Paulo, Brasil</span>
      </aside>

      <main className="cv-main" id="top">
        <section className="cv-hero section-pad">
          <div className="section-index"><span>CV</span><span className="index-line" /></div>
          <div className="cv-hero-grid">
            <div className="cv-hero-copy">
              <p className="section-kicker">Experiência profissional</p>
              <h1>Conteúdo que<br /><em>move pessoas.</em></h1>
              <p className="cv-lead">Profissional com 17 anos de experiência em conteúdo, treinamento e trade marketing, com mais de 300 mil pessoas capacitadas ao longo da carreira. Busco posição de coordenador em Conteúdo &amp; Treinamento, Trade Marketing &amp; Performance de Campo, ou Treinamento &amp; Desenvolvimento de Pessoas.</p>
              <div className="cv-actions">
                <a className="submit-button cv-contact-button" href="/#contact">Conversar sobre uma oportunidade <ArrowUpRight size={16} /></a>
                <button className="print-button" type="button" onClick={() => window.print()}><Printer size={15} /> Imprimir CV</button>
              </div>
            </div>
            <div className="cv-portrait-wrap">
              <div className="cv-portrait"><img src={profilePhoto} alt="Gabriel Danino Basilio" /></div>
              <div className="cv-portrait-caption"><span>Gabriel Danino Basilio</span><span>Conteudista · Facilitador · Coordenador de Treinamento</span></div>
            </div>
          </div>
        </section>

        <section className="cv-stats-section">
          <div className="cv-stat"><strong>17</strong><span>anos de experiência</span></div>
          <div className="cv-stat"><strong>300K<span>+</span></strong><span>pessoas capacitadas</span></div>
          <div className="cv-stat"><strong>130<span>+</span></strong><span>promotores monitorados</span></div>
          <div className="cv-stat"><strong>8,3</strong><span>média de avaliação</span></div>
        </section>

        <section className="cv-content-section section-pad">
          <div className="section-index"><span>01</span><span className="index-line" /></div>
          <div className="cv-content-grid">
            <div className="cv-sidebar">
              <p className="section-kicker">Perfil</p>
              <p className="cv-sidebar-copy">Conteúdo, treinamento e trade marketing com olhar de quem entende que comunicação só funciona quando encontra contexto, ritmo e intenção.</p>
              <div className="cv-contact-list">
                <a href="tel:+5511945747353"><Phone size={14} /> +55 11 94574-7353</a>
                <a href="mailto:gabrieldb@me.com"><Mail size={14} /> gabrieldb@me.com</a>
                <span><MapPin size={14} /> São Paulo, SP</span>
              </div>
            </div>
            <div className="cv-capabilities">
              <p className="section-kicker">Áreas de atuação</p>
              <div className="capability-grid">
                {capabilities.map((capability, index) => <span key={capability}><b>0{index + 1}</b>{capability}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="cv-detail-section section-pad" aria-labelledby="qualification-title">
          <div className="section-index"><span>03</span><span className="index-line" /></div>
          <div className="cv-detail-content">
            <div className="cv-section-heading"><p className="section-kicker">Base de atuação</p><h2 id="qualification-title">Método, repertório<br /><strong>e ferramentas.</strong></h2></div>
            <div className="cv-qualification-grid">
              <article className="cv-qualification-block cv-education-block"><p className="section-kicker">Formação</p><h3>{education.degree}</h3><p>{education.institution}</p><span>{education.period}</span></article>
              <article className="cv-qualification-block"><p className="section-kicker">Metodologias e frameworks de T&amp;D</p><div className="cv-tag-list">{methodologies.map((item) => <span key={item}>{item}</span>)}</div></article>
              <article className="cv-qualification-block cv-tools-block"><p className="section-kicker">Ferramentas e sistemas</p><div className="cv-tools-list">{Object.entries(tools).map(([group, items]) => <div key={group}><b>{group}</b><p>{items.join(" · ")}</p></div>)}</div></article>
              <article className="cv-qualification-block cv-languages-block"><p className="section-kicker">Idiomas</p><div className="cv-language-list">{languages.map((language) => <div key={language.name}><b>{language.name}</b><span>{language.level}</span></div>)}</div></article>
            </div>
          </div>
        </section>

        <section className="cv-toolstrip-section">
          <div className="cv-toolstrip-label"><span>04</span><p className="section-kicker">Como trabalho</p></div>
          <div className="cv-toolstrip"><span>Curiosidade</span><span>Clareza</span><span>Ritmo</span><span>Colaboração</span><span>Repertório</span><span>Entrega</span></div>
        </section>

        <section className="cv-experience-section section-pad" aria-labelledby="experience-title">
          <div className="section-index"><span>02</span><span className="index-line" /></div>
          <div className="cv-experience-content">
            <div className="cv-section-heading"><p className="section-kicker">Trajetória</p><h2 id="experience-title">Experiência que<br /><strong>vira repertório.</strong></h2></div>
            <div className="experience-list">
              {experience.map((item) => (
                <article className="experience-item" key={item.company}>
                  <div className="experience-meta"><span>{item.period}</span><i /></div>
                  <div className="experience-body"><h3>{item.role}</h3><p className="experience-company">{item.company}</p><p className="experience-area">{item.area}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cv-closing-section">
          <div className="cv-closing-copy"><span>Uma próxima página</span><h2>Vamos construir<br /><em>o próximo resultado.</em></h2><a className="contact-direct" href="https://wa.me/5511945747353" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Falar com Gabriel <ArrowUpRight size={15} /></a></div>
          <img src={profilePhoto} alt="" loading="lazy" />
        </section>
      </main>

      <a className="floating-contact floating-contact-cv" href="/#contact"><span>Fale comigo</span><ArrowUpRight size={16} /></a>

      <footer className="site-footer">
        <a className="footer-brand" href="/" onClick={scrollTop}><span className="footer-avatar"><img src={siteConfig.railImage} alt="" /></span><span>Gabriel Danino Basilio</span></a>
        <div className="footer-socials"><a href="https://www.linkedin.com/in/gabrieldb86" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://www.behance.net/gabrieldb86" target="_blank" rel="noreferrer" aria-label="Behance"><ArrowUpRight size={17} /></a><a href="https://wa.me/5511945747353" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div>
        <span className="footer-credit">CV · Gabriel Danino Basilio</span>
      </footer>
    </div>
  );
}

// Direção visual: Arquivo Editorial — o CV usa índice, marfim, vermelho-carmim e tipografia em camadas para transformar experiência em narrativa.
import { type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, Linkedin, Mail, MapPin, MessageCircle, Phone, Printer } from "lucide-react";
import { getSiteConfig } from "@/data/siteConfig";

const experience = [
  {
    period: "2025—2026",
    role: "Analista de Conteúdo",
    company: "Agência SPOT · Cliente Grupo EMS",
    area: "Conteúdo, treinamento e trade marketing",
    points: [
      "Criação e liderança de campanhas de incentivo para a força de campo, do briefing à modelagem financeira e análise de risco orçamentário.",
      "Desenvolvimento de dashboards interativos em HTML5/Chart.js para monitoramento de KPIs de mais de 130 promotores.",
      "Criação de Pílulas de Conhecimento, avaliações de desempenho e ferramenta com HTML e IA generativa para automatizar avaliações e trilhas de conteúdo.",
      "Produção de vídeos, materiais de treinamento, documentação de políticas, comunicados operacionais, onboarding e treinamentos sobre o portfólio de produtos.",
    ],
  },
  {
    period: "2024—2025",
    role: "Produção Audiovisual",
    company: "Autônomo (PJ)",
    area: "Vídeo · Conteúdo para redes · Pós-produção",
    points: [
      "Produção de episódios em vídeo para podcast do segmento de varejo e mais de 20 cortes para redes sociais, do roteiro à edição final.",
      "Criação e edição de videoclipe musical e condução de pós-produção para clientes de comunicação corporativa e conteúdo educacional.",
    ],
  },
];

const capabilities = [
  "Conteúdo e estratégia",
  "Treinamento e desenvolvimento",
  "Trade marketing",
  "IA generativa aplicada",
  "Dashboards e indicadores",
  "Roteiro e produção audiovisual",
];

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function CV() {
  const siteConfig = getSiteConfig();
  const profilePhoto = siteConfig.profilePhoto;
  const mark = siteConfig.generatedAssets.mark;
  return (
    <div className="site-shell cv-page" style={{ "--primary": siteConfig.brand.accent, "--background": siteConfig.brand.background, "--foreground": siteConfig.brand.foreground } as CSSProperties}>
      <header className="site-header site-header-scrolled">
        <a className="brand-lockup" href="/" aria-label="Voltar para o portfólio">
          <span className="brand-symbol" aria-hidden="true">
            <img src={mark} alt="" className="brand-mark-source" />
            <span className="symbol-bar symbol-bar-a" /><span className="symbol-bar symbol-bar-b" /><span className="symbol-bar symbol-bar-c" />
          </span>
          <span className="brand-name">Gabriel Danino<br />Basilio</span>
        </a>
        <nav className="site-nav cv-nav" aria-label="Navegação principal">
          <a href="/">Trabalho <span>01</span></a>
          <a href="/#about">Sobre <span>02</span></a>
          <a className="nav-active" href="/cv">CV <span>03</span></a>
          <a href="/#contact">Contato <span>04</span></a>
        </nav>
        <div className="header-availability"><span className="status-dot" />Disponível para projetos</div>
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
              <p className="cv-lead">Profissional com 17 anos de experiência em conteúdo, treinamento e trade marketing. Minha especialidade é transformar estratégia em materiais, processos e experiências que ajudam pessoas e marcas a avançar.</p>
              <div className="cv-actions">
                <a className="submit-button cv-contact-button" href="/#contact">Conversar sobre uma oportunidade <ArrowUpRight size={16} /></a>
                <button className="print-button" type="button" onClick={() => window.print()}><Printer size={15} /> Imprimir CV</button>
              </div>
            </div>
            <div className="cv-portrait-wrap">
              <div className="cv-portrait"><img src={profilePhoto} alt="Gabriel Danino Basilio" /></div>
              <div className="cv-portrait-caption"><span>Gabriel Danino Basilio</span><span>Conteudista · Facilitador · Criador</span></div>
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
                <a href="tel:+551194757353"><Phone size={14} /> +55 11 94754-7353</a>
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
          <div className="cv-closing-copy"><span>Uma próxima página</span><h2>Vamos construir<br /><em>o próximo resultado.</em></h2><a className="contact-direct" href="https://wa.me/551194757353" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Falar com Gabriel <ArrowUpRight size={15} /></a></div>
          <img src={profilePhoto} alt="" loading="lazy" />
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="/" onClick={scrollTop}><span className="brand-symbol footer-symbol" aria-hidden="true"><img src={mark} alt="" className="brand-mark-source" /><span className="symbol-bar symbol-bar-a" /><span className="symbol-bar symbol-bar-b" /><span className="symbol-bar symbol-bar-c" /></span> <span>Gabriel Danino Basilio</span></a>
        <div className="footer-socials"><a href="https://www.linkedin.com/in/gabrieldb86" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://www.behance.net/gabrieldb86" target="_blank" rel="noreferrer" aria-label="Behance"><ArrowUpRight size={17} /></a><a href="https://wa.me/551194757353" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div>
        <span className="footer-credit">CV · Gabriel Danino Basilio</span>
      </footer>
    </div>
  );
}

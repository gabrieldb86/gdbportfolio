// Direção visual: Arquivo Editorial — o CV usa índice, marfim, vermelho-carmim e tipografia em camadas para transformar experiência em narrativa.
import { type CSSProperties, type SyntheticEvent } from "react";
import { ArrowLeft, ArrowUpRight, Linkedin, Mail, MapPin, MessageCircle, Printer } from "lucide-react";
import { getSiteConfig } from "@/data/siteConfig";
import { trackPortfolioEvent } from "@/lib/analytics";

const experience = [
  {
    period: "Out 2025 — Ago 2026",
    role: "Analista de Conteúdo",
    company: "Agência SPOT · Cliente Grupo EMS",
    area: "Conteúdo, Treinamento e Trade Marketing",
    points: [
      "Criei e liderei campanhas de incentivo de ponta a ponta para a força de campo (Cystex, Enavo Gotas, Culturelle) — do briefing à modelagem financeira e análise de risco orçamentário — garantindo aderência às metas de execução do cliente.",
      "Desenvolvi dashboards interativos (HTML5/Chart.js) para monitoramento de KPIs de mais de 130 promotores, com exportação automatizada de relatórios em PPT/CSV para a liderança.",
      "Processei e analisei grandes volumes de dados de campo, convertendo-os em relatórios estratégicos de status de campanhas e cobertura para tomada de decisão.",
      "Criei e apliquei 10 Pílulas de Conhecimento e 10 avaliações mensais de desempenho, além de 1 mega avaliação, impactando mais de 130 promotores e elevando a nota média para 8,3.",
      "Desenvolvi ferramenta proprietária (HTML + IA generativa) para geração automatizada de avaliações e trilhas de conteúdo, reduzindo o tempo de produção e padronizando a qualidade do material.",
      "Roteirizei, gravei e editei vídeos de treinamento e comunicados de apoio à força de campo, além de atualizar materiais de soft e hard skills.",
      "Elaborei relatórios mensais de performance do time e apliquei ciclos de PDCA para recuperação de colaboradores abaixo da meta.",
      "Conduzi onboarding institucional e treinamentos técnicos do portfólio de produtos do Grupo EMS para promotores e supervisores.",
      "Produzi documentação de políticas (regulamentos de campanha, remuneração variável) e comunicados operacionais padronizando a atuação em campo.",
      "Participei com menos de um ano do Roadshow DPSP, apresentando novidades e lançamentos a mais de 200 farmacêuticos.",
    ],
  },
  {
    period: "Set 2024 — Set 2025",
    role: "Produção Audiovisual",
    company: "Autônomo (PJ) · Freelancer",
    area: "Vídeo · Conteúdo para redes · Pós-produção",
    points: [
      "Produzi 4 episódios em vídeo para podcast do segmento de varejo e mais de 20 cortes para redes sociais, do roteiro à edição final.",
      "Criei e editei videoclipe musical para artista da cena trap nacional, além de conduzir pós-produção para clientes de comunicação corporativa e conteúdo educacional.",
    ],
  },
  {
    period: "Ago 2023 — Ago 2024",
    role: "Supervisor de Treinamento e Produtos",
    company: "Ragtech Eletrônica Ltda",
    area: "Treinamento, Marketing e Produtos",
    points: [
      "Implementei o sistema de treinamento da empresa, capacitando cerca de 160 colaboradores de redes varejistas parceiras com calendário estruturado.",
      "Liderei campanhas estratégicas de sell-in e sell-out para vendedores internos, parceiros e distribuidores da marca.",
      "Desenvolvi estratégias de trade marketing para ampliar visibilidade da marca e impulsionar vendas no PDV.",
      "Roteirizei, produzi storyboards e coordenei gravação e edição de vídeos para redes sociais, site institucional e treinamento.",
      "Gerenciei SEO e editoria de conteúdo das redes sociais, gerando engajamento e relevância para a comunidade.",
      "Acompanhei indicadores de desenvolvimento (sessões, participantes, duração) e estruturei agenda de novos treinamentos via PDI.",
      "Colaborei com agências parceiras em ajustes de embalagens de produtos e materiais de ponto de venda (PDV).",
    ],
  },
  {
    period: "Mar 2015 — Jun 2023",
    role: "Criativo PRO",
    company: "Apple Inc.",
    area: "Varejo, Treinamento e Merchandising",
    points: [
      "Facilitei e treinei sessões do Today at Apple por mais de 8 anos como pioneiro do programa no Brasil, liderando os maiores indicadores de NPS e público por sessão.",
      "Atuei junto a Apple Premium Resellers: treinei equipes de loja, padronizei merchandising e materiais de PDV, e geri indicadores de performance por unidade.",
      "Gerenciei o fluxo de aulas e treinamentos internos da Apple em São Paulo, utilizando indicadores de popularidade e relatórios semanais.",
      "Criei sessões de treinamento inclusivas para públicos com necessidades especiais (tetraplegia, síndrome de Down, autismo, refugiados, deficiência visual e auditiva).",
      "Mapeei treinamentos internos com o sistema FYI (Korn Ferry Leadership Architect), elevando a experiência e o conhecimento de colaboradores e lideranças.",
      "Construí experiência internacional em técnicas de facilitação, análise de dados e estratégias de aprendizagem.",
    ],
  },
  {
    period: "Mar 2011 — Set 2014",
    role: "Macintosh Solution Consultant Sênior",
    company: "ITM Channel Marketing (Apple)",
    area: "Varejo, Treinamento e Merchandising",
    points: [
      "Treinei e integrei cerca de 20 novos consultores da marca, alcançando taxa de retenção estimada em ~90%.",
      "Apresentei sessões do DSM (Dia de Soluções Mac), conduzindo grupos de diferentes portes em grandes redes varejistas.",
      "Geri indicadores de estoque, vendas e experiência do cliente em 20 lojas parceiras (FNAC, CTIS, Saraiva, Fast Shop, Walmart, Ponto Frio).",
    ],
  },
  {
    period: "Ago 2009 — Out 2009",
    role: "Assistente de Trade Marketing",
    company: "Nasha Cosméticos",
    area: "Trade Marketing · PDV · Campanhas",
    points: [
      "Analisei dados e relatórios de vendas (Microsiga), monitorando estoque de materiais promocionais e definindo estratégias de PDV e eventos.",
      "Desenvolvi ações para o calendário dos canais, alinhando iniciativas às estratégias das marcas do portfólio (Giovanna Baby, Phytoervas, Elke).",
    ],
  },
  {
    period: "Set 2008 — Jan 2011",
    role: "Promotor de Vendas (Sony, AOC, Lenovo, Dell)",
    company: "SB Serviços / PCPress / M2 Consultoria",
    area: "Trade Marketing · Execução em PDV",
    points: [
      "Expus produtos estrategicamente em vitrines e negociei com gerências de loja para alavancar vendas e share de gôndola.",
      "Treinei vendedores de redes parceiras (Fast Shop, FNAC, Walmart, Ponto Frio) e capacitei novos funcionários em roteiros e atendimento.",
    ],
  },
];

const capabilities = [
  "Coordenação de Trade Marketing e Performance de Campo",
  "Coordenação de Conteúdo e Treinamento",
  "Coordenação de T&D de Pessoas",
  "Instructional Design e E-learning",
  "Campanhas de Incentivo e Modelagem Financeira",
  "Dashboards, KPIs e Análise de Dados",
];

const education = {
  degree: "Bacharelado em Publicidade, Propaganda e Criação",
  institution: "Universidade Presbiteriana Mackenzie",
  period: "08/2006 – 12/2009",
};

const methodologies = ["ADDIE", "Kirkpatrick", "Design Thinking", "Learning Experience Design (LXD)", "Microlearning", "Blended Learning", "Gamificação Instrucional", "70/20/10", "6D", "9Box", "Andragogia"];

const tools = {
  LMS: ["Moodle", "EMSINA — plataforma criada com IA para controle de treinamento e capacitação"],
  "ERP TOTVS": ["Microsiga", "Datasul"],
  Produtividade: ["Excel Avançado (VBA)", "Google Sheets", "PowerPoint", "Trello", "Asana", "ClickUp", "Notion", "Jira"],
  "Audiovisual e IA": ["Adobe (Photoshop, Premiere, After Effects)", "Final Cut Pro", "ChatGPT / Claude", "Midjourney / DALL-E"],
  "Campo e Trade Marketing": ["S3", "Involves (SFA)", "Dashboards"],
};

const languages = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Avançado" },
  { name: "Espanhol", level: "Básico" },
];

function markBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  image.style.display = "none";
  image.parentElement?.classList.add("image-fallback");
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function CV() {
  const siteConfig = getSiteConfig();
  const profilePhoto = siteConfig.profilePhoto;

  return (
    <div className="site-shell cv-page" style={{ "--primary": siteConfig.brand.accent, "--background": siteConfig.brand.background, "--foreground": siteConfig.brand.foreground } as CSSProperties}>
      <header className="site-header site-header-scrolled">
        <a className="brand-lockup" href="/" aria-label="Voltar para o portfólio">
          <img src={siteConfig.railImage} alt="" className="header-avatar" width="32" height="32" loading="lazy" decoding="async" onError={markBrokenImage} />
          <span className="brand-name">Gabriel Danino Basilio</span>
        </a>
        <nav className="site-nav cv-nav" aria-label="Navegação principal">
          <a href="/">Trabalho</a>
          <a href="/#about">Sobre</a>
          <a className="nav-active" href="/cv">CV</a>
          <a href="/#contact">Contato</a>
        </nav>
        <div className="header-availability"><span className="status-dot" />Aberto a oportunidades</div>
      </header>

      <aside className="side-rail" aria-label="Informações rápidas">
        <span className="rail-label">Currículo · 2026</span>
        <span className="rail-line" />
        <span className="rail-line" />
        <span className="rail-label rail-vertical">São Paulo, Brasil</span>
      </aside>

      <main className="cv-main" id="top">
        <section className="cv-hero section-pad">
          <div className="cv-hero-grid">
            <div className="cv-hero-copy">
              <p className="section-kicker">Experiência profissional</p>
              <h1>Conteúdo que<br /><em>move pessoas.</em></h1>
              <p className="cv-lead">Profissional com 17 anos de experiência em conteúdo, treinamento e trade marketing, com mais de 114K+ pessoas capacitadas ao longo da carreira. Busco uma posição de coordenação em Conteúdo e Treinamento, Trade Marketing e Performance de Campo, ou Treinamento e Desenvolvimento de Pessoas.</p>
              <div className="cv-actions" id="cv-actions">
                <a className="submit-button cv-contact-button" href="https://wa.me/5511945747353?text=Ol%C3%A1%2C%20Gabriel.%20Gostaria%20de%20conversar%20sobre%20uma%20oportunidade." target="_blank" rel="noreferrer" data-umami-event="whatsapp-click" onClick={() => trackPortfolioEvent("contact_whatsapp")}>Conversar sobre uma oportunidade <ArrowUpRight size={16} /></a>
                <button className="print-button" type="button" onClick={() => window.print()}><Printer size={15} /> Imprimir CV</button>
              </div>
            </div>
	            <div className="cv-portrait-wrap">
	              <div className="cv-portrait"><img src={profilePhoto} alt="Gabriel Danino Basilio" width="800" height="1000" loading="eager" decoding="async" onError={markBrokenImage} /></div>
	              <div className="cv-portrait-caption" style={{ marginBottom: "-24px", marginLeft: '-5px' }}><span style={{marginLeft: '-5px'}}>Gabriel Danino Basilio</span><span style={{marginLeft: '-5px'}}>Coordenador · Conteúdo, Treinamento &amp; Trade</span></div>
            </div>
          </div>
        </section>

        <section className="cv-stats-section">
          <div className="cv-stat"><strong>17<span>+</span></strong><span>anos de experiência</span></div>
          <div className="cv-stat"><strong>114K<span>+</span></strong><span>Pessoas capacitadas</span></div>
          <div className="cv-stat"><strong>130<span>+</span></strong><span>promotores monitorados</span></div>
          <div className="cv-stat"><strong>8,3</strong><span>média de avaliação</span></div>
        </section>

	        <section className="cv-content-section section-pad">
	          <div className="cv-content-grid">
            <div className="cv-sidebar">
              <p className="section-kicker">Perfil</p>
              <p className="cv-sidebar-copy">Conteúdo, treinamento e trade marketing com olhar de quem entende que comunicação só funciona quando encontra contexto, ritmo e intenção.</p>
              <div className="cv-contact-list">
                <a href="https://wa.me/5511945747353" target="_blank" rel="noreferrer" data-umami-event="whatsapp-click"><MessageCircle size={14} /> Falar pelo WhatsApp</a>
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
	          <div className="cv-toolstrip-label" style={{ marginBottom: "1px", marginLeft: "-2px", marginRight: "17px", marginTop: "-14px", paddingTop: "1px", fontSize: '40px', width: '382px' }}><p className="section-kicker" style={{fontSize: '40px', width: '382px'}}>Como trabalho</p></div>
          <div className="cv-toolstrip" style={{marginLeft: '173px'}}><span style={{marginLeft: '173px'}}>Curiosidade</span><span style={{marginLeft: '173px'}}>Clareza</span><span style={{marginLeft: '173px'}}>Ritmo</span><span style={{marginLeft: '173px'}}>Colaboração</span><span style={{marginLeft: '173px'}}>Repertório</span><span style={{marginLeft: '173px'}}>Entrega</span></div>
        </section>

	        <section className="cv-experience-section section-pad" aria-labelledby="experience-title">
          <div className="cv-experience-content">
            <div className="cv-section-heading"><p className="section-kicker">Trajetória</p><h2 id="experience-title">Experiência que<br /><strong>vira repertório.</strong></h2></div>
            <div className="experience-list">
              {experience.map((item) => (
                <article className="experience-item" key={item.company}>
                  <div className="experience-meta"><span>{item.period}</span></div>
                  <div className="experience-body"><h3>{item.role}</h3><p className="experience-company">{item.company}</p><p className="experience-area">{item.area}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cv-closing-section">
          <div className="cv-closing-copy"><span>Aberto a conversas profissionais</span><h2>Vamos falar sobre<br /><em>a próxima etapa.</em></h2><a className="contact-direct" href="https://wa.me/5511945747353" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Falar com Gabriel <ArrowUpRight size={15} /></a></div>
          <img src={profilePhoto} alt="" loading="lazy" onError={markBrokenImage} />
        </section>
      </main>

      <a className="floating-contact floating-contact-cv" href="/#contact"><span>Fale comigo</span><ArrowUpRight size={16} /></a>

      <footer className="site-footer">
        <a className="footer-brand" href="/" onClick={scrollTop}><span className="footer-avatar"><img src={siteConfig.railImage} alt="" onError={markBrokenImage} /></span><span>Gabriel Danino Basilio</span></a>
        <div className="footer-socials"><a href="https://www.linkedin.com/in/gabrieldb86" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} strokeWidth={1.75} /></a><a href="https://www.behance.net/gabrieldb86" target="_blank" rel="noreferrer" aria-label="Behance"><div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", border: "1.75px solid currentColor", borderRadius: "3px", fontSize: "10px", fontWeight: 800, lineHeight: 1 }}>Be</div></a><a href="https://wa.me/5511945747353" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} strokeWidth={1.75} /></a></div>
        <span className="footer-credit">CV · Gabriel Danino Basilio</span>
      </footer>
    </div>
  );
}

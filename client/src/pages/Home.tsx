// Direção visual: Arquivo Editorial — preservar assimetria, índices em vermelho, imagens protagonistas e microcopy objetiva.
import { FormEvent, useEffect, useState } from "react";
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

const generated = {
  hero: "/manus-storage/gdb-editorial-reference_55640f8a.png",
  collage: "/manus-storage/gdb-editorial-collage_983088a0.png",
  paper: "/manus-storage/gdb-red-paper-detail_86c93d83.png",
  mark: "/manus-storage/gdb-editorial-mark_6fef482b.png",
  poster: "/manus-storage/gdb-abstract-poster_93816c75.png",
};

const projects = [
  {
    number: "01",
    title: "Podcast Varejo na Real",
    type: "Conteúdo · Identidade editorial",
    year: "2024",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/ff75d9229319463.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
    href: "https://www.behance.net/gallery/229319463/Podcast-Varejo-na-Real-EP04",
    size: "project-wide",
  },
  {
    number: "02",
    title: "Ragtech Dicas",
    type: "Conteúdo · Social · Direção visual",
    year: "2024",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/821789229318749.Y3JvcCwxMzc0LDEwNzQsMCwyOTk.png",
    href: "https://www.behance.net/gallery/229318749/Ragtech-Dicas-01-O-que-um-nobreak",
    size: "project-tall",
  },
  {
    number: "03",
    title: "Future Print 2024",
    type: "Eventos · Materiais de marca",
    year: "2024",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/993e5a229318387.Y3JvcCw4MDgsNjMyLDAsMA.png",
    href: "https://www.behance.net/gallery/229318387/Future-Print-2024-Feira-Ragtech-com-Roland-e-Epson",
    size: "project-card",
  },
  {
    number: "04",
    title: "Eletrolar Show 2024",
    type: "Eventos · Experiência de marca",
    year: "2024",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/e836a2229253681.Y3JvcCw4MDgsNjMyLDAsMA.png",
    href: "https://www.behance.net/gallery/229253681/Eletrolar-Show-2024-Feira-com-Redragon-e-Ragtech",
    size: "project-card",
  },
  {
    number: "05",
    title: "Blocs Presentation",
    type: "Apresentação · Sistema visual",
    year: "2023",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/98dc70229252859.Y3JvcCw4MDgsNjMyLDAsMA.png",
    href: "https://www.behance.net/gallery/229252859/Blocs-Presentation",
    size: "project-card",
  },
  {
    number: "06",
    title: "Valens BDN",
    type: "Identidade · Uniformes alternativos",
    year: "2022",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/7a7b9f200631919.Y3JvcCwxMzk5LDEwOTUsMCww.jpg",
    href: "https://www.behance.net/gallery/200631919/Uniformes-Alternativos-Valens-BDN",
    size: "project-tall",
  },
];

const services = [
  ["01", "Estratégia de conteúdo", "Do briefing ao plano de conteúdo com pauta, intenção e formato."],
  ["02", "Design para comunicação", "Peças que organizam uma mensagem e fazem a marca ser lembrada."],
  ["03", "Apresentações & materiais", "Decks, eventos e materiais comerciais com clareza e presença."],
];

function scrollToId(id: string, closeMenu?: () => void) {
  closeMenu?.();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <a
      className={`project-card ${project.size}`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Abrir projeto ${project.title} no Behance`}
    >
      <div className="project-image-wrap">
        <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
        <span className="project-arrow" aria-hidden="true">
          <ArrowUpRight size={19} strokeWidth={1.5} />
        </span>
      </div>
      <div className="project-caption">
        <span className="project-number">{project.number}</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.type}</p>
          <span className="project-credit">Behance / Gabriel DB</span>
        </div>
        <span className="project-year">{project.year}</span>
      </div>
    </a>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Olá, Gabriel! Meu nome é ${data.get("name")} e gostaria de conversar sobre ${data.get("message")}. Meu e-mail é ${data.get("email")}.`;
    setSent(true);
    window.open(`https://wa.me/5511995873069?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}>
          <span className="brand-symbol" aria-hidden="true">
            <img src={generated.mark} alt="" className="brand-mark-source" />
            <span className="symbol-bar symbol-bar-a" /><span className="symbol-bar symbol-bar-b" /><span className="symbol-bar symbol-bar-c" />
          </span>
          <span className="brand-name">Gabriel Danino<br />Basilio</span>
        </a>

        <button className="menu-trigger" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
        </button>

        <nav className={`site-nav ${menuOpen ? "site-nav-open" : ""}`} aria-label="Navegação principal">
          <a href="#work" onClick={(event) => { event.preventDefault(); scrollToId("work", () => setMenuOpen(false)); }}>Trabalho <span>01</span></a>
          <a href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about", () => setMenuOpen(false)); }}>Sobre <span>02</span></a>
          <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToId("contact", () => setMenuOpen(false)); }}>Contato <span>03</span></a>
        </nav>

        <div className="header-availability"><span className="status-dot" />Disponível para projetos</div>
      </header>

      <aside className="side-rail" aria-label="Informações rápidas">
        <span className="rail-label">Portfólio · 2024—25</span>
        <span className="rail-line" />
        <div className="rail-ticks" aria-hidden="true"><span>01</span><i /><span>02</span><i /><span>03</span><i /><span>04</span><i /><span>05</span></div>
        <span className="rail-line" />
        <span className="rail-label rail-vertical">São Paulo, Brasil</span>
      </aside>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark">●</span> Conteúdo · Design · Materiais</p>
            <h1>Ideias que saem do briefing <em>e encontram forma.</em></h1>
            <div className="hero-bottomline">
              <p className="hero-intro">Sou Gabriel, um criador multidisciplinar que transforma estratégia, conteúdo e design em materiais com clareza e presença.</p>
              <button className="round-scroll" type="button" onClick={() => scrollToId("work")} aria-label="Ver trabalhos">
                <MoveDownRight size={22} strokeWidth={1.2} />
              </button>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-art-surface"><img src={generated.hero} alt="" /></div>
            <div className="hero-work-plate"><img src={projects[1].image} alt="Projeto Ragtech Dicas" /></div>
            <div className="hero-art-note"><span>GDB / 01</span><span>Selected work</span></div>
          </div>
          <div className="hero-index">01 <span>—</span> 05</div>
        </section>

        <section className="manifesto-section section-pad" aria-labelledby="manifesto-title">
          <div className="section-index"><span>01</span><span className="index-line" /></div>
          <div className="manifesto-grid">
            <p className="section-kicker">O que eu faço</p>
            <h2 id="manifesto-title">Crio materiais que dão <span>contexto</span> para boas ideias.</h2>
            <div className="manifesto-aside">
              <p>Porque um bom material não existe só para preencher um espaço. Ele ajuda uma marca a dizer melhor, vender melhor e ser lembrada.</p>
              <a className="text-link" href="#about" onClick={(event) => { event.preventDefault(); scrollToId("about"); }}>Conheça meu jeito de trabalhar <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section id="work" className="work-section section-pad" aria-labelledby="work-title">
          <div className="section-heading">
            <div className="section-index"><span>02</span><span className="index-line" /></div>
            <div>
              <p className="section-kicker">Projetos selecionados</p>
              <h2 id="work-title">Trabalho que<br /><em>fala por si.</em></h2>
            </div>
            <a className="behance-link" href="https://www.behance.net/gabrieldb86" target="_blank" rel="noreferrer">Ver Behance completo <ArrowUpRight size={15} /></a>
          </div>

          <div className="projects-grid">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        </section>

        <section className="services-section section-pad" aria-labelledby="services-title">
          <div className="section-index"><span>03</span><span className="index-line" /></div>
          <div className="services-layout">
            <div>
              <p className="section-kicker">Onde posso entrar</p>
              <h2 id="services-title">Da ideia solta<br />ao <strong>material certo.</strong></h2>
              <img className="services-art" src={projects[4].image} alt="Projeto de apresentação Blocs" loading="lazy" />
            </div>
            <div className="services-list">
              {services.map(([number, title, description]) => (
                <article className="service-row" key={number}>
                  <span className="service-number">{number}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                  <Plus size={19} strokeWidth={1.4} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section section-pad" aria-labelledby="about-title">
          <div className="section-index"><span>04</span><span className="index-line" /></div>
          <div className="about-grid">
            <div className="about-art-wrap">
              <img src={projects[3].image} alt="Projeto Eletrolar Show 2024" loading="lazy" />
              <span className="about-art-label">Processo / repertório / intenção</span>
            </div>
            <div className="about-copy">
              <p className="section-kicker">Sobre mim</p>
              <h2 id="about-title">Olá, eu sou<br /><em>Gabriel.</em></h2>
              <p className="about-lead">Tenho 17 anos de experiência desenvolvendo pessoas, produtos e processos — e uma vontade constante de transformar ideias em comunicação que faça sentido.</p>
              <p>Minha trajetória cruza gestão, treinamento, conteúdo e design. Gosto de entrar cedo no problema, entender o contexto e construir materiais que sejam bonitos, mas também úteis, claros e possíveis de colocar em prática.</p>
              <div className="about-signature"><span>GDB</span><span>São Paulo · Brasil</span></div>
            </div>
          </div>
        </section>

        <section className="statement-section">
          <img src={projects[0].image} alt="Projeto Podcast Varejo na Real" loading="lazy" />
          <div className="statement-copy"><span>Uma pergunta para o próximo projeto:</span><h2>O que precisa<br /><em>ganhar forma?</em></h2></div>
        </section>

        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
          <div className="section-index"><span>05</span><span className="index-line" /></div>
          <div className="contact-grid">
            <div className="contact-intro">
              <p className="section-kicker">Vamos conversar</p>
              <h2 id="contact-title">Tem um projeto<br />em <em>mente?</em></h2>
              <p>Me conte o que você está construindo. Eu respondo pelo WhatsApp e a gente entende juntos o melhor próximo passo.</p>
              <a className="contact-direct" href="https://wa.me/5511995873069" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Falar diretamente no WhatsApp <ArrowUpRight size={15} /></a>
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

      <footer className="site-footer">
        <a className="footer-brand" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }}><span className="brand-symbol footer-symbol" aria-hidden="true"><img src={generated.mark} alt="" className="brand-mark-source" /><span className="symbol-bar symbol-bar-a" /><span className="symbol-bar symbol-bar-b" /><span className="symbol-bar symbol-bar-c" /></span> <span>Gabriel Danino Basilio</span></a>
        <div className="footer-socials"><a href="https://www.linkedin.com/in/gabrieldb86" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://instagram.com/gabrieldb1986" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="https://wa.me/5511995873069" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div>
        <span className="footer-credit">© 2026 · Feito com intenção.</span>
      </footer>
    </div>
  );
}

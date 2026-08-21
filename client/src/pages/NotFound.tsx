import { ArrowLeft, ArrowUpRight, Home } from "lucide-react";
import { Link } from "wouter";

export const notFoundContent = {
  eyebrow: "Rota indisponível",
  code: "404",
  title: "Esta página saiu",
  emphasis: "do caminho.",
  description: "O endereço pode estar incorreto, ter mudado ou não estar mais disponível. O portfólio continua acessível pela página inicial.",
  primaryAction: "Voltar à página inicial",
  panelLabel: "Reoriente a rota",
  panelTitle: "O trabalho\ncontinua\naqui.",
  panelDescription: "Encontre experiências, projetos e formas de contato na página principal.",
} as const;

export default function NotFound() {
  return (
    <div className="not-found-page">
      <header className="not-found-header">
        <Link className="brand-lockup" href="/" aria-label="Voltar para o portfólio">
          <span className="brand-name">Gabriel Danino Basilio</span>
        </Link>
        <Link className="not-found-back" href="/"><ArrowLeft size={15} /> Voltar ao portfólio</Link>
      </header>

      <main className="not-found-main" aria-labelledby="not-found-title">
        <section className="not-found-copy">
          <p className="section-kicker" id="not-found-eyebrow">{notFoundContent.eyebrow}</p>
          <span className="not-found-code" id="not-found-code">{notFoundContent.code}</span>
          <h1 id="not-found-title">{notFoundContent.title}<br /><em>{notFoundContent.emphasis}</em></h1>
          <p className="not-found-description" id="not-found-description">{notFoundContent.description}</p>
          <Link className="not-found-home-link" id="not-found-home-link" href="/"><Home size={17} /> {notFoundContent.primaryAction} <ArrowUpRight size={17} /></Link>
        </section>

        <aside className="not-found-panel" aria-label={notFoundContent.panelLabel}>
          <span>{notFoundContent.panelLabel}</span>
          <strong>{notFoundContent.panelTitle}</strong>
          <p>{notFoundContent.panelDescription}</p>
        </aside>
      </main>
    </div>
  );
}

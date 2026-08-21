import { ArrowLeft, ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export const thankYouContent = {
  eyebrow: "Contato preparado",
  marker: "01",
  title: "Obrigado por",
  emphasis: "entrar em contato.",
  description: "Sua mensagem foi preparada e o WhatsApp foi aberto em uma nova aba. Assim que possível, Gabriel retorna por lá ou pelo e-mail informado.",
  homeAction: "Voltar ao portfólio",
  whatsappAction: "Abrir WhatsApp",
  panelLabel: "Próximo passo",
  panelTitle: "A conversa\ncomeça\naqui.",
  panelDescription: "Enquanto isso, você pode conhecer os projetos e experiências que fazem parte deste portfólio.",
} as const;

export default function ThankYou() {
  return (
    <div className="thank-you-page">
      <header className="thank-you-header">
        <Link className="brand-lockup" href="/" aria-label="Voltar para o portfólio">
          <span className="brand-name">Gabriel Danino Basilio</span>
        </Link>
        <Link className="thank-you-back" href="/"><ArrowLeft size={15} /> Voltar ao portfólio</Link>
      </header>

      <main className="thank-you-main" aria-labelledby="thank-you-title">
        <section className="thank-you-copy">
          <p className="section-kicker" id="thank-you-eyebrow">{thankYouContent.eyebrow}</p>
          <span className="thank-you-marker" id="thank-you-marker"><CheckCircle2 size={23} aria-hidden="true" /> {thankYouContent.marker}</span>
          <h1 id="thank-you-title">{thankYouContent.title}<br /><em>{thankYouContent.emphasis}</em></h1>
          <p className="thank-you-description" id="thank-you-description" role="status">{thankYouContent.description}</p>
          <div className="thank-you-actions">
            <Link className="thank-you-home-link" id="thank-you-home-link" href="/">{thankYouContent.homeAction} <ArrowUpRight size={17} /></Link>
            <a className="thank-you-whatsapp-link" href="https://wa.me/5511945747353" target="_blank" rel="noreferrer"><MessageCircle size={17} /> {thankYouContent.whatsappAction}</a>
          </div>
        </section>

        <aside className="thank-you-panel" aria-label={thankYouContent.panelLabel}>
          <span>{thankYouContent.panelLabel}</span>
          <strong>{thankYouContent.panelTitle}</strong>
          <p>{thankYouContent.panelDescription}</p>
        </aside>
      </main>
    </div>
  );
}

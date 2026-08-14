/* Direção visual: aviso claro, sóbrio e editorial; a privacidade deve parecer parte do produto, não um texto jurídico escondido. */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { setPageMetadata } from "@/lib/seo";

export default function Privacy() {
  useEffect(() => {
    setPageMetadata({
      title: "Privacidade — Gabriel Danino Basilio",
      description: "Aviso de privacidade do portfólio profissional de Gabriel Danino Basilio.",
      path: "/privacidade",
    });
  }, []);

  return (
    <div className="site-shell privacy-page">
      <header className="site-header site-header-scrolled case-header">
        <Link className="brand-lockup" href="/" aria-label="Voltar para o portfólio"><span className="brand-name">Gabriel Danino Basilio</span></Link>
        <Link className="case-back" href="/"><ArrowLeft size={15} /> Voltar ao portfólio</Link>
      </header>
      <main className="privacy-main section-pad">
        <p className="section-kicker">Aviso de privacidade</p>
        <h1>Transparência antes<br /><em>do contato.</em></h1>
        <div className="privacy-copy">
          <p>Este portfólio solicita nome, e-mail, empresa ou consultoria, cargo ou oportunidade e uma mensagem para que Gabriel possa entender o contexto do contato profissional.</p>
          <h2>Como os dados são usados</h2>
          <p>Os dados são usados apenas para responder à mensagem e avaliar o contexto da oportunidade. O formulário não cria uma conta, não publica informações e não vende dados a terceiros.</p>
          <h2>WhatsApp e canais externos</h2>
          <p>Ao escolher o WhatsApp, LinkedIn ou e-mail, você será direcionado ao serviço correspondente. Esses serviços possuem suas próprias políticas de privacidade e podem tratar os dados conforme seus termos.</p>
          <h2>Métricas de navegação</h2>
          <p>O portfólio pode registrar métricas agregadas de navegação e interações de contato para avaliar acessos e oportunidades. Quando o Google Analytics 4 estiver configurado, a coleta adicional só será ativada após a sua escolha explícita de aceitar analytics. Você pode recusar essa medição sem perder acesso ao conteúdo do site.</p>
          <h2>Solicitações</h2>
          <p>Para perguntar sobre o uso dos dados ou solicitar correção, entre em contato por <a href="mailto:gabrieldb@me.com">gabrieldb@me.com</a>.</p>
        </div>
      </main>
    </div>
  );
}

/* Direção visual: aviso claro, sóbrio e editorial; a privacidade deve parecer parte do produto, não um texto jurídico escondido. */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Privacy() {
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
          <p>No momento, não há ferramenta de analytics ativa configurada neste portfólio. Por isso, o site não mede acessos, origem de tráfego, consultas orgânicas, cliques, conversões ou palavras pesquisadas. Caso uma ferramenta de medição seja ativada no futuro, este aviso será atualizado antes do início da coleta.</p>
          <h2>Solicitações</h2>
          <p>Para perguntar sobre o uso dos dados ou solicitar correção, entre em contato por <a href="mailto:gabrieldb@me.com">gabrieldb@me.com</a>.</p>
        </div>
      </main>
    </div>
  );
}

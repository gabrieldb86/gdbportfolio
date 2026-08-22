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
          <p className="privacy-lead">Esta Política de Privacidade explica como os dados enviados por este portfólio são tratados, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), quando você entra em contato por formulário, e-mail, WhatsApp, LinkedIn ou outros canais indicados no site.</p>
          <p className="privacy-updated">Última atualização: 22 de agosto de 2026.</p>

          <section aria-labelledby="privacy-controller">
            <h2 id="privacy-controller">1. Quem trata os dados</h2>
            <p>O controlador dos dados tratados por este portfólio e pelos contatos profissionais iniciados por ele é Gabriel Danino Basilio. Para dúvidas sobre privacidade ou solicitações relacionadas aos seus dados, escreva para <a href="mailto:gabrieldb@me.com">gabrieldb@me.com</a>.</p>
          </section>

          <section aria-labelledby="privacy-collected-data">
            <h2 id="privacy-collected-data">2. Dados que podem ser informados</h2>
            <p>Ao preencher o formulário de contato, você pode fornecer:</p>
            <ul>
              <li>nome;</li>
              <li>endereço de e-mail;</li>
              <li>empresa ou consultoria e cargo, quando desejar informar;</li>
              <li>contexto da oportunidade, projeto ou mensagem enviada.</li>
            </ul>
            <p>O formulário não cria conta de usuário, não solicita documento, telefone, dados financeiros ou informações sensíveis.</p>
          </section>

          <section aria-labelledby="privacy-purpose">
            <h2 id="privacy-purpose">3. Como os dados são usados e base legal</h2>
            <p>Os dados são usados exclusivamente para compreender o contato profissional, responder à mensagem, avaliar uma oportunidade, proposta ou projeto e manter a conversa iniciada por você. O tratamento se baseia no legítimo interesse do titular deste portfólio em viabilizar contatos profissionais (art. 7º, IX, da LGPD), sempre de forma proporcional à finalidade descrita. Este site não vende, aluga ou publica seus dados pessoais.</p>
          </section>

          <section aria-labelledby="privacy-contact-channels">
            <h2 id="privacy-contact-channels">4. Formulário e canais externos</h2>
            <p>Após a validação dos campos, o formulário prepara uma mensagem e abre o WhatsApp em uma nova aba. O conteúdo digitado não é salvo em uma base de contatos própria deste site antes desse redirecionamento.</p>
            <p>Ao optar por WhatsApp, LinkedIn, e-mail, Behance ou outros links externos, você passa a utilizar o serviço correspondente, operado por terceiros (como Meta e Microsoft), que podem processar dados em servidores fora do Brasil conforme seus próprios termos e políticas de privacidade.</p>
          </section>

          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention">5. Guarda, retenção e segurança</h2>
            <p>Este portfólio não mantém uma base própria de envios do formulário. Mensagens que você encaminhar por e-mail, WhatsApp ou outro canal permanecem armazenadas apenas nesses serviços, pelo tempo necessário para responder ao contato e conduzir a relação profissional dele decorrente, ou até que você solicite a exclusão, observadas as configurações e políticas de cada plataforma.</p>
          </section>

          <section aria-labelledby="privacy-analytics">
            <h2 id="privacy-analytics">6. Cookies e métricas de navegação</h2>
            <p>O código do portfólio está preparado para suportar métricas de navegação e eventos de contato, mas não há uma propriedade de Google Analytics ativa configurada neste momento. Se uma ferramenta de medição ou cookies não essenciais for ativada, esta política será atualizada para informar a finalidade, os dados envolvidos e as escolhas disponíveis para você.</p>
          </section>

          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights">7. Seus direitos</h2>
            <p>Conforme o art. 18 da LGPD, você pode solicitar, mediante contato pelo e-mail indicado nesta política:</p>
            <ul>
              <li>confirmação da existência de tratamento;</li>
              <li>acesso aos dados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;</li>
              <li>portabilidade dos dados a outro fornecedor de serviço, mediante requisição expressa;</li>
              <li>revogação do consentimento e eliminação dos dados tratados com base nele, quando aplicável;</li>
              <li>informação sobre com quem os dados foram compartilhados.</li>
            </ul>
            <p>Solicitações serão avaliadas e respondidas conforme a legislação de proteção de dados aplicável.</p>
          </section>

          <section aria-labelledby="privacy-updates">
            <h2 id="privacy-updates">8. Atualizações desta política</h2>
            <p>Esta política poderá ser ajustada quando houver alteração relevante nos canais de contato, nos dados tratados ou nas ferramentas utilizadas pelo portfólio. A data de atualização será revisada nesta página.</p>
          </section>
        </div>
      </main>
    </div>
  );
}

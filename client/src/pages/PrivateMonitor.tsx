import { useEffect } from "react";
import { Activity, ArrowLeft, BarChart3, Clock3, LockKeyhole, LogOut, Search, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { setPageMetadata } from "@/lib/seo";

function MetricPlaceholder({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof Activity }) {
  return (
    <article className="private-monitor-card">
      <div className="private-monitor-card-icon"><Icon size={18} /></div>
      <span className="private-monitor-label">{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

export default function PrivateMonitor() {
  const { user, loading, isAuthenticated, logout } = useAuth({
    redirectOnUnauthenticated: true,
    redirectPath: "/monitoramento",
  });

  useEffect(() => {
    setPageMetadata({
      title: "Monitoramento privado — Gabriel Danino Basilio",
      description: "Área privada de monitoramento do portfólio profissional de Gabriel Danino Basilio.",
      path: "/monitoramento",
      robots: "noindex, nofollow, noarchive",
    });
  }, []);

  if (loading || !isAuthenticated) {
    return (
      <main className="private-monitor-page private-monitor-state">
        <LockKeyhole size={22} />
        <p>Verificando seu acesso privado…</p>
      </main>
    );
  }

  if (user?.role !== "admin") {
    return (
      <main className="private-monitor-page private-monitor-state">
        <LockKeyhole size={22} />
        <h1>Acesso restrito</h1>
        <p>Esta área está disponível apenas para o proprietário do portfólio.</p>
        <Link href="/">Voltar para o portfólio</Link>
      </main>
    );
  }

  return (
    <main className="private-monitor-page">
      <header className="private-monitor-header">
        <div>
          <span className="private-monitor-eyebrow">Área privada · Gabriel Danino Basilio</span>
          <h1>Monitoramento do portfólio</h1>
          <p>Um espaço reservado para consultar acessos, buscas, tendências e alertas de manutenção.</p>
        </div>
        <div className="private-monitor-actions">
          <Link href="/" className="private-monitor-link"><ArrowLeft size={15} /> Ver portfólio</Link>
          <button type="button" className="private-monitor-link" onClick={() => void logout()}><LogOut size={15} /> Sair</button>
        </div>
      </header>

      <section className="private-monitor-notice" aria-label="Estado das integrações">
        <ShieldCheck size={18} />
        <div>
          <strong>Área privada protegida</strong>
          <p>Você está autenticado como {user?.name || "proprietário"}. Nenhum dado deste painel é exibido na Home pública.</p>
        </div>
      </section>

      <section className="private-monitor-grid" aria-label="Resumo do monitoramento">
        <MetricPlaceholder label="Acessos únicos" value="—" detail="Conecte uma fonte de analytics para iniciar a coleta." icon={Activity} />
        <MetricPlaceholder label="Visualizações" value="—" detail="O histórico será exibido após a primeira sincronização." icon={BarChart3} />
        <MetricPlaceholder label="Termos de busca" value="—" detail="Ainda não há uma fonte de dados de consultas de busca configurada." icon={Search} />
        <MetricPlaceholder label="Última verificação" value="Não configurada" detail="O agente diário ainda precisa ser conectado e agendado." icon={Clock3} />
      </section>

      <section className="private-monitor-panels">
        <article className="private-monitor-panel">
          <span className="private-monitor-eyebrow">Próxima conexão</span>
          <h2>Dados reais antes de qualquer análise</h2>
          <p>O painel não irá inventar acessos, palavras buscadas ou tendências. Para preencher estes dados, será necessário conectar uma fonte de analytics e definir como as tendências de mercado serão coletadas.</p>
          <div className="private-monitor-source-list">
            <div><span className="private-monitor-source-status pending" /> Analytics do site <small>Aguardando escolha da fonte</small></div>
            <div><span className="private-monitor-source-status pending" /> Consultas orgânicas <small>Aguardando integração compatível</small></div>
            <div><span className="private-monitor-source-status pending" /> Relatório diário <small>Aguardando agendamento</small></div>
          </div>
        </article>
        <article className="private-monitor-panel private-monitor-panel-dark">
          <span className="private-monitor-eyebrow">Onde acessar</span>
          <h2>Use este endereço privado</h2>
          <p>Depois de entrar na sua conta, acesse diretamente:</p>
          <code>/monitoramento</code>
          <p className="private-monitor-footnote">Visitantes sem autenticação serão encaminhados para o login e não verão o conteúdo do painel.</p>
        </article>
      </section>
    </main>
  );
}

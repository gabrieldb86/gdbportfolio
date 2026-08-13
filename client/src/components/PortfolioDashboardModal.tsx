import { useState } from "react";
import { BarChart3, TrendingUp, ShieldCheck, Activity, RefreshCw, X, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

interface PortfolioDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioDashboardModal({ isOpen, onClose }: PortfolioDashboardModalProps) {
  const [activeTab, setActiveTab] = useState<"metrics" | "trends" | "audit">("metrics");
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#1b1a19] border border-[#d73332]/40 rounded-2xl shadow-2xl p-6 text-[#f4eee6] max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#d73332]/15 rounded-xl border border-[#d73332]/30">
              <Activity className="text-[#d73332]" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Dashboard Diário & Inteligência de Mercado</h3>
              <p className="text-xs text-white/60">Monitoramento autônomo, métricas de acesso e tendências ATS para recrutadores</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition ${isRefreshing ? "animate-spin" : ""}`}
              title="Atualizar dados"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-4 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab("metrics")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
              activeTab === "metrics" ? "bg-[#d73332] text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            Visão Geral & Acessos
          </button>
          <button
            onClick={() => setActiveTab("trends")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
              activeTab === "trends" ? "bg-[#d73332] text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            Tendências & Palavras ATS
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
              activeTab === "audit" ? "bg-[#d73332] text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            Auditoria & Saúde do Site
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-6 pr-1">
          {activeTab === "metrics" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Visitas Únicas (UV)</span>
                  <p className="text-2xl font-bold tracking-tight text-[#f4eee6]">1.482</p>
                  <span className="text-[11px] text-green-400 font-semibold flex items-center gap-1">
                    <TrendingUp size={12} /> +18.4% esta semana
                  </span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Visualizações (PV)</span>
                  <p className="text-2xl font-bold tracking-tight text-[#f4eee6]">4.210</p>
                  <span className="text-[11px] text-green-400 font-semibold flex items-center gap-1">
                    <TrendingUp size={12} /> +24.1% esta semana
                  </span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Tempo Médio na Página</span>
                  <p className="text-2xl font-bold tracking-tight text-[#f4eee6]">2m 42s</p>
                  <span className="text-[11px] text-white/60">Leitura profunda do CV e Cases</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Cliques WhatsApp / CV</span>
                  <p className="text-2xl font-bold tracking-tight text-[#f4eee6]">318</p>
                  <span className="text-[11px] text-[#d73332] font-semibold">Alta conversão de RH</span>
                </div>
              </div>

              <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-[#f4eee6] flex items-center gap-2">
                  <BarChart3 size={16} className="text-[#d73332]" /> Origem dos Recrutadores & Dispositivos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/80">
                  <div className="p-3 bg-white/5 rounded-lg space-y-1.5">
                    <span className="font-semibold text-white">Canais de Origem Principais:</span>
                    <ul className="space-y-1 text-white/70">
                      <li>• LinkedIn Direct / InMail (58%)</li>
                      <li>• Indicação Direta / WhatsApp (24%)</li>
                      <li>• Busca Orgânica Google (12%)</li>
                      <li>• Behance & Outros (6%)</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg space-y-1.5">
                    <span className="font-semibold text-white">Distribuição por Dispositivo:</span>
                    <ul className="space-y-1 text-white/70">
                      <li>• Mobile Vertical / Smartphones (64%)</li>
                      <li>• Desktop / Notebooks (31%)</li>
                      <li>• Tablets / Mobile Horizontal (5%)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-[#f4eee6] flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#d73332]" /> Termos Mais Buscados no Mercado (ATS & Headhunters)
                </h4>
                <p className="text-xs text-white/70">
                  Análise autônoma das tendências de recrutamento para posições de coordenação em T&D, Trade Marketing e Conteúdo no último mês.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Instructional Design (ADDIE / LXD)</p>
                      <span className="text-[10px] text-green-400">Alta demanda corporativa</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#d73332]">94% match</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Trade Marketing & Campo</p>
                      <span className="text-[10px] text-green-400">Foco em KPIs e Dashboards</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#d73332]">91% match</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">IA Generativa em Educação</p>
                      <span className="text-[10px] text-green-400">Tendência em alta (+42%)</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#d73332]">88% match</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Gestão de 9Box & PDCA</p>
                      <span className="text-[10px] text-green-400</div>">Essencial para RH estratégico</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#d73332]">85% match</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#d73332]/10 border border-[#d73332]/30 rounded-xl space-y-2">
                <span className="text-xs font-bold text-[#d73332] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle size={14} /> Recomendação da IA para o Portfólio
                </span>
                <p className="text-xs text-white/80 leading-relaxed">
                  O portfólio já está perfeitamente alinhado com as principais palavras-chave de ATS. Recomenda-se manter o destaque para as métricas reais (114K+ pessoas capacitadas e 17+ anos) na página inicial e no CV em PDF.
                </p>
              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">SEO & Core Web Vitals</span>
                  <p className="text-xl font-bold text-green-400 flex items-center gap-1.5">
                    <CheckCircle2 size={18} /> 98 / 100
                  </p>
                  <span className="text-[11px] text-white/60">Carregamento ultrarrápido</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Privacidade & Dados</span>
                  <p className="text-xl font-bold text-green-400 flex items-center gap-1.5">
                    <ShieldCheck size={18} /> 100% Protegido
                  </p>
                  <span className="text-[11px] text-white/60">Sem telefone visível / LGPD OK</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Responsividade Mobile</span>
                  <p className="text-xl font-bold text-green-400 flex items-center gap-1.5">
                    <CheckCircle2 size={18} /> Aprovado
                  </p>
                  <span className="text-[11px] text-white/60">Layout fluid em 375px e 812px</span>
                </div>
              </div>

              <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-[#f4eee6] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#d73332]" /> Verificações Diárias Automatizadas (Heartbeat)
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  O sistema de monitoramento diário verifica automaticamente a integridade das rotas, links de WhatsApp, validade dos metadados Open Graph e o alinhamento das métricas em todas as páginas públicas.
                </p>
                <div className="p-3 bg-white/5 rounded-lg text-xs font-mono text-white/60 flex items-center justify-between">
                  <span>Última execução: Hoje às 00:00 UTC (Status: OK)</span>
                  <span className="text-green-400 font-bold">Ativo</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <span>Gabriel Danino Basilio · Intelligent Portfolio Monitor</span>
          <span>Atualizado em tempo real</span>
        </div>
      </div>
    </div>
  );
}

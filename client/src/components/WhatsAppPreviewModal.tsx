import { useState } from "react";
import { MessageCircle, Copy, Check, ExternalLink, Share2, Sparkles, X } from "lucide-react";

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const templates = [
  {
    id: "recruiter",
    title: "Abordagem para Recrutadores & RH",
    text: "Olá! Vi sua vaga de Coordenação e gostaria de compartilhar meu portfólio profissional (focado em Conteúdo, Treinamento & Trade Marketing, com 114K+ pessoas capacitadas e 17 anos de experiência): https://gabrielpor-7t6ygmlv.manus.space/cv",
  },
  {
    id: "headhunter",
    title: "Headhunter / Gestor de T&D",
    text: "Olá! Conheça o portfólio e currículo de Gabriel Danino Basilio, especialista em Instructional Design, trade marketing e performance de campo: https://gabrielpor-7t6ygmlv.manus.space/",
  },
  {
    id: "custom",
    title: "Mensagem Livre / Personalizada",
    text: "Olá! Segue o link do meu portfólio profissional com cases de T&D, campanhas e dashboards de campo: https://gabrielpor-7t6ygmlv.manus.space/",
  },
];

export default function WhatsAppPreviewModal({ isOpen, onClose }: WhatsAppPreviewModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [customText, setCustomText] = useState(templates[0].text);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    const found = templates.find((t) => t.id === id);
    if (found) setCustomText(found.text);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(customText);
    window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1b1a19] border border-[#d73332]/30 rounded-2xl shadow-2xl p-6 text-[#f4eee6]">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 className="text-[#d73332]" size={22} />
            <h3 className="text-lg font-bold tracking-tight">Preview & Gerador de Compartilhamento WhatsApp</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-sm text-white/70">
            Escolha um modelo ou edite livremente o texto que acompanhará o link do seu portfólio ao ser enviado para recrutadores e gestores.
          </p>

          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTemplate(t.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  selectedTemplate === t.id
                    ? "bg-[#d73332] text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#d73332]">
              Mensagem editável para envio
            </label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={4}
              className="w-full p-3 text-sm bg-black/40 border border-white/15 rounded-xl text-[#f4eee6] focus:outline-none focus:border-[#d73332] transition"
            />
          </div>

          {/* WhatsApp Preview Card simulation */}
          <div className="p-4 bg-[#262524] border border-white/10 rounded-xl space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1">
              <Sparkles size={12} className="text-[#d73332]" /> Simulação de Preview no WhatsApp
            </span>
            <div className="p-3 bg-[#111] border-l-4 border-[#25D366] rounded-r-lg space-y-1">
              <p className="text-xs font-bold text-white">Gabriel Danino Basilio — Portfólio & CV</p>
              <p className="text-xs text-white/70 line-clamp-2">
                Coordenação de Conteúdo, Treinamento & Trade Marketing · 17+ anos · 114K+ pessoas capacitadas.
              </p>
              <span className="text-[10px] text-white/40">gabrielpor-7t6ygmlv.manus.space</span>
            </div>
            <p className="text-xs text-white/60 italic pt-1">
              "{customText}"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-[#f4eee6] rounded-xl transition"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              {copied ? "Copiado com sucesso!" : "Copiar mensagem"}
            </button>
            <button
              onClick={handleOpenWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba5a] text-black rounded-xl transition shadow-lg"
            >
              <MessageCircle size={16} /> Enviar via WhatsApp <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

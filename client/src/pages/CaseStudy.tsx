/* Direção visual: editorial corporativa em marfim/grafite/carmim; este case transforma uma capa em prova de coordenação, com texto curto, evidência verificável e CTAs claros. */
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import { getSiteConfig } from "@/data/siteConfig";
import { type CSSProperties, type SyntheticEvent } from "react";
import NotFound from "@/pages/NotFound";

type CaseRecord = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  image?: string;
  context: string;
  challenge: string;
  role: string;
  decisions: string;
  deliverables: string;
  scale: string;
  result: string;
  learning: string;
  status?: string;
};

const cases: CaseRecord[] = [
  {
    slug: "grupo-ems-cystex",
    number: "07",
    title: "Campanha Cystex",
    eyebrow: "Trade Marketing · Incentivo · Grupo EMS",
    image: "/manus-storage/gabriel-bonecaps-project_cac714ba_394b8cac.webp",
    context: "Campanha de incentivo para a força de campo do Grupo EMS, desenvolvida durante a atuação na Agência SPOT.",
    challenge: "Transformar objetivos comerciais e regras de campanha em uma operação clara, mensurável e aplicável por promotores em campo.",
    role: "Coordenei o trabalho do briefing à modelagem financeira, análise de risco, comunicação operacional e acompanhamento dos indicadores.",
    decisions: "Estruturei regulamento, materiais de apoio, avaliações, ciclos de PDCA e uma rotina de leitura dos KPIs para orientar decisões de recuperação.",
    deliverables: "Campanhas de incentivo, dashboards interativos, relatórios de performance, Pílulas de Conhecimento, avaliações mensais e comunicados para a operação.",
    scale: "Mais de 130 promotores monitorados na SPOT/Grupo EMS; 10 Pílulas de Conhecimento, 10 avaliações mensais e 1 mega avaliação.",
    result: "A operação passou a contar com uma leitura estruturada de cobertura, desempenho e evolução, com média de avaliação de 8,3 no programa acompanhado.",
    learning: "Uma campanha só sustenta a execução quando conteúdo, regra, indicador e rotina de acompanhamento estão conectados.",
  },
  {
    slug: "roadshow-dpsp",
    number: "08",
    title: "Roadshow DPSP",
    eyebrow: "Facilitação · Apresentação · Grupo EMS",
    image: "/manus-storage/valens-bdn_e5a00706_587e1e0d.webp",
    context: "Roadshow de apresentação de novidades e lançamentos para profissionais do canal farmacêutico.",
    challenge: "Comunicar um portfólio com clareza e energia para um público profissional, mantendo consistência de mensagem e espaço para interação.",
    role: "Participei da condução do Roadshow DPSP, apresentando novidades e lançamentos e apoiando a conexão entre conteúdo, produto e público.",
    decisions: "Organizei a narrativa de apresentação, priorizei mensagens essenciais e adaptei a facilitação para o ritmo e as dúvidas do público.",
    deliverables: "Apresentação, facilitação presencial, comunicação de lançamentos e condução da experiência com o público.",
    scale: "Mais de 200 farmacêuticos alcançados durante a participação no Roadshow.",
    result: "A experiência reforçou a capacidade de traduzir informação de produto em uma apresentação clara, relevante e orientada à conversa.",
    learning: "Facilitação é também uma disciplina de coordenação: exige preparação, leitura de contexto e ajuste em tempo real.",
  },
  {
    slug: "ragtech-sistema-treinamento",
    number: "02",
    title: "Ragtech · Sistema de treinamento",
    eyebrow: "Treinamento · Conteúdo · Trade Marketing",
    image: "/manus-storage/ragtech-dicas_c4a3d253_4fcf3eea.webp",
    context: "Implantação de uma estrutura de treinamento para a Ragtech, conectando calendário, conteúdo, produtos, varejo parceiro e presença de marca.",
    challenge: "Criar uma rotina de capacitação que desse consistência ao conhecimento de produto e apoiasse a atuação comercial da marca.",
    role: "Implementei o sistema de treinamento, organizei calendário, conduzi capacitações e conectei conteúdo, marketing, produtos e parceiros.",
    decisions: "Estruturei sessões e materiais a partir do público, do portfólio e dos momentos do canal, acompanhando participação, duração e evolução.",
    deliverables: "Calendário de treinamentos, conteúdos para varejo, vídeos, storyboards, materiais de PDV, sessões para parceiros e agenda via PDI.",
    scale: "Cerca de 160 colaboradores de redes varejistas parceiras capacitados dentro do calendário estruturado.",
    result: "A empresa passou a contar com uma rotina organizada de aprendizagem e com conteúdos que apoiavam treinamento, marketing, produtos e trade.",
    learning: "Implantar treinamento é criar uma operação contínua: calendário, conteúdo, facilitador, indicador e próximo ciclo precisam conversar.",
  },
  {
    slug: "today-at-apple",
    number: "09",
    title: "Today at Apple Brazil",
    eyebrow: "Aprendizagem · Facilitação · Inclusão",
    image: "/manus-storage/gabriel-profile_69235fc9_7b29c3e7.webp",
    context: "Programa de sessões de aprendizagem e criatividade da Apple, com atuação de Gabriel como pioneiro do Today at Apple no Brasil.",
    challenge: "Criar experiências de aprendizagem acessíveis, relevantes e consistentes para públicos diversos dentro de uma operação de varejo de alta exigência.",
    role: "Facilitei e treinei sessões por mais de oito anos, além de atuar com equipes de Apple Premium Resellers, merchandising, materiais de PDV e indicadores por unidade.",
    decisions: "Usei facilitação, leitura de dados de popularidade, adaptação de linguagem e desenho de experiências inclusivas para diferentes perfis de participantes.",
    deliverables: "Sessões de aprendizagem, treinamentos internos, materiais de PDV, rotinas de acompanhamento e experiências inclusivas para públicos com diferentes necessidades.",
    scale: "Mais de oito anos de atuação como pioneiro do programa no Brasil, com gestão de fluxo de aulas e treinamentos em São Paulo.",
    result: "A experiência consolidou repertório em facilitação, análise de dados, aprendizagem inclusiva e coordenação de experiências em escala.",
    learning: "A melhor experiência de aprendizagem combina clareza operacional, acolhimento e espaço para que cada pessoa participe do seu modo.",
  },
  {
    slug: "trilhas-aprendizagem",
    number: "10",
    title: "Trilhas de Aprendizagem",
    eyebrow: "T&D · Instructional Design · Método",
    image: "/manus-storage/valens-bdn_e5a00706_587e1e0d.webp",
    context: "Frente de desenho de aprendizagem que reúne trilhas, microlearning, avaliações e facilitação para apoiar desenvolvimento de pessoas.",
    challenge: "Organizar conteúdo e prática em experiências que tenham sequência, clareza e aplicação no trabalho.",
    role: "Atuo da estratégia à trilha, do e-learning à facilitação, usando ADDIE, Kirkpatrick e Learning Experience Design como referências de desenho.",
    decisions: "Parto do contexto e do comportamento esperado, organizo objetivos e atividades e conecto avaliação, facilitação e acompanhamento.",
    deliverables: "Trilhas de aprendizagem, conteúdos, avaliações, microlearning, materiais de apoio e experiências blended.",
    scale: "A abordagem integra a experiência de 17 anos em conteúdo, treinamento e trade marketing, com aplicação em ambientes de varejo e força de campo.",
    result: "Este case reúne repertório metodológico e demonstra como transformar informação dispersa em uma jornada de aprendizagem aplicável.",
    learning: "Uma trilha eficiente não é uma coleção de conteúdos; é uma sequência de decisões que leva a pessoa até a aplicação.",
  },
  {
    slug: "blocs-presentation",
    number: "05",
    title: "Blocs Presentation",
    eyebrow: "Apresentação · Case em atualização",
    context: "O destino anterior deste projeto apresentava um case incorreto de outro autor. O portfólio agora mantém uma página própria para não direcionar recrutadores a uma atribuição indevida.",
    challenge: "Revisar o material e publicar a URL correta antes de apresentá-lo como evidência pública.",
    role: "Case reservado para atualização editorial e confirmação do link original.",
    decisions: "O card foi retirado do Behance temporariamente e passou a informar com transparência que o case está em revisão.",
    deliverables: "Página de transição segura, sem atribuir a Gabriel um projeto de terceiro.",
    scale: "Ainda não informado.",
    result: "O visitante não é mais enviado a uma página incorreta; o case poderá ser completado quando a URL e o contexto forem confirmados.",
    learning: "Precisão de link e autoria é parte da qualidade profissional do portfólio.",
    status: "Case em atualização — a URL final será inserida após confirmação.",
  },
];

function markBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  image.style.display = "none";
  image.parentElement?.classList.add("image-fallback");
}

export default function CaseStudy() {
  const [, params] = useRoute("/cases/:slug");
  const siteConfig = getSiteConfig();
  const record = cases.find((item) => item.slug === params?.slug);

  if (!record) return <NotFound />;

  return (
    <div className="site-shell case-page" style={{ "--primary": siteConfig.brand.accent, "--background": siteConfig.brand.background, "--foreground": siteConfig.brand.foreground } as CSSProperties}>
      <header className="site-header site-header-scrolled case-header">
        <Link className="brand-lockup" href="/" aria-label="Voltar para o portfólio"><span className="brand-name">Gabriel Danino Basilio</span></Link>
        <Link className="case-back" href="/"><ArrowLeft size={15} /> Voltar aos trabalhos</Link>
      </header>
      <main className="case-main">
        <section className="case-hero section-pad">
          <div className="section-index"><span>{record.number}</span><span className="index-line" /></div>
          <div className="case-hero-copy">
            <p className="section-kicker">{record.eyebrow}</p>
            <h1>{record.title}</h1>
            {record.status && <p className="case-status">{record.status}</p>}
            <p className="case-lead">{record.context}</p>
          </div>
          {record.image && <div className="case-hero-art"><img src={record.image} alt={`Imagem de apoio do case ${record.title}`} onError={markBrokenImage} /></div>}
        </section>
        <section className="case-content section-pad">
          <div className="case-facts">
            <div><span>Escala</span><strong>{record.scale}</strong></div>
            <div><span>Resultado</span><strong>{record.result}</strong></div>
          </div>
          <div className="case-grid">
            <article><p className="section-kicker">Desafio</p><p>{record.challenge}</p></article>
            <article><p className="section-kicker">Meu papel</p><p>{record.role}</p></article>
            <article><p className="section-kicker">Decisões</p><p>{record.decisions}</p></article>
            <article><p className="section-kicker">Entregáveis</p><p>{record.deliverables}</p></article>
            <article className="case-learning"><p className="section-kicker">Aprendizado</p><p>{record.learning}</p></article>
          </div>
        </section>
        <section className="case-closing section-pad">
          <p className="section-kicker">Próximo passo</p>
          <h2>Coordenação que<br /><em>vira execução.</em></h2>
          <Link className="submit-button" href="/#contact">Conversar sobre uma oportunidade <ArrowUpRight size={16} /></Link>
        </section>
      </main>
    </div>
  );
}

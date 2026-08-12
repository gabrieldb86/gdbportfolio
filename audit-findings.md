# Auditoria técnica e visual — achados em andamento

## 2026-08-12 — desktop 1280px

A Home e o CV carregam e apresentam uma direção editorial coerente, com paleta marfim/grafite/carmim, índices numéricos, tipografia de display e ritmo assimétrico. O CV está mais próximo de uma peça editorial madura; a Home é mais impactante, porém o hero escuro e a tipografia sans muito grande aproximam a primeira dobra de uma landing page de campanha.

A seção de projetos da Home apresenta um problema visual crítico no screenshot full-page: vários projetos externos aparecem como blocos marrons vazios, indicando imagens externas que não estão sendo renderizadas no ambiente de captura/publicação ou que dependem de carregamento tardio. Os três cases internos continuam com capas CSS visíveis. Isso precisa ser corrigido com fallback visual, preload seletivo ou ativos persistentes.

O footer público não expõe o link do editor, conforme solicitado anteriormente. A prova de recrutamento, a faixa de focos e a hierarquia do CV estão legíveis.

A revisão independente sugeriu cinco oportunidades: reforçar uma marca geométrica GDB proprietária, tornar o hero mais editorial e menos “campaign landing page”, variar o ritmo dos projetos, usar carmim mais como sinal de decisão do que como atmosfera e tornar CTAs/microcopy mais autorais. Foram aceitas como hipóteses de investigação, não como correções automáticas.

## 2026-08-12 — tablet 800px

A Home mantém o hero empilhado e a headline legível; a faixa de focos, a prova de recrutamento e as seções subsequentes não apresentam overflow evidente. O CV mantém a sequência de experiência e qualificações em leitura vertical, sem colisões aparentes.

O problema dos projetos externos é ainda mais evidente em tablet: os cards de `01` a `06` aparecem como retângulos marrons sem imagem, enquanto os cards internos `07` a `09` funcionam. Isso é uma inconsistência de carregamento de ativos e deve receber prioridade alta porque afeta a primeira leitura de competência do portfólio.

## 2026-08-12 — mobile 375px

O CV apresenta boa leitura linear e não mostra colisões evidentes; os blocos de experiência e qualificação se adaptam corretamente. A Home mantém hero, CTAs e contato utilizáveis, mas os seis cards externos continuam visualmente vazios, agora ainda mais perceptíveis pela proporção vertical reduzida. O `project-arrow` permanece visível em mobile e pode parecer um elemento solto sobre uma capa sem conteúdo.

Não foi observado overflow horizontal evidente nas screenshots full-page. O principal risco de design identificado nesta etapa continua sendo a ausência de imagens nos seis projetos externos, seguida por possíveis diferenças de linguagem entre a Home muito escura e o CV predominantemente marfim.

## SEO e Google — fontes oficiais consultadas

A documentação do Google Search Central enfatiza que não há garantia de indexação, mas que seguir os Search Essentials aumenta a elegibilidade do site nos resultados. O Google recomenda conteúdo útil, único, atualizado, legível e bem organizado; títulos, links, imagens com alt e estrutura de página ajudam o mecanismo a entender o conteúdo. A documentação também indica que sitemap e inspeção de URL são caminhos apropriados para descoberta e diagnóstico.

O Search Console oferece diagnósticos que não são observáveis apenas no código: verificação de propriedade, inspeção de URL, estado de indexação, cobertura, problemas de rastreamento e desempenho de pesquisa. A análise local pode preparar o site, mas não pode confirmar se o domínio já foi indexado ou se há ações manuais sem acesso autenticado à propriedade.

### Referências externas consultadas

- Google Search Central — SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central — documentação de SEO: https://developers.google.com/search/docs
- Google Search Console — visão geral e URL Inspection: https://search.google.com/search-console/about
- Google Search Central — solicitar novo rastreamento: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Google Search Central — ProfilePage structured data: https://developers.google.com/search/docs/appearance/structured-data/profile-page

## Pós-correção de ativos e SEO — primeira validação

Após trocar os seis projetos para caminhos persistentes, a Home passou a renderizar imagens reais nos primeiros cards e preservou as capas internas. Ainda há retângulos marrons em parte da sequência longa, por isso a correção não deve ser considerada encerrada sem investigar quais itens específicos permanecem sem imagem — pode ser lazy-loading no full-page, proporção/crop ou um projeto com ativo diferente do esperado.

A captura separada do CV funcionou e confirmou que a página permanece visualmente íntegra após a inclusão de metadados por rota. A captura combinada Home/CV falhou apenas para a rota CV, mas a repetição isolada foi bem-sucedida, indicando falha transitória do capturador e não necessariamente um bug da aplicação.

## Validação runtime do preview

A Home atualizada expõe os seis caminhos `/manus-storage/...` nos projetos externos e não apresenta “Editar portfólio” na árvore pública. O CV assume o title específico “CV — Gabriel Danino Basilio | Conteúdo, Treinamento e Trade Marketing” e mantém toda a trajetória, qualificações e contatos.

O preview da ferramenta de gestão adiciona uma faixa própria de “Preview mode” por cima da viewport; isso não pertence ao site publicado e não deve ser confundido com uma camada do produto. A publicação real deve ser validada separadamente após o checkpoint.

## Inspeção DOM do CV

O DOM do CV reportou `h1=1`, `h2=3`, `h3=6`, nenhum link sem `href` e nenhum botão sem `type`. O canonical foi atualizado para `/cv`, o title é específico e robots permanece `index, follow`. Na primeira leitura uma imagem lazy ainda estava incompleta; após 1,2 segundos todas as quatro imagens do CV reportaram dimensões naturais válidas, indicando carregamento tardio e não asset quebrado.

## Inspeção DOM do editor interno

O editor reportou title próprio, `robots=noindex, nofollow, noarchive`, canonical `/editor`, oito imagens sem falhas, 89 inputs e 20 botões. As prévias dos três cases internos não usam mais `internal:*` como `src` inválido; o editor continua funcional e permanece fora do sitemap público.

## Validação visual do CV após referência em PDF

O CV foi enriquecido com a trajetória completa do PDF, incluindo SPOT/EMS, atuação audiovisual, Ragtech, Apple, ITM, Nasha e experiências iniciais de trade marketing. A composição desktop mantém uma leitura sóbria com blocos de experiência separados por regras leves, datas visíveis e hierarquia de cargo/empresa/área. Em mobile, os blocos empilham sem overflow, preservando a ordem de leitura e o acesso aos CTAs. A página longa fica naturalmente extensa pela quantidade de informações, mas segue apropriada para consulta e impressão.

## CV clean — validação final

A versão final usa o bloco de experiência em marfim, com grafite para o texto, carmim apenas em labels e empresas, divisórias suaves e um encerramento mais compacto. O resultado reduz a aparência de peça promocional sem abandonar a identidade editorial do portfólio. Desktop e mobile foram capturados após a última alteração; a trajetória completa permanece legível e empilhada, sem colisões aparentes ou overflow horizontal.

## Atualização com os 10 ajustes solicitados

1. Título do hero atualizado para **CONTEÚDO, treinamento & TRADE MARKETING.**
2. Texto do hero atualizado com o parágrafo exato fornecido pelo usuário, alinhado à esquerda e equilibrado na primeira dobra.
3. Nome no header em linha única (**Gabriel Danino Basilio**) com fonte ajustada para evitar quebras indesejadas, alinhado com a navegação.
4. Informação redundante removida da página principal (mantendo apenas o trilho lateral limpo).
5. Métrica de experiência atualizada para **"Mais de 17 anos de experiência"**.
6. "Selected work" alterado para **"Trabalhos selecionados"**.
7. Seção de projetos (WORK) reconstruída com grade de 5 colunas inspirada em **seanobrien.com.au**, removendo os dashboards e incluindo 10 projetos curados.
8. Acordeão de serviços corrigido (o conteúdo não desaparece mais ao abrir) e foto de serviços reduzida em cerca de 30%.
9. Foto dos bonés restaurada na seção de destaque (statement).
10. Seção de contato com colunas distribuídas verticalmente e alinhamento à esquerda.

## Correção da headline — validação

O texto solicitado permanece intacto: "CONTEÚDO, treinamento & TRADE MARKETING.". A escala voltou aos parâmetros tipográficos da versão anterior, com headline sans de grande impacto, peso forte, entrelinha compacta e quebras manuais em quatro linhas. O preview confirmou a presença do texto novo, da apresentação completa e dos CTAs; o build também foi aprovado.

Na verificação mobile, a escala desktop restaurada inicialmente fazia a palavra "TREINAMENTO" ultrapassar a largura de 375px. Foi adicionada uma regra específica para telas até 720px, preservando o peso visual e reduzindo somente o tamanho da fonte, com `overflow-wrap` no eyebrow. O TypeScript e o build foram aprovados novamente.

## Headline reproduzida conforme primeira foto

A headline foi dividida em quatro linhas independentes: `CONTEÚDO,` em Manrope extra-bold marfim; `treinamento` em DM Serif Display itálico carmim; `& TRADE` em Manrope extra-bold marfim; e `MARKETING.` em Manrope extra-bold marfim. Desktop e mobile foram capturados com a nova composição, que mantém o texto exato e a hierarquia visual solicitada.

## Hero em painel com fotografia separada

O hero foi recomposto em um painel esquerdo com borda carmim arredondada, padding interno, headline em quatro linhas, texto corrido e CTA no rodapé do painel. A fotografia permanece como bloco independente à direita, com o mesmo tratamento editorial. A captura desktop confirmou a estrutura pedida; a captura mobile foi tentada, mas o upload da imagem falhou no ambiente de preview.

## Diagramação sem caixa — validação final

A moldura foi removida completamente, mantendo apenas o eixo textual do print. As capturas desktop e mobile confirmam o título em quatro linhas, o texto corrido alinhado à esquerda, o CTA no mesmo eixo e a fotografia como bloco independente. Nenhuma borda, fundo ou caixa visual permanece ao redor do texto.

## Revisão dos edits do editor visual

Os bullets do eyebrow agora aparecem entre as quatro categorias sem duplicação; o texto introdutório mantém a redução de margem superior; o CTA mantém apenas o padding no link, sem deslocar o ícone; e a métrica `17` recebe a margem apenas no bloco, sem estilos repetidos em seus filhos. Build e capturas em desktop/mobile foram validados.

## Segunda revisão do editor visual — correção de JSX

Os textos foram preservados conforme os edits: `Aberto a oportunidades`, nome sem quebra, `+ 17`, `100K+`, `130 +`, os complementos de carreira e SPOT no Grupo EMS, tamanhos de 15px nos focos e a serifálica da seção 03. Os atributos `style` duplicados foram removidos, eliminando os 15 erros de TypeScript detectados pelo editor. O build passou novamente; as duas novas capturas apresentaram falha de upload no ambiente de preview.

## Auditoria da grade 5 x 2 — referência e preview

A referência externa apresenta uma sequência de cards com imagem, título e descrição em ritmo horizontal uniforme. O preview do portfólio continua renderizando 10 projetos na área 02, mas a distribuição precisa ser medida diretamente no DOM para confirmar se o grid computado possui cinco colunas reais no desktop, sem regras posteriores reduzindo a largura ou alterando o span dos cards.

Após o override final, a inspeção computada do DOM confirmou `display: grid`, 10 cards, duas linhas e distribuição `[5, 5]`. A regra anterior que produzia `display: block` foi identificada como a causa exata do problema e foi sobreposta ao final do CSS.

As capturas confirmaram a solução visual: em 1280px a área 02 apresenta cinco cards na primeira linha e cinco na segunda, com largura e gap uniformes; em 375px a grade se adapta para uma coluna sem overflow, preservando a ordem e as legendas dos 10 projetos.

## Revisão dos edits visuais da Área 02 — 2026-08-12

O editor visual havia inserido seis atributos duplicados em `Home.tsx`, impedindo o TypeScript de compilar. Os estilos foram consolidados com os valores finais: índice deslocado `-58px/+58px`, heading e kicker preservando os deslocamentos negativos intencionais, e grade com `marginBottom: -60px` e `marginLeft: 53px`. A captura mobile não apresentou overflow no hero; a captura desktop exige uma conferência adicional da visibilidade integral de “Projetos que” após a margem negativa aplicada ao h2.

A inspeção em tiles legíveis confirmou o risco: a primeira linha escura **“Projetos que”** não aparecia na captura desktop, enquanto **“ganharam forma.”** permanecia visível. Após ajustar o deslocamento do h2 de `-136px` para `-48px`, a captura full-page de 1280px voltou a exibir **“Projetos que ganharam forma.”** integralmente, sem perder o alinhamento editorial do kicker. A captura full-page de 375px também preservou a heading e empilhou os 10 cards sem overflow horizontal.

## Auditoria documental — documentos recebidos em 2026-08-12

Os dois documentos Markdown baixados pelo navegador convergem em três prioridades imediatas: corrigir o destino do card “Blocs Presentation”, padronizar **100K+ pessoas capacitadas** em todo o portfólio e substituir a lógica de galeria por três cases próprios de coordenação (Grupo EMS/Cystex, Today at Apple e Ragtech). Também recomendam alinhar o contato ao recrutamento, adicionar CV em PDF, revisar formulário/privacidade, confirmar Open Graph/analytics e reduzir sinais de portfólio de freelancer.

O DOCX `portfolio_audit_report_100k_corrigido.docx` confirma a métrica oficial **“100K+ pessoas capacitadas ao longo da carreira”**, proibindo “300K+” e “300 mil” em Home, CV, SEO e cases. O DOCX de campos de atualização não pôde ser baixado porque o link temporário retornou bloqueio/captcha; suas prioridades centrais já estão cobertas pelos demais documentos e pelo relatório corrigido.

### Auditoria visual da rodada de atualização

As capturas desktop e mobile confirmaram que a nova hierarquia editorial, os cases próprios, a privacidade e o formulário orientado a recrutadores mantêm leitura e reflow adequados. Entretanto, os caminhos antigos de `/manus-storage/` para `gabriel-profile`, `gabriel-treinamento-apresentacao` e `gabriel-bonecaps-project` retornaram HTTP 502 no preview, produzindo blocos vazios/alt text no hero e nos cases. A restauração dos assets é bloqueadora para considerar a auditoria visual concluída.

Após reiniciar o serviço, três novas tentativas de upload (`gabriel-profile.jpg`, `gabriel-treinamento-apresentacao.jpg` e `gabriel-bonecaps-project.png`) falharam novamente por timeout de DNS no storage. O fundo arquitetural e o asset editorial foram reenviados com sucesso; os três assets críticos permanecem pendentes e receberão fallback visual não quebrado até a restauração do storage.

## Implementação estratégica — rodada atual

Foram implementados: posicionamento principal de coordenação no hero; descrição curta orientada a recrutadores; prova de escala com **17+ · 100K+ · 130+**; faixa de contextos de atuação; três princípios de coordenação na seção Sobre; formulário com empresa, cargo/oportunidade e mensagem orientada a vaga; aviso de privacidade; eventos de analytics para cases, CV, WhatsApp, LinkedIn, e-mail e Behance; migração de localStorage para impedir que textos antigos voltem a exibir 300K; cinco novos caminhos persistentes de capas de projetos; cases próprios para Grupo EMS/Cystex, Ragtech, Roadshow DPSP, Today at Apple, Trilhas e transição segura do Blocs; sitemap ampliado; e robots.txt com `/editor` bloqueado.

TypeScript e build foram aprovados. As capturas desktop, 800px e mobile confirmaram leitura, reflow e ausência de overlap após o breakpoint intermediário dos cases. O upload do PDF oficial do CV falhou em três tentativas por indisponibilidade de DNS do storage; por isso, o CTA permanece como “Ver CV / imprimir” até que o arquivo persistente possa ser publicado.

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

# Verificação de alinhamento dos CTAs

A captura em viewport móvel de 390 × 844 px confirmou que “VER CASES PRINCIPAIS” e “VER CV / IMPRIMIR” começam no mesmo eixo esquerdo, com as setas na mesma linha e sem deslocamentos laterais ou verticais acumulados.

A captura desktop de 1280 × 720 px confirmou que o hero mantém a composição editorial, a imagem permanece no lado direito e não há erro de renderização após a remoção dos estilos inline conflitantes. O trecho dos CTAs fica abaixo da área visível nessa captura, portanto a confirmação direta do eixo dos links foi feita na captura mobile e no CSS normalizado.

Typecheck e build de produção concluídos com zero erros.

## Verificação dos focos de coordenação

A regra final de desktop foi alterada para quatro colunas no próprio band: o rótulo ocupa a primeira coluna e os três itens ocupam três frações iguais. A captura de página inteira confirma que as divisórias verticais da faixa estão alinhadas e que os três blocos possuem largura horizontal equivalente, sem alterar a hierarquia carmim, marfim e grafite. Em mobile, a regra original de empilhamento permanece preservada. A captura em 390 × 844 px confirmou que os focos continuam legíveis, empilhados e com divisórias horizontais alinhadas.

Vitest: 1 arquivo e 1 teste aprovados. Typecheck e build de produção aprovados sem erros.

## Verificação do hero de coordenação

A seção recebeu uma abertura editorial com headline em DM Serif Display, palavra final em itálico grafite, nota de contexto e marcações numéricas com setas nos três focos. Em desktop, o bloco ganhou mais respiro vertical, bordas de transição e alinhamento em quatro colunas; em mobile, a headline permanece empilhada e os itens seguem em uma leitura vertical legível. A inspeção textual no navegador confirmou o novo título, a nota de contexto e os três itens sem perda de conteúdo. A inspeção em viewport mostrou que o header fixo cobre parte da seção quando o título é usado como âncora; a composição precisa ser conferida com o topo do band, não com o topo do h2, para evitar interpretar o recorte da âncora como perda visual. Com o viewport posicionado no topo real do band, a captura confirmou uma headline ampla à esquerda, três colunas de focos visualmente equilibradas, respiro vertical e contraste consistente com o restante do portfólio.

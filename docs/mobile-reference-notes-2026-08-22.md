# Referência mobile aprovada — 2026-08-22

Fonte analisada: `/home/ubuntu/upload/GabrielDaninoBasilio—CoordenaçãodeConteúdo,TreinamentoeTradeMarketing.pdf`

## Achados principais nas primeiras páginas

| Área | Comportamento aprovado observado |
|---|---|
| Hero | Conteúdo em uma coluna, imagem grande logo abaixo do texto, sem desalinhamento lateral. |
| Focos de coordenação | Bloco vermelho contínuo, títulos e listas alinhados à esquerda, sem quebras laterais estranhas. |
| Experiência em números | Métricas distribuídas em grade legível, com bom espaçamento interno e CTAs centralizados abaixo. |
| Como eu atuo | Coluna clara à esquerda e fundo escuro à direita na mesma sessão, mantendo leitura limpa. |
| Trabalhos selecionados | O PDF indica abertura da seção sem compressão horizontal da galeria; a apresentação mobile aprovada não mostra painéis excessivamente estreitos. |

## Direção para a correção

O ajuste deve restaurar o alinhamento vertical e a legibilidade mobile das sessões afetadas, com atenção especial à seção **Trabalhos selecionados**. A correção deve evitar painéis estreitos demais, excesso de área escura e qualquer desalinhamento lateral introduzido pelas mudanças recentes de galeria e glow.

## Achados adicionais nas páginas 6 a 10

| Página | Observação relevante |
|---|---|
| 6 | A abertura de **Trabalhos selecionados** mantém o texto grande e alinhado à esquerda, em um bloco preto limpo, sem compressão lateral. |
| 7 | Os quatro projetos aparecem em **pilha vertical**, com cartões largos e legíveis, e o CTA vermelho surge logo abaixo. |
| 8–10 | O PDF renderizado mostra páginas pretas vazias, o que sugere que a exportação não capturou o restante da sessão; portanto, a referência confiável para a galeria mobile está concentrada principalmente na página 7. |

Conclusão prática: no mobile, a galeria deve priorizar **cartões empilhados**, largura útil quase total, boa legibilidade de texto e ausência de grandes vazios pretos entre os projetos e o CTA subsequente.

## Comparação com a Home restaurada

| Viewport | Resultado observado |
|---|---|
| 375px | O vazio preto causado pela altura manual da seção foi eliminado. Os quatro projetos aparecem em pilha compacta, com largura útil e leitura semelhante à referência. |
| 742px | A versão intermediária permanece com o comportamento próprio de tablet, sem o grande vazio vertical ou corte lateral introduzido no mobile. |
| 900px | A galeria mantém o acordeão horizontal destinado a tablet, sem extravasamento da seção. |
| 1280px | O desktop preserva as medidas manuais e o acordeão horizontal, pois a restauração não atua fora de até 720px. |

A intervenção foi limitada ao breakpoint de até 720px: os valores manuais da seção continuam preservados fora do mobile.

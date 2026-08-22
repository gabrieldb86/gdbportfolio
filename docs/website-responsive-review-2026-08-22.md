# Revisão de responsividade progressiva do website — 22/08/2026

## Escopo preservado

Esta rodada trata apenas de larguras de website acima da composição mobile. As regras de até **900px** permanecem fora do escopo e não devem ser alteradas.

## Achados iniciais

As capturas integrais em **1024 × 768** e **1280 × 800** mostraram que o conteúdo ainda é renderizado, mas a transição entre o layout amplo e a faixa compacta depende de diversas medidas e espaçamentos manuais. A correção deve substituir a compressão visual por escalas e limites progressivos de tipografia, áreas de mídia, colunas e espaçamentos, preservando o eixo editorial inicial e evitando overflow, cortes e troca indevida de ordem.

## Matriz de validação prevista

| Faixa | Viewport de referência | Objetivo |
| --- | --- | --- |
| Ampla | 2560 × 1440 | Manter hierarquia e limites de expansão. |
| Desktop | 1920 × 1080 e 1536 × 864 | Conservar a composição editorial. |
| Notebook | 1280 × 800 e 1024 × 768 | Reduzir proporcionalmente sem corte ou colisão. |
| Mobile preservado | 900px ou menos | Não modificar regras nem composição aprovadas. |

## Validação após o reflow

As capturas em **901 × 800** e **1280 × 800** confirmaram que o conteúdo segue em fluxo contínuo acima do breakpoint mobile: o trilho deixa de reservar área na faixa compacta, colunas passam para uma ou duas faixas conforme o espaço disponível e larguras/offsets manuais deixam de criar corte horizontal. A próxima verificação cobre as larguras ampla e intermediária, além da composição mobile preservada.

As capturas em **1440 × 900** e **2560 × 1440** confirmaram que a composição amplia dentro de limites definidos, mantendo a hierarquia, o alinhamento editorial e os conteúdos no fluxo da página. Não foram introduzidas regras dentro do breakpoint mobile.

Por fim, **1024 × 768** confirmou o reflow de notebook compacto, enquanto **375 × 812** confirmou que a versão mobile aprovada continua preservada, sem alterações nas suas regras ou disposição.

A faixa de desktop amplo intermediário também foi confirmada em **1920 × 1080**, completando a matriz prevista de larguras sem observar cortes de conteúdo ou overflow horizontal.

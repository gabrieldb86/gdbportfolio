# Auditoria GTmetrix — 16 de agosto de 2026

Os relatórios anexados registraram **69% de Performance** e **89% de Structure**, com FCP de 1,9 s, LCP de 2,5 s, TBT de 202 ms, CLS de 0 e carregamento completo em 3,5 s. O relatório analisado foi gerado em Seattle, EUA, e se refere ao estado anterior às otimizações deste ciclo.

| Prioridade | Achado do relatório | Recurso ou causa no projeto | Ação aplicada |
|---|---|---|---|
| Alta | TTFB de aproximadamente 1,0 s | Respostas SSR estavam com `Cache-Control: no-cache` | Definido cache público com `s-maxage=300` e `stale-while-revalidate` para HTML SSR. |
| Média | Cache/bfcache prejudicado por `no-store` | Proxy `/manus-storage/*` devolvia redirecionamento com `no-store` | Alterado para cache público de 5 minutos com revalidação em segundo plano. |
| Média | LCP sem preload da imagem correta | O preload apontava para o perfil; o LCP relatado era o fundo Samuel Scalzo | Preload apontado para a imagem de fundo identificada, com prioridade alta. |
| Média | JavaScript e tarefas longas | Editor protegido era incluído no bundle inicial; o runtime de edição Manus é externo à aplicação | Editor movido para carregamento sob demanda. O runtime Manus permanece uma limitação da plataforma, necessária para a edição visual. |
| Baixa | Imagens abaixo da dobra carregadas cedo | Primeira capa de projeto e imagem de treinamento | Transferidas para carregamento lazy e baixa prioridade. |
| Baixa | CSS potencialmente não utilizado | Folha editorial histórica contém regras de várias rotas | Não removido neste ciclo para não alterar o visual aprovado; deve ser tratado por limpeza de CSS com regressão visual controlada. |

> O histórico do GTmetrix mostra oscilações de tamanho da página em execuções anteriores, chegando a vários megabytes. A versão medida mais recentemente pelo relatório principal tinha 1,15 MB, com 647 KB de imagens, 359 KB de JavaScript e 111 KB de HTML.

## Limites conhecidos

O relatório aponta tarefas longas e JavaScript não utilizado do `spaceEditor` carregado pelo ambiente Manus. Esse recurso não é controlado diretamente pelo código do portfólio e foi mantido porque sustenta a edição visual solicitada. As mudanças deste ciclo atuam nos recursos do próprio projeto e preservam design e responsividade.

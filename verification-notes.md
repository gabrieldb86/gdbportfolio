# Validação do reposicionamento

## 2026-08-12

O `pnpm check && pnpm build` passou após a atualização da Home e do CV. A Home foi revisada em 1280, 1100, 800 e 375 pixels; o hero preserva contraste, a mensagem de coordenação é legível e o breakpoint intermediário empilha o hero sem sobrepor o CTA. Em 800 pixels a navegação da Home colapsa para menu.

O CV foi revisado em 1280, 1100, 800 e 375 pixels. A página mantém o histórico editorial, a abertura declara o objetivo de coordenação e o retrato permanece legível. Foi adicionada uma regra final para ocultar navegação e disponibilidade do cabeçalho do CV entre 721 e 1024 pixels, evitando colisão na janela intermediária.

Os novos blocos de Formação, Metodologias, Ferramentas e Idiomas foram confirmados no screenshot full-page do CV, com as cinco experiências visíveis na sequência editorial. A Home full-page apresenta os três cases internos com capas CSS, a nova faixa de métricas e o crédito visível de Samuel Scalzo.

As seis URLs externas de imagens do Behance responderam com HTTP 200 no teste de disponibilidade. O `grep` final dos links de contato confirmou `5511945747353` em Home e CV, incluindo `wa.me` e `tel:`.

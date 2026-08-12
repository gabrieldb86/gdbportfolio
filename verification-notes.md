# Validação do reposicionamento

## 2026-08-12

O `pnpm check && pnpm build` passou após a atualização da Home e do CV. A Home foi revisada em 1280, 1100, 800 e 375 pixels; o hero preserva contraste, a mensagem de coordenação é legível e o breakpoint intermediário empilha o hero sem sobrepor o CTA. Em 800 pixels a navegação da Home colapsa para menu.

O CV foi revisado em 1280, 1100, 800 e 375 pixels. A página mantém o histórico editorial, a abertura declara o objetivo de coordenação e o retrato permanece legível. Foi adicionada uma regra final para ocultar navegação e disponibilidade do cabeçalho do CV entre 721 e 1024 pixels, evitando colisão na janela intermediária.

Os novos blocos de Formação, Metodologias, Ferramentas e Idiomas foram confirmados no screenshot full-page do CV, com as cinco experiências visíveis na sequência editorial. A Home full-page apresenta os três cases internos com capas CSS, a nova faixa de métricas e o crédito visível de Samuel Scalzo.

As seis URLs externas de imagens do Behance responderam com HTTP 200 no teste de disponibilidade. O `grep` final dos links de contato confirmou `5511945747353` em Home e CV, incluindo `wa.me` e `tel:`.

Na atualização de imagens, a seção Sobre passou a usar a foto de Gabriel conduzindo um treinamento. O logotipo editorial anterior foi retirado do cabeçalho e rodapé do CV e do favicon, sendo substituído pela ilustração em preto e branco já usada no trilho e no rodapé da Home. Build, screenshot full-page da Home e screenshot mobile foram validados.

Na correção de alinhamento, a localização lateral foi removida, o trilho passou a exibir `Portfólio · 2026` e a segunda linha de informação foi retirada. Work, chamada final e demais blocos passaram a usar o mesmo recuo editorial do índice; a regra é anulada no mobile para preservar o empilhamento. Build e screenshots em 1280, 1100, 800 e 375 pixels foram validados.

Na rodada de transições, a referência foi analisada por navegação direta e foram registradas revelações progressivas com fade, deslocamento curto e atrasos leves entre elementos. A Home recebeu observadores de viewport para hero, focos de coordenação, métricas, manifesto, projetos, serviços, Sobre, chamada final e contato; as animações usam apenas opacity/transform e têm fallback para `prefers-reduced-motion`. A faixa institucional fixa substituiu o marquee, o link público do editor foi removido e as screenshots full-page em desktop e mobile mantiveram leitura e empilhamento.

No preview browser, a faixa fixa “Focos de coordenação” aparece antes da prova de recrutamento e os blocos seguem revelando-se ao rolar; o link “Editar portfólio” não aparece na árvore de conteúdo público. A headline preserva as quebras manuais em desktop e mobile. A referência visual foi adaptada sem importar o marquee ou a linguagem de agência.

Screenshots full-page em 1100px e 800px confirmaram que a faixa de focos de coordenação permanece legível, a headline mantém as quebras manuais e o empilhamento tablet não cria colisões. O novo efeito de entrada atua sobre o conteúdo sem deslocar a estrutura de layout.

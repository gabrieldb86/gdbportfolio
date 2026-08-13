# Análise da gravação — contador progressivo

A gravação mostra o contador em uma seção de destaque abaixo do conteúdo principal. No desktop, os seis dados aparecem em uma única linha horizontal, com ícones acima dos números e rótulos abaixo. Todos os contadores começam simultaneamente, sem atraso entre si, e a duração percebida é de aproximadamente dois segundos.

O movimento tem comportamento ease-out: começa mais rápido e desacelera suavemente perto do valor final. O gatilho aparenta ser a entrada da seção no viewport ou o carregamento inicial quando ela já está visível. Para mobile, a recomendação observada é evitar uma linha horizontal estreita; o contador deve usar grade de duas colunas ou empilhamento vertical.

Adaptação para Gabriel: o bloco editorial “Números que comprovam a experiência.” será mantido como hero à esquerda, enquanto os dados ficarão em composição lateral à direita no desktop. A animação será implementada com IntersectionObserver, duração de 2 segundos, easing ease-out e cancelamento/redução quando `prefers-reduced-motion` estiver ativo. No mobile, a composição será empilhada, com o hero primeiro e os dados em duas colunas.

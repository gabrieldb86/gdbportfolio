# Análise de largura e centralização

Os sites jgbpedro.github.io e iuricode.com usam uma estratégia de largura controlada: o conteúdo principal fica dentro de um container com largura máxima e margens automáticas. Em telas grandes, isso deixa áreas vazias nas laterais para preservar leitura, hierarquia e respiro. Não é um erro por si só; é uma decisão editorial e de usabilidade.

A referência jgbpedro apresenta navegação e seções contidas, com composição centralizada e leitura de portfólio tradicional. A referência iuricode também restringe a largura do conteúdo, mas alterna blocos, imagens e textos dentro desse eixo, evitando que cada linha ocupe toda a tela.

No portfólio de Gabriel, o hero atual não está simplesmente centralizado: há um trilho lateral fixo, um eixo editorial esquerdo e uma composição assimétrica entre texto e fotografia. Em telas amplas, a fotografia e a área textual ocupam grande parte da viewport, enquanto a seção de métricas usa uma grade controlada. Portanto, não há evidência de um problema técnico causado por centralização.

O risco real surgiria se o container tivesse largura máxima excessivamente pequena, se o conteúdo ficasse sem relação com o trilho lateral, ou se o mobile mantivesse a mesma largura fixa. A recomendação é conservar a largura máxima como mecanismo de leitura, mas permitir que os blocos de hero, métricas e projetos usem mais espaço em telas grandes quando isso melhorar a composição; no mobile, manter uma única coluna fluida sem overflow horizontal.

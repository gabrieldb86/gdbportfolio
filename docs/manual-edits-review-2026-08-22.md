# Verificação das edições manuais da Home — 2026-08-22

| Área editada | Valor final preservado | Verificação |
|---|---:|---|
| Link do manifesto | 12px | Mantido no texto do link; o ícone preserva sua medida própria. |
| Texto do manifesto | 16px | Aplicado sem alterar cor, peso ou eixo existentes. |
| Nota editorial de serviços | título 20px; texto 25px | Mantida a hierarquia escolhida sem repetir propriedades. |
| Legenda da imagem Sobre | margem direita 6px | Aplicada sem mudar as demais margens ou cor. |
| Contato | seção 1560px; ênfase “coordenação?” 55px | Valores finais consolidados; a tipografia-base do título e as demais medidas permanecem. |

As capturas em **1280px** e **375px** confirmaram que a consolidação eliminou os atributos duplicados e não reintroduziu a regressão de alinhamento mobile.

## Links da seção Experiência em números

O bloco de links preserva as medidas finais selecionadas no desktop: **314px** de largura e **99px** de altura. O link **Abrir trajetória** mantém margem superior de **-5px**; o link **Ver CV** mantém margem superior de **87px** e margem esquerda de **-305px**. As capturas em 1280px e 375px confirmaram que a regra mobile existente continua neutralizando esses deslocamentos apenas onde necessário para preservar a grade de métricas.

As verificações adicionais em **742px** e **900px** confirmaram que os ajustes não criaram deslocamento lateral, corte ou sobreposição na composição intermediária.

## Fundo e cartões no iPhone

Em **375px**, a seção clara passou a ocupar integralmente a largura disponível, eliminando a faixa escura lateral. Os quatro projetos agora usam cartões com mesma altura, tratamento visual uniforme e estado estático no mobile; a interação de expansão continua restrita às faixas maiores. A verificação em **742px** confirmou que o comportamento intermediário não sofreu regressão.

As verificações em **900px** e **1280px** confirmaram que o layout editorial e a animação da galeria continuam preservados fora do breakpoint mobile.

# Medições reais após a correção final

A inspeção por DOM confirmou a causa do problema: uma regra antiga mantinha `.coordination-focus-band` como `display:grid`, confinando o layout interno a aproximadamente 290px. Isso fazia a lista parecer comprimida e diferente do print.

Após aplicar `display:block` no escopo da Home e substituir as colunas mínimas fixas por frações fluidas, os valores medidos no viewport desktop foram: seção com 1.211px de largura; layout com 961px; coluna editorial com 270px; lista vertical com 601px; espaçamento de 89,6px; três itens na mesma coluna; overflow horizontal falso.

A seção agora ocupa toda a largura editorial disponível e o `grid` antigo não interfere mais no layout. Os testes e o build continuam aprovados.

## Confirmação adicional no preview

Após o ajuste, a medição real passou a mostrar `display: block` na seção, layout de 961px, coluna esquerda de 270px e lista direita de 601px, sem overflow horizontal. Os três itens foram medidos em uma única coluna, com alturas de 243px, 243px e 216px. Isso confirma que a regra antiga de grid, responsável por comprimir a área para 290px, foi neutralizada.

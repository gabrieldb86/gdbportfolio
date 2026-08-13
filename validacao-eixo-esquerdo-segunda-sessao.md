# Validação do eixo esquerdo — Segunda sessão

A segunda sessão foi retirada do deslocamento negativo e passou a respeitar o mesmo eixo editorial da Home: o container inicia no `--editorial-axis`, o bloco editorial usa `margin-left: 0` e o grid mantém a lista à direita dentro da mesma composição.

A captura desktop confirma que a seção vermelha está posicionada no mesmo eixo geral das demais áreas, sem o deslocamento lateral anterior. A captura mobile confirma que o reset de largura, altura e margem continua ativo, preservando o fluxo vertical e evitando overflow.

`pnpm test` aprovou 3 testes e `pnpm build` concluiu sem erros.

# Inspeção do preview real — Segunda sessão

A inspeção no navegador confirmou que o JSX renderizado contém os três focos na ordem correta e que a lista à direita utiliza índices, micro-listas e sinais de mais. O problema visual observado no scroll foi de composição vertical: a âncora/rolagem posiciona o viewport no meio da seção, deixando o início do título à esquerda parcialmente fora da tela e criando uma grande área vermelha vazia abaixo da lista.

O código foi ajustado para dar mais presença à seção, mas a confirmação de layout precisa considerar que a seção é mais alta que o viewport. A lista não deve ser considerada uma grade de três colunas; ela é uma única coluna vertical. O próximo ajuste deve reduzir o vazio inferior, alinhar o topo da lista com o topo do bloco editorial e evitar que a âncora esconda o começo do título.

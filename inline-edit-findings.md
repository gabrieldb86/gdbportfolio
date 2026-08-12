# Validação da edição visual

O trecho alterado no rodapé mantém o monograma, os links sociais e a navegação de edição. O nome do rodapé foi ampliado para 24px e não produziu quebra no layout desktop ou mobile. O cabeçalho também preserva a marca e o nome ampliado já existentes.

O editor visual aplicou estilos inline de `fontSize` em elementos gráficos que não usam tipografia — imagem do monograma e barras do símbolo. Esses estilos são inofensivos no resultado renderizado e não substituem as dimensões definidas pelas classes do monograma. A checagem TypeScript/build e as capturas desktop/mobile foram concluídas sem erro.

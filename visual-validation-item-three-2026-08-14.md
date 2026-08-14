# Validação visual — item 03 e hero final

A captura mobile em 375px confirma que a seção Sobre mim termina após a descrição completa do item 03, antes do início do hero vermelho. A correção removeu a sombra ascendente que cobria visualmente a última linha, sem alterar a tipografia, as cores ou o cabeçalho restaurado. A captura desktop mantém a composição editorial anterior intacta.

## Causa real e validação final

Foi identificada uma segunda causa: o item 03 carregava `height: 23px` em seu contêiner, rótulo, título e parágrafo. As alturas inline foram removidas e o bloco voltou a reservar sua altura natural. As capturas mobile e desktop confirmam a descrição completa antes do hero vermelho, sem alteração de composição fora desse bloco.

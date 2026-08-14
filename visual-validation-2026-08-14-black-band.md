
## Evidência da captura estrutural atual

A captura mobile atual mostra que o cabeçalho preto fixo/escuro ocupa a parte superior da viewport e pode cobrir o conteúdo quando a rolagem chega ao item 02. A transição bege-vermelho precisa ser avaliada separadamente; não será corrigida com sombra, margem negativa ou uma faixa artificial. A próxima validação deve usar uma captura focada na região do about-section/statement-section, após o cabeçalho passar a respeitar o fluxo e o offset de rolagem.

## Resultado após a correção estrutural

O recorte ampliado da região final mostrou a seção bege terminando diretamente no hero vermelho, sem faixa preta intermediária, e o item 03 completo. A captura mobile também mantém o cabeçalho fora do fluxo de sobreposição por meio do comportamento sticky e do `scroll-padding-top`. A captura desktop preserva a composição, as cores e a divisão entre seções.

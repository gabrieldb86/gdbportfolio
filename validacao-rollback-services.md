# Validação da reversão da services-section

A última alteração foi revertida somente na regra `.services-redesign .services-layout`.

| Propriedade | Estado restaurado |
|---|---:|
| Grid | 438.938px / 417.531px |
| Gap | 115.2px |
| Alinhamento vertical | `center` |
| Hero | x=191px, topo=4617px, largura=439px, altura=524px |
| Lista | x=745px, topo=4659px, largura=418px, altura=440px |
| Diferença vertical | 42px, igual ao estado anterior |

A reversão não alterou o JSX, as demais seções ou o conteúdo do portfólio. Testes e build de produção foram aprovados.

## Capturas finais

A versão restaurada foi verificada em desktop e mobile. O restante da Home permanece intacto e a services-section retorna à composição anterior, com a lista na posição vertical anterior ao último ajuste. O fluxo mobile continua empilhado e sem overflow horizontal.

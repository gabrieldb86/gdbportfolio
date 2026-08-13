# Validação das medidas do editor

As medidas solicitadas foram consolidadas no CSS e verificadas no navegador em viewport desktop de 1.280px.

| Elemento | Medida verificada |
|---|---:|
| Bloco editorial esquerdo | 438px de largura × 644px de altura |
| Título `h2` | 451px de largura × 474px de altura |
| Deslocamento horizontal | −280px incorporado ao bloco editorial |
| Overflow horizontal | Não identificado |

Os atributos inline duplicados foram removidos de `Home.tsx`; as dimensões passaram a ser controladas por CSS. O mobile possui reset próprio para liberar largura e altura, evitando corte ou overflow.

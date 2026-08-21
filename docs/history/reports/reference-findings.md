# Referência de direção — cjcawley.com

## Observações

O site de referência apresenta uma navegação principal curta e orientada por áreas: Work, Logos, About, Tools & Courses, Contact e Shop, além de saídas externas para YouTube e Instagram. A organização comunica rapidamente o que a pessoa pode explorar e separa portfólio, apresentação pessoal, recursos e contato.

O padrão que vale trazer para o projeto do Gabriel é a ideia de um portfólio com **áreas editoriais bem definidas**, em vez de uma única página longa sem caminhos alternativos. A referência também sugere uma marca visual forte no cabeçalho e uma arquitetura que pode crescer com novos conteúdos.

## Adaptação para o projeto

Não vou copiar tipografia, identidade, textos ou composição literalmente. A adaptação proposta é manter o arquivo editorial já definido para Gabriel e acrescentar uma navegação com `Trabalho`, `CV`, `Sobre`, `Recursos` e `Contato`, deixando cada área mais fácil de acessar.

Para tornar o site editável, o conteúdo deve sair do markup espalhado e ir para uma configuração centralizada. Nessa configuração, cada projeto terá título, categoria, ano, imagem, proporção, ordem, descrição curta e link. Também serão centralizados foto de perfil, textos do hero, cores de marca, largura dos cards e opções de aparência.

## Modelo de personalização

| Grupo | O que poderá ser editado |
| --- | --- |
| Conteúdo | Nome, headline, resumo, descrições, CV, serviços e contatos |
| Projetos | Foto, título, categoria, ano, ordem, tamanho, proporção, crop e link |
| Identidade | Vermelho principal, fundo, grafite, fontes e monograma |
| Layout | Largura da grade, espaçamento, densidade, destaque do primeiro projeto e visibilidade das seções |
| Navegação | Nomes das abas, ordem dos links e URLs externas |

## Limite técnico importante

Neste projeto estático, a edição será feita de modo seguro por meio de arquivos de configuração e estilos centralizados no código. Isso permite alterar rapidamente conteúdo e aparência, mas não cria automaticamente um painel administrativo público. Um editor visual dentro do próprio site exigiria uma nova camada de backend, autenticação e armazenamento.

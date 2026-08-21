# Handoff para outra IA, profissional ou agência

Este arquivo é o ponto de partida para qualquer pessoa ou ferramenta que assuma a evolução do portfólio.

## Objetivo do site

Apresentar Gabriel Danino Basilio para recrutadores, RH e headhunters em posições de coordenação de Conteúdo, Treinamento, Trade Marketing, Performance de Campo e T&D. A linguagem deve ser direta, profissional e baseada em realizações reais.

## Regras que não devem ser quebradas

1. **Não alterar o visual sem solicitação explícita.** O layout é editorial, minimalista e assimétrico.
2. **Preservar a barra lateral.** Avatar, rótulos e estrutura do trilho lateral não devem ser removidos ou reposicionados sem autorização.
3. **Não exibir telefone em texto.** Usar somente links de WhatsApp, e-mail e LinkedIn.
4. **Manter métricas reais.** A referência atual é 17+ anos, 114K+ pessoas capacitadas e 130+ promotores monitorados.
5. **Preservar edições manuais.** Se o editor visual criar propriedades repetidas em JSX, remover apenas a duplicidade técnica e manter o valor final escolhido.
6. **Proteger mobile.** Ajustes manuais feitos para desktop devem ser neutralizados no `@media (max-width: 900px)` quando afetarem leitura, corte ou sobreposição no mobile.
7. **Não inventar avaliações, depoimentos, clientes ou resultados.**

## Fluxo recomendado para qualquer alteração

1. Ler `README.md`, `docs/architecture/OVERVIEW.md` e o trecho aplicável de `docs/guides/CONTENT_AND_VISUAL_EDITS.md`.
2. Registrar a alteração no final de `todo.md` antes de modificar código.
3. Alterar o menor número possível de arquivos.
4. Atualizar ou criar um teste quando a mudança afetar regras de conteúdo, SEO, privacidade ou responsividade.
5. Executar `pnpm test`, `pnpm run check` e `pnpm build`.
6. Conferir pelo menos uma visualização desktop e uma mobile.
7. Salvar um checkpoint/commit para sincronizar o resultado com GitHub.

## Pontos que costumam exigir atenção

| Situação | Onde verificar |
|---|---|
| Um texto não muda | `siteConfig.ts`, depois a página correspondente e estilos inline preservados. |
| Uma alteração quebra mobile | Regras em `index.css` dentro de `@media (max-width: 900px)`. |
| Um título não muda ao compartilhar ou pesquisar | `shared/portfolioSeo.ts`, `entry-server.tsx` e `components/Head.tsx`. |
| Um novo case não abre | Rota em `App.tsx`, conteúdo do case e entrada em `portfolioSeo.ts`. |
| Uma imagem não aparece | URL em `siteConfig.ts`; usar somente fonte autorizada e persistente. |
| O build falha após edição visual | Procurar propriedades duplicadas em `style={{ ... }}` no JSX. |

## Situação atual da publicação

O código é sincronizado no repositório GitHub `gabrieldb86/gabriel-portfolio`, branch `main`. A documentação de operação explica os comandos e o fluxo de publicação sem depender de uma única ferramenta.


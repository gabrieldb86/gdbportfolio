# Guia de conteúdo e edição visual

## Textos, projetos e links

Comece por `client/src/data/siteConfig.ts`. Ele concentra dados reutilizáveis de projetos, imagens, links e métricas. Antes de criar novo texto diretamente em um componente, verifique se o dado já existe nesse arquivo.

| O que mudar | Primeiro arquivo a consultar |
|---|---|
| Projetos, imagens de cards, links e categorias | `client/src/data/siteConfig.ts` |
| Hero, CTA principal e formulário | `client/src/pages/Home.tsx` |
| Experiências, formação e competências | `client/src/pages/CV.tsx` |
| Texto de privacidade | `client/src/pages/Privacy.tsx` |
| Conteúdo e layout de um estudo de caso | `client/src/pages/CaseStudy.tsx` |
| Title, description, canonical e Open Graph | `shared/portfolioSeo.ts` |

## Imagens

Use somente assets autorizados e persistentes. Para adicionar uma imagem, faça upload para a camada de armazenamento do projeto e guarde a URL retornada em `siteConfig.ts`. Evite arquivos grandes dentro de `client/public/`, pois isso prejudica a entrega e a publicação.

## Cores, tipografia e layout

O arquivo `client/src/index.css` contém a identidade visual:

| Token visual | Valor de referência |
|---|---|
| Carmim | `#d73332` |
| Marfim | `#fff9f2` |
| Grafite | `#1c1b1a` |
| Eixo editorial desktop | Variáveis `--editorial-axis` e `--editorial-page-axis` |

As regras são acumulativas por histórico. Antes de editar, busque pelo seletor no arquivo inteiro e privilegie a regra mais específica mais próxima do fim do arquivo.

## Edições manuais e responsividade

O editor visual pode inserir estilos inline em `Home.tsx` e `CV.tsx`. Esses valores são intencionais e devem ser preservados. Caso haja repetição inválida, como duas propriedades `color` ou `width` no mesmo `style`, mantenha **somente a última escolha aplicada pelo usuário**.

Para não afetar a experiência mobile, use uma regra específica dentro de `@media (max-width: 900px)` com seletor `[style]` quando for necessário neutralizar uma medida de desktop. Nunca apague o valor manual da versão desktop apenas para resolver uma visualização mobile.

## SEO por página

Cada rota pública precisa de uma entrada em `shared/portfolioSeo.ts` com `title`, `description`, `canonicalPath` e imagem social quando aplicável. O título é o mesmo para desktop, mobile, compartilhamentos e buscadores porque é definido por URL no servidor e sincronizado no navegador.

Após incluir ou remover rota, execute os testes e verifique o HTML da página publicada ou localmente.


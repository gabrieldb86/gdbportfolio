# Arquitetura do portfólio

## Visão técnica

O portfólio é uma aplicação **React 19 + TypeScript** renderizada pelo **Vite** e servida por **Express**. A aplicação utiliza SSR para que títulos, descrições, conteúdo inicial e metadados sociais estejam disponíveis no HTML entregue a mecanismos de busca e prévias de compartilhamento.

```text
Navegador
  ├─ React + Wouter: navegação e interações
  └─ client/src/components/Head.tsx: atualiza metadados após navegação interna

Servidor Express
  ├─ server/_core/index.ts: inicialização da aplicação
  ├─ server/_core/vite.ts: desenvolvimento, assets, SSR e cabeçalhos HTTP
  └─ client/src/entry-server.tsx: HTML da rota + metadados da rota

Metadados compartilhados
  └─ shared/portfolioSeo.ts: title, description, canonical, OG e noindex
```

## Diretórios principais

| Caminho | Responsabilidade |
|---|---|
| `client/src/pages/` | Páginas públicas: Home, CV, CaseStudy, Privacy, 404 e área interna de edição. |
| `client/src/data/siteConfig.ts` | Dados reutilizáveis: links, imagens, projetos, métricas e textos configuráveis. |
| `client/src/index.css` | Sistema visual editorial, responsividade e regras de acessibilidade. |
| `client/src/App.tsx` | Registro das rotas e componentes globais. |
| `client/src/entry-client.tsx` | Hidratação da interface no navegador. |
| `client/src/entry-server.tsx` | Renderização HTML por rota no servidor. |
| `shared/portfolioSeo.ts` | Fonte única para meta title, description, canonical e Open Graph. |
| `server/_core/vite.ts` | Composição do HTML SSR e entrega do aplicativo. |
| `server/*.test.ts` e `shared/*.test.ts` | Testes de privacidade, SEO, SSR e regras públicas. |
| `docs/` | Guias ativos de continuidade. |

## Rotas

| URL | Página | Indexação |
|---|---|---|
| `/` | Página principal | Pública e indexável |
| `/cv` | Currículo | Pública e indexável |
| `/privacidade` | Aviso de privacidade | Pública e indexável |
| `/cases/:slug` | Estudos de caso | Pública e indexável quando o slug existe em `portfolioSeo.ts` |
| `/editor` | Editor protegido | Privada, com `noindex` |
| Qualquer rota inexistente | Página 404 | Não indexável |

Os slugs publicados hoje estão registrados em `shared/portfolioSeo.ts`. Ao criar um novo case, registre a rota em **dois lugares**: no conteúdo/projeto correspondente e nesse arquivo de SEO.

## Fonte de verdade por tema

| Tema | Fonte principal | Observação |
|---|---|---|
| Textos reutilizáveis, links e projetos | `client/src/data/siteConfig.ts` | Preferir esta camada antes de criar valores duplicados em páginas. |
| Hero, composição editorial e formulário | `client/src/pages/Home.tsx` | Contém algumas medidas manuais preservadas pelo editor visual. |
| Conteúdo profissional detalhado | `client/src/pages/CV.tsx` | Revisar datas, números e textos com cuidado. |
| Cases | `client/src/pages/CaseStudy.tsx` e `siteConfig.ts` | Cada case precisa de rota e metadados próprios. |
| Títulos e descrições de busca | `shared/portfolioSeo.ts` | Não criar meta tags isoladas nas páginas. |
| Layout, cores e breakpoints | `client/src/index.css` | Consultar primeiro as regras de mobile no fim do arquivo. |

## Assets e dados sensíveis

As imagens públicas são referenciadas por URLs de armazenamento (`/manus-storage/...`) ou URLs remotas autorizadas. Não copie imagens grandes para `client/public/` nem para `client/src/assets/`.

O telefone não deve aparecer como texto público. Para contato, usar links de WhatsApp, LinkedIn ou e-mail já configurados. Credenciais e variáveis de ambiente não devem ser incluídas no Git.


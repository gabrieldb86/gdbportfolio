# Portfólio de Gabriel Danino Basilio

Portfólio profissional de **Gabriel Danino Basilio**, voltado a oportunidades de coordenação em Conteúdo, Treinamento, Trade Marketing, Performance de Campo e T&D.

O projeto foi organizado para que qualquer pessoa, profissional de desenvolvimento ou ferramenta de IA consiga entendê-lo e mantê-lo sem depender de um fornecedor específico.

## Comece por aqui

| Para | Leia |
|---|---|
| Entender a arquitetura e as rotas | [`docs/architecture/OVERVIEW.md`](docs/architecture/OVERVIEW.md) |
| Alterar textos, imagens, cores ou espaçamentos | [`docs/guides/CONTENT_AND_VISUAL_EDITS.md`](docs/guides/CONTENT_AND_VISUAL_EDITS.md) |
| Dar continuidade com outra IA ou profissional | [`docs/AI_HANDOFF.md`](docs/AI_HANDOFF.md) |
| Instalar, testar, publicar e usar GitHub | [`docs/guides/OPERATIONS_AND_GITHUB.md`](docs/guides/OPERATIONS_AND_GITHUB.md) |
| Navegar por toda a documentação | [`docs/README.md`](docs/README.md) |

## Comandos principais

```bash
pnpm install
pnpm dev
pnpm test
pnpm run check
pnpm build
```

O projeto usa **React 19**, **TypeScript**, **Vite**, **Express**, **Wouter** e renderização no servidor (SSR) para SEO. As alterações de conteúdo e de interface devem ser feitas com atenção especial às regras de responsividade descritas na documentação.

## Estrutura resumida

```text
client/       Interface React, páginas, estilos e dados públicos
server/       Servidor Express, SSR e integrações de infraestrutura
shared/       Metadados SEO e tipos compartilhados
docs/         Documentação atual e guias de continuidade
docs/history/ Registros e relatórios históricos de decisões anteriores
drizzle/      Esquema e migrações de banco de dados
```

> **Não há necessidade de manter este projeto apenas nesta plataforma.** O repositório contém o código-fonte, a documentação e os comandos necessários para que ele seja aberto e evoluído em outro ambiente Node.js compatível.


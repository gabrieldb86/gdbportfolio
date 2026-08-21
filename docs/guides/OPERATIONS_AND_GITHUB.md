# Operação, testes, publicação e GitHub

## Requisitos locais

- Node.js 22 ou versão compatível.
- `pnpm`, respeitando a versão definida em `package.json`.
- Variáveis de ambiente fornecidas pelo ambiente de hospedagem. Nunca registrar valores secretos no Git.

## Comandos

| Comando | Uso |
|---|---|
| `pnpm install` | Instala dependências. |
| `pnpm dev` | Inicia o servidor de desenvolvimento com SSR. |
| `pnpm test` | Executa testes unitários e de regras públicas. |
| `pnpm run check` | Executa a checagem TypeScript. |
| `pnpm build` | Gera os bundles de cliente, SSR e servidor. |
| `pnpm start` | Inicia o build de produção. |

## Checklist antes de publicar

```bash
pnpm test
pnpm run check
pnpm build
```

Também conferir a Home em desktop e mobile, os links de WhatsApp, a rota `/cv`, uma rota de case e o conteúdo do HTML SSR quando a alteração envolver SEO.

## GitHub

O repositório de referência é [`gabrieldb86/gabriel-portfolio`](https://github.com/gabrieldb86/gabriel-portfolio), branch `main`.

O fluxo adotado é: concluir uma mudança coerente, validar, criar um checkpoint/commit descritivo e sincronizar com a branch `main`. Para experimentos maiores, criar uma branch antes de alterar o visual ou a arquitetura.

Exemplo de fluxo em um ambiente Git comum:

```bash
git checkout -b ajuste-descricao-case
# editar arquivos
pnpm test && pnpm run check && pnpm build
git add .
git commit -m "Ajusta descrição do case Ragtech"
git push -u origin ajuste-descricao-case
```

## Variáveis de ambiente importantes

| Variável | Finalidade |
|---|---|
| `CANONICAL_ORIGIN` | Domínio usado em canonical, Open Graph e URLs absolutas. |
| `SITE_NAME` | Nome exibido em metadados sociais. |
| `DATABASE_URL` | Conexão com o banco, quando recursos de usuário forem usados. |
| `JWT_SECRET` | Assinatura de sessão; segredo obrigatório em produção. |

Não copie valores reais dessas variáveis para documentação, commits, issues ou mensagens públicas.


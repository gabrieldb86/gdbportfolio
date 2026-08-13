# Guia de Edição Manual — Portfólio Gabriel Danino Basilio

Este documento orienta de forma simples e direta como realizar ajustes manuais no portfólio sem complicação, centralizando textos, imagens, cores e espaçamentos.

---

## 1. Onde alterar textos, títulos, subtítulos e métricas

Todo o conteúdo textual principal, métricas e dados de projetos ficam centralizados em:
`client/src/data/siteConfig.ts`

- **Hero e Cabeçalho:** Edite o objeto `hero` em `siteConfig.ts` para alterar eyebrow, headline, cargo e descrição.
- **Métricas principais:** Os números (`17+ anos`, `114K+ pessoas`, `130+ promotores`) estão sincronizados em `siteConfig.serviceDetails` e nas páginas `Home.tsx` e `CV.tsx`.
- **Focos de coordenação e realizações:** As três colunas da Home e suas microlistas estão configuradas em `siteConfig.services` e nos componentes correspondentes.
- **Projetos da grade (Work):** A lista de projetos exibida na página principal fica no array `projects` em `siteConfig.ts`. Você pode alterar título, categoria, ano, link e imagem de cada projeto diretamente ali.

---

## 2. Onde alterar imagens e avatares

Todas as imagens oficiais são referenciadas via URLs permanentes de armazenamento em `siteConfig.ts`:
- **Foto de perfil principal / Sidebar:** `profilePhoto` e `railImage`
- **Imagem de treinamento:** `trainingImage`
- **Imagem de destaque dos Focos:** `coordinationFeature.image`
- **Imagens dos projetos:** Campo `image` em cada item do array `projects`.

Para adicionar uma nova imagem, envie o arquivo usando a ferramenta de upload e utilize o link permanente retornado (`/manus-storage/...`) no campo correspondente em `siteConfig.ts`.

---

## 3. Cores, paleta e espaçamentos globais

O portfólio adota uma identidade editorial rigorosa baseada em três cores principais:
- **Carmim Red (`#d73332`):** Cor de destaque e faixas de prova social.
- **Ivory (`#f4eee6`):** Tom de fundo e claro para leitura.
- **Graphite / Preto Editorial (`#1b1a19` / `#1c1b1a`):** Fundo escuro do Hero e textos principais.

Para ajustar cores globais ou espaçamentos gerais, edite as variáveis CSS em:
`client/src/index.css`

---

## 4. Como atualizar e publicar alterações

Após realizar qualquer alteração manual nos arquivos de código ou configuração:
1. O servidor de desenvolvimento local atualiza a prévia instantaneamente.
2. Para salvar uma nova versão e atualizar a publicação em produção, utilize o comando de checkpoint ou salve a alteração no projeto.

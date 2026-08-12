# Guia de Contexto para Integração de IAs — gabriel-portfolio

Este documento foi criado para fornecer a agentes de IA, assistentes de código e LLMs externos o contexto completo, a arquitetura e as diretrizes operacionais do portfólio profissional de **Gabriel Danino Basilio**. Use este arquivo sempre que for solicitado a alterar código, adicionar seções ou otimizar o projeto.

---

## 1. Visão Geral do Projeto

O site é um portfólio profissional de alto padrão voltado a recrutadores, gestores e headhunters para vagas de **coordenação** em três verticais:
1. **Conteúdo & Treinamento**
2. **Trade Marketing & Performance de Campo**
3. **Treinamento & Desenvolvimento de Pessoas (T&D)**

O perfil profissional é sustentado por **17 anos de experiência**, mais de **300 mil pessoas capacitadas**, monitoramento de mais de **130 promotores** e média de avaliação de **8,3**.

### Pilares Tecnológicos
- **Stack**: React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Wouter (roteamento client-side) e Vite 7.
- **Ambiente de Hospedagem**: Projeto estático (`web-static`) com publicação automática a cada checkpoint.
- **Caminho raiz**: `/home/ubuntu/gabriel-portfolio/`

---

## 2. Mapa da Estrutura de Arquivos

```text
gabriel-portfolio/
├── client/
│   ├── index.html                  # Metadados SEO, fontes (DM Serif Display + Manrope)
│   └── src/
│       ├── App.tsx                 # Configuração de rotas (Home, CV, NotFound)
│       ├── index.css               # Design tokens, grade editorial, temas e transições
│       ├── main.tsx                # Ponto de entrada React
│       ├── data/
│       │   └── siteConfig.ts       # Configuração central (textos, links, projetos, serviços)
│       └── pages/
│           ├── Home.tsx            # Página inicial (hero, focos, prova social, cases, sobre, contato)
│           ├── CV.tsx              # Página de currículo completo e qualificações
│           ├── Editor.tsx          # Painel interno de personalização local (não linkado no rodapé público)
│           └── NotFound.tsx        # Página 404
├── todo.md                         # Checklist de evolução do projeto
├── verification-notes.md           # Histórico de validações visuais e de build
└── AI_INTEGRATION_GUIDE.md         # Este guia de contexto para agentes de IA
```

---

## 3. Diretrizes de Identidade Visual e Design

Para preservar a assinatura autoral do portfólio (inspirada em referências editoriais minimalistas como `cjcawley.com` e `enricodeiana.design`), **qualquer alteração deve seguir rigorosamente estas regras**:

### Paleta de Cores e Tipografia
- **Fundo principal**: Marfim / Ivory (`#f4eee6`) nas seções claras e grafite profundo (`#1b1a19` / `#181817`) na primeira dobra e seções institucionais.
- **Cor de destaque**: Vermelho Carmim (`#d73332` / `#cf7b73`).
- **Tipografia**: 
  - Títulos e destaques em itálico: **DM Serif Display** (serifada elegante).
  - Textos corridos, menus e metadados: **Manrope** (sans-serif geométrica limpa).

### Regras de Composição Editorial
1. **Assimetria e Ritmo**: Evite layouts centralizados tradicionais (“AI slop”). Prefira composições com colunas estruturadas por índices numéricos (`01`, `02`, `03`...).
2. **Imagens e Capas**: As imagens oficiais e fundos arquitetônicos carregam de `/manus-storage/`. Os cases internos de treinamento e L&D (`07`, `08`, `09`) usam capas CSS dedicadas (`.internal-project-cover`). **NUNCA** substitua fotos reais por placeholders genéricos de IA ou imagens de bancos desconhecidos.
3. **Transições Editoriais**: O projeto utiliza revelações progressivas suaves baseadas em `IntersectionObserver` (`[data-reveal]`), operando estritamente com `opacity` e `transform`. **Sempre** respeite a regra de acessibilidade `@media (prefers-reduced-motion: reduce)`.
4. **Posicionamento Corporativo**: O tom de voz é executivo, direto e focado em coordenação e resultados. **NUNCA** utilize termos de "designer freelancer", "estúdio criativo" ou links para ferramentas internas em áreas públicas.

---

## 4. Instruções Operacionais para Novas Tarefas

Quando outra IA for acionada para realizar melhorias ou adições no projeto, siga estas etapas obrigatórias:

1. **Consulta prévia**: Leia `client/src/data/siteConfig.ts` e `client/src/pages/Home.tsx` ou `CV.tsx` antes de modificar qualquer componente.
2. **Preservação de links**: O WhatsApp oficial é estritamente `5511945747353`. O LinkedIn e o Instagram devem apontar para os perfis oficiais de Gabriel (`gabrieldb86` / `gabrieldb1986`).
3. **Validação técnica obrigatória**: Após qualquer alteração de código, execute os comandos de verificação:
   ```bash
   cd /home/ubuntu/gabriel-portfolio
   pnpm check
   pnpm build
   ```
4. **Registro de alterações**: Anote os testes e validações visuais no arquivo `verification-notes.md`.

---
*Documento gerado em agosto de 2026 para governança técnica e colaboração entre assistentes de IA no ecossistema Manus.*

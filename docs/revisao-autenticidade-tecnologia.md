# Revisão de autenticidade editorial e evolução tecnológica

## Direção adotada

O portfólio deve parecer um **arquivo profissional de autoria de Gabriel**, não uma landing page genérica ou uma demonstração de ferramentas. A revisão preserva o sistema editorial já aprovado — tipografia, contraste, eixo esquerdo, retratos e provas profissionais — e elimina sinais que desviavam a leitura para fórmulas promocionais ou componentes de demonstração.

Foram removidos da base os componentes não utilizados de chat com IA, diálogo de plataforma e vitrine de componentes. Na experiência pública, foram substituídos slogans como “Números que comprovam a experiência”, “Feito com intenção” e “O que precisa ganhar forma?” por formulações factuais, ligadas ao trabalho e à disponibilidade profissional. As entradas de conteúdo agora são mais curtas e discretas, sem a rotação ornamental do retrato.

> A assinatura visual inserida pela infraestrutura de hospedagem, quando exibida fora do conteúdo do projeto, não pertence ao código-fonte do portfólio. Alterações nesse elemento exigem solicitação ao suporte da plataforma em [help.manus.im](https://help.manus.im).

## Tecnologias recomendadas

| Prioridade | Tecnologia | Aplicação no portfólio | Impacto | Pré-requisito |
|---|---|---|---|---|
| 1 | Lighthouse CI | Bloquear regressões de performance, acessibilidade e SEO a cada mudança de código. | Alto | Conectar o repositório ao GitHub e habilitar uma ação de CI. |
| 2 | GA4 + Search Console | Medir origens, páginas de entrada, conversões de contato e consultas orgânicas após consentimento. | Alto | Criar a propriedade GA4 e fornecer o ID `G-XXXXXXXXXX`. |
| 3 | `web-vitals` | Medir LCP, INP, CLS, FCP e TTFB de visitantes reais, de forma leve e adiada. | Médio/alto | Definir o destino consentido dos dados — preferencialmente GA4 já ativado. |
| 4 | Sentry | Detectar erros JavaScript, falhas de hidratação e lentidão no ambiente publicado. | Médio | Criar projeto Sentry e fornecer um DSN público. |
| 5 | Playwright | Executar testes visuais e de navegação para Home, CV, cases e contato em mobile e desktop. | Médio | Repositório com CI; não é necessário para o visitante. |
| 6 | Dependabot + `pnpm audit` | Acompanhar atualizações de segurança em dependências do projeto. | Médio | Repositório GitHub. |
| 7 | CSP com report-only | Mapear e endurecer a política de segurança de conteúdo sem interromper fontes, imagens ou recursos da plataforma. | Médio | Monitorar relatórios antes de ativar modo de bloqueio. |
| 8 | CMS headless | Centralizar cases e imagens se as atualizações passarem a ser frequentes. | Condicional | Só vale adotar se o portfólio tiver manutenção editorial recorrente. |

## Decisão de escopo

Não é recomendado adicionar chatbot, geração de conteúdo, recomendações automáticas, feed social, carrosséis, painéis públicos ou outras funções “de IA” ao portfólio. Elas aumentariam o peso, a manutenção e a aparência de produto genérico sem ajudar um recrutador a entender a trajetória de Gabriel.

O projeto já conta com renderização inicial por rota, metadados específicos, Open Graph, canonical, `robots`, `sitemap`, cache, compressão e uma camada GA4 pronta, mas inativa enquanto não houver identificador e consentimento. Portanto, as tecnologias de maior retorno são as que **medem, previnem regressões e preservam estabilidade**, não as que adicionam mais interface.

## Referências

[1] [GoogleChrome/web-vitals — métricas reais de LCP, INP, CLS, FCP e TTFB](https://github.com/GoogleChrome/web-vitals)

[2] [Sentry — monitoramento de erros e desempenho para React](https://sentry.io/for/react/)

[3] [Google Lighthouse CI — auditorias e budgets automatizados](https://github.com/GoogleChrome/lighthouse-ci)

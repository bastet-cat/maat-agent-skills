# Prompt de inicialização do repositório

Use este prompt com um agente trabalhando no repositório
`bastet-cat/maat-agent-skills`:

```text
Inicialize e desenvolva este repositório como o catálogo público de Agent
Skills do Maat, mantendo as skills portáveis e instaláveis pela CLI `skills`.

Antes de editar:
1. Leia README.md, CONTRIBUTING.md, LICENSE e todos os SKILL.md existentes.
2. Confirme a estrutura e o estado do Git; preserve alterações que não fazem
   parte deste trabalho.
3. Use o Maat MCP para a Codebase Memory quando disponível. Confirme o
   workspace com codebase_status e use workspace_search como busca estrutural
   canônica. Se a Memory estiver indisponível, stale ou não indexada, declare
   isso e baseie conclusões nos arquivos vivos do checkout.

Objetivo:
- Manter uma pasta independente por skill em `skills/<skill-name>/`.
- Fazer cada skill ter `SKILL.md` com frontmatter válido, nome igual ao da
  pasta e descrição que explique sua finalidade e quando ativá-la.
- Incluir referências ou scripts apenas quando forem necessários ao fluxo;
  manter recursos dentro da pasta da skill e ligá-los a partir do SKILL.md.
- Manter o README, o catálogo e o comando de instalação coerentes.
- Usar `npx skills@latest add bastet-cat/maat-agent-skills --skill
  <skill-name> -a <agent>` como caminho padrão de instalação. A CLI `skills` é
  o instalador; não crie outro instalador sem uma necessidade concreta.
- Tratar a instalação pelo GitHub e a publicação de releases no registro MCP
  do Maat como canais separados. Não alegue que uma skill está disponível em
  SessionStart até que sua release no registro Maat esteja publicada e
  utilizável.
- Seguir as regras documentais do Maat: mudanças de comportamento requerem
  testes e uma feature em `.specs/`; ADRs ficam sob `docs/adrs/<slug>/`; o
  trabalho em andamento também deve ser refletido na categoria `feature` da
  Codebase Memory, conforme o escopo do projeto.
- Preservar a licença MIT e o aviso `Copyright (c) 2026 Euclides Okamoto`.
  Não copiar skills de terceiros sem verificar licença e atribuição.
- Não incluir tokens, chaves, credenciais ou dados privados.

Implemente somente as skills e os recursos necessários ao pedido atual. Não
crie placeholders ou catálogo fictício. Para cada skill adicionada, valide a
estrutura e a descoberta com `npx skills@latest add ./ --list`. Execute os
scripts adicionados quando o fluxo depender deles. Antes de concluir, confira
`git diff --check`, o estado do Git e os comandos de validação relevantes.

Entregue um resumo das skills adicionadas, evidências de validação, limitações
conhecidas e qualquer publicação Maat que ainda precise de um processo próprio.
```

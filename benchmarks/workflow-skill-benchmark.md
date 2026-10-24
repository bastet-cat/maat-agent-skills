# Benchmark qualitativo dos fluxos de skills

- **Data:** 2026-10-24
- **Escopo:** fluxo de produto e implementação descrito pelas skills Maat neste checkout, Tech Leads Club (TLC) e Matt Pocock/Grill.
- **Tipo de avaliação:** estimativa qualitativa da probabilidade de interpretar corretamente o objetivo em cada etapa; não é um ensaio empírico de taxa de sucesso.

## Resumo

As três stacks cobrem o ciclo completo, mas otimizam pontos diferentes:

- **Maat** tem o melhor encaixe documental e de governança para o próprio produto: PRD, feature/bug, revisão, decisão, ADR, validação e blocker. Seu fluxo ainda depende de recursos de Maat que o catálogo local marca como propostos, em especial `prd` e `check`.
- **TLC** apresenta o contrato mais rigoroso contra lacunas de requisitos: separa descoberta, planejamento e implementação; exige critérios observáveis; e `tlc-spec-lean` fecha com verificação independente. É a referência mais forte para completude e prova por check.
- **Matt Pocock/Grill** tem a decomposição de execução mais operacional para trabalho que atravessa sessões: `to-tickets` produz fatias verticais com dependências explícitas, e `implement-spec` executa a fronteira disponível em worktrees. Traz dependência de tracker e harness e registra limitações conhecidas, como colisões e custo de code review amplo.

As porcentagens são estimativas qualitativas da interpretação do objetivo, não taxas observadas. A diferença de poucos pontos entre candidatos está dentro da incerteza e não deve ser lida como ranking empírico. O benchmark não compara tempo, custo, publicação ou sucesso operacional.

**Leitura atual:** a tabela estima somente a chance de cada composição entender e preservar o objetivo do usuário na etapa indicada. Ela não estima qualidade geral do artefato, sucesso operacional de ferramentas ou publicação. A meta interna de 99% continua aspiracional; estas notas não demonstram que ela foi atingida.

## Método de estimativa

Cada porcentagem é um julgamento estruturado baseado em quatro sinais das instruções: preservação explícita da intenção de origem, tratamento de ambiguidades, rastreabilidade entre entrada e saída, e presença de um gate que detecte desvio. Em todas as linhas, a pergunta é a mesma: **“Em uma execução típica, qual a chance de a saída desta etapa representar corretamente o objetivo dado, sem omitir um aspecto material, inventar escopo ou converter uma questão aberta em fato?”** A unidade é a etapa, não o sucesso do fluxo inteiro.

Os valores são aproximações qualitativas, não medições, e a incerteza razoável é de aproximadamente **±10 pontos percentuais** por célula. As estimativas vêm da leitura das skills e documentos locais e das fontes primárias disponíveis em 2026-10-24. Os MCPs Maat de Codebase Memory e documentos não estavam disponíveis nesta sessão; por isso, a tabela não estima a chance de publicação ou associação técnica ter sucesso. Nenhuma das três stacks foi executada sobre uma amostra idêntica. Para avaliar a meta de 99%, use a seção [Como transformar este benchmark em medição empírica](#como-transformar-este-benchmark-em-medição-empírica) sobre as versões revisadas.

## Comparação por etapa

| Etapa | Maat | TLC | Matt Pocock/Grill | Sinal que sustenta a estimativa |
| --- | ---: | ---: | ---: | --- |
| Descobrir o problema e a intenção | 95% | **97%** | 94% | `to-prd` recupera situação, usuário, workaround, outcome e alternativas; TLC Discover insiste na ordem situação→problema→veredito e evita convergir cedo; Grill esclarece termos e decisões, com foco mais forte em mudanças iniciadas dentro de um repositório. |
| Formalizar intenção em PRD/design/spec | **95%** | 94% | **95%** | Maat liga requisitos à origem e faz cobertura final; TLC transforma descoberta em design vertical e registra decisões/fluxos; Matt `to-spec` sintetiza decisões já tomadas. TLC e Matt produzem artefatos diferentes de um PRD de produto, então a comparação é aproximada. |
| Refinar a intenção contra o código e as restrições | 95% | **96%** | 92% | `to-tech-plan` exige evidência por superfície e separa inferência de requisito; `tlc-plan` fundamenta critérios no código e marca lacunas como abertas; o fluxo Matt consulta código/docs, mas seu refinamento e a decomposição em tickets são etapas distintas. |
| Decompor em features/tarefas e checks sem mudar o objetivo | 96% | **97%** | 95% | `to-plan` rastreia requisito→feature/bug→critério→check; TLC Plan recusa critérios inventados e separa slices antes de decidir quantas tarefas; `to-tickets` cria tickets verticais e dependências. Os pontos de Maat sobre recibos/integrações afetam operação, excluída desta estimativa. |
| Verificar que o plano representa a intenção de origem | 96% | **97%** | 93% | `validate-plan` reconstrói a cadeia da fonte à evidência e identifica omissões; TLC exige critérios observáveis e devolve lacunas ao usuário; o fluxo Matt inclui aprovação de spec/tamanho e revisão, mas não usa o mesmo validador independente por requisito. |
| Executar sem desviar do objetivo aprovado | 92% | **96%** | 94% | Maat vincula implementação à proposta aprovada e aos checks; TLC congela obrigações e usa checks como contrato de execução; Matt executa tickets em grafo ligados à spec. A nota mede preservação de intenção, não velocidade nem qualidade do código. |
| Julgar corretamente se o objetivo foi satisfeito | 97% | **98%** | 92% | Maat requer verificador independente e evidência por check; TLC exige verificador independente que preste contas de cada check; Matt usa implementação/revisão, mas a documentação consultada não impõe o mesmo veredito independente contra cada obrigação da spec. |

## Evidências principais

### Maat

O pacote atual separa criação do PRD (`to-prd`), refinamento técnico (`to-tech-plan`), decomposição em feature/bug (`to-plan`), prontidão (`validate-plan`) e execução (`to-implement`). As skills exigem evidência de projeto/documento, preservam a revisão e decisão humanas e evitam inventar operações de escrita. `to-plan` mapeia checks a critérios de aceite e interrompe a criação se não existir operação confirmada para registrar e associar checks.

O catálogo local informa que `prd` é proposto e não implementado; `check` também é proposto, enquanto `validation` é implementado. O documento de fluxos ressalta que os tipos reconhecidos não garantem todas as interações descritas e que revisão de produto é diferente de code review. Portanto, a maior vantagem de desenho do Maat ainda não se traduz em ponta a ponta enquanto essas integrações não forem confirmadas.

### Tech Leads Club

`tlc-discover` mantém tecnologia fora da fase de problema até haver veredito e trata incerteza de alto impacto como uma decisão aberta. `tlc-plan` trabalha a partir de uma decisão existente, fundamenta tarefas no código e pede critérios observáveis sem preencher lacunas de produto por inferência. `tlc-spec-lean` encadeia plano humano-revisado, checks baseados em prova, implementação e verificador independente. A composição tem forte disciplina de requisitos, embora não ofereça o modelo documental Maat nem o mesmo foco em rastreabilidade de produto.

### Matt Pocock/Grill

`grill-with-docs` conduz a entrevista dentro do repositório e registra termos e decisões à medida que são acordados. `to-spec` sintetiza decisões existentes e declara seams/testes antes de publicar a spec. `to-tickets` cria slices verticais, dependências e pede aprovação do tamanho/ordem antes de publicar. `implement-spec` paraleliza os tickets livres em worktrees e faz code review ao final. O conjunto é mais forte quando o trabalho é grande e atravessa contextos; exige configuração de tracker e suporte a execução de subagentes/worktrees. A documentação relata riscos concretos: colisões entre tickets paralelos, over-decomposition, checks que já passam na base e loops de review demorados.

## Pontos fortes por stack

| Stack | Melhor uso | Limite principal |
| --- | --- | --- |
| Maat | Trabalho governado por documentos do Maat, com revisão/decisão humana e rastreabilidade de PRD a validação. | Integrações PRD/check ainda propostas no catálogo; é necessário confirmar operações vivas antes de prometer publicação completa. |
| TLC | Descoberta difícil, proteção contra requisitos inventados, critérios observáveis e verificação independente. | Fluxo genérico de artefatos; pouca integração com tipos de documento e relações específicos do Maat. |
| Matt Pocock/Grill | Alinhamento de domínio e execução em várias sessões/tickets com dependências e paralelismo. | Mais dependente de tracker/configuração/harness; tickets paralelos e code review final podem aumentar coordenação e retrabalho. |

## Recomendação para a stack Maat

Manter a sequência com fronteiras explícitas:

```text
to-prd → to-tech-plan → revisão humana → to-plan → checks Maat → validate-plan
       → decisão humana → to-implement → validações Maat
```

1. Usar o rigor de descoberta do TLC quando a necessidade ou o resultado ainda estão em aberto; registrar a decisão de produto no PRD Maat.
2. Usar `to-tech-plan` apenas para impactos técnicos e lacunas do PRD; deixar a criação de features/bugs para `to-plan`, evitando duplicar responsabilidade.
3. Preservar o mapeamento requisito→feature/bug→check em todos os passos. Resolver a capacidade nativa de check e suas relações antes de declarar a automação completa.
4. Usar slices verticais e dependências do Matt/TLC quando o escopo realmente atravessar sessões ou tiver paralelismo. Para uma mudança pequena, manter uma unidade executável sem gerar tickets desnecessários.
5. Confirmar no Maat as relações e campos nativos que ligam check, validação, proposta e revisão implementada. As skills agora exigem esses vínculos e uma verificação independente, mas a conclusão ponta a ponta continua condicionada à disponibilidade dessas operações no cliente.

## Como transformar este benchmark em medição empírica

Para um piloto exploratório, executar as três composições sobre pelo menos seis solicitações anonimizadas: ideia ambígua, PRD multi-feature, bug reproduzível, bug de causa incerta, mudança transversal com dependências e feature simples de uma sessão. Preservar as mesmas fontes, snapshots de código, configuração do modelo e ferramentas disponíveis, mas respeitar os destinos próprios de cada stack. Congelar e registrar os releases das skills e a rubrica usada. Avaliar os artefatos sem identificar a stack para os revisores.

Use como resultado primário uma classificação binária por caso e etapa: **interpretação correta** quando não há omissão material, distorção do objetivo, escopo inventado ou decisão incerta apresentada como fato; caso contrário, **incorreta**. Dois revisores independentes aplicam essa regra sem conhecer a stack e resolvem divergências com evidência. Reporte taxa, denominador e intervalo de confiança por etapa. Use esta rubrica secundária 0–2 para explicar falhas (ausente, parcial, correto/completo):

- cobertura da intenção e dos requisitos de origem;
- fidelidade factual e rastreabilidade para fonte/código;
- critérios de aceite e checks observáveis, incluindo erro/regressão;
- escopo e dependências executáveis sem sobre-decomposição;
- decisões incertas corretamente devolvidas ao humano;
- evidência de implementação/validação e vínculos documentais corretos.

Além do score, contar requisitos omitidos, inferências apresentadas como fatos, checks sem critério que testem, retrabalho solicitado por revisores, tempo até aprovação e falhas de publicação/integração. Usar avaliadores independentes e desempatar com evidência. Seis casos permitem apenas encontrar problemas grosseiros; não sustentam uma alegação de 99%. Para sustentar pelo menos 99% de acerto por etapa com limite inferior unilateral de 95% de confiança e zero falhas, seriam necessários cerca de 299 casos independentes por etapa, avaliados às cegas com rubrica fixa. Com falhas, calcular o intervalo binomial apropriado e ampliar a amostra. Até executar esse estudo, todas as notas desta página são estimativas do desenho das instruções, não eficácia medida. Os casos precisam ser independentes e representar o uso esperado; essa hipótese também deve ser reportada.

## Fontes

- Fontes locais Maat: `skills/to-prd/SKILL.md`, `skills/to-tech-plan/SKILL.md`, `skills/to-plan/SKILL.md`, `skills/validate-plan/SKILL.md`, `skills/to-implement/SKILL.md` neste checkout; catálogo e levantamento documental em `/home/euclides.okamoto/orca/workspaces/maat/cetacean/docs/maat-docs.md` e `/home/euclides.okamoto/orca/workspaces/maat/cetacean/docs/skill-stack-workflows.md`.
- TLC: [TLC Discover](https://agent-skills.techleads.club/skills/tlc-discover/), [TLC Plan](https://agent-skills.techleads.club/skills/tlc-plan/), [TLC Spec Lean](https://agent-skills.techleads.club/skills/tlc-spec-lean/) e [TLC Implement](https://agent-skills.techleads.club/skills/tlc-implement/).
- Matt Pocock: [grill-with-docs](https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md), [to-spec](https://github.com/mattpocock/skills/blob/main/docs/engineering/to-spec.md), [to-tickets](https://github.com/mattpocock/skills/blob/main/docs/engineering/to-tickets.md), [implement](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement/SKILL.md) e [implement-spec](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement-spec/SKILL.md).

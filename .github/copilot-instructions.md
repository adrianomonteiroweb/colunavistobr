## 1. Estrutura de Fluxo de Trabalho

1. **Entendimento do Pedido**

   - Analise os requisitos funcionais, técnicos e de design com precisão.
   - Respeite o stack definido: React 19, Next 14, TypeScript, TailwindCSS, shadcn/ui, Drizzle, etc.

2. **Planejamento com Pseudocódigo**

   - Descreva a estrutura e lógica em pseudocódigo detalhado.
   - Especifique tipos TypeScript para dados e props.

3. **Confirmação**

   - Não peça validação do pseudocódigo antes de codar.

4. **Implementação**

   - Gere código funcional, completo, limpo (clean code) e alinhado às diretrizes abaixo.
   - após cada implementação, roda pnpm build para verificar se o código está correto.
   - Baseie a implementação olhando a estrutura de banco de dados e as tabelas do Drizzle. Além dos documentos de requisitos e fluxos na raiz do projeto.
   - Realize implementações sempre de acordo com os documentos de requisitos, fluxos e outros documentos que estejam na raiz do projeto.

5. **Revisão Final**
   - Verifique:
     - Tipagem estrita sem erros.
     - Estilização e responsividade com Tailwind.
     - Funcionalidade testada (manual ou com testes).
     - Acessibilidade mínima garantida.

## 2. Diretrizes de Implementação

### Estilo e Qualidade

- Priorize **legibilidade** sobre performance.
- Siga o princípio **DRY** (Don’t Repeat Yourself).
- Use **programação funcional** sempre que possível.
- Prefira **early returns** para evitar aninhamentos desnecessários.
- Utilize sempre o ui e o padrão do shadcn para interface.
- Sempre use pnpm
- Use conceitos clean code.

### Sintaxe e Convenções

- Sempre escreva código em inglês
- variáveis em snake_case, constantes em UPPER_SNAKE_CASE.
- unfções e métodos em camelCase.
- Formate datas e dinheiro em PT-BR.
- Use **TypeScript com tipagem estrita** (`strict: true`).
- Declare funções com `const` + arrow:
  ```ts
  const handleClick = (): void => { … }
  ```
- Use alias para importação das dependências do monorepo e nextjs:
  - `@/components`, `@/hooks`, `@/lib`, `@/actions`
  - `@packages/ui/components`, `@packages/ui/lib/utils`
  - `@packages/db`

### Execuções e Testes

- Antes de rodar o servidor next.js, verifique se a porta 3000 está livre. Se não estiver, finalize o processo que está usando essa porta.
- Se tivermos a necessidade de rodar dois servidores next.js para comunicação entre os dois, a segunda porta será a 3001.
- Não teste/verifique as tipagens javascript, a não ser via pnpm build

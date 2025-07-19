# Agendei - Estrutura de Banco de Dados e Actions

## 📁 Estrutura do Projeto

### Packages

- **`@agendei/db`**: Contém schema, repositórios e tipos do banco de dados
- **`@agendei/auth`**: Sistema de autenticação
- **`@agendei/ui`**: Componentes de interface
- **`@agendei/validation`**: Validações e schemas

### Apps

- **`apps/web`**: Aplicação Next.js principal

## 🗄️ Database Package (`@agendei/db`)

### Schema (`schema.ts`)

- **users**: Tabela principal de usuários com campos:
  - `id`: UUID único
  - `email`: Email único e obrigatório
  - `username`: Nome de usuário único (opcional)
  - `name`, `last_name`: Nome completo
  - `document_number`: Número de documento
  - `password`: Senha criptografada
  - `role`: Papel do usuário (user, health_professional, patient, admin)
  - `is_healthcare_professional`: Flag booleana
  - `payload`: Dados flexíveis em JSON
  - `metadata`: Metadados do sistema
  - `created_at`, `updated_at`: Timestamps automáticos

### Types (`types.ts`)

Tipos TypeScript bem definidos:

- `User`, `NewUser`, `UserUpdate`
- `UserRole`, `UserPayload`, `UserMetadata`
- `GetUserParams`, `CreateUserData`, `UpdateUserData`
- `ApiResponse<T>`, `PaginatedResponse<T>`

### Repositories

#### BaseRepository (`BaseRepository.ts`)

Classe base com métodos comuns:

- `findById()`, `findAll()`, `findOne()`
- `create()`, `update()`, `bulkCreate()`, `bulkUpdate()`
- `count()`, `deleteById()`, `destroy()`
- `findOrCreate()`, `updateOrCreate()`
- `transaction()` para transações

#### UserRepository (`UserRepository.ts`)

Extensão específica para usuários:

- `getUsers()`: Busca paginada com filtros
- `findByEmail()`, `findByEmailAndRole()`
- `findByUsername()`, `findOrCreateByEmail()`
- `getAllPatientusers()`: Busca todos os pacientes

## 🎯 Actions (`apps/web/src/actions/users.ts`)

Actions server-side com naming em snake_case:

### Funções principais:

- `get_me()`: Busca usuário logado
- `get_users(params)`: Lista paginada de usuários
- `get_user(id)`: Busca usuário por ID
- `create_user(data)`: Cria novo usuário
- `update_user(id, data)`: Atualiza usuário existente
- `remove_user(id)`: Remove usuário
- `sign_up_user(data)`: Registro de novos usuários
- `find_user_by_email(email)`: Busca por email
- `get_all_patient_users()`: Lista todos os pacientes

### Melhorias implementadas:

- **Tipagem estrita** com TypeScript
- **Tratamento de erros** robusto
- **Validação de dados** antes de salvar
- **Hash de senhas** automático
- **Merge inteligente** de payload
- **Geração automática** de username
- **Sanitização** de dados de entrada

## 🪝 Hooks (`apps/web/src/hooks/use-users.ts`)

Hook customizado `use_users()` para gerenciamento de estado:

### Estado:

- `users`: Array de usuários
- `current_user`: Usuário logado
- `loading`: Estado de carregamento
- `error`: Mensagens de erro
- `pagination`: Informações de paginação

### Métodos:

- `fetch_me()`: Busca usuário atual
- `fetch_users(params)`: Lista usuários com filtros
- `fetch_user_by_id(id)`: Busca usuário específico
- `create_new_user(data)`: Cria usuário
- `update_existing_user(id, data)`: Atualiza usuário
- `delete_user(id)`: Remove usuário
- `sign_up(data)`: Registro de usuário

### Características:

- **Estado otimista**: Atualiza UI imediatamente
- **Cache local**: Mantém dados em memória
- **Tratamento de erros**: Feedback visual
- **Loading states**: Estados de carregamento

## 🛠️ Utils (`apps/web/src/lib/utils.ts`)

Funções utilitárias:

- `hash_password()`: Criptografia SHA1
- `generate_username()`: Geração de username único
- `safe_json_parse()`: Parse seguro de JSON
- `safe_json_stringify()`: Stringify seguro

## 📝 Convenções de Código

### Nomenclatura:

- **Variáveis**: `snake_case`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Funções**: `snake_case`
- **Componentes**: `PascalCase`
- **Arquivos**: `kebab-case`

### Princípios:

- **Clean Code**: Código limpo e legível
- **DRY**: Don't Repeat Yourself
- **Programação Funcional**: Preferência por funções puras
- **Early Returns**: Evitar aninhamentos desnecessários
- **Tipagem Estrita**: TypeScript com `strict: true`

### Formatação:

- **Datas**: Formato PT-BR
- **Dinheiro**: Formato PT-BR
- **Código**: Sempre em inglês

## 🚀 Como Usar

### 1. Instalação

```bash
pnpm install
```

### 2. Usar Actions

```typescript
import { get_users, create_user } from "@/actions/users";

// Buscar usuários
const users = await get_users({ page: 1, page_size: 10 });

// Criar usuário
const new_user = await create_user({
  name: "João Silva",
  email: "joao@email.com",
  role: "health_professional",
});
```

### 3. Usar Hook

```typescript
import { use_users } from "@/hooks/use-users";

function UsersComponent() {
  const { users, loading, error, fetch_users, create_new_user } = use_users();

  useEffect(() => {
    fetch_users();
  }, []);

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 4. Usar Repository Diretamente

```typescript
import { UserRepository } from "@agendei/db";

// Buscar por email
const user = await UserRepository.findByEmail("email@example.com");

// Buscar com paginação
const result = await UserRepository.getUsers({
  q: "João",
  page: 1,
  page_size: 10,
  role: "health_professional",
});
```

## 🔧 Melhorias Implementadas

1. **Schema Atualizado**: Campos necessários adicionados
2. **Tipos Consistentes**: TypeScript robusto
3. **Repository Pattern**: Padrão organizado
4. **Actions Tipadas**: Server actions com tipos
5. **Hook Personalizado**: Gerenciamento de estado
6. **Utils Reutilizáveis**: Funções auxiliares
7. **Nomenclatura Consistente**: snake_case para variáveis
8. **Tratamento de Erros**: Feedback adequado
9. **Documentação**: README completo
10. **Configuração**: Aliases e paths organizados

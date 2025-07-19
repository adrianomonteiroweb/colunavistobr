# Sistema de Disponibilidades com RRules

## Visão Geral

O sistema foi refatorado para usar **RRules (Recurrence Rules)** em vez do sistema simples baseado em `weekday`, proporcionando muito mais flexibilidade para definir padrões complexos de disponibilidade e recorrência.

## Principais Mudanças

### 1. Tabela `availabilities` Refatorada

**Antes:**

```sql
availabilities:
- weekday (0-6)
- start_time
- end_time
```

**Agora:**

```sql
availabilities:
- title (VARCHAR) - Descrição da disponibilidade
- rrule (TEXT) - RRule string para recorrência
- start_time/end_time - Horários
- duration_minutes - Duração padrão dos slots
- buffer_minutes - Intervalo entre agendamentos
- effective_from/effective_until - Período de vigência
- is_active - Controle de ativação
- metadata (JSONB) - Configurações flexíveis
```

### 2. Novas Tabelas

#### `availability_exceptions`

Gerencia exceções nas disponibilidades:

- **Bloqueios**: Férias, feriados, indisponibilidades
- **Modificações**: Horários especiais em datas específicas
- **Cancelamentos**: Cancelar disponibilidade em datas específicas
- **Recorrência**: Exceções que se repetem (ex: feriados anuais)

#### `availability_slots`

Slots de tempo específicos gerados a partir das disponibilidades:

- Otimiza consultas de disponibilidade
- Cache de slots disponíveis
- Controle de status (available, booked, blocked, past)
- Integração direta com agendamentos

### 3. Agendamentos Aprimorados

A tabela `appointments` agora tem:

- `availability_slot_id` - Referência ao slot usado
- `is_exception` - Se foi modificado da série original
- `exception_type` - Tipo de modificação
- `original_start_at` - Horário original antes da modificação

## Exemplos de RRules

### Padrões Básicos

```typescript
// Segunda a Sexta
"RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR";

// Fins de semana
"RRULE:FREQ=WEEKLY;BYDAY=SA,SU";

// Apenas segundas-feiras
"RRULE:FREQ=WEEKLY;BYDAY=MO";

// Terças e quintas a cada duas semanas
"RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH";
```

### Padrões Avançados

```typescript
// Primeiro sábado do mês
"RRULE:FREQ=MONTHLY;BYDAY=1SA";

// Últimos 3 dias do mês
"RRULE:FREQ=MONTHLY;BYMONTHDAY=-3,-2,-1";

// Apenas meses de verão (Dez, Jan, Fev)
"RRULE:FREQ=WEEKLY;BYMONTH=12,1,2;BYDAY=MO,WE,FR";

// Feriado anual (7 de setembro)
"RRULE:FREQ=YEARLY;BYMONTH=9;BYMONTHDAY=7";
```

## Casos de Uso

### 1. Disponibilidade Comercial Simples

```typescript
{
  title: "Horário comercial",
  rrule: "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
  start_time: "09:00:00",
  end_time: "17:00:00",
  duration_minutes: 60,
  buffer_minutes: 15
}
```

### 2. Plantão Especializado

```typescript
{
  title: "Plantão noturno quinzenal",
  rrule: "RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH",
  start_time: "19:00:00",
  end_time: "22:00:00",
  duration_minutes: 45,
  metadata: {
    max_bookings_per_day: 4,
    special_rate: 120,
    requires_approval: true
  }
}
```

### 3. Disponibilidade Sazonal

```typescript
{
  title: "Atendimento de verão",
  rrule: "RRULE:FREQ=WEEKLY;BYMONTH=12,1,2;BYDAY=MO,WE,FR",
  effective_from: "2025-12-01",
  effective_until: "2026-02-28",
  metadata: { seasonal: true }
}
```

### 4. Exceção - Férias

```typescript
{
  exception_type: 'block',
  title: "Férias de fim de ano",
  start_at: "2025-12-20",
  end_at: "2026-01-05",
  notes: "Período de férias programadas"
}
```

### 5. Exceção - Feriado Recorrente

```typescript
{
  exception_type: 'block',
  title: "Independência do Brasil",
  rrule: "RRULE:FREQ=YEARLY;BYMONTH=9;BYMONTHDAY=7",
  is_recurring: true,
  metadata: { holiday_type: 'national' }
}
```

## Migração

A migração `0005_refactor_availabilities_rrules.sql` converte automaticamente:

1. **Backup** da tabela atual
2. **Criação** das novas estruturas
3. **Conversão** dos dados existentes:
   - `weekday: 0` → `"RRULE:FREQ=WEEKLY;BYDAY=SU"`
   - `weekday: 1` → `"RRULE:FREQ=WEEKLY;BYDAY=MO"`
   - etc.
4. **Criação** de índices para performance

## Benefícios

### ✅ Flexibilidade Extrema

- Suporte a qualquer padrão de recorrência
- Exceções e modificações pontuais
- Disponibilidades sazonais
- Feriados e bloqueios automáticos

### ✅ Performance Otimizada

- Cache de slots através da tabela `availability_slots`
- Índices específicos para consultas rápidas
- Geração prévia de disponibilidades

### ✅ Compatibilidade

- Mantém toda funcionalidade existente
- APIs podem permanecer iguais
- Migração transparente para usuários finais

### ✅ Casos de Uso Avançados

- Profissionais com múltiplos padrões de disponibilidade
- Plantões rotativos complexos
- Disponibilidades que variam por estação
- Integração com calendários externos

## Implementação Recomendada

1. **Geração de Slots**: Processo background que gera slots futuros baseado nas RRules
2. **Cache Inteligente**: Slots gerados por período (ex: próximos 3 meses)
3. **Invalidação**: Limpar cache quando disponibilidades ou exceções mudam
4. **API Transparente**: Manter compatibilidade com APIs existentes

## Próximos Passos

1. Implementar service layer para geração de slots
2. Criar endpoints para gerenciar exceções
3. Interface administrativa para RRules visuais
4. Integração com calendários externos (Google Calendar, Outlook)
5. Notificações automáticas para conflitos e exceções

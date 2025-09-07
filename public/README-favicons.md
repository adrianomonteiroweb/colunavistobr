# Favicons da Aplicação Coluna Visto BR

Este diretório contém os favicons personalizados criados para a aplicação "Coluna Visto BR".

## Arquivos de Ícones

### 1. `favicon.svg` (32x32)

- Ícone principal em formato SVG escalável
- Design completo com elementos visuais representando:
  - Documento/coluna editorial
  - Carimbo de visto aprovado
  - Elementos das cores do Brasil
  - Bandeira estilizada do Brasil

### 2. `favicon-16.svg` e `favicon-32x32.svg`

- Versões otimizadas para diferentes tamanhos
- Design simplificado para melhor visibilidade em tamanhos pequenos

### 3. `apple-touch-icon.svg` (180x180)

- Ícone otimizado para dispositivos Apple (iOS/macOS)
- Cantos arredondados conforme as diretrizes da Apple
- Design mais detalhado para telas de alta resolução

### 4. `manifest.json`

- Manifesto PWA (Progressive Web App)
- Define como a aplicação aparece quando instalada
- Configurações de tema e ícones

## Design Concept

O design dos favicons representa:

- **Documento**: Simboliza a coluna jornalística/editorial
- **Carimbo Verde**: Representa a aprovação de vistos
- **Cores Brasil**: Verde e amarelo representando o foco em vistos brasileiros
- **Texto "BR"**: Identifica claramente o foco no Brasil
- **Estilo Profissional**: Azul transmite confiança e seriedade

## Implementação

Os favicons são automaticamente carregados através do `layout.tsx` usando:

- Meta tags apropriadas
- Suporte a dispositivos Apple
- Configuração PWA
- Theme color responsivo

## Cores Utilizadas

- **Azul Principal**: #1E40AF (confiança, profissionalismo)
- **Verde Brasil**: #009C3B (aprovação, Brasil)
- **Amarelo Brasil**: #FFDF00 (destaque, otimismo)
- **Verde Aprovação**: #16A34A (sucesso, visto aprovado)
- **Cinza Texto**: #64748B (legibilidade)

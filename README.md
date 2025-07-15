# 🧠 RequAI - Sistema Inteligente para Validação de Requisitos

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

> **Sistema inteligente para validação e melhoria de requisitos de software usando IA**

## 📋 Sobre o Projeto

O **RequAI** é uma aplicação web que utiliza inteligência artificial para analisar e melhorar requisitos de software. O sistema identifica ambiguidades, termos vagos e sugere melhorias para tornar os requisitos mais claros e precisos.

### 🎯 Funcionalidades Principais

- **🔍 Análise de Ambiguidade**: Detecta termos vagos, subjetivos ou imprecisos
- **✨ Melhoria de Requisitos**: Reescreve requisitos com maior clareza e especificidade
- **📊 Interface Intuitiva**: Design moderno e responsivo com feedback em tempo real
- **📁 Exportação de Resultados**: Salva análises em formato JSON para documentação

### 🚀 Tecnologias Utilizadas

#### Frontend
- **Next.js 15.3.5** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Tailwind CSS 4.0** - Estilização moderna e responsiva
- **Shadcn/ui** - Componentes UI de alta qualidade
- **Lucide React** - Ícones modernos e consistentes
- **Axios** - Cliente HTTP para requisições

#### IA & Backend
- **Google Gemini 2.5 Flash** - Modelo de linguagem avançado
- **Next.js API Routes** - Endpoints serverless
- **Axios** - Integração com APIs externas

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### 1. Clone o repositório
```bash
git clone https://github.com/Matheussfreitas/requai.git
cd requai
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Configure as variáveis de ambiente
```bash
# Crie um arquivo .env.local na raiz do projeto
cp .env.example .env.local
```

Adicione sua chave da API do Google Gemini:
```env
GOOGLE_GEMINI_API_KEY=sua_chave_aqui
```

### 4. Execute o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

### 5. Abra no navegador
Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 🎨 Interface do Usuário

### Tela Principal
- **Entrada de Requisitos**: Textarea para inserir requisitos (um por linha)
- **Botões de Ação**: 
  - 🔍 **Analisar Ambiguidade** - Identifica problemas nos requisitos
  - ✨ **Melhorar Requisitos** - Sugere versões aprimoradas
- **Seção de Resultados**: Exibe análise da IA em tempo real
- **Exportação**: Botão para baixar resultados em JSON

### Componentes Principais
- `RequirementsInput` - Entrada de dados
- `ActionButtons` - Controles de ação
- `ResultsSection` - Exibição de resultados
- `ExportButton` - Funcionalidade de exportação
- `Header` - Branding e navegação

## 📡 API Routes

### Endpoints Disponíveis

#### `POST /api/gemini/analyze-ambiguity`
Analisa requisitos para identificar ambiguidades.

**Request:**
```json
{
  "requirements": ["Requisito 1", "Requisito 2", "..."]
}
```

**Response:**
```json
"Análise detalhada dos requisitos com identificação de termos ambíguos..."
```

#### `POST /api/gemini/improve-requirements`
Melhora requisitos removendo ambiguidades.

**Request:**
```json
{
  "requirements": ["Requisito 1", "Requisito 2", "..."]
}
```

**Response:**
```json
"Requisitos reescritos com maior clareza e precisão..."
```

## 🗂️ Estrutura do Projeto

```
requai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── gemini/
│   │   │       ├── analyze-ambiguity/
│   │   │       └── improve-requirements/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── types/
│   ├── components/
│   │   ├── ui/
│   │   ├── action-buttons.tsx
│   │   ├── export-button.tsx
│   │   ├── header.tsx
│   │   ├── requirements-input.tsx
│   │   └── results-section.tsx
│   └── lib/
│       ├── gemini/
│       ├── axios.ts
│       └── utils.ts
├── public/
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🔄 Fluxo de Funcionamento

1. **Entrada**: Usuário digita requisitos no textarea
2. **Processamento**: Requisitos são divididos por linha e enviados para a API
3. **IA**: Google Gemini analisa e processa os requisitos
4. **Resposta**: Resultado é exibido na interface em tempo real
5. **Exportação**: Usuário pode baixar a análise em formato JSON

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
# Deploy automático via GitHub integration
```

### Outras Plataformas
```bash
npm run build
npm run start
```

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

- **Matheus Freitas** - Desenvolvimento Principal
- **Gabriel Fontineli Dantas** - Colaborador
- **Jonas Rafael Silva Cavalcanti** - Colaborador

## 📞 Contato

- **GitHub**: [@Matheussfreitas](https://github.com/Matheussfreitas)
- **LinkedIn**: [Matheus Freitas](https://linkedin.com/in/matheussfreitas)

---

<div align="center">
  <p>Feito com ❤️ para melhorar a qualidade de requisitos de software</p>
  <p><strong>RequAI v0.1</strong> - Análise de ambiguidade e otimização com IA</p>
</div>

# 🗂️ CRM System

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)
![SQLite](https://img.shields.io/badge/SQLite-3-blue)
![Arquitetura](https://img.shields.io/badge/Arquitetura-MVC--Monolítica-blue)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

---

## 📝 Descrição do Projeto

Sistema de gerenciamento de clientes e contatos, desenvolvido para avaliação de competências Fullstack.

**Funcionalidades principais:**

- CRUD de clientes e contatos vinculados 
- Dashboard com gráficos de cadastro de clientes por mês
- Visualização detalhada de clientes e seus contatos
- Autenticação básica com e-mail e senha (JWT)

O projeto visa demonstrar conhecimentos em React, Node.js, Express, SQLite, além de boas práticas em MVC, Service/Repository e organização de código.

---

## 🧰 Tecnologias Utilizadas

- **Linguagem:** JavaScript (Node.js)
- **axios:** requisições HTTP
- **bcrypt:** hash de senhas
- **jsonwebtoken:** autenticação via JWT
- **Material-UI:** componentes de UI
- **Recharts:** gráficos

## 🔐 Middleware de Autenticação

- Para proteger as rotas da API e garantir que apenas usuários autenticados acessem determinados recursos, implementamos um middleware de autenticação JWT.

**Como funciona**

1. Ao fazer login, o backend retorna um token JWT que expira em 1 hora.
2. Todas as requisições a rotas protegidas devem enviar o token no cabeçalho:

```bash
Authorization: Bearer <SEU_TOKEN_AQUI>
```

## ⚙️ Funcionalidades de Aplicação

## 📁 Clientes
- CRUD completo: cadastro, edição, listagem e exclusão
- Visualização de contatos ao clicar no cliente  
- Paginação e busca filtrada sob demanda: carrega apenas os registros necessários, garantindo performance e escalabilidade
- Todos os formulários possuem validação de campos obrigatórios
  
## 🗂️ Contatos
- CRUD completo: cadastro, edição, listagem e exclusão
- Vinculação a clientes existentes
- Paginação e busca filtrada sob demanda: mantém a aplicação responsiva mesmo com grande volume de dados
- Validação de formulários: campos obrigatórios e padrões de entrada validados em tempo real
  
## 📊 Dashboard
- Gráfico de clientes cadastrados por mês
- Cores distintas para cada mês

## 💻 Executando Localmente

### 🔧 Pré-requisitos

- Git (para clonar o repositório)
- Node.js v18 ou superior
- npm v9 ou superior
- Navegador moderno (Chrome, Firefox, Edge)

### 🔨 Instalação

1. Clone o repositório:
 
```bash
git clone https://github.com/cortoppassi/crm-system.git
cd crm-system
```

2. Abra dois terminais separados:

 - No primeiro terminal, entre na pasta do backend:

```bash
cd backend
npm install
npm run migrate   # Popula DB com 50 clientes e 200 contatos
npm run dev       # Inicia backend em http://localhost:3001
```
- No segundo terminal, entre na pasta do frontend:

```bash
cd frontend
npm install
npm run dev       # Inicia frontend em http://localhost:5173
```

## 🧱 Estrutura do Projeto

```
/CRM-SYSTEM
├── backend/                       # Backend da aplicação
│   ├── src/
│   │   ├── config/                # Configurações gerais (DB, JWT, variáveis)
├   |   |── middlewares/           # Middleware de autenticação JWT
│   │   ├── controllers/           # Lógica das rotas (HTTP requests)
│   │   ├── database/              # Conexão e inicialização do DB
│   │   ├── models/                # Modelos do Sequelize
│   │   ├── repositories/          # Acesso direto ao banco e queries
│   │   ├── routes/                # Definição das rotas da API
│   │   └── services/              # Regras de negócio
│   ├── migrations/                # Migrations do banco de dados
│   ├── package.json
│   └── server.js                  # Entry point do backend
├── frontend/                      # Frontend da aplicação
│   ├── public/                    # Assets públicos (imagens, favicon)
│   ├── src/
│   │   ├── api/                   # Requisições HTTP e configuração do axios
│   │   ├── assets/                # Imagens, ícones, fontes
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── hooks/                 # Custom hooks
│   │   ├── pages/                 # Páginas da aplicação
│   │   ├── routes/                # Configuração das rotas frontend
│   │   ├── styles/                # Arquivos CSS e estilos globais
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── UserContext.jsx        # Context API para gerenciamento de estado global
│   ├── package.json
│   └── vite.config.js
└── README.md


```

## 🗄️ Estrutura e Relacionamento das Tabelas
**O sistema possui três tabelas principais: User, Client e Contact.**

| Tabela        | Descrição                              | Relacionamento                           |
|---------------|----------------------------------------|------------------------------------------|
| User          | Armazena e-mails e senhas de usuários  | Nenhum relacionamento com outras tabelas |
| Client        | Armazena informações dos clientes      | Um-para-muitos com Contact               |
| Contact       | Armazena informações de contatos       | Pertence a um único Client (clientId)    |


## 🔧 Organização das Pastas e Arquitetura

| Camada          | Função                                         |
|-----------------|------------------------------------------------|
| models/         | Representam as tabelas do banco                |
| repositories/   | Consultas e acesso direto ao banco             |
| services/       | Regras de negócio e validações                 |
| controllers/    | Manipulação de requisições HTTP                |
| middlewares/    | Autenticação intermediaria antes do controller |
| routes/         | Organização das rotas da API (Express)         |
| database/       | Configurações do Sequelize                     |

## 🏗️ Observações sobre a arquitetura

**Backend**

- Estrutura modular seguindo MVC + Service + Repository
- database/ é usado para centralizar a inicialização do Sequelize e conexão com SQLite
- config/ armazena variáveis e configuração de JWT, DB e outros

**Frontend**

- Estrutura clara separando componentes, páginas, hooks e API
- UserContext.jsx centraliza autenticação e estado global do usuário
- routes/ define navegação da aplicação

## 💡 Notas do Desenvolvedor

- Por se tratar de um projeto relativamente simples, optei por não utilizar Docker nem bancos de dados mais robustos, mantendo leve e fácil de executar localmente.

- A estilização foi feita com componentes prontos do Material UI, garantindo consistência visual e rapidez no desenvolvimento.

- Segui uma arquitetura modular baseada em MVC + Service + Repository, aplicando princípios do SOLID, o que torna o código mais manutenível e escalável.

- Escolhi bibliotecas robustas e funcionais, como React Hook Form para gerenciamento de formulários, facilitando validações e integração com UI.

- Todas as decisões foram guiadas pelo equilíbrio entre simplicidade, performance e boas práticas, priorizando clareza e qualidade do código.

## 📄 Licença
Este projeto está licenciado sob a MIT License.


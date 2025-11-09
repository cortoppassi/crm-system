# 🗂️ CRM System

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)
![SQLite](https://img.shields.io/badge/SQLite-3-blue)
![Arquitetura](https://img.shields.io/badge/Arquitetura-MVC--Monolítica-blue)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

---

## 📝 Descrição

Sistema de gerenciamento de clientes e contatos com dashboard de métricas.  

Permite cadastrar, editar e remover clientes, visualizar contatos vinculados, e acompanhar a quantidade de clientes cadastrados por mês em gráficos.  

Frontend desenvolvido em **React** com **Material-UI** e **Recharts**.  

Backend em **Node.js**, **Express** e **Sequelize** com **SQLite**.

---

## 🔐 Autenticação de Usuário
- O sistema possui autenticação básica de usuários usando e-mail e senha, com proteção de senha via bcrypt e geração de **JWT (JSON Web Token)

## 🧰 Tecnologias Utilizadas

- **Linguagem:** JavaScript (Node.js)
- **Framework:** Express.js
- **Banco de Dados:** SQLite
- **ORM:** Sequelize
- **Outros:** axios, express, bcrypt, jsonwebtoken...

## ⚙️ Funcionalidades de Aplicação

## 📁 Clientes
- Cadastro, edição, listagem e exclusão (CRUD)  
- Visualização de contatos ao clicar no cliente  
- Paginação e busca por nome/email

## 📊 Dashboard
- Gráfico de clientes cadastrados por mês
- Cores distintas para cada mês
- Tooltip explicativo nos cards

## 🗂️ Contatos
- Vinculados a clientes
- CRUD básico
- Para fins de teste, existe uma migration que cadastra ✅ 50 clientes e ✅ 200 contatos automaticamente.

## 💻 Executando Localmente

### 🔧 Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)

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
```
- No segundo terminal, entre na pasta do frontend:

```bash
cd frontend
npm install
```
3. Execute as migrations no backend:

```bash
npm run migrate
```

4. Inicie o servidor e o frontend:

```bash
npm run dev
```

- A API estará disponível em:

```bash
[npm run dev](http://localhost:3000)
```

## 🧱 Estrutura do Projeto

```
/codigo-fonte
├── report-engine/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── migrations/
│   │   └── config/
│   ├── package.json
│   └── ... (outros arquivos da aplicação principal)
├── store-manager/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── repositories/
│   ├── package.json
│   └── ... (outros arquivos da aplicação de relatórios)
└── docker-compose.yml
```

## 🔧 Organização das Pastas e Arquitetura

| Camada          | Função                                         |
|-----------------|------------------------------------------------|
| models/         | Representam as tabelas do banco                |
| repositories/   | Consultas e acesso direto ao banco             |
| services/       | Regras de negócio e validações                 |
| controllers/    | Manipulação de requisições HTTP                |
| routes/         | Organização das rotas da API (Express)         |
| database/       | Configurações do Sequelize                     |

## 🏗️ Arquitetura e Estratégia

- Arquitetura baseada em **MVC (Model-View-Controller) + Service + Repository**
- Estrutura modular dentro de uma aplicação monolítica
- Comunicação via APIs REST / API RESTful
- Banco de dados relacional compartilhado (SQLite)

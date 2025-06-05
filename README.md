
# Projeto 1 - Programação Web Back-End

**Aluno:** Márcio Gustavo  
**RA:** 2209853

## 📦 Nome do Projeto

E-commerce em Node.js com MongoDB

## 📚 Descrição

Este é o Projeto 1 da disciplina de Programação Web Back-End, desenvolvido utilizando Node.js puro (sem uso de frameworks como Express) e MongoDB Atlas para armazenamento dos dados.

O projeto simula um sistema de e-commerce com funcionalidades básicas de:

- Cadastro de produtos
- Cadastro de usuários
- Gerenciamento de carrinho de compras
- Conexão com banco de dados MongoDB
- Registro de logs de exceções

---

## 📁 Estrutura do Projeto

```
ecommerce-node/
│
├── backend/
│   ├── classes/
│   │   ├── Carrinho.js         # Classe responsável pelo carrinho de compras
│   │   ├── Produto.js          # Classe de produtos
│   │   ├── Usuario.js          # Classe de usuários
│   │   ├── database.js         # Conexão com o MongoDB 
│   │   ├── logger.js           # Manipulação de logs de erro
│   │   └── logs.txt            # Arquivo de registro de logs
│   └── server.js               # Servidor Node.js (HTTP)
│
├── frontend/
│   ├── index.html              # Página principal do sistema
│   ├── script.js               # Lógica JS para comunicação com backend
│   └── style.css               # Estilos da aplicação
│
├── node_modules/               # Dependências Node.js
├── package.json                # Configurações e dependências do projeto
├── package-lock.json           # Controle de versões das dependências
├── .gitignore                  # Arquivos ignorados pelo Git
└── README.md                   # Este arquivo
```

---

## 🚀 Como executar o projeto

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a URL de conexão com MongoDB no arquivo `database.js`.

4. Inicie o servidor:
   ```bash
   node backend/server.js
   ```

5. Abra o arquivo `frontend/index.html` no navegador para interagir com o sistema.

---

## 🛠 Tecnologias

- Node.js (sem Express)
- MongoDB
- HTML, CSS e JavaScript (Vanilla)

---

## 📄 Licença

Projeto acadêmico - uso educacional.

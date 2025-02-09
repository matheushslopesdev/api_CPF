# API de Validação de CPF

Esta API permite verificar se um CPF é válido com base no cálculo dos dígitos verificadores.

## Tecnologias Utilizadas
- Node.js
- Express.js

##  Como Instalar e Rodar

### 1. Clone o repositório:
```bash
git clone https://github.com/matheushslopesdev/api_CPF.git
cd api_CPF.git
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Inicie o servidor:
```bash
node server.js
```
O servidor iniciará em: `http://localhost:3000`

## 📡 Rotas da API

### **1️⃣ Valida CPF via GET**
- **Rota:** `/validar/:cpf`
- **Método:** GET
- **Exemplo de Requisição:**
  ```http
  GET http://localhost:3000/validar/875.383.250-72 ou 87538325072
  ```
- **Exemplo de Resposta:**
  ```json
  {
      "cpf": "875.383.250-72",
      "valido": true
  }
  ```

### **2️⃣ Valida CPF via POST**
- **Rota:** `/validar`
- **Método:** POST
- **Body (JSON):**
  ```json
  {
      "cpf": "875.383.250-72"
  }
  ```
- **Exemplo de Requisição:**
  ```http
  POST http://localhost:3000/validar
  Content-Type: application/json
  {
      "cpf": "875.383.250-72"
  }
  ```
- **Exemplo de Resposta:**
  ```json
  {
      "cpf": "875.383.250-72",
      "valido": true
  }
  ```

## ⚠️ Tratamento de Erros
- Se um CPF inválido for enviado, a resposta será:
  ```json
  {
      "cpf": "12345678900",
      "valido": false
  }
  ```
- Se o CPF não for enviado no corpo da requisição POST:
  ```json
  {
      "erro": "CPF não informado"
  }
  ```

## 📜 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e contribuir! 🚀


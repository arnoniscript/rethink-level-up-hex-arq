# 🚀 To-Do App com Arquitetura Hexagonal

API para gerenciamento de tarefas seguindo os princípios da Arquitetura Hexagonal. 
Este projeto faz parte da conclusão de treinamento interno promovido pela Rethink aos seus colaboradores. 

## 📦 Pré-requisitos

- Node.js 18+
- MongoDB 6+
- NPM 9+

## 🛠️ Configuração

1. Clone o repositório 
2. Instale dependências
   
   ```npm instal```
   
4. Rode o projeto

   ```npm start```

## Swagger

Após rodar o projeto, na rota /api-docs há um swagger configurado para facilitar as chamadas à aplicação, com a documentação de cenários, schemas e retornos. 

## .env
Há no projeto um .env já configurado para evitar ter que gerar novo JWT padrão etc... Como é uma aplicação fictícia apenas para demonstrar arquiteturalmente a aplicação, resolvi deixar desta forma. 

## Testes
Basta rodar ```npm test```

Atualmente com 100% de cobertura de Branches, Funções e Linhas para as camadas de aplicação e domínio. 


![Cobertura de Teste unitário](https://i.ibb.co/PGNZR1Rg/Captura-de-Tela-2025-08-04-a-s-15-33-24.png)


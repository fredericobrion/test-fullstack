# Teste Fullstack: Aplicativo de Gerenciamento de Clientes

## Descrição:

Uma aplicação Fullstack para visualizar os usuários cadastrados, criar usuários e editar usuários existentes.
Este sistema foi desenvolvido em Typescript com React + Vite no front-end e Express + SQLite no Back-end.
A aplicação pode ser iniciada localmente ou através do uso do Docker. Abaixo mais informações de como inicia-lo.
Dentro do diretório back-end e front-end é possível encontrar mais informações sobre o projeto.

## Iniciando a aplicação:

Após clonar o repositório e entrar no diretório do projeto, siga os passos abaixo:

### Com Docker:
1) Utilize o Docker-compose:
```
docker-compose up -d --build
```
2) Acesse a aplicação em <a href="http://localhost:5173" target="_blank">http://localhost:5173</a>

### Rodando localmente:
1) Entre no diretório ```back-end``` e instale as dependências:
```
cd back-end && npm install
```
2) Crie o banco de dados:
```
npm run db:create
```
3) Inicie o servidor:
```
npm run dev
```
4) Em um novo terminal, entre no diretório ```front-end``` e instale as dependências:
```
cd front-end && npm install
```
5) Inicie a aplicação:
```
npm run dev
```
6) Acesse a aplicação em <a href="http://localhost:5173" target="_blank">http://localhost:5173</a>

## Testando a aplicação:
### Testando o front-end
Dentro do diretório ```front-end``` rode o comando ```npm test```

### Testando o back-end
Dentro do diretório ```back-end``` rode o comando ```npm test```

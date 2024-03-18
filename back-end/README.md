# Back-end

## Tecnologias utilizadas
- <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>
- <a href="https://expressjs.com/" target="_blank">Express</a>
- <a href="https://www.sqlite.org/" target="_blank">SQLite</a>
- <a href="https://www.prisma.io/" target="_blank">Prisma</a>
- <a href="https://www.docker.com/" target="_blank">Docker</a>
- <a href="https://eslint.org/">ESLint</a>
- <a href="https://joi.dev/">Joi</a>
- <a href="https://mochajs.org/" target="_blank">Mocha</a>
- <a href="https://www.chaijs.com/" target="_blank">Chai</a>
- <a href="https://sinonjs.org/" target="_blank">Sinon</a>
- <a href="https://www.npmjs.com/package/sinon-chai" target="_blank">sinon-chai</a>
- <a href="https://nodemon.io/" target="_blank">Nodemon</a>
- <a href="https://www.npmjs.com/package/cors" target="_blank">Cors</a>
- <a href="https://www.npmjs.com/package/helmet" target="_blank">Helmet</a>
- <a href="https://www.npmjs.com/package/express-rate-limit" target="_blank">express-rate-limit</a>

## Testes
Verifique se está dentro do repositório ```back-end``` e rode o comando ```npm test``` para testar as funções auxiliares e as camadas service e controller.

### Cobertura dos testes
Verifique se está dentro do repositório ```back-end``` e rode o comando ```npm run test:coverage``` para testar cobertura dos testes.

## Funcionalidades
1) Endpoint ```/users``` para os usuários.
   - ```GET /users``` para listar todos os usuários.
   - ```GET /users/:id``` para recuperar um usuário específico.
   - ```POST /users``` para criar um usuário. O corpo da requisição deve ser no formato abaixo:
    ```
    {
    "email": "usuario@uol.com",
    "name": "Usuario",
    "cpf": "555.988.666-75",
    "phone": "(32) 5884-8795",
    "status": "DISABLED"
    }
    ```
    O status deverá ser do tipo ACTIVE, INACTIVE, PENDING ou DISABLED.
   - ```PUT /users/:id``` para atualizar um usuário. O corpo da requisição deve ser no formato abaixo:
    ```
    {
    "email": "usuario@uol.com",
    "name": "Usuario",
    "cpf": "555.988.666-75",
    "phone": "(32) 5884-8795",
    "status": "DISABLED"
    }
    ```
    O status deverá ser do tipo ACTIVE, INACTIVE, PENDING ou DISABLED.

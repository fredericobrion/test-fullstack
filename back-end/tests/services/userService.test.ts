import { expect } from "chai";
import UserService from "../../src/services/user.service";
import { IUserMock, users } from "../mocks/UserModel";
import { User } from "../../src/classes/User";

describe("Testes de UserService", function () {
  const userService = new UserService(new IUserMock());

  it("Deve retornar todos os usuários", async function () {
    const response = await userService.findAll();

    expect(response.status).to.be.equal("OK");
    expect(response.data).to.be.an("array");
    expect(response.data).to.have.lengthOf(2);
    expect(response.data).to.be.deep.equal(users);
  });

  it("Deve retornar um usuário pelo id", async function () {
    const response = await userService.findOne(1);

    expect(response.status).to.be.equal("OK");
    expect(response.data).to.be.an("object");
    expect(response.data).to.be.deep.equal(users[0]);
  });

  it("Não encontra um usuário pelo id", async function () {
    const response = await userService.findOne(3);

    expect(response.status).to.be.equal("NOT_FOUND");
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property("message", "Usuário não encontrado");
  });

  it("Não cadastra usuário se já existir usuário registrado com o e-mail", async function () {
    const user = {
      name: users[0].name,
      email: users[0].email,
      cpf: "589.875.986-50",
      phone: users[0].phone,
      status: users[0].status,
    };

    const response = await userService.create(user);

    expect(response.status).to.be.equal("CONFLICT");
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property(
      "message",
      "Usuário já registrado com o e-mail ou CPF"
    );
  });

  it("Não cadastra usuário se já existir usuário registrado com o cpf", async function () {
    const user = {
      name: users[0].name,
      email: "email@email.com",
      cpf: users[0].cpf,
      phone: users[0].phone,
      status: users[0].status,
    };

    const response = await userService.create(user);

    expect(response.status).to.be.equal("CONFLICT");
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property(
      "message",
      "Usuário já registrado com o e-mail ou CPF"
    );
  });

  it("Cadastra um usuário", async function () {
    const user = {
      name: "José",
      email: "jose@uol.com",
      cpf: "589.875.986-50",
      phone: "(11) 9999-9999",
      status: "ACTIVE",
    };

    const response = await userService.create(user as User);

    expect(response.status).to.be.equal("CREATED");
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property("id", 3);
    expect(response.data).to.have.property("name", "José");
    expect(response.data).to.have.property("email", "jose@uol.com");
    expect(response.data).to.have.property("cpf", "589.875.986-50");
    expect(response.data).to.have.property("phone", "(11) 9999-9999");
    expect(response.data).to.have.property("status", "ACTIVE");
  });

  it("Não atualiza um usuário se não encontrar pelo id", async function () {
    const user = {
      name: "José",
      email: "jose@uol.com",
      cpf: "589.875.986-50",
      phone: "(11) 9999-9999",
      status: "ACTIVE",
    };

    const response = await userService.update(4, user as User);

    expect(response.status).to.be.equal("NOT_FOUND");
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property("message", "Usuário não encontrado");
  });

  it("Não atualiza um usuário se já existir usuário registrado com o e-mail", async function () {
    const user = {
      name: users[0].name,
      email: users[0].email,
      cpf: "589.875.986-50",
      phone: users[0].phone,
      status: users[0].status,
    };

    const response = await userService.update(3, user);

    expect(response.status).to.be.equal("CONFLICT");
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property(
      "message",
      "Usuário já registrado com o e-mail ou CPF"
    );
  });

  it("Não atualiza um usuário se já existir usuário registrado com o cpf", async function () {
    const user = {
      name: users[0].name,
      email: "teste@uol.com",
      cpf: users[0].cpf,
      phone: users[0].phone,
      status: users[0].status,
    };

    const response = await userService.update(3, user);

    expect(response.status).to.be.equal("CONFLICT");
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property(
      "message",
      "Usuário já registrado com o e-mail ou CPF"
    );
  });

  it("Atualiza um usuário", async function () {
    const user = {
      name: "José da Silva",
      email: "jose@uol.com",
      cpf: "589.875.986-50",
      phone: "(11) 9999-9999",
      status: "ACTIVE",
    };

    const response = await userService.update(3, user as User);

    expect(response.status).to.be.equal("OK");
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property("id", 3);
    expect(response.data).to.have.property("name", "José da Silva");
    expect(response.data).to.have.property("email", "jose@uol.com");
    expect(response.data).to.have.property("cpf", "589.875.986-50");
    expect(response.data).to.have.property("phone", "(11) 9999-9999");
    expect(response.data).to.have.property("status", "ACTIVE");
  });
});

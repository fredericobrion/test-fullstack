import chai, { expect } from "chai";
import UserService from "../../src/services/user.service";
import { IUserMock, users } from "../mocks/UserModel";
import UserController from "../../src/controllers/user.controller";
import { Request, Response } from "express";
import {} from "../mocks/UserModel";
import Sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

describe("Testes de UserController", function () {
  const service = new UserService(new IUserMock());
  const controller = new UserController(service);

  it("Deve retornar todos os usuários", async function () {
    const req = {} as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(users);
  });

  it("Deve retornar um usuário", async function () {
    const req = { params: { id: 1 } } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.findOne(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(users[0]);
  });

  it("Deve retornar que o usuário não existe", async function () {
    const req = { params: { id: 10 } } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.findOne(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: "Usuário não encontrado",
    });
  });

  it("Não cria o usuário, pois o e-mail já está cadastrado", async function () {
    const req = {
      body: {
        name: users[0].name,
        email: users[0].email,
        cpf: "123.789.658-50",
        phone: users[0].phone,
        status: users[0].status,
      },
    } as unknown as Request;

    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.create(req, res);

    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith({
      message: "Usuário já registrado com o e-mail ou CPF",
    });
  });

  it("Não cria o usuário, pois o CPF já está cadastrado", async function () {
    const req = {
      body: {
        name: users[0].name,
        email: "teste@uol.com",
        cpf: users[0].cpf,
        phone: users[0].phone,
        status: users[0].status,
      },
    } as unknown as Request;

    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.create(req, res);

    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith({
      message: "Usuário já registrado com o e-mail ou CPF",
    });
  });

  it("Deve criar um usuário", async function () {
    const user = {
      name: "José",
      email: "jose@uol.com",
      cpf: "589.875.986-50",
      phone: "(11) 9999-9999",
      status: "ACTIVE",
    };

    const req = { body: user } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({
      id: 3,
      ...user,
    });
  });

  it("Não deve atualizar um usuário se o id não existir", async function () {
    const req = {
      params: { id: 10 },
      body: {
        name: "José",
        email: "jose@uol.com",
        cpf: "589.875.986-50",
        phone: "(11) 9999-9999",
        status: "ACTIVE",
      },
    } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.update(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: "Usuário não encontrado",
    });
  });

  it("Não deve atualizar o usuário se o e-mail já estiver cadastrado com outro id", async function () {
    const req = {
      params: { id: 1 },
      body: {
        name: users[0].name,
        email: users[1].email,
        cpf: users[0].cpf,
        phone: users[0].phone,
        status: users[0].status,
      },
    } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.update(req, res);

    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith({
      message: "Usuário já registrado com o e-mail ou CPF",
    });
  });

  it("Não deve atualizar o usuário se o CPF já estiver cadastrado com outro id", async function () {
    const req = {
      params: { id: 1 },
      body: {
        name: users[0].name,
        email: users[0].email,
        cpf: users[1].cpf,
        phone: users[0].phone,
        status: users[0].status,
      },
    } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.update(req, res);

    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith({
      message: "Usuário já registrado com o e-mail ou CPF",
    });
  });

  it("Deve atualizar o usuário", async function () {
    const req = {
      params: { id: 1 },
      body: {
        name: users[0].name,
        email: "joao2@gmail.com",
        cpf: users[0].cpf,
        phone: users[0].phone,
        status: users[0].status,
      },
    } as unknown as Request;

    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;

    await controller.update(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      id: 1,
      ...req.body,
    });
  });


});

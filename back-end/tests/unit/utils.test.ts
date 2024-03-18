import chai, { expect } from "chai";
import { Request, Response, NextFunction } from "express";
import Sinon from "sinon";
import sinonChai from "sinon-chai";
import mapStatusHTTP from "../../src/utils/mapStatusHTTP";
import ValidateUser from "../../src/utils/validateUser";

chai.use(sinonChai);

describe("Testa a função auxiliar mapStatusHTTP", function () {
  it("Deve retornar 200 quando receber OK", function () {
    const status = "OK";
    const result = mapStatusHTTP(status);
    expect(result).to.be.equal(200);
  });

  it("Deve retornar 201 quando receber CREATED", function () {
    const status = "CREATED";
    const result = mapStatusHTTP(status);
    expect(result).to.be.equal(201);
  });

  it("Deve retornar 404 quando receber NOT_FOUND", function () {
    const status = "NOT_FOUND";
    const result = mapStatusHTTP(status);
    expect(result).to.be.equal(404);
  });

  it("Deve retornar 409 quando receber CONFLICT", function () {
    const status = "CONFLICT";
    const result = mapStatusHTTP(status);
    expect(result).to.be.equal(409);
  });

  it("Deve retornar 500 quando não receber nenhuma opção conhecida", function () {
    const status = "UNKNOWN";
    const result = mapStatusHTTP(status);
    expect(result).to.be.equal(500);
  });
});

describe("Testa a validação de usuários", function () {
  it("Deve retornar status 400 quando o e-mail for inválido", function () {
    const req = {
      body: {
        email: "email.com",
        name: "Nome",
        cpf: "123.456.789-00",
        phone: "(11) 1234-5678",
      },
    } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;

    ValidateUser.validateUserValues(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"email" must be a valid email',
    });
  });

  it("Deve retornar status 400 quando o nome for inválido", function () {
    const req = {
      body: {
        email: "email@uol.com",
        name: "",
        cpf: "123.456.789-00",
        phone: "(11) 1234-5678",
      },
    } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;

    ValidateUser.validateUserValues(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"name" is not allowed to be empty',
    });
  });

  it("Deve retornar status 400 quando o CPF for inválido", function () {
    const req = {
      body: {
        email: "email@uol.com",
        name: "Nome",
        cpf: "123.456.789-0",
        phone: "(11) 1234-5678",
      },
    } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;

    ValidateUser.validateUserValues(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message:
        '"cpf" with value "123.456.789-0" fails to match the required pattern: /^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/',
    });
  });

  it("Deve retornar status 400 quando o telefone for inválido", function () {
    const req = {
      body: {
        email: "user@uo.com",
        name: "Nome",
        cpf: "123.456.789-00",
        phone: "(11) 1234-567",
      },
    } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;

    ValidateUser.validateUserValues(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message:
        '"phone" with value "(11) 1234-567" fails to match the required pattern: /^\\(\\d{2}\\) \\d{4}-\\d{4}$/',
    });
  });

  it("Deve retornar status 400 quando o status for inválido", function () {
    const req = {
      body: {
        email: "user@uo.com",
        name: "Nome",
        cpf: "123.456.789-00",
        phone: "(11) 1234-5678",
        status: "ATIVO",
      },
    } as unknown as Request;
    const res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;

    ValidateUser.validateUserValues(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"status" must be one of [ACTIVE, INACTIVE, PENDING, DISABLED]',
    });
  });

  it("Deve chamar o next quando os valores forem válidos", function () {
    const req = {
      body: {
        email: "user@uol.com",
        name: "Nome",
        cpf: "123.456.789-00",
        phone: "(11) 1234-5678",
      },
    } as unknown as Request;
    const res = {} as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;

    ValidateUser.validateUserValues(req, res, next);

    expect(next).to.have.been.called;
  });
});

import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import App from "../src/App";
import { renderWithRouter } from "./utils/renderWithRouter";
import Provider from "../src/context/Provider";
import { users, newUser } from "./mocks/user";
import { getAllUsers, createUser } from "../src/services/users";

vi.mock("../src/services/users");

describe("Testando a página de criar usuário", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("A página de criar usuário renderiza os elementos", async () => {
    renderWithRouter(<App />, { route: "/add" });

    const infoText = screen.getByRole("heading", {
      name: /informe os campos a seguir para criar novo usuário:/i,
    });

    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const cpfInput = screen.getByPlaceholderText(/cpf/i);
    const phoneInput = screen.getByPlaceholderText(/telefone/i);
    const statusInput = screen.getByRole("combobox");
    const createBtn = screen.getByRole("button", {
      name: /criar/i,
    });
    const goBackBtn = screen.getByRole("button", {
      name: /voltar/i,
    });

    expect(infoText).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(cpfInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(statusInput).toBeInTheDocument();
    expect(createBtn).toBeInTheDocument();
    expect(goBackBtn).toBeInTheDocument();
  });

  it("Testa se os inputs funcionam corretamente", async () => {
    const { user } = renderWithRouter(<App />, { route: "/add" });

    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const cpfInput = screen.getByPlaceholderText(/cpf/i);
    const phoneInput = screen.getByPlaceholderText(/telefone/i);
    const statusInput = screen.getByRole("combobox");

    await user.type(nameInput, "João");
    await user.type(emailInput, "joao@uol.com");
    await user.type(cpfInput, "12345678900");
    await user.type(phoneInput, "3291674479");
    await user.selectOptions(statusInput, "ACTIVE");

    expect(nameInput).toHaveValue("João");
    expect(emailInput).toHaveValue("joao@uol.com");
    expect(cpfInput).toHaveValue("123.456.789-00");
    expect(phoneInput).toHaveValue("(32) 9167-4479");
    expect(statusInput).toHaveValue("ACTIVE");
  });

  it("Testa se o botão de voltar funciona corretamente", async () => {
    vi.mocked(getAllUsers).mockResolvedValue(users);

    const { user } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: "/add" }
    );

    const goBackBtn = screen.getByRole("button", {
      name: /voltar/i,
    });

    await user.click(goBackBtn);

    const title = screen.getByRole("heading", {
      name: /listagem de usuários/i,
    });

    expect(title).toBeInTheDocument();
  });

  it("Testa se o botão de criar usuário funciona corretamente", async () => {
    vi.mocked(createUser).mockResolvedValue(newUser);

    const { user } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: "/add" }
    );

    const createBtn = screen.getByRole("button", {
      name: /criar/i,
    });

    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const cpfInput = screen.getByPlaceholderText(/cpf/i);
    const phoneInput = screen.getByPlaceholderText(/telefone/i);
    const statusInput = screen.getByRole("combobox");

    await user.type(nameInput, "José");
    await user.type(emailInput, "jose@uol.com");
    await user.type(cpfInput, "12345678900");
    await user.type(phoneInput, "1199999999");
    await user.selectOptions(statusInput, "ACTIVE");

    await user.click(createBtn);

    const title = screen.getByRole("heading", {
      name: /listagem de usuários/i,
    });
    const emailJose = await screen.findByText(newUser.email);

    expect(title).toBeInTheDocument();
    expect(emailJose).toBeInTheDocument();
  });

  it("Verifica se as mensagens de erro aparecem corretamente", async () => {
    const { user } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: "/add" }
    );

    const createBtn = screen.getByRole("button", {
      name: /criar/i,
    });
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const cpfInput = screen.getByPlaceholderText(/cpf/i);
    const phoneInput = screen.getByPlaceholderText(/telefone/i);

    await user.type(emailInput, "joao@uol");
    await user.type(cpfInput, "123456789");
    await user.type(phoneInput, "32916744");

    await user.click(createBtn);

    const nameError = await screen.findByText(/O usuário deve ter um nome./i);
    const emailError = await screen.findByText(/E-mail inválido./i);
    const cpfError = await screen.findByText(
      /Formato inválido. O CPF deve ter 11 digitos./i
    );
    const phoneError = await screen.findByText(
      /celular deve ter DDD/i
    );
    const statusError = await screen.findByText(/Selecione um status./i);

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(cpfError).toBeInTheDocument();
    expect(phoneError).toBeInTheDocument();
    expect(statusError).toBeInTheDocument();
  });
});

import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import App from "../src/App";
import { renderWithRouter } from "./utils/renderWithRouter";
import ProviderMock from "./mocks/ProviderMock";
import { users } from "./mocks/user";
import { updateUser } from "../src/services/users";

vi.mock("../src/services/users");

describe("Testando a página de editar usuário", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("A página de editar usuário renderiza os elementos", async () => {
    renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/1" }
    );

    const nameInput = screen.getByTestId(/name/i) as HTMLInputElement;
    const emailInput = screen.getByTestId(/email/i) as HTMLInputElement;
    const cpfInput = screen.getByTestId(/cpf/i) as HTMLInputElement;
    const phoneInput = screen.getByTestId(/phone/i) as HTMLInputElement;
    const statusInput = screen.getByRole("combobox") as HTMLOptionElement;

    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe(users[0].name);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe(users[0].email);
    expect(cpfInput).toBeInTheDocument();
    expect(cpfInput.value).toBe(users[0].cpf);
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput.value).toBe(users[0].phone);
    expect(statusInput).toBeInTheDocument();
    expect(statusInput.value).toBe(users[0].status);
  });

  it("Testa se o botão de atualizar usuário funciona corretamente", async () => {
    vi.mocked(updateUser).mockResolvedValue();

    const { user } = renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/1" }
    );

    const updateBtn = screen.getByRole("button", {
      name: /atualizar/i,
    });

    const nameInput = screen.getByTestId(/name/i) as HTMLInputElement;

    await user.clear(nameInput);
    await user.type(nameInput, "João Silva");

    await user.click(updateBtn);

    const title = screen.getByRole("heading", {
      name: /listagem de usuários/i,
    });
    const newName = await screen.findByText("João Silva");

    expect(title).toBeInTheDocument();
    expect(newName).toBeInTheDocument();
  });

  it("Testa se a mensagem de erro de outro usuário já cadastrado com email aparece corretamente", async () => {
    vi.mocked(updateUser).mockImplementationOnce(() => {
      throw new Error("Outro usuário já registrado com o e-mail ou CPF!");
    });

    const { user } = renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/1" }
    );

    const updateBtn = screen.getByRole("button", {
      name: /atualizar/i,
    });

    const emailInput = screen.getByTestId(/email/i) as HTMLInputElement;

    await user.clear(emailInput);
    await user.type(emailInput, users[1].email);

    await user.click(updateBtn);

    const error = await screen.findByText(/já registrado/i);

    expect(error).toBeInTheDocument();
  });
});

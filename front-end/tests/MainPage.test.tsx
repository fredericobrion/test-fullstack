import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import ProviderMock from "./mocks/ProviderMock";
import { users } from "./mocks/user";
import { getAllUsers } from "../src/services/users";
import { renderWithRouter } from "./utils/renderWithRouter";
import App from "../src/App";

vi.mock("../src/services/users");

describe("Testando a página inicial", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("A página inicial renderiza os elementos estáticos", async () => {
    vi.mocked(getAllUsers).mockResolvedValue(users);

    renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/" }
    );

    const userList = screen.getByRole("heading", {
      name: /listagem de usuários/i,
    });
    const visualizeClients = screen.getByRole("heading", {
      name: /escolha um cliente para visualizar os detalhes/i,
    });
    const newClientBtn = screen.getByRole("button", {
      name: /novo cliente/i,
    });

    expect(userList).toBeInTheDocument();
    expect(visualizeClients).toBeInTheDocument();
    expect(newClientBtn).toBeInTheDocument();
  });

  it("A página inicial renderiza os usuários", async () => {
    vi.mocked(getAllUsers).mockResolvedValue(users);

    renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/" }
    );

    const emailJoao = await screen.findByText(users[0].email);
    const emailMaria = await screen.findByText(users[1].email);

    expect(emailJoao).toBeInTheDocument();
    expect(emailMaria).toBeInTheDocument();
  });

  it("O botão de adicionar usuários funciona", async () => {
    vi.mocked(getAllUsers).mockResolvedValue(users);

    const { user } = renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/" }
    );

    const createBtn = screen.getByRole("button", {
      name: /novo cliente/i,
    });

    await user.click(createBtn);

    const inputName = await screen.getByPlaceholderText(/nome/i);

    expect(inputName).toBeInTheDocument();
  });

  it("O botão de editar usuários funciona", async () => {
    vi.mocked(getAllUsers).mockResolvedValue(users);

    const { user } = renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/" }
    );

    const editBtn = screen.getAllByRole("button", {
      name: /editar/i,
    });

    await user.click(editBtn[0]);

    const nameInput = (await screen.getByTestId(/name/i)) as HTMLInputElement;

    expect(nameInput).toBeInTheDocument();
  });
});

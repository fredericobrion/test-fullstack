import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Provider from "../src/context/Provider";
import { users } from "./mocks/user";
import { getAllUsers } from "../src/services/users";
import MainPage from "../src/pages/main";

vi.mock("../src/services/users");

describe("Testando a página inicial", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("A página inicial renderiza os elementos estáticos", async () => {
    vi.mocked(getAllUsers).mockResolvedValue(users);

    render(
      <MemoryRouter>
        <Provider>
          <MainPage />
        </Provider>
      </MemoryRouter>
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

    render(
      <MemoryRouter>
        <Provider>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    const emailJoao = await screen.findByText(users[0].email);
    const emailMaria = await screen.findByText(users[1].email);

    expect(emailJoao).toBeInTheDocument();
    expect(emailMaria).toBeInTheDocument();
  });
});

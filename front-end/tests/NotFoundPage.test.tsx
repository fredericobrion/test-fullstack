import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import App from "../src/App";
import { renderWithRouter } from "./utils/renderWithRouter";
import ProviderMock from "./mocks/ProviderMock";

vi.mock("../src/services/users");

describe("Testando a página de rota não encontrada", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("A página de rota não encontrada renderiza os elementos", async () => {
    renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/not-found" }
    );

    const notFoundTitle = screen.getByText(/página não encontrada/i);
    const goBackBtn = screen.getByRole('button', {
      name: /voltar/i
    })

    expect(notFoundTitle).toBeInTheDocument();
    expect(goBackBtn).toBeInTheDocument();
  });

  it("A página not found é renderizada quando uma rota desconhecida é acessada", async () => {
    renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/unknown" }
    );

    const notFoundTitle = screen.getByText(/página não encontrada/i);
    const goBackBtn = screen.getByRole('button', {
      name: /voltar/i
    })

    expect(notFoundTitle).toBeInTheDocument();
    expect(goBackBtn).toBeInTheDocument();
  });

  it("Testa se o botão de voltar funciona corretamente", async () => {
    const { user } = renderWithRouter(
      <ProviderMock>
        <App />
      </ProviderMock>,
      { route: "/not-found" }
    );

    const goBackBtn = screen.getByRole('button', {
      name: /voltar/i
    })

    await user.click(goBackBtn);

    const title = await screen.getByRole("heading", {
      name: /listagem de usuários/i,
    });

    expect(title).toBeInTheDocument();
  });
})
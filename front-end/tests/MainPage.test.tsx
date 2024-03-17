import React from "react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";
import Provider from "../src/context/Provider";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { users } from "./mocks/user";
// import { getAllUsers } from "../src/services/users";
import { User } from "../src/types/User";
import { getAllUsers } from "../src/services/users";

describe("Testando a página inicial", () => {
  it("A página inicial renderiza os elementos estáticos", async () => {
    

    render(
      <MemoryRouter>
        <Provider>
          <App />
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
});

import { describe, it, expect } from "vitest";
import { formatCPF, formatPhone } from "../src/utils/formatInputs";
import { validateInputs } from "../src/utils/validateInputs";

describe("Testa a formatação de CPF", () => {
  it("Deve formatar o CPF corretamente", () => {
    expect(formatCPF("123")).toBe("123");
    expect(formatCPF("123456")).toBe("123.456");
    expect(formatCPF("123456789")).toBe("123.456.789");
    expect(formatCPF("12345678900")).toBe("123.456.789-00");
  });
});

describe("Testa a formatação de telefone", () => {
  it("Deve formatar o telefone corretamente", () => {
    expect(formatPhone("")).toBe("");
    expect(formatPhone("1")).toBe("(1");
    expect(formatPhone("12")).toBe("(12");
    expect(formatPhone("1234")).toBe("(12) 34");
    expect(formatPhone("1234567")).toBe("(12) 3456-7");
    expect(formatPhone("1234567890")).toBe("(12) 3456-7890");
  });
});

describe("Testa a validação de inputs", () => {
  it("Deve retornar erro em todos os campos", () => {
    const name = "";
    const email = "email@email";
    const cpf = "123.456.789";
    const phone = "(12) 3456-789";
    const status = "";

    const result = validateInputs(name, email, cpf, phone, status);

    expect(result.name).toBe(true);
    expect(result.email).toBe(true);
    expect(result.cpfFormat).toBe(true);
    expect(result.phone).toBe(true);
    expect(result.status).toBe(true);
    expect(result.validsInputs).toBe(false);
  });

  it("Deve retornar que os inputs são validos", () => {
    const name = "João";
    const email = "email@email.com";
    const cpf = "123.456.789-00";
    const phone = "(12) 3456-7895";
    const status = "ACTIVE";

    const result = validateInputs(name, email, cpf, phone, status);

    expect(result.name).toBe(false);
    expect(result.email).toBe(false);
    expect(result.cpfFormat).toBe(false);
    expect(result.phone).toBe(false);
    expect(result.status).toBe(false);
    expect(result.validsInputs).toBe(true);
  });
});
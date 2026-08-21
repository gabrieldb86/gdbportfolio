import { describe, expect, it } from "vitest";
import { validateContactForm } from "./contactValidation";

describe("contact form validation", () => {
  it("accepts a plausible contact name, valid email and contextual message", () => {
    expect(validateContactForm({
      name: "Mariana de Souza",
      email: "mariana@empresa.com",
      message: "Gostaria de conversar sobre uma oportunidade de coordenação.",
    })).toEqual({});
  });

  it("rejects empty fields and malformed email addresses", () => {
    expect(validateContactForm({ name: "", email: "mariana@empresa", message: "" })).toEqual({
      name: "Informe seu nome para continuarmos.",
      email: "Digite um e-mail em formato válido, como voce@empresa.com.",
      message: "Conte brevemente o contexto da oportunidade.",
    });
  });

  it("rejects obvious placeholder names, test email domains and short messages", () => {
    expect(validateContactForm({ name: "Teste", email: "teste@example.com", message: "Oi" })).toEqual({
      name: "Informe um nome de contato válido, sem nomes de teste ou sequências.",
      email: "Use um e-mail de contato, não um endereço de exemplo ou teste.",
      message: "Escreva ao menos 12 caracteres para contextualizar o contato.",
    });
  });
});

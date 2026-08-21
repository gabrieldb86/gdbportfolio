export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const placeholderNames = new Set([
  "admin",
  "anonimo",
  "anônimo",
  "asdf",
  "ciclano",
  "fake",
  "fulano",
  "nome",
  "qwerty",
  "test",
  "teste",
  "usuario",
  "usuário",
  "xxx",
]);

const placeholderDomains = new Set(["email.com", "example.com", "example.org", "invalid", "test.com"]);

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR");
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const normalizedName = normalize(name);
  const email = normalize(values.email);
  const message = values.message.trim();

  if (!name) {
    errors.name = "Informe seu nome para continuarmos.";
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s'’-]{1,79}$/.test(name)) {
    errors.name = "Use apenas letras, espaços, apóstrofos ou hífens no nome.";
  } else if (placeholderNames.has(normalizedName) || /^(.)\1{2,}$/.test(normalizedName.replace(/\s/g, ""))) {
    errors.name = "Informe um nome de contato válido, sem nomes de teste ou sequências.";
  }

  if (!email) {
    errors.email = "Informe seu e-mail para recebermos o retorno.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Digite um e-mail em formato válido, como voce@empresa.com.";
  } else if (placeholderDomains.has(email.split("@")[1] ?? "")) {
    errors.email = "Use um e-mail de contato, não um endereço de exemplo ou teste.";
  }

  if (!message) {
    errors.message = "Conte brevemente o contexto da oportunidade.";
  } else if (message.length < 12) {
    errors.message = "Escreva ao menos 12 caracteres para contextualizar o contato.";
  }

  return errors;
}

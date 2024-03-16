// import { validate } from "cpf-check";

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
const cpfRegex = /^([0-9]{3})\.([0-9]{3})\.([0-9]{3})-([0-9]{2})$/;

const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

const validateCPF = (cpf: string) => {
  return cpfRegex.test(cpf);
};

const validatePhone = (phone: string) => {
  return phoneRegex.test(phone);
}

const validateInputs = (name:string, email: string, cpf: string, phone: string, status: string) => {
  const emailIsValid = validateEmail(email);
  const phoneIsValid = validatePhone(phone);
  const cpfIsFormatted = validateCPF(cpf);

  return {
    name: name === "",
    email: !emailIsValid,
    cpfFormat: !cpfIsFormatted,
    phone: !phoneIsValid,
    status: status === "",
    validsInputs: emailIsValid && cpfIsFormatted && phoneIsValid && status !== "",
  }

}

export { validateInputs };

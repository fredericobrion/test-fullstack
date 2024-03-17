import { User } from "../../src/types/User";

const users = [
  {
    id: 1,
    name: "João",
    email: "joao@uol.com",
    cpf: "123.456.789-85",
    phone: "(11) 9999-9999",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Maria",
    email: "maria@uol.com",
    cpf: "123.456.789-88",
    phone: "(11) 9999-9999",
    status: "ACTIVE",
  },
] as User[];

const newUser = {
  id: 3,
  name: "José",
  email: "jose@uol.com",
  cpf: "123.456.789-00",
  phone: "(11) 9999-9999",
  status: "ACTIVE",
} as User;

export { users, newUser };

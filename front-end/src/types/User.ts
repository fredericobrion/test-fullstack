export type User = {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE" | "DISABLED" | "PENDING";
};

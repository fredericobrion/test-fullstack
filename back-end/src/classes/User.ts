export class User {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DISABLED' | 'PENDING';

  constructor(data: User) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.cpf = data.cpf;
    this.phone = data.phone;
    this.status = data.status;
  }
}
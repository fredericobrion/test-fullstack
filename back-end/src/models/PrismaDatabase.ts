import { PrismaClient } from "@prisma/client";

export class PrismaDatabase implements IDbConnection<unknown> {
  private prisma!: PrismaClient;

  constructor() {}

  async connect(): Promise<void> {
    this.prisma = new PrismaClient();
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  async findAll(table: string): Promise<unknown[]> {
    return await this.prisma[table].findMunknown();
  }

  async findById(table: string, id: number): Promise<unknown | null> {
    return await this.prisma[table].findUnique({ where: { id } });
  }

  async create(table: string, data: unknown): Promise<unknown> {
    return await this.prisma[table].create({ data });
  }

  async update(table: string, id: number, data: unknown): Promise<unknown | null> {
    return await this.prisma[table].update({ where: { id }, data });
  }
}
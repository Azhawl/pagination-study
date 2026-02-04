import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export async function listUsers(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const users = await prisma.user.findMany({
    skip: offset,
    take: limit,
  });

  const total = await prisma.user.count();

  return res.json({
    page,
    limit,
    total,
    users,
  });
}

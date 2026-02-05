import { Router } from "express";
import { prisma } from "../lib/prisma";
import { paginationSchema } from "../validators/pagination.schema";

const router = Router();

router.get("/", async (req, res) => {
  const parsed = paginationSchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Parâmetros inválidos",
      details: parsed.error.format(),
    });
  }

  const { page, limit } = parsed.data;
  const offset = (page - 1) * limit;

  const users = await prisma.user.findMany({
    skip: offset,
    take: limit,
  });

  return res.json({
    page,
    limit,
    total: users.length,
    data: users,
  });
});

export default router;


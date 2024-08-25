import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { search } = req.query;

    if (!search || typeof search !== "string")
      throw new Error("Invalid search value");

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { username: { contains: search, mode: "insensitive" } },
        ],
      },
    });

    if (users) return res.status(200).json(users);
    else return res.status(404).end();
  } catch (error) {
    return res.status(400).end();
  }
}

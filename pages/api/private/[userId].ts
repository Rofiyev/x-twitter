import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/libs/authOptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res, authOptions);
    const { isPrivate } = req.body;

    if (typeof isPrivate !== "boolean") throw new Error("Missing fileds");

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        isPrivate,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).end();
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/libs/authOptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res, authOptions);
    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) throw new Error("Missing fileds");

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        coverImage,
        profileImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).end();
  }
}

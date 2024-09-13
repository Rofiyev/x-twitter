import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export default async function hadler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { name, email, username, password } = req.body;

    const isExistUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (isExistUser)
      return res
        .status(409)
        .json({ message: "User with this email or username already exists" });

    const hashedPassword: string = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        hashedPassword,
        isPrivate: false,
        bio: "",
        coverImage: "",
        profileImage: "",
        followingIds: [],
      },
    });

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).end();
  }
}

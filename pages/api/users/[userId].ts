import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") throw new Error("Invalid ID");

    const isExistUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const followers = await prisma.user.findMany({
      where: {
        followingIds: {
          has: userId,
        },
      },
      select: {
        id: true,
      },
    });

    const followerIds = Array.from(
      new Set(followers.map((follower) => follower.id))
    );

    return res.status(200).json({ ...isExistUser, followerIds });
  } catch (error) {
    return res.status(404).end();
  }
}

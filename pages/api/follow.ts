import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { authOptions } from "@/libs/authOptions";

export default async function hadler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE")
    return res.status(405).end();

  try {
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req, res, authOptions);

    if (!userId || typeof userId !== "string") throw new Error("Invaid ID");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("Invaid ID");

    if (user.id === currentUser.id)
      return res.status(400).json({ message: "You cannot follow yourself." });

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: `@${currentUser.username} | ${currentUser.name} followed you!`,
            userId: userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).end();
  }
}

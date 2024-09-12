import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/libs/authOptions";

export default async function hadler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET")
    return res.status(405).end();

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res, authOptions);
      const { body, images = [] } = req.body;

      const post = await prisma.post.create({
        data: {
          userId: currentUser.id,
          body,
          images,
        },
      });

      return res.status(201).json(post);
    }

    if (req.method === "GET") {
      const { currentUser } = await serverAuth(req, res, authOptions);
      const { userId } = req.query;

      if (userId && typeof userId === "string") {
        const posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comment: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        return res.status(200).json(posts);
      }
      const currentUserFollowings = await prisma.user.findMany({
        where: {
          id: currentUser.id,
        },
        select: {
          followingIds: true,
        },
      });

      const currentUserFollowingsIds = currentUserFollowings
        .map((user) => user.followingIds)
        .flat();

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              user: { isPrivate: false },
            },
            { userId: { in: currentUserFollowingsIds } },
            {
              userId: currentUser.id,
            },
          ],
        },
        include: {
          user: true,
          comment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(posts);
    }
  } catch (error) {
    return res.status(400).end();
  }
}

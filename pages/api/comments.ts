import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { authOptions } from "@/libs/authOptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res, authOptions);
    const { body, images = [] } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") throw new Error("Invalid ID");

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
        images: images.length ? [...images] : [],
      },
    });

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId && currentUser.id !== post?.userId) {
        await prisma.notification.create({
          data: {
            body: `@${currentUser.username} | ${currentUser.name} replied to your post`,
            userId: post.userId,
          },
        });
        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(400).end();
  }
}

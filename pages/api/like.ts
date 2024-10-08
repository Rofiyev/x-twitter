import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { authOptions } from "@/libs/authOptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE")
    return res.status(405).end();

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res, authOptions);

    if (!postId || typeof postId !== "string") throw new Error("Invalid ID");

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) throw new Error("InvaLid Id");

    let updatedLikeIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      updatedLikeIds.push(currentUser.id);

      try {
        if (post?.userId !== currentUser.id) {
          await prisma.notification.create({
            data: {
              body: `@${currentUser.username} | ${currentUser.name} liked your post`,
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
        return res.status(400).end();
      }
    }

    if (req.method === "DELETE")
      updatedLikeIds = updatedLikeIds.filter(
        (updateLikeId: string) => updateLikeId !== currentUser.id
      );

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikeIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(400).end();
  }
}

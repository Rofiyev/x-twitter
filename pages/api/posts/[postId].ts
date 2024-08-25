import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "DELETE" && req.method !== "PATCH")
    return res.status(405).end();

  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") throw new Error("Invalid ID");

    if (req.method === "GET") {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comment: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "DELETE") {
      const post = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "PATCH") {
      const { body } = req.body;
      console.log(body); 

      const post = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          body,
        },
      });

      return res.status(200).json(post);
    }
  } catch (error) {
    return res.status(400).end();
  }
}

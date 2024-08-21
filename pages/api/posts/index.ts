import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/libs/prismadb";

export default async function hadler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET")
    return res.status(405).end();

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res, authOptions);
      const { body } = req.body;

      const post = await prisma.post.create({
        data: {
          userId: currentUser.id,
          body,
        },
      });

      return res.status(201).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
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
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comment: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    return res.status(400).end();
  }
}

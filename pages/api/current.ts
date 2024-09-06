import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { authOptions } from "@/libs/authOptions";

export default async function hadler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res, authOptions);

    return res.status(200).json(currentUser);
  } catch (error) {
    return res.status(400).end();
  }
}

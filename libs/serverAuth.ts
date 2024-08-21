import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { AuthOptions, getServerSession } from "next-auth";

const serverAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: AuthOptions
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) throw new Error("Not signed in");

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) throw new Error("Not signed in");

  return { currentUser };
};

export default serverAuth;

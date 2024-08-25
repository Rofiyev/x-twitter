import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials || !credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials");

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword)
          throw new Error("Invalid credentials");

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/authentication",
    error: "/authentication",
  },
  callbacks: {},
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXT_AUTH_JWT_SECRET,
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);

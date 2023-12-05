import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
// import { User } from "@prisma/client";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("User", user);
      // console.log("Token", token);
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      // console.log("Session", session);
      if ((token?.user as { id: string }).id) {
        session.user.id = (token.user as { id: string }).id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

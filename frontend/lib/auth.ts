import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },

    async signIn({ user }) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register-social`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        });
      } catch (error) {
        console.error("❌ Erreur lors de la synchro backend:", error);
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { User } from "../../backend/src/models/User";
import { connectDB } from "../../backend/lib/db";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = jwt.sign(
          { id: token.sub, role: token.role || "user" },
          process.env.NEXT_PUBLIC_JWT_SECRET as string,
          { expiresIn: "1d" }
        );
      }

      if (user) {
        await connectDB();
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            role: user.email === "khhfofo93@gmail.com" ? "admin" : "user", // 🔥 Vérifie si ton email est bien ici
          });
        }

        token.role = existingUser.role;
      }

      console.log("✅ Token généré par NextAuth :", token); // 🔥 Vérification

      return token;
    },

    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
      }
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }

      console.log("✅ Token dans la session :", session.accessToken); // 🔥 Vérifie que c'est bien stocké

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

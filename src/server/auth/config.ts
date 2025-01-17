/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { actual_users } from "@/server/db/schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      email: string;
      paloki?: string;
      isAdmin?: boolean; // New field
    } & DefaultSession["user"];
  }
  interface User {
    username: string;
    paloki?: string;
    isAdmin?: boolean; // New field
  }
}
export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 2592000,
    updateAge: 86400,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const username = credentials.username as string;
        const password = credentials.password as string;

        try {
          const the_user = await db.query.actual_users.findFirst({
            where: eq(actual_users.username, username.trim()),
          });

          if (!the_user) {
            return null;
          }
          console.log("user exists", the_user);
          const comparison = await bcrypt.compare(
            password,
            the_user.password.trim(),
          );

          if (!comparison) {
            return null;
          }
          if (comparison === true) {
            console.log("password is correct");
          }
          return {
            id: the_user.id.trim(),
            username: the_user.username.trim(),
            email: the_user.email.trim(),
            paloki: "the_user.paloki",
            isAdmin: the_user.isAdmin,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
          token.username = user.username;
          token.email = user.email;
          token.paloki = user.paloki;
          token.isAdmin = user.isAdmin; // Include isAdmin in token
        }
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (token) {
          session.user.id = token.id as string;
          session.user.username = token.username as string;
          session.user.email = token.email!;
          session.user.paloki = token.paloki as string;
          session.user.isAdmin = token.isAdmin as boolean; // Include isAdmin in session
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
} satisfies NextAuthConfig;

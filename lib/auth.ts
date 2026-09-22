import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "TEACHER" | "STUDENT";
    isApproved?: boolean;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "TEACHER" | "STUDENT";
    isApproved?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const inputEmail = credentials.email.trim().toLowerCase();
        const inputPassword = credentials.password.trim();

        // 1. Hardcoded / Env Admin Credentials Check
        const adminEmail = (process.env.ADMIN_EMAIL || "admin@elephantchess.com").toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (
          (inputEmail === adminEmail || inputEmail === "admin") &&
          inputPassword === adminPassword
        ) {
          return {
            id: "admin-master",
            name: "Academy Admin",
            email: "admin@elephantchess.com",
            role: "ADMIN" as const,
            isApproved: true,
          };
        }

        // 2. Database User Lookup
        try {
          const user = await (prisma as any).user.findUnique({
            where: { email: inputEmail },
            include: {
              teacher: true,
              student: true,
            },
          });

          if (user) {
            const isValidPassword = await bcrypt.compare(inputPassword, user.password);
            if (isValidPassword) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isApproved: true,
              };
            }
          }
        } catch (e) {
          console.error("Prisma auth lookup error:", e);
        }

        // 3. Fallback for demo student account
        if (inputEmail === "student@elephantchess.com" && inputPassword === "student123") {
          return {
            id: "student-demo",
            name: "Demo Student",
            email: "student@elephantchess.com",
            role: "STUDENT" as const,
            isApproved: true,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login/admin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isApproved = user.isApproved;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isApproved = token.isApproved;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "modern-knight-secret-key-2026-super-secure",
};
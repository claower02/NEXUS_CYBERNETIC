import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Guest",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // For bypass mode, we just return a valid user
        return {
          id: "guest_" + Math.random().toString(36).substring(2, 9),
          name: "Guest Node",
          email: "guest@nexus.cyber",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest",
        }
      }
    }),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      })
    ] : []),
    ...(process.env.GOOGLE_ID && process.env.GOOGLE_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      })
    ] : []),
  ],
  secret: process.env.NEXTAUTH_SECRET || "nexus_cybernetic_default_secret_2025_secure_vault",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET || "nexus_cybernetic_default_secret_2025_secure_vault",
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect errors back to login instead of generic error page
  },
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id;
      }
      // Explicitly cast profile to any to access login safely, or check if login exists
      if (profile && 'login' in profile) {
        token.login = profile.login;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.login = token.login;
      }
      return session;
    }
  },
  debug: true, // Enable debug messages in development
});

export { handler as GET, handler as POST };

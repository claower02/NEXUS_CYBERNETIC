import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Guest",
      credentials: {},
      async authorize() {
        return {
          id: "guest_" + Math.random().toString(36).substring(2, 9),
          name: "Guest Node",
          email: "guest@nexus.cyber",
          image: null,
        }
      }
    }),
    ...(process.env.GITHUB_ID ? [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      })
    ] : []),
  ],
  secret: process.env.NEXTAUTH_SECRET || "nexus_cybernetic_default_secret_2025_secure",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };

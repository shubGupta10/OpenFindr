import NextAuth, { Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

type User = {
  id: string; 
  name: string;
  email: string;
  image: string;
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signOut: '/', 
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = account.userId;
        token.name = profile.name;
        token.email = profile.email;
        token.image = profile.image;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (token && session.user) {
        session.user.id = token.id as string; 
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

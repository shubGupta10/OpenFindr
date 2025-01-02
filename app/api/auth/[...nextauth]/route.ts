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
    async redirect({ url, baseUrl }) {
      console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
      console.log('Redirecting to:', baseUrl);
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };

import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/lib/queries";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-clients";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHubProvider],
  callbacks: {
    async signIn({ user, profile }) {
      const { id, login, bio } = profile || {};
      const { name, email, image } = user || {};

      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { 
        id,
      });

  

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || ",",
        });
      }

      return true;
    },
    async jwt({token, account, profile}){
      if(account && profile){
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
        token.id = user?.id;
      }
      return token;
    },
    async session({session, token}){
      Object.assign(session, {id: token.id});
      return session;
    }
  },
});

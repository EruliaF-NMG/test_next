import { JWTDecode } from "@/types/custom-jwt";
import { decode } from "jsonwebtoken";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          if (!credentials || !credentials.username || !credentials.password) return null;
          let response:any = await fetch("http://localhost:3000/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.username,
                password: credentials?.password,
              }),
          });
        
          response = await response.json();
          if(!response) return null;
          if(response?.data) {
            //console.log(response?.data,"yes")
            const jwtDecode: JWTDecode = decode(response.data.access_token) as JWTDecode;
            jwtDecode.access_token = response.data.access_token;
            jwtDecode.refresh_token = response.data.refresh_token;
            //console.log("jwtDecode",jwtDecode);
            return jwtDecode;
          }
          return null;
        }
      })
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      //console.log("session",session);
      session.user = token as any;
      session.user.id = token.id;
      session.accessToken = token.access_token;
      return session;
    },
  },
}

const handle =  NextAuth(authOptions);

export { handle as GET, handle as POST} 
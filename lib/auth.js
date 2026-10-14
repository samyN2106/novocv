import NextAuth from "next-auth";
import Google from "next-auth/providers/google"; 
import { PrismaAdapter } from "@auth/prisma-adapter"; 
import prisma from "@/lib/prisma"; 
import Credentials from "next-auth/providers/credentials"
import { encode, decode } from "next-auth/jwt";
import bcrypt from "bcrypt"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma), 
  providers: [
    Credentials({
      credentials:{
        email: {},
        password: {},
        rememberMe:{},
      },

      authorize: async(credentials)=>{
        const user=await prisma.user?.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user || !user?.emailVerified){
          return null
        }
        

          const passwordCorrect =  bcrypt.compare(
            credentials.password,
            user.password
          );

           if (!passwordCorrect) {
            return null;
          }
          

          return  { id:user.id,
                    email:user.email,
                    rememberMe:credentials.rememberMe === "true"
                  };
      }

    }),
    Google({ clientId: process.env.AUTH_GOOGLE_ID,
              clientSecret: process.env.AUTH_GOOGLE_SECRET,
              allowDangerousEmailAccountLinking: true,
           }),
    ],

    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
   
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email=user.email
        token.rememberMe = user.rememberMe;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email=token.email
      return session;
    },
  },



jwt: {
  async encode({ token, secret, salt }) {
    const rememberMe = token?.rememberMe === true;

    const maxAge = rememberMe
      ? 30 * 24 * 60 * 60 // 30 jours
      : 24 * 60 * 60;     // 1 jour

    return encode({
      token,
      secret,
      salt,
      maxAge,
    });
  },

  async decode({ token, secret, salt }) {
    return decode({
      token,
      secret,
      salt,
    });
  },
},




});
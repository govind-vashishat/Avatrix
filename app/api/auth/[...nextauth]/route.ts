import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
      ],
    pages: {
      signIn: "/auth/signin",
    },  
    secret: process.env.NEXTAUTH_SECRET,
    callbacks : {
        async signIn(params) {
            if(!params.user.email) {
              return false;
            };

            try {
              const existingUser = await prismaClient.user.findUnique({
                where: {
                  email: params.user?.email,
                }
              });

              if(!existingUser) {
                await prismaClient.user.create({
                  data: {
                    email: params.user?.email,
                  }
                })
                return true;
              }

              return true;
            } catch (error) {
              console.log(error);
              return false;
            };
        },
    }, 
})

export { handler as GET, handler as POST }
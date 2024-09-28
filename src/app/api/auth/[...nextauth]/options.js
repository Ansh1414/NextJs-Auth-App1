import GoogleProvider from "next-auth/providers/google";
import {OuthUserRegister} from "@/app/api/users/signup/outhUserRegistry"
export const authOptions={
  secret: process.env.NEXTAUTH_SECRET ,
   
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('-----inside signIn user callback-----',user);
      console.log('-----inside signIn account callback-----',account);
      console.log('-----inside signIn credentials callback-----',credentials);
      console.log('-----inside signIn profile callback-----',profile);
      if (account.provider === "google") {
        return true;//profile.email_verified && profile.email.endsWith("@gmail.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session, token, user }) {
        console.log('-----inside session user callback-----',user);
        console.log('-----inside session token callback-----',token);
        console.log('-----inside session session callback-----',session);
        return session
      },
    async jwt({ token, user, account, profile, isNewUser }) {
        console.log('-----inside jwt user callback-----',user);
        console.log('-----inside jwt account callback-----',account);
        console.log('-----inside jwt token callback-----',token);
        
        console.log('-----inside jwt profile callback-----',profile);
       
        token=await OuthUserRegister(profile,token);
       // token.userId=fetchedUserId;
        console.log('-----inside jwt token-----',token);
        
        return token
    }

  },
  events: {
    error: (message) => {
      console.error('OAuth error:', message);
    },
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt" ,//"database"
  
    // Seconds - How long until an idle session expires and is no longer valid.
    /*maxAge: 30 * 24 * 60 * 60, // 30 days
  */
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    /*updateAge: 24 * 60 * 60, // 24 hours
  */
    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    /*generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }*/
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
  }

};

import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";

export const authOptions: NextAuthOptions = {
  //todo pages

  // Authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        // Input fields expected from the login form
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<LoginResponse> = await response.json();

        // Validate credentials before API request to avoid unnecessary network calls
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        if ("error" in payload) {
          throw new Error(payload.error);
        }
        return {
          id: payload.user._id,
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // Add user and token to JWT payload after successful login
        token.token = user.token;
        token.user = user.user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Adding user data to session
      session.user = token.user;
      return session;
    },
  },
};

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
                    const response = await axios.post(`${apiUrl}/users/login`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    const user = response.data;

                    if (user) {
                        return {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            token: user.token,
                        };
                    }
                    return null;
                } catch (error: any) {
                    console.error("Auth error:", error.response?.data?.message || error.message);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});

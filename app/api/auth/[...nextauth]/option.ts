import { getXataClient } from '@/xata'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcrypt";
import { z } from 'zod';

const userObject = z.object({
    username : z.string(),
    password: z.string(),
});

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your secret stuff"
                }
            },
            async authorize(credentials) {
                const parsedReq = userObject.parse(credentials)
                if (!parsedReq) {
                    return null;
                }
                
                const client = getXataClient()
                const user = await  client.db.user.filter({
                    username: parsedReq.username,
                }).getFirst();

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(parsedReq.password, user.password!);
                if (!passwordMatch) {
                    return null;
                }

                return user;
            }
        })
    ],
}
import authConfig from "@/lib/auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import { withRequestLogging } from "@/utils/logger"

export const config = {
	matcher: ["/app"],
};

const { auth } = NextAuth(authConfig)

const middleware = auth((req) => {
        if (!req.auth) {
                return NextResponse.redirect(new URL("/api/auth/signin", req.url));
        }
});

export default withRequestLogging(middleware);

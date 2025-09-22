"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
// @toDo: ver se realmente estou usando essa function
export default function SessionProviderWrapper({ children }: { children: ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}

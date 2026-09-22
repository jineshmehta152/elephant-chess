"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { BookDemoProvider } from "@/components/ui/BookDemoModal";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <BookDemoProvider>
                {children}
                <Toaster position="top-right" richColors />
            </BookDemoProvider>
        </SessionProvider>
    );
}

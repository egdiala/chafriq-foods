import { Suspense } from "react";
import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "@/components/ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
        <NuqsAdapter>{children}</NuqsAdapter> <Toaster position="bottom-center" toastOptions={{ className: "w-full max-w-98" }} />
      <ReactQueryDevtools />
    </TRPCReactProvider>
  );
};

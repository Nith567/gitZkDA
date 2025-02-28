"use client";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { createWalletClient, createPublicClient } from "viem";
import { http } from "wagmi";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import {manta } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "zkGitDA",
  projectId:
    process.env.NEXT_PUBLIC_PROJECT_ID || "3edba4009c97c98400b0c8df8ca3d590",
  chains: [manta],
  transports: {
    [manta.id]: http(
      "https://manta-pacific.drpc.org"
    ),
  },
  ssr: true,
});

export const walletClient = createWalletClient({
  chain: manta,
  //@ts-ignore
  transport: http(),
});
export const publicClient = createPublicClient({
  chain: manta,
  transport: http(
    "https://manta-pacific.drpc.org"
  ),
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#111111",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

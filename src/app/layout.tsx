
import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zkGitDA",
  description:
    "contribute and win through on PR merge repo's through zk on MANTA chain as Celestia as DA layer",
  icons: ["/logo/logo-dark.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

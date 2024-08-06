import type { Metadata } from "next";
import { Inter } from "next/font/google";
import OnchainProviders from "@/providers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attestation Explorer",
  description: "Explore and create onchain credentials via Talent Passport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <OnchainProviders initialState={initialState}>
        <body className={inter.className}>{children}</body>
      </OnchainProviders>
    </html>
  );
}

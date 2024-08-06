import type { Metadata } from "next";
import { Inter } from "next/font/google";
import OnchainProviders from "@/providers/web3-modal-provider";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import { headers } from "next/headers";
import { Toaster } from "sonner";
import { AuthenticationProvider } from "@/providers/authentication";

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
        <AuthenticationProvider>
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </AuthenticationProvider>
      </OnchainProviders>
    </html>
  );
}

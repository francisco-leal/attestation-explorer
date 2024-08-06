import type { Metadata } from "next";
import { Inter } from "next/font/google";
import OnchainProviders from "@/providers";
import "@coinbase/onchainkit/styles.css";
import "@/app/globals.css";

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
  return (
    <html lang="en">
      <OnchainProviders>
        <body className={inter.className}>{children}</body>
      </OnchainProviders>
    </html>
  );
}

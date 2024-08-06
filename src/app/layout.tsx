import type { Metadata } from "next";
import { Inter } from "next/font/google";
import OnchainProviders from "@/providers/web3-modal-provider";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import { headers } from "next/headers";
import { Toaster } from "sonner";
import { AuthenticationProvider } from "@/providers/authentication";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { Box } from "@mui/joy";

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
          <CssVarsProvider>
            <CssBaseline />
            <body className={inter.className}>
              <Box
                component="main"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                {children}
              </Box>
              <Toaster />
            </body>
          </CssVarsProvider>
        </AuthenticationProvider>
      </OnchainProviders>
    </html>
  );
}

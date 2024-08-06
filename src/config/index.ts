import { baseSepolia } from "wagmi/chains";
import { cookieStorage, createStorage, http } from "wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "attestation-explorer",
  description: "Attestation Explorer",
  url: "https://attestation-explorer.vercel.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [baseSepolia] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [baseSepolia.id]: http(),
  },
});

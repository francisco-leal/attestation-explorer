import { baseSepolia } from "wagmi/chains";
import { cookieStorage, createStorage } from "wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

export const projectId = "3f88eba84aae97b2105416856a9d164c";
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
});

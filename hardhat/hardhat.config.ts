import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./src/environment";

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const WALLET_PRIVATE_KEY = vars.get("WALLET_PRIVATE_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    baseSepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [WALLET_PRIVATE_KEY],
    },
  },
};

export default config;

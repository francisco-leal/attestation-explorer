import { ethers } from "hardhat";
import { Contracts as EasContracts } from "@ethereum-attestation-service/eas-sdk";
import fs from "fs/promises";
import { JsonRpcSigner } from "ethers";
import { JSON_FILE_WITH_EAS_CONTRACT_ADDRESSES } from "../src/constants";
import "../src/environment";

const url = process.env.DEPLOYMENT_NETWORK_URL;
const networkName = process.env.DEPLOYMENT_NETWORK_NAME;

console.debug("url", url, "networkName", networkName);

async function deploySchemaRegistryContract(
  signer: JsonRpcSigner
): Promise<string> {
  const SchemaRegistryFactory = new EasContracts.SchemaRegistry__factory(
    EasContracts.SchemaRegistry__factory.abi,
    EasContracts.SchemaRegistry__factory.bytecode,
    signer
  );
  const schemaRegistry = await SchemaRegistryFactory.deploy();

  await schemaRegistry.waitForDeployment();

  const schemaRegistryAddress = await schemaRegistry.getAddress();

  console.log("Schema Registry Contract address:", schemaRegistryAddress);

  return schemaRegistryAddress;
}

async function deployEasContract(
  signer: JsonRpcSigner,
  schemaRegistryAddress: string
): Promise<string> {
  const EasFactory = new EasContracts.EAS__factory(
    EasContracts.EAS__factory.abi,
    EasContracts.EAS__factory.bytecode,
    signer
  );
  const eas = await EasFactory.deploy(schemaRegistryAddress);

  await eas.waitForDeployment();

  const easAddress = await eas.getAddress();

  console.log("EAS Contract address:", schemaRegistryAddress);

  return easAddress;
}

async function main() {
  const provider = new ethers.JsonRpcProvider(url);
  const signer = await provider.getSigner();

  const schemaRegistryAddress = await deploySchemaRegistryContract(signer);

  const easAddress = await deployEasContract(signer, schemaRegistryAddress);

  const easContractAddress = {
    eas: easAddress,
    schemaRegistry: schemaRegistryAddress,
  };
  const deploymentInfo = [
    {
      url,
      networkName,
      addresses: easContractAddress,
    },
  ];

  // TODO: this should not be overwriting existing entries
  await fs.writeFile(
    JSON_FILE_WITH_EAS_CONTRACT_ADDRESSES,
    JSON.stringify(deploymentInfo)
  );
  console.log(
    `Contract addresses saved to ${JSON_FILE_WITH_EAS_CONTRACT_ADDRESSES}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import { EAS, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "hardhat";
import fs from "fs/promises";
import "../src/environment";

import {
  DEPLOYED_CONTRACTS_FOLDER,
  JSON_FILE_WITH_EAS_CONTRACT_ADDRESSES,
  REGISTERED_SCHEMAS_FOLDER,
  REGISTERED_TALENT_PROTOCOL_PASSPORT_SCHEMA_RECORD_NAME,
  TALENT_PROTOCOL_PASSPORT_SCHEMA_API_FILE,
} from "../src/constants";
import RegisteredTalentProtocolPassportSchemaRecord from "../src/types/RegisteredTalentProtocolPassportSchemaRecord";
import DeployedEasAddresses from "../src/types/DeployedEasAddresses";
import path from "path";

const url = process.env.DEPLOYMENT_NETWORK || "";

console.debug("url", url);

async function writeSchemaRecord(
  name: string,
  schemaRecords: RegisteredTalentProtocolPassportSchemaRecord[]
) {
  const schemaRecordStr = JSON.stringify(schemaRecords);
  return await fs.writeFile(
    `${REGISTERED_SCHEMAS_FOLDER}/${name}.json`,
    schemaRecordStr
  );
}

async function readSchemaAbi(): Promise<string> {
  const result = fs.readFile(
    path.join(__dirname, `../abi/${TALENT_PROTOCOL_PASSPORT_SCHEMA_API_FILE}`),
    "utf-8"
  );
  return result;
}

(async () => {
  const data = await fs.readFile(JSON_FILE_WITH_EAS_CONTRACT_ADDRESSES, "utf8");

  const EAS_CONTRACT_ADDRESSES = JSON.parse(data).filter(
    (a: DeployedEasAddresses) => a.url === url
  )[0].addresses;

  const schemaRegistryContractAddress = EAS_CONTRACT_ADDRESSES.schemaRegistry;
  console.debug(
    "Schema Registry Contract Address",
    schemaRegistryContractAddress
  );

  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

  const easContractAddress = EAS_CONTRACT_ADDRESSES.eas;
  console.debug("EAS Contract Address", easContractAddress);

  const eas = new EAS(easContractAddress);

  const provider = new ethers.JsonRpcProvider(url);
  console.debug("Provider", provider);

  const signer = await provider.getSigner();

  console.debug("Connecting to EAS contract");
  eas.connect(signer);
  console.debug(".........end connecting to EAS contract");

  console.debug("Connecting to Schema Registry contract");
  schemaRegistry.connect(signer);
  console.debug(".........end connecting to Schema Registry contract");

  const schema = await readSchemaAbi();
  const resolverAddress = "0x0000000000000000000000000000000000000000";
  const revocable = true;

  console.debug("About to register schema *", schema, "***************");

  const transaction = await schemaRegistry.register({
    schema,
    resolverAddress,
    revocable,
  });

  // Optional: Wait for transaction to be validated
  const receipt = await transaction.wait();
  console.debug("Schema Registration Receipt", receipt);

  const schemaUid = receipt;
  const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUid });

  console.debug("Schema UID", schemaRecord.uid);
  console.debug("Schema Resolver", schemaRecord.resolver);
  console.debug("Schema revocable", schemaRecord.revocable);
  console.debug("Schema schema", schemaRecord.schema);

  const registeredTalentProtocolPassportSchemaRecord: RegisteredTalentProtocolPassportSchemaRecord =
    {
      url: url,
      schemaRecord: {
        uid: schemaRecord.uid,
        resolver: schemaRecord.resolver,
        revocable: schemaRecord.revocable,
        schema: schemaRecord.schema,
      },
    };

  await writeSchemaRecord(
    REGISTERED_TALENT_PROTOCOL_PASSPORT_SCHEMA_RECORD_NAME,
    [registeredTalentProtocolPassportSchemaRecord]
  );
})();

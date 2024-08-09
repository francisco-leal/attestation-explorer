import path from "path";

const DEPLOYED_CONTRACTS_FOLDER = path.join(__dirname, "../deployed/contracts");
const EAS_CONTRACT_ADDRESSES = "easContractAddresses.json";
const ENVIRONMENT = process.env.NODE_ENV || "development";
const JSON_FILE_WITH_EAS_CONTRACT_ADDRESSES = `${DEPLOYED_CONTRACTS_FOLDER}/${EAS_CONTRACT_ADDRESSES}`;

export { DEPLOYED_CONTRACTS_FOLDER };
export { EAS_CONTRACT_ADDRESSES };
export { ENVIRONMENT };
export { JSON_FILE_WITH_EAS_CONTRACT_ADDRESSES };

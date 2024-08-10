import { SchemaRecord } from "@ethereum-attestation-service/eas-sdk";

type RegisteredSchemaRecord = {
  url: string;
  schemaRecord: SchemaRecord;
};

export default RegisteredSchemaRecord;

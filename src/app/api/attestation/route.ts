import { NextRequest } from "next/server";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { baseSepolia } from "viem/chains";
import { ethers } from "ethers";
import {
  getTalentPassport,
  getCredentialsForPassport,
} from "@/server/talent-protocol";
import { convertPassportToJson } from "@/utils/passportToJson";
import jsonPassportToEasAttestation from "@/utils/jsonPassportToEasAttestation";

const talent_key = process.env.TALENT_KEY || "0x0";

export const maxDuration = 60;
export async function POST(request: NextRequest) {
  const eas = new EAS("0x4200000000000000000000000000000000000021");
  const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
  const signer = new ethers.Wallet(talent_key, provider);

  if (!signer || !provider)
    return Response.json(
      { message: "couldnt establish connection to provider" },
      { status: 401 }
    );

  const { passport_id } = await request.json();
  const passport = await getTalentPassport(passport_id);
  if (!passport)
    return Response.json({ message: "passport not found" }, { status: 404 });

  const passportCredentials = await getCredentialsForPassport(passport_id);
  const passportJson = convertPassportToJson(passport, passportCredentials);
  const easData = jsonPassportToEasAttestation(passportJson);

  eas.connect(signer);
  const schemaEncoder = new SchemaEncoder(
    "string id,string[] type,string name,string description,string credentialSubjectId,string credentialSubjectName,string[] credentialSubjectTypes,string[] credentialSubjectTypesIds,string[] credentialSubjectTypesNames,string[] credentialSubjectTypesCategories,string[] credentialSubjectTypesValidFroms,string[] credentialSubjectTypesValidUntils,uint16[] credentialSubjectTypesScores,string[] credentialSubjectTypesData,string validFrom,string validUntil,string[] statusesTypes,string[] statusesCredentialSubjectIds,bool[] statusesCredentialSubjectRevoked,string credentialSchemaId,string credentialSchemaType,string termsOfUseId,string termsOfUseType"
  );

  const encodedData = schemaEncoder.encodeData(easData);
  const schemaUID =
    "0xb7e3b399cbcafc2b2b407c9008fce5b3b83dbcb38bc80d9327afdee69f8f0942";

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: passport.verified_wallets[0],
      expirationTime: BigInt(0),
      revocable: true,
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);

  return Response.json({ uid: newAttestationUID }, { status: 200 });
}

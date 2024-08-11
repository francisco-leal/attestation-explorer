// TODO: Can we define the type of the validPassport?

import {
  EasSchemaElement,
  EasSchemaElementValue,
  PropertyType,
} from "@/types/eas";

import { TalentPassport, PassportCredential } from "@/server/talent-protocol";

const easElement = (
  name: string,
  value: EasSchemaElementValue,
  type: string
): EasSchemaElement => {
  return {
    name,
    value,
    type,
  };
};

const id = (validPassport: TalentPassport): EasSchemaElement => {
  return easElement(
    "id",
    `https://passport.talentprotocol.com/profile/${validPassport.passport_id}`,
    "string"
  );
};

const type = (validPassport: any): any => {
  return easElement("type", validPassport.type, "string[]");
};

const name = (validPassport: any): any => {
  return easElement("name", validPassport.name, "string");
};

const description = (validPassport: any): any => {
  return easElement("description", validPassport.description, "string");
};

const validFrom = (validPassport: any): any => {
  return easElement("validFrom", validPassport.validFrom || "", "string");
};

const validUntil = (validPassport: any): any => {
  return easElement("validUntil", validPassport.validUntil || "", "string");
};

const credentialSubjectId = (credentialSubject: any): any => {
  return easElement("credentialSubjectId", credentialSubject.id, "string");
};

const credentialSubjectName = (credentialSubject: any): any => {
  return easElement("credentialSubjectName", credentialSubject.name, "string");
};

const credentialTypeNames = (credentialSubject: any): string[] => {
  return Object.keys(credentialSubject).filter(
    (k) => !["id", "name"].includes(k)
  );
};

const credentialSubjectTypes = (credentialSubject: any): any => {
  const value = credentialTypeNames(credentialSubject);

  return easElement("credentialSubjectTypes", value, "string[]");
};

const credentialSubjectTypesProperties = (
  credentialSubject: any,
  mappingToName: string,
  propertyName: string,
  propertyType: PropertyType = PropertyType.String
): any => {
  const value = credentialTypeNames(credentialSubject).map((typeName) => {
    let valueForProperty = credentialSubject[typeName][propertyName];
    if (propertyType === PropertyType.String && valueForProperty === null) {
      valueForProperty = "";
    }
    return valueForProperty;
  });

  return easElement(mappingToName, value, `${propertyType}[]`);
};

const credentialSubjectTypesIds = (credentialSubject: any): any => {
  return credentialSubjectTypesProperties(
    credentialSubject,
    "credentialSubjectTypesIds",
    "id"
  );
};

const credentialSubjectTypesNames = (credentialSubject: any): any => {
  return credentialSubjectTypesProperties(
    credentialSubject,
    "credentialSubjectTypesNames",
    "name"
  );
};

const credentialSubjectTypesCategories = (credentialSubject: any): any => {
  return credentialSubjectTypesProperties(
    credentialSubject,
    "credentialSubjectTypesCategories",
    "category"
  );
};

const credentialSubjectTypesValidFroms = (credentialSubject: any): any => {
  return credentialSubjectTypesProperties(
    credentialSubject,
    "credentialSubjectTypesValidFroms",
    "validFrom"
  );
};

const credentialSubjectTypesValidUntils = (credentialSubject: any): any => {
  return credentialSubjectTypesProperties(
    credentialSubject,
    "credentialSubjectTypesValidUntils",
    "validUntil"
  );
};

const credentialSubjectTypesScores = (credentialSubject: any): any => {
  return credentialSubjectTypesProperties(
    credentialSubject,
    "credentialSubjectTypesScores",
    "score",
    PropertyType.Uint16
  );
};

const credentialSubjectTypesData = (credentialSubject: any): any => {
  return credentialSubjectTypesProperties(
    credentialSubject,
    "credentialSubjectTypesData",
    "data"
  );
};

const credentialSubject = (validPassport: any): any => {
  return [
    credentialSubjectId(validPassport.credentialSubject),
    credentialSubjectName(validPassport.credentialSubject),
    credentialSubjectTypes(validPassport.credentialSubject),
    credentialSubjectTypesIds(validPassport.credentialSubject),
    credentialSubjectTypesNames(validPassport.credentialSubject),
    credentialSubjectTypesCategories(validPassport.credentialSubject),
    credentialSubjectTypesValidFroms(validPassport.credentialSubject),
    credentialSubjectTypesValidUntils(validPassport.credentialSubject),
    credentialSubjectTypesScores(validPassport.credentialSubject),
    credentialSubjectTypesData(validPassport.credentialSubject),
  ];
};

const statusTypes = (status: any): any => {
  const value: string = status.map((s: any) => s.type);

  return easElement("statusesTypes", value, "string[]");
};

const statusesCredentialSubjectIds = (status: any): any => {
  const value: string = status.map((s: any) => s.credentialSubject.id);

  return easElement("statusesCredentialSubjectIds", value, "string[]");
};

const statusesCredentialSubjectRevoked = (status: any): any => {
  const value: string = status.map((s: any) => s.revoked);

  return easElement("statusesCredentialSubjectRevoked", value, "bool[]");
};

const status = (validPassport: any): any => {
  return [
    statusTypes(validPassport.status),
    statusesCredentialSubjectIds(validPassport.status),
    statusesCredentialSubjectRevoked(validPassport.status),
  ];
};

const credentialSchemaId = (validPassport: any): any => {
  return easElement(
    "credentialSchemaId",
    validPassport.credentialSchema.id,
    "string"
  );
};

const credentialSchemaType = (validPassport: any): any => {
  return easElement(
    "credentialSchemaType",
    validPassport.credentialSchema.type,
    "string"
  );
};

const termsOfUseId = (validPassport: any): any => {
  return easElement("termsOfUseId", validPassport.termsOfUse.id, "string");
};

const termsOfUseType = (validPassport: any): any => {
  return easElement("termsOfUseType", validPassport.termsOfUse.type, "string");
};

const jsonPassportToEasAttestation = (validPassport: any): any => {
  return [
    id(validPassport),
    type(validPassport),
    name(validPassport),
    description(validPassport),
  ]
    .concat(credentialSubject(validPassport))
    .concat([validFrom(validPassport), validUntil(validPassport)])
    .concat(status(validPassport))
    .concat([
      credentialSchemaId(validPassport),
      credentialSchemaType(validPassport),
      termsOfUseId(validPassport),
      termsOfUseType(validPassport),
    ]);
};

export default jsonPassportToEasAttestation;

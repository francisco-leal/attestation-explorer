import { TalentPassport, PassportCredential } from "@/server/talent-protocol";

const passportName = (validPassport: TalentPassport): string => {
  return (
    validPassport.passport_profile?.name ||
    validPassport.user?.name ||
    validPassport.user?.display_name ||
    `passport-${validPassport.passport_id}`
  );
};

const passportWallet = (validPassport: TalentPassport): string => {
  return validPassport.verified_wallets[0];
};

const getCurrentDate = (): string => {
  return new Date().toISOString();
};

const get3MonthsFromNow = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return date.toISOString();
};

const getCredentialSubjectURL = (passport: TalentPassport): string => {
  const wallet = passportWallet(passport);
  if (!wallet) {
    return `https://passport.talentprotocol.com/passports/${passport.passport_id}`;
  }
  return `https://basescan.org/address/${wallet}`;
};

export const convertPassportToJson = (
  passport: TalentPassport,
  credentials: PassportCredential[]
) => {
  const credentialJson = credentials.reduce((jsonObject, credential) => {
    return {
      ...jsonObject,
      [credential.type]: {
        id: `https://passport.talentprotocol.com/credentials/${credential.id}`,
        name: credential.name,
        category: credential.category,
        validFrom: credential.earned_at,
        validUntil: null,
        score: credential.score,
        data: credential.value,
      },
    };
  }, {});

  const statusJson = credentials.map((credential) => {
    return {
      type: credential.type,
      credentialSubject: {
        id: `https://passport.talentprotocol.com/credentials/${credential.id}`,
      },
      revoked: false,
    };
  });

  return {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "https://www.w3.org/ns/credentials/examples/v2",
    ],
    id: `https://passport.talentprotocol.com/passports/${passport.passport_id}`,
    type: ["VerifiableCredential", "TalentProtocolPassportCredential"],
    name: `${passportName(passport)} Talent Protocol Credentials`,
    description: `A verification of Talent Protocol Credentials issued by Talent Protocol to ${passportName(
      passport
    )}`,
    issuer: {
      id: "talentprotocol.eth",
      name: "Talent Protocol",
    },
    credentialSubject: {
      id: getCredentialSubjectURL(passport),
      name: passportName(passport),
      ...credentialJson,
    },
    validFrom: getCurrentDate(),
    validUntil: null,
    status: statusJson,
    credentialSchema: {
      id: "https://passport.talentprotocol.com/schemas/TalentProtocolCredential.json",
      type: "JsonSchema",
    },
    termsOfUse: {
      id: "https://passport.talentprotocol.com/credentials/terms_of_use",
      type: "IssuerPolicy",
    },
  };
};

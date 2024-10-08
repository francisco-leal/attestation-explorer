"use server";

import { cookies } from "next/headers";
import { sealData } from "iron-session";
import { SiweMessage, generateNonce } from "siwe";
import { SessionUser } from "./users";
import { getTalentPassport } from "./talent-protocol";

const sessionPassword = process.env.SESSION_PASSWORD as string;
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export const getNonce = async () => {
  return generateNonce();
};

export const connectUser = async ({
  address,
  message,
  signature,
  nonce,
}: {
  address: string;
  message: string;
  signature: string;
  nonce: string;
}) => {
  const siweObject = new SiweMessage(message);

  const { data: siweMessage, error } = await siweObject.verify({
    signature: signature,
    nonce: nonce,
  });

  if (error) throw new Error("Error verifying message");

  const passport = await getTalentPassport(address.toLowerCase());

  const sessionUser: SessionUser = {
    wallet: address,
    passportId: passport?.passport_id,
    profile: {
      image_url: passport?.user?.profile_picture_url,
      name: passport?.user?.display_name || passport?.user?.name || address,
    },
    siwe: {
      address: siweMessage.address,
      nonce: siweMessage.nonce,
      issuedAt: siweMessage.issuedAt,
      expirationTime: siweMessage.expirationTime,
    },
  };

  const encryptedSession = await sealData(JSON.stringify(sessionUser), {
    password: sessionPassword,
  });

  cookies().set("auth_session", encryptedSession, {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // One year
    path: "/",
  });
};

export const disconnectUser = async () => {
  await cookies().delete("auth_session");
};

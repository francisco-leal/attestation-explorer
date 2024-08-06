"use server";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";

const sessionPassword = process.env.SESSION_PASSWORD as string;
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export type SessionUser = {
  wallet: string;
  passportId?: number;
  profile: {
    image_url?: string;
    name: string;
  };
  siwe?: {
    nonce: string;
    address: string;
    issuedAt?: string;
    expirationTime?: string;
  };
};

export async function getSession(): Promise<SessionUser | null> {
  try {
    const encryptedSession = cookies().get("auth_session")?.value;

    const session = encryptedSession
      ? ((await unsealData(encryptedSession, {
          password: sessionPassword,
        })) as string)
      : null;

    return session ? (JSON.parse(session) as SessionUser) : null;
  } catch (e) {
    return null;
  }
}

export const getCurrentUser = async () => {
  const user = await getSession();
  if (!user) return null;
  return user;
};

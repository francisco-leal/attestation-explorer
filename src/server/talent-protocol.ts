"use server";
import { unstable_cache } from "next/cache";
import { CacheKey, CACHE_5_MINUTES } from "@/utils/cache";

type PassportResponse = {
  passport: TalentPassport;
  error?: string;
};

export type TalentPassport = {
  score: number;
  passport_id: number;
  verified: boolean;
  user: {
    profile_picture_url: string;
    name: string;
    display_name: string;
  } | null;
  passport_profile: {
    image_url: string;
    name: string;
    bio: string;
  } | null;
  verified_wallets: Array<string>;
};

export type PassportCredentials = {
  passport_credentials: PassportCredential[];
};

export type PassportCredential = {
  id: string;
  last_calculated_at: string;
  max_score: number;
  name: string;
  score: number;
  type: string;
  value: string;
  category: string;
  earned_at: string | null;
  onchain_at: string | null;
};

export const getTalentPassport = (wallet: string) => {
  return unstable_cache(
    async (wallet: string) => {
      const api_url = process.env.PASSPORT_API_URL;
      const api_token = process.env.PASSPORT_API_TOKEN;
      const url = `${api_url}/api/v2/passports/${wallet}`;
      const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": api_token || "",
      };

      try {
        const response = await fetch(url, { headers });
        const data = (await response.json()) as PassportResponse;
        if (!response.ok) return null;
        if (response.status !== 200) return null;
        if (data.error) return null;
        if (!data.passport) return null;
        return data.passport;
      } catch (error) {
        console.log("Error fetching Talent Protocol user", error as Error);
        return null;
      }
    },
    [`talent_protocol_${wallet}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES }
  )(wallet);
};

export const getCredentialsForPassport = async (passportId: number | null) => {
  return unstable_cache(
    async (passportId: number | null) => {
      const api_url = process.env.PASSPORT_API_URL;
      const api_token = process.env.PASSPORT_API_TOKEN;
      const id = passportId;

      if (!id) return [];

      const url = `${api_url}/api/v2/passport_credentials?id=${id}`;
      const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": api_token || "",
      };

      try {
        const response = await fetch(url, { headers });
        const data = (await response.json()) as PassportCredentials;

        const credentials = data.passport_credentials.filter(
          (c) => c.score > 0.0
        );

        return credentials;
      } catch {
        return [];
      }
    },
    [`talent_protocol_credentials_${passportId}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES }
  )(passportId);
};

// @TODO: Implement creating a talent passport for users that dont have one
export const createTalentPassport = (wallet: string) => {};

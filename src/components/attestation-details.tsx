"use client";
import { Typography, Box, Button } from "@mui/joy";
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { useEthersSigner } from "@/components/attestation-creator";
import { baseSepolia } from "viem/chains";
import { useEffect, useState } from "react";

export const AttestationDetails = ({ uid }: { uid: string }) => {
  const signer = useEthersSigner({ chainId: baseSepolia.id });
  const [attestation, setAttestation] = useState<any | null>(null);

  useEffect(() => {
    if (!signer) return;
    const fetchAttestation = async () => {
      const eas = new EAS("0x4200000000000000000000000000000000000021");
      eas.connect(signer);

      const attestation = await eas.getAttestation(uid);
      setAttestation(attestation);
    };
    fetchAttestation();
  }, [uid, signer]);

  return <></>;
};

"use client";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import type { Account, Chain, Client, Transport } from "viem";
import { type Config, useConnectorClient, useAccount } from "wagmi";
import { useMemo } from "react";
import { baseSepolia } from "viem/chains";
import { Button } from "@mui/joy";
import { useState } from "react";
import { useRouter } from "next/navigation";

function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}

export const AttestationCreator = ({ passportId }: { passportId: number }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signer = useEthersSigner({ chainId: baseSepolia.id });
  if (!signer) return null;

  const createAttestation = async () => {
    setLoading(true);
    const response = await fetch("/api/attestation", {
      method: "POST",
      body: JSON.stringify({ passport_id: passportId }),
    });

    const { uid } = await response.json();

    router.push(`/attestations/${uid}`);
    setLoading(false);
  };

  return (
    <Button onClick={() => createAttestation()} loading={loading}>
      Create
    </Button>
  );
};

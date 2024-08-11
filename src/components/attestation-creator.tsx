"use client";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import type { Account, Chain, Client, Transport } from "viem";
import { type Config, useConnectorClient } from "wagmi";
import { useMemo } from "react";
import { PassportCredential } from "@/server/talent-protocol";
import { baseSepolia } from "viem/chains";
import { Button } from "@mui/joy";
import { useState } from "react";

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
function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}

export const AttestationCreator = ({
  credentials,
  passportId,
}: {
  credentials: PassportCredential[];
  passportId: number;
}) => {
  const [loading, setLoading] = useState(false);
  const signer = useEthersSigner({ chainId: baseSepolia.id });
  if (!signer) return null;

  const createAttestation = async () => {
    setLoading(true);
  };

  return (
    <Button onClick={() => createAttestation()} loading>
      Create
    </Button>
  );
};

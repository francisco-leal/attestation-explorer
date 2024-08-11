"use client";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import type { Account, Chain, Client, Transport } from "viem";
import { type Config, useConnectorClient, useAccount } from "wagmi";
import { useMemo } from "react";
import { PassportCredential } from "@/server/talent-protocol";
import { baseSepolia } from "viem/chains";
import { Button } from "@mui/joy";
import { useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

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
  attestationData,
}: {
  attestationData: any;
}) => {
  const { address } = useAccount();

  const [loading, setLoading] = useState(false);
  const signer = useEthersSigner({ chainId: baseSepolia.id });
  if (!signer) return null;

  const createAttestation = async () => {
    setLoading(true);
    if (!signer) return;
    if (!address) return;
    const eas = new EAS("0x4200000000000000000000000000000000000021");
    eas.connect(signer);

    // replace this with the schema for the passport
    const schemaEncoder = new SchemaEncoder(
      "uint256 weight, uint256 date_of_measurement"
    );
    const date = new Date();
    const encodedData = schemaEncoder.encodeData(attestationData);
    const schemaUID =
      "0xc954dc973cc7e7aefbdf245dd90ca2af522d32d487a1fcb8f47200cf61138b82";

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: address,
        expirationTime: BigInt(0),
        revocable: true,
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();

    console.log("New attestation UID:", newAttestationUID);

    alert(`Attestation created! 🎉 ${newAttestationUID}`);

    setLoading(false);
  };

  return (
    <Button onClick={() => createAttestation()} loading={loading}>
      Create
    </Button>
  );
};

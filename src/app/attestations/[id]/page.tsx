import { Typography, Box, Button } from "@mui/joy";

export default async function AttestationIDPage({
  params,
}: {
  params: { id: string };
}) {
  const attestationId = params.id;

  // @TODO show attestation in detail
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "auto",
          paddingX: { sm: 6, md: 8, lg: 12 },
          paddingY: 12,
          gap: 4,
        }}
      >
        <Typography level="title-lg">Attestation Explorer</Typography>
        <Button
          href={`https://base-sepolia.easscan.org/attestation/view/${attestationId}`}
          component="a"
          target="_blank"
        >
          View on EAS Scan
        </Button>
      </Box>
    </>
  );
}

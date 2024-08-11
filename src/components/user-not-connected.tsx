import { Box, Typography } from "@mui/joy";

export const UserNotConnected = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "justify-center",
        alignItems: "center",
        gap: 2,
        width: "100%",
        minHeight: "100vh",
        paddingX: { sm: 6, md: 4, lg: 4 },
        paddingY: { sm: 12, md: 8, lg: 8 },
      }}
    >
      <Box
        sx={{
          marginX: "auto",
          maxWidth: {
            sm: "auto",
            md: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          },
        }}
      >
        <Typography level="h1">Attestation Explorer</Typography>
        <Typography level="body-md" sx={{ marginBottom: 4 }}>
          Connect your wallet to explore and create onchain credentials via
          Talent Passport
        </Typography>
        <w3m-button balance={"hide"} />
      </Box>
    </Box>
  );
};

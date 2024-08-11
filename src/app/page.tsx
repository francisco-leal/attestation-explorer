import { getCurrentUser } from "@/server/users";
import { UserNotConnected } from "@/components/user-not-connected";
import { Box, Typography, Button } from "@mui/joy";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return <UserNotConnected />;
  }

  return (
    <>
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
              gap: 2,
              alignItems: "center",
            },
          }}
        >
          <Typography level="h1">Attestation Explorer</Typography>
          <Typography
            level="body-md"
            sx={{ marginBottom: 4, maxWidth: "600px" }}
          >
            Connect your wallet to explore and create w3c verifiable credentials
            onchain via Talent Passport while leveraging the Ethereum
            Attestation Service.
          </Typography>
          {user.passportId && (
            <Button component={Link} href="/attestations">
              Generate attestation
            </Button>
          )}
          {!user.passportId && (
            <Button
              component="a"
              href="https://passport.talentprotocol.com"
              target="_blank"
            >
              Create Passport
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}

import { getCurrentUser } from "@/server/users";
import { UserNotConnected } from "@/components/user-not-connected";
import { Box, Typography, Button } from "@mui/joy";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) return <UserNotConnected />;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          width: "100%",
          paddingX: 2,
        }}
      >
        <Typography level="h3">Attestation Explorer</Typography>
        <w3m-button balance={"hide"} />
      </Box>
      <Typography level="body-md">
        Welcome {user.profile.name || user.wallet}
      </Typography>
      <Button component={Link} href="/attestations">
        Create
      </Button>
      <Button component={Link} href="/search">
        Search
      </Button>
    </>
  );
}

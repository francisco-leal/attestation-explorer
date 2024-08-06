import { getCurrentUser } from "@/server/users";
import { UserNotConnected } from "@/components/user-not-connected";
import { Box, Typography } from "@mui/joy";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) return <UserNotConnected />;

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography level="h1">Attestation Explorer</Typography>
        <w3m-button balance={"hide"} />
      </Box>
      <Typography level="body-md">
        Welcome {user.profile.name || user.wallet}
      </Typography>
    </Box>
  );
}

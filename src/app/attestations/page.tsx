import { getCurrentUser } from "@/server/users";
import { UserNotConnected } from "@/components/user-not-connected";
import {
  getCredentialsForPassport,
  getTalentPassport,
} from "@/server/talent-protocol";
import { Typography, Card, Grid, Box, Avatar, Button } from "@mui/joy";
import { AttestationCreator } from "@/components/attestation-creator";
import { convertPassportToJson } from "@/utils/passportToJson";
import jsonPassportToEasAttestation from "@/utils/jsonPassportToEasAttestation";

export default async function AttestationsPage() {
  const user = await getCurrentUser();
  if (!user) return <UserNotConnected />;

  if (!user.passportId) {
    return (
      <h1>Create your passport and easily create your first attestation</h1>
    );
  }

  const passport = await getTalentPassport(user.wallet);
  const passportCredentials = await getCredentialsForPassport(user.passportId);

  if (!passport) {
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="title-lg">
              You must first create your Talent Passport
            </Typography>
            <w3m-button balance={"hide"} />
          </Box>
          <Typography level="h3">Your Talent Passport credentials</Typography>
          <Button href="https://passport.talentprotocol.com">
            Create Passport
          </Button>
        </Box>
      </>
    );
  }

  const passportJson = convertPassportToJson(passport, passportCredentials);
  const easData = jsonPassportToEasAttestation(passportJson);

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ width: 80, height: 80, marginRight: 4 }}
            src={user.profile.image_url}
          >
            {user.profile.name}
          </Avatar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginRight: "auto",
            }}
          >
            <Typography level="body-lg">{user.profile.name}</Typography>
            <Typography level="body-md">
              {passport?.passport_profile?.bio}
            </Typography>
            <Typography level="body-lg">
              Score: {passport?.score || 0}
            </Typography>
          </Box>
          <w3m-button balance={"hide"} />
        </Box>
        <Typography level="h3">Your Talent Passport credentials</Typography>
        <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
          {passportCredentials.map((credential) => (
            <Grid key={credential.id} xs={6} md={3} lg={3}>
              <Card>
                <Typography level="title-lg">{credential.name}</Typography>
                <Typography level="body-sm">
                  Score: {credential.score}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <AttestationCreator passportId={passport?.passport_id || 0} />
      </Box>
    </>
  );
}

import { getCurrentUser } from "@/server/users";
import { UserNotConnected } from "@/components/user-not-connected";
import { getCredentialsForPassport } from "@/server/talent-protocol";
import { Typography, List, ListItem, Button } from "@mui/joy";

export default async function AttestationsPage() {
  const user = await getCurrentUser();
  if (!user) return <UserNotConnected />;

  if (!user.passportId) {
    return (
      <h1>Create your passport and easily create your first attestation</h1>
    );
  }
  const passportCredentials = await getCredentialsForPassport(user.passportId);

  return (
    <>
      <Typography level="h3">Attestations</Typography>
      <Typography level="body-md">
        Based on your Talent Passport we&apos;ve found the following credentials
      </Typography>
      <List variant="outlined" marker="disc" sx={{ paddingRight: 2 }}>
        {passportCredentials.map((credential) => (
          <ListItem key={credential.id}>
            <Typography level="body-md">
              {credential.name}: {credential.score}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Button>Generate Attestation</Button>
    </>
  );
}

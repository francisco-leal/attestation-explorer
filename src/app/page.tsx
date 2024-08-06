import { getCurrentUser } from "@/shared/server/users";
import { UserNotConnected } from "@/components/user-not-connected";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) return <UserNotConnected />;

  return (
    <main>
      <h1>Attestation Explorer</h1>
      <p>Welcome {user.wallet}</p>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import authClient from "@repo/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const handleSignIn = async () => {
    const user = await authClient.signIn.email({
      email: "test@gg.com",
      password: "testtest",
    });
    console.log(user);
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <Button onClick={handleSignIn}>Sign in with email</Button>
    </div>
  );
}

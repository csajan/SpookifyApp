import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1>Welcome to Spookify 🤑</h1>
      <SignIn />
    </div>
  );
}

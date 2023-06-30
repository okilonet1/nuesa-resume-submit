import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "mx-auto my-8 w-full max-w-md ",
        },
      }}
    />
  );
}

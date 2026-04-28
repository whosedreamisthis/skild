import { createFileRoute, Link } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/__auth/sign-in/$")({
  component: SignInComponent,
});

function SignInComponent() {
  return (
    <section id="sign-in">
      <Link
        to="/"
        className="absolute top-4 left-4 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/"
        appearance={{
          variables: {
            colorPrimary: "#c4b5fd", // This is tailwind's blue-600
          },
        }}
      />
    </section>
  );
}

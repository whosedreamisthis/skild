import { createFileRoute, Link } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-react-start";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/__auth/sign-up/$")({
  component: SignUpComponent,
});

function SignUpComponent() {
  return (
    <section id="sign-up">
      <Link
        to="/"
        className="absolute top-4 left-4 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
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

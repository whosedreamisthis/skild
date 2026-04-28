import { PostHogProvider } from "@posthog/react";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ClerkProvider, useUser } from "@clerk/tanstack-react-start";
import Navbar from "#/components/Navbar";
import appCss from "../styles.css?url";
import posthog from "posthog-js";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false, // TanStack Start handles routing differently; manual capture is safer
  });
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

function PostHogIdentity() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
      });
    }
  }, [user, isLoaded]);

  return null; // This component renders nothing
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Skild - The Registry for Agentic Intelligence",
      },
      {
        name: "description",
        content:
          "Discover, publish and operate reusable agent capabilities from a route-driven workspace.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
        <PostHogProvider
          apiKey={import.meta.env.VITE_POSTHOG_KEY}
          options={{
            api_host: import.meta.env.VITE_POSTHOG_HOST,
            defaults: "2026-01-30",
            capture_exceptions: true,
          }}
        >
          <ClerkProvider>
            <PostHogIdentity />
            <div id="root-layout">
              <header>
                <div className="frame">
                  <Navbar />
                  {/* <Crosshair />
								<Crosshair /> */}
                </div>
              </header>
              <main>
                <div className="frame">{children}</div>
              </main>
            </div>
          </ClerkProvider>
        </PostHogProvider>
        <TanStackDevtools
          config={{
            defaultOpen: false,
            position: "top-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

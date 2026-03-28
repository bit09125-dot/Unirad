import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { PaymentPage } from "./components/PaymentPage";
import { OnboardingPage } from "./components/OnboardingPage";
import { DiscoverPage } from "./components/DiscoverPage";
import { MatchesPage } from "./components/MatchesPage";
import { MessagesPage } from "./components/MessagesPage";
import { ProfilePage } from "./components/ProfilePage";
import { SettingsPage } from "./components/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: PaymentPage },
      { path: "onboarding", Component: OnboardingPage },
      { path: "discover", Component: DiscoverPage },
      { path: "matches", Component: MatchesPage },
      { path: "messages/:matchId?", Component: MessagesPage },
      { path: "profile", Component: ProfilePage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);

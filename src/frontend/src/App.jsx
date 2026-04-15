import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import SiteLayout from "./components/SiteLayout";
import CareerQuiz from "./pages/CareerQuiz";
import Home from "./pages/Home";
import JobMatcher from "./pages/JobMatcher";
import MentorChat from "./pages/MentorChat";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: CareerQuiz,
});

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resume",
  component: ResumeAnalyzer,
});

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  component: JobMatcher,
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: MentorChat,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  quizRoute,
  resumeRoute,
  jobsRoute,
  chatRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SkipLink from "./SkipLink";

// Lazy load non-critical UI components to boost FCP and TBT
const Footer = lazy(() => import("./Footer"));
const ChatWidget = lazy(() => import("./ChatWidget"));

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <Footer />
        <ChatWidget />
      </Suspense>
    </div>
  );
};

export default Layout;
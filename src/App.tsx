import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import StoryGenerator from "./components/StoryGenerator";
import Examples from "./components/examples";
import About from "./components/about";
import ProfilePage from "./components/StoryGenerator/ProfilePage";
import routes from "tempo-routes";

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/generator" element={<StoryGenerator />} />
          <Route path="/home" element={<Home />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<ProfilePage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={null} />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;

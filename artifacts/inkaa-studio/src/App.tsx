import { useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import SplashScreen from "@/components/SplashScreen";
import { LenisProvider } from "@/components/LenisProvider";
import VignetteTransition from "@/components/VignetteTransition";
import AnimeCinematicEffects from "@/components/AnimeCinematicEffects";
import ErrorBoundary from "@/components/ErrorBoundary";
import Analytics from "@/components/Analytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleDone = useCallback(() => setSplashDone(true), []);

  return (
    <ErrorBoundary>
      <LenisProvider>
        <Analytics />
        <VignetteTransition />
        {splashDone && <AnimeCinematicEffects />}
        {!splashDone && <SplashScreen onDone={handleDone} />}
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </LenisProvider>
    </ErrorBoundary>
  );
}

export default App;

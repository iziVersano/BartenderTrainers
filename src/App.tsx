import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import { queryClient } from "./lib/queryClient";
import { store } from "./store";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";
import { useEffect } from "react";
import ThemeToggle from "./components/ui/ThemeToggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // On initial load, set dark mode class based on localStorage or system preference
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <ThemeToggle />
      {/* ThemeToggle will be placed absolutely at top right */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;

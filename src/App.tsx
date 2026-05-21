import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Index from "./pages/Index";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import WritingIndex from "./pages/WritingIndex";
import WritingPost from "./pages/WritingPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle GitHub Pages 404 redirect
const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're coming from a 404 redirect (query string starts with ?/)
    // The GitHub Pages script converts /experience to /?/experience
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("/");
    
    if (redirectPath) {
      // Decode the path (replace ~and~ with &)
      const decodedPath = redirectPath.replace(/~and~/g, "&");
      // Build the full URL with path, remaining query params, and hash
      const remainingParams = new URLSearchParams();
      searchParams.forEach((value, key) => {
        if (key !== "/") {
          remainingParams.append(key, value);
        }
      });
      const queryString = remainingParams.toString();
      const fullPath = decodedPath + (queryString ? `?${queryString}` : "") + location.hash;
      // Navigate to the actual path
      navigate(fullPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

// Component to track page views on route changes
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    if (typeof window !== "undefined" && "gtag" in window && typeof window.gtag === "function") {
      window.gtag("config", "G-VSPYLKLLHK", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <RedirectHandler />
          <PageViewTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/writing" element={<WritingIndex />} />
            <Route path="/writing/:slug" element={<WritingPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

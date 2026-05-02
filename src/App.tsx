import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "@/components/SiteLayout";
import Landing from "./pages/Landing";
import Races from "./pages/Races";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/races" element={<Races />} />
            <Route path="/news" element={<Placeholder title="News" description="Latest stories from the racing world — coming soon." />} />
            <Route path="/horses" element={<Placeholder title="Horses" description="Browse horse profiles, form, and performance — coming soon." />} />
            <Route path="/guides" element={<Placeholder title="Guides" description="Beginner-friendly explainers on form, odds, and betting — coming soon." />} />
            <Route path="/about" element={<Placeholder title="About Us" description="Learn what Paddock is and who's behind it." />} />
            <Route path="/donate" element={<Placeholder title="Donate" description="Support the project — donation options coming soon." />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLocation } from "react-router-dom";
import { store } from "./redux/store";
import ThemeManager from "./components/ThemeManager";
import MobileBottomNav from "@/components/MobileBottomNav";
import Index from "./pages/Index.tsx";
import CategoryDetail from "./pages/CategoryDetail.tsx";
import ReelsPage from "./pages/ReelsPage.jsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppFrame = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isReels = location.pathname === "/reels";

  return (
    <div className={isReels ? "" : "pb-16 md:pb-0"}>
      {children}
      <MobileBottomNav />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeManager />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppFrame>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:id" element={<CategoryDetail />} />
              <Route path="/reels" element={<ReelsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppFrame>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;

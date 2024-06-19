// import './App.css'
// import { Button } from "@/components/ui/button"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayOutPage from "./pages/LayOutPage";
import OverViewPage from "./pages/OverViewPage";
import CampaignPage from "./pages/CampaignPage";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditPage from "./pages/EditPage";
import { loader as editLoader } from "./components/EditCampaign";
import NewCampaignPage from "./pages/NewCampaignPage";
import MarketIntelligencePage from "./pages/MarketIntelligencePage";
import ErrorBoundaryPage from "./pages/ErrorBoundaryPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOutPage />,
      errorElement: <PageNotFoundPage />,
      children: [
        {
          index: true,
          element: <OverViewPage />,
          errorElement: <ErrorBoundaryPage />
        },
        {
          path: "campaign",
          element: <CampaignPage />,
          errorElement: <ErrorBoundaryPage />
        },
        {
          path: "add-campaign",
          element: <NewCampaignPage />,
          errorElement: <ErrorBoundaryPage />
        },
        {
          path: "edit/:id",
          element: <EditPage />,
          loader: editLoader,
          errorElement: <ErrorBoundaryPage />
        },
        {
          path: "stats",
          element: <MarketIntelligencePage />,
          errorElement: <ErrorBoundaryPage />
        }
      ]
    }
  ]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;

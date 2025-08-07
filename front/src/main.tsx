import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ErrorDialog from "./components/error-dialog/ErrorDialog";
import ConfirmationDialog from "./components/confirmation-dialog/ConfirmationDialog";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable automatic retries for failed queries
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <ErrorDialog />
    <ConfirmationDialog />
  </StrictMode>
);

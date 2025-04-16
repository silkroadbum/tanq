import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div></div>
    </QueryClientProvider>
  );
}

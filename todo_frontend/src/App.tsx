import { RouterProvider } from "react-router-dom";
import { router } from "./routing";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Creating the query client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} /> 
    </QueryClientProvider>
  );
}

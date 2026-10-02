import { AuthProvider } from "./contexts/AuthContext";
import { AppRouter } from "./Router";
import { GlobalStyles } from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

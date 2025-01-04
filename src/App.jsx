import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "./providers/auth-provider";
import Routes from "./routes/router";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <Resevation /> */}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

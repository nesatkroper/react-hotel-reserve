import { ThemeProvider } from "@/components/app/theme/theme-provider";
import AuthProvider from "./providers/auth-provider";
import Routes from "./routes/router";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const disableRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);
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

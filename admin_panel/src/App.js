
import './App.css';
import ThemeProvider from "./theme";
import ScrollToTop from "./components/scroll-to-top";
import Router from './routes';
import { SnackbarProvider } from "material-ui-snackbar-provider";


function App() {
  return (
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <ThemeProvider>
        <ScrollToTop />
        <Router />
      </ThemeProvider>
      </SnackbarProvider>
  );
}

export default App;

import { BrowserRouter } from "react-router";
import AppProvider from "./components/provider/app-provider";
import AppRoutesProvider from "./components/provider/app-routes-provider";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutesProvider />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

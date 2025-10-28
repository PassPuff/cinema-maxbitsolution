import AppRouter from "./router";
import Sidebar from "../widgets/Sidebar/ui/Sidebar";
import { BrowserRouter } from "react-router-dom";
import { PageTitle } from "../widgets/PageTitle/ui/PageTitle";
import { QueryProvider } from "./providers/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <PageTitle />
        <div className="flex min-h-screen bg-black ">
          <Sidebar />
          <div className="flex-1 p-4 text-white">
            <AppRouter />
          </div>
        </div>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;

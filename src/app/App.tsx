import AppRouter from "./router";
import { Sidebar } from "@/widgets/sidebar";
import { BrowserRouter } from "react-router-dom";
import { PageTitle } from "@/widgets/page-title";
import { QueryProvider } from "./providers/query-provider";

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

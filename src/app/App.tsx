import AppRouter from './router';
import { Sidebar } from '@/widgets/sidebar';
import { BrowserRouter } from 'react-router-dom';
import { PageTitle } from '@/widgets/page-title';
import { QueryProvider, AuthProvider } from './providers';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* <PageTitle /> */}
          <div className='flex min-h-screen bg-black '>
            <Sidebar />
            <div className='flex-1 p-4 text-white'>
              <AppRouter />
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;

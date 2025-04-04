import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

import { ThemeWrapper } from './components/providers/ThemeWrapper';
import { PatientProvider } from './contexts/PatientContext';
import { ImageCacheProvider } from './contexts/ImageCacheContext';
import { PatientFiltersProvider } from './contexts/PatientFiltersContext';
import ErrorBoundary from './components/providers/ErrorBoundary';
import { FocusManagerProvider } from './components/providers/FocusManager';
import PatientManager from './components/organisms/PatientManager';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>
          <ErrorBoundary>
            <FocusManagerProvider>
              <PatientProvider>
                <ImageCacheProvider>
                  <PatientFiltersProvider>
                    <Analytics />
                    <PatientManager />
                    <Toaster position="bottom-right" />
                  </PatientFiltersProvider>
                </ImageCacheProvider>
              </PatientProvider>
            </FocusManagerProvider>
          </ErrorBoundary>
        </ThemeWrapper>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

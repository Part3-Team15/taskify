import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Modal from '@/components/Modal';
import MainLayout from '@/layouts/MainLayout';
import { store, persistor } from '@/store/store';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem={true}>
            <Modal />
            <Head>
              <title>Taskify</title>
              <meta name='og:title' content='Taskify' />
              <meta name='og:description' content='새로운 일정 관리 Taskify' />
              <meta name='og:image' content='/public/images/logo_large.png' />
            </Head>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

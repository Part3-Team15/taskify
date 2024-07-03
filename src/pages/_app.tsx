import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Modal from '@/components/Modal';
import Redirect from '@/components/Redirect';
import MainLayout from '@/layouts/MainLayout';
import { store, persistor } from '@/store/store';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Redirect>
            <Head>
              <title>Taskify</title>
              <meta name='og:title' content='Taskify' />
              <meta name='og:description' content='새로운 일정 관리 Taskify' />
              <meta name='og:image' content='/public/images/logo_large.png' />
            </Head>
            <Modal />
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </Redirect>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

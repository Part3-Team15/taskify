import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Modal from '@/components/Modal';
import Redirect from '@/components/Redirect';
import MainLayout from '@/layouts/MainLayout';
import { store, persistor } from '@/store/store';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Taskify</title>
        <meta name='description' content='새로운 일정 관리 Taskify' />
        <link rel='icon' href='/favicon.ico' />

        <meta name='og:title' content='Taskify' />
        <meta name='og:description' content='새로운 일정 관리 Taskify' />
        <meta name='og:image' content='/preview.png' />
        <meta property='og:url' content='https://taskify-15.vercel.app/' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:title' content='Taskify' />
        <meta property='twitter:description' content='새로운 일정 관리 Taskify' />
        <meta name='twitter:image' content='/preview.png' />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Redirect>
              <ThemeProvider attribute='class' defaultTheme='system' enableSystem={true}>
                <Modal />
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
                <ReactQueryDevtools initialIsOpen={false} />
              </ThemeProvider>
            </Redirect>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import TagManager from 'react-gtm-module';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/main.scss';

NProgress.configure({ easing: 'ease-in-out' });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTM as string,
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

import { AppProps } from 'next/app';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;

import Head from 'next/head';
// import Image from 'next/image';
// import { Geist, Geist_Mono } from 'next/font/google';
// import styles from '@/styles/Home.module.css';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export default function Home() {
//   return (
//     <>
//       <h1>hi</h1>
//     </>
//   );
// }

import ReactDOM from 'react-dom/client';
import './index.css';
import AppProvider from '../contexts/AppContext';
import Router from './routes/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <AppProvider>
    <Router />
  </AppProvider>,
);

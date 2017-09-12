import Head from 'next/head';

import baseStyles from '../../styles/base.css';
import helpersStyles from '../../styles/helpers.css';

export default ({ children }) => (
  <main>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Lekton:400,400i,700" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
    </Head>

    {children}

    <style jsx global>{baseStyles}</style>
    <style jsx global>{helpersStyles}</style>
  </main>
);

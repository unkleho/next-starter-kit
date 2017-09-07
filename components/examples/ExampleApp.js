import Head from 'next/head';

import baseStyles from '../../styles/base.css';
import helpersStyles from '../../styles/helpers.css';

export default ({ children }) => (
  <main>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Lekton:400,400i,700" rel="stylesheet" />
    </Head>

    {children}

    <style jsx global>{baseStyles}</style>
    <style jsx global>{helpersStyles}</style>
  </main>
)

import Head from 'next/head';
import { stylesheet, classNames } from '../styles/base.css';

export default ({ children }) => (
  <main>
    <Head><style dangerouslySetInnerHTML={{__html: stylesheet}} /></Head>

    {children}

    <style jsx global>{`
      * {
        font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif;
      }

      body {
        margin: 3em;
      }
    `}</style>
  </main>
)

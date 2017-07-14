import Head from 'next/head';
// import { stylesheet, classNames } from '../styles/base.css';
import styles from '../styles/base.css';

export default ({ children }) => (
  <main>
    {/* <Head><style dangerouslySetInnerHTML={{__html: stylesheet}} /></Head> */}

    {children}

    <style jsx global>{styles}</style>
  </main>
)

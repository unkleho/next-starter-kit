import Link from 'next/link';
import Head from 'next/head';
import { stylesheet, classNames } from './Header.css';

export default ({ pathname }) => (
  <header className={classNames.header}>
    <Head><style dangerouslySetInnerHTML={{__html: stylesheet}} /></Head>

    <Link prefetch href='/'>
      <a className={pathname === '/' && 'is-active'}>Home</a>
    </Link>

    <Link prefetch href='/about'>
      <a className={pathname === '/about' && 'is-active'}>About</a>
    </Link>

    <Link prefetch href='/page'>
      <a className={pathname === '/page' && 'is-active'}>Page</a>
    </Link>
  </header>
)

// import { Link } from '../../routes';
import Link from '../Link';
import styles from './Header.css';

export default ({ pathname }) => {

  const menuItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Experiments', url: '/experiments' },
    { name: 'Blog', url: '/blog' },
    { name: 'Fellowships', url: '/fellowships' },
    { name: 'Code', url: '/code' },
  ];

  return (
    <header className="header">

      <img
        className="logo logo--dxlab"
        src="/static/images/logo-dxlab.png"
        alt="DX Lab Logo"
      />

      <nav>
        <ul>
          {menuItems.map((item) => {
            return (
              <li>
                <Link prefetch to={item.url} key={item.url}>
                  <a className={pathname === item.url && 'is-active'}>{item.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <img
        className="logo logo--slnsw"
        src="/static/images/logo-slnsw-white.png"
        alt="State Library Logo"
      />

      <style jsx>{styles}</style>

    </header>
  );
};

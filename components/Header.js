import { Link } from '../routes';
import styles from './Header.css';

export default ({ pathname }) => {

  const menuItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Experiments', url: '/experiments' },
    { name: 'Fellowships', url: '/fellowships' },
    { name: 'Open Data', url: '/open-data' },
    { name: 'Search', url: '/search' },
  ];

  return (
    <header className="header">

      <img src="/static/images/logo-dxlab.png" width="100" />

      <br/>

      {menuItems.map((item) => {
        return (
          <Link prefetch to={item.url} key={item.url}>
            <a className={pathname === item.url && 'is-active'}>{item.name}</a>
          </Link>
        )
      })}

      <img src="/static/images/logo-slnsw.png" width="70" />

      <br/><br/>

      <style jsx>{styles}</style>

    </header>
  )
}

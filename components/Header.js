import Link from './Link';
import styles from './Header.css';

export default ({ pathname }) => {

  const menuItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Example Page', url: '/example-page' },
  ];

  return (
    <header className="header">

      {menuItems.map((item) => {
        return (
          <Link prefetch to={item.url} key={item.url}>
            <a className={pathname === item.url && 'is-active'}>{item.name}</a>
          </Link>
        )
      })}

      <style jsx>{styles}</style>

    </header>
  )
}

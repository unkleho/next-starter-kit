import { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import styles from './Menu.css';

class Menu extends Component {

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    menuItemClassName: PropTypes.string,
    labelledby: PropTypes.string,
    pathname: PropTypes.string,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      url: PropTypes.url,
    })),
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const {
      id,
      className,
      menuItemClassName,
      labelledby,
      menuItems,
      pathname,
    } = this.props;

    return (
      <ul
        id={id}
        className={`menu ${className}`}
        role="menu"
        aria-labelledby={labelledby}
      >
        {menuItems.map((item, i) => {
          return (
            <li className={`menu__item ${menuItemClassName}`} role="menuitem" key={`menu__item-${i}`}>
              <Link prefetch to={item.url} key={item.url}>
                <a className={pathname === item.url && 'is-active'}>{item.name}</a>
              </Link>
            </li>
          );
        })}

        <style jsx>{styles}</style>
      </ul>
    );
  }

}

export default Menu;

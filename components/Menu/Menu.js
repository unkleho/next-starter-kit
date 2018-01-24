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
      isActive: PropTypes.bool,
      ariaLabel: PropTypes.string,
    })).isRequired,
    onMenuItemClick: PropTypes.func,
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
      onMenuItemClick,
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
            <li
              key={`menu__item-${i}`}
              className={`menu__item ${menuItemClassName}`}
              role="menuitem"
              onClick={onMenuItemClick}
            >
              <Link prefetch to={item.url} key={item.url}>
                <a
                  className={(pathname === item.url || item.isActive) && 'is-active'}
                  aria-label={item.ariaLabel}
                >
                  {item.name}
                </a>
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

import { Component } from 'react';

import Link from '../Link';
import Menu from '../Menu';
import styles from './Header.css';

const menuItems = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Experiments', url: '/experiments' },
  { name: 'Blog', url: '/blog' },
  { name: 'Fellowships', url: '/fellowships' },
  { name: 'Code', url: '/code' },
  { name: <span><span className="primary-menu__divider">/</span> <span className="slnsw-icon-ZoomOL2"></span></span>, url: '/search' },
];

class Header extends Component {

  constructor() {
    super();

    this.state = {
      isMenuOpen: false,
    };
  }

  handleMenuToggle = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  render() {
    const {
      pathname,
    } = this.props;

    return (
      <header className="header">

        <div className="logo logo--dxlab">
          <img
            src="/static/images/logo-dxlab.png"
            alt="DX Lab Logo."
          />
        </div>

        <nav className={`header__nav ${this.state.isMenuOpen ? 'is-active' : ''}`}>
          <Menu
            id="primary-menu"
            className="primary-menu"
            menuItemClassName="primary-menu__item"
            labelledby="primary-menu-button"
            menuItems={menuItems.map(item => ({
              ...item,
              isActive: pathname === '/post' && item.url === '/blog',
            }))}
            pathname={pathname}
            onMenuItemClick={this.handleMenuToggle}
          />
        </nav>

        <div className="logo logo--slnsw">
          <img
            // className="logo logo--slnsw"
            src="/static/images/logo-slnsw-white.png"
            alt="State Library Logo."
          />
        </div>

        <button
          id="primary-menu-button"
          className={`primary-menu-button ${this.state.isMenuOpen ? 'is-open' : ''}`}
          aria-haspopup="true"
          aria-controls="primary-menu"
          aria-expanded="false"
          onClick={this.handleMenuToggle}
        >
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <style global jsx>{styles}</style>

      </header>
    );
  }

}

export default Header;

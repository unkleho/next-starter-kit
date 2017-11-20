import { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './Footer.css';
import Menu from '../Menu';

class Footer extends Component {

  render() {
    return (
      <footer className="footer">
        <div className="footer__cc">CC by 4.0</div>

        <Menu
          className="footer-menu"
          menuItems={[
            { name: 'Disclaimer', url: '/disclaimer' },
            { name: 'Privacy', url: '/disclaimer' },
            { name: 'Copyright', url: '/disclaimer' },
            { name: 'Right to information', url: '/disclaimer' },
          ]}
        />

        <div className="footer__social">
          {socialItems.map((item, i) => (
            <a href={item.url} aria-label={`Follow us on ${item.name}`} key={`social-item-${i}`}>
              <span className={`slnsw-icon-${item.name.toLowerCase()}`} aria-hidden="true"></span>
            </a>
          ))}
        </div>

        <div className="footer__nsw-logo">
          <img className="" src="/static/images/logo-nsw-white.png" alt="NSW Government logo." />
        </div>

        <style global jsx>{styles}</style>
      </footer>
    );
  }

}

const socialItems = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/statelibrarynsw',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/statelibrarynsw',
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/statelibrarynewsouthwales',
  },
  {
    name: 'Instagram',
    url: 'http://instagram.com/statelibrarynsw',
  },
  {
    name: 'Flickr',
    url: 'http://www.sl.nsw.gov.au/about/collections/flickr.html',
  },
  {
    name: 'Pinterest',
    url: 'http://pinterest.com/statelibrarynsw',
  },
  {
    name: 'Vimeo',
    url: 'http://www.vimeo.com/statelibrarynsw',
  },
  {
    name: 'RSS',
    url: 'http://dxlab.sl.nsw.gov.au/feed/', // TODO: Update new URL
  },
];

export default Footer;

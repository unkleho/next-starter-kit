import { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './Footer.css';
import Menu from '../Menu';

class Footer extends Component {

  render() {
    return (
      <footer className="footer">
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
          <div className="footer__cc">CC by 4.0</div>
        </a>

        <Menu
          className="footer-menu"
          menuItems={[
            { name: 'Disclaimer', url: 'https://www.sl.nsw.gov.au/disclaimer' },
            { name: 'Privacy', url: 'https://www.sl.nsw.gov.au/privacy/web-privacy-statement' },
            { name: 'Copyright', url: 'https://www.sl.nsw.gov.au/copyright' },
            { name: 'Right to information', url: 'https://www.sl.nsw.gov.au/right-to-information' },
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
          <a href="https://www.nsw.gov.au/" target="_blank" rel="noopener noreferrer">
            <img className="" src="/static/images/logo-nsw-white.png" alt="NSW Government logo." />
          </a>
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

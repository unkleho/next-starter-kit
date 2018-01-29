import { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './Footer.css';
// import Menu from '../Menu';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <ul className="footer-menu">
          {footerItems.map((item, i) => (
            <li key={`footer-menu-${i}`}>
              <a href={item.url}>{item.name}</a>
            </li>
          ))}
        </ul>

        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__cc"
        >
          <div>CC by 4.0</div>
        </a>

        <div className="footer__social">
          {socialItems.map((item, i) => (
            <a
              href={item.url}
              aria-label={`Follow us on ${item.name}`}
              key={`social-item-${i}`}
            >
              <span
                className={`slnsw-icon-${item.name.toLowerCase()}`}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <div className="footer__nsw-logo">
          <a
            href="https://www.nsw.gov.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className=""
              src="/static/images/logo-nsw-white.png"
              alt="NSW Government logo."
            />
          </a>
        </div>

        {/* prettier-ignore */}
        <style global jsx>{styles}</style>
      </footer>
    );
  }
}

const footerItems = [
  { name: 'Disclaimer', url: 'https://www.sl.nsw.gov.au/disclaimer' },
  {
    name: 'Privacy',
    url: 'https://www.sl.nsw.gov.au/privacy/web-privacy-statement',
  },
  { name: 'Copyright', url: 'https://www.sl.nsw.gov.au/copyright' },
  {
    name: 'Right to information',
    url: 'https://www.sl.nsw.gov.au/right-to-information',
  },
];

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

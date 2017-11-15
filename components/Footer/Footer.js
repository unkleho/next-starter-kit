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
          <a href="https://www.facebook.com/statelibrarynsw"><span className="slnsw-icon-facebook"></span></a>
          <a href="https://twitter.com/statelibrarynsw"><span className="slnsw-icon-twitter"></span></a>
          <a href="https://www.youtube.com/statelibrarynewsouthwales"><span className="slnsw-icon-youtube"></span></a>
          <a href="http://instagram.com/statelibrarynsw"><span className="slnsw-icon-instagram"></span></a>
          <a href="http://www.sl.nsw.gov.au/about/collections/flickr.html"><span className="slnsw-icon-flickr"></span></a>
          <a href="http://pinterest.com/statelibrarynsw"><span className="slnsw-icon-pinterest"></span></a>
          <a href="http://www.vimeo.com/statelibrarynsw"><span className="slnsw-icon-vimeo"></span></a>
          <a href="http://dxlab.sl.nsw.gov.au/feed/"><span className="slnsw-icon-rss"></span></a>
        </div>

        <img class="logo logo--nsw" src="/static/images/logo-nsw-white.png" alt="NSW Government logo." />

        <style global jsx>{styles}</style>
      </footer>
    );
  }

}

export default Footer;

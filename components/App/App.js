import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Header from '../Header';
import Footer from '../Footer';
import { buildHeadTitle } from '../../lib';
import { initGA, logPageView } from '../../lib/analytics';
import styles from './App.css';
import baseStyles from '../../styles/base.css';
import globalsStyles from '../../styles/globals.css';
import loaderStyles from '../../styles/loader.css';

const SCROLLTOP_THRESHOLD = 100;

class App extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    pathname: PropTypes.string,
    isLoading: PropTypes.bool,
    metaDescription: PropTypes.string,
    metaImageUrl: PropTypes.string,
    metaImageAlt: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      // isLoading: false,
      isHeaderBackgroundActive: false,
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleOnScroll);

    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }

    logPageView();
  }

  // componentDidUpdate() {
  //   // console.log('componentDidUpdate', this.props.isLoading);
  //
  //   Router.onRouteChangeStart = () => {
  //     console.log('isLoading');
  //     this.setState({
  //       isLoading: true,
  //     });
  //   };
  // }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll = (event) => {
    if (event && event.srcElement && event.srcElement.scrollingElement) {
      const scrollTop = event.srcElement.scrollingElement.scrollTop;

      this.setState({
        isHeaderBackgroundActive: scrollTop > SCROLLTOP_THRESHOLD,
      });
    }
  };

  render() {
    const {
      title,
      children,
      pathname,
      isLoading,
      metaDescription,
      metaImageUrl,
      metaImageAlt,
      // metaUrl,
    } = this.props;

    // TODO: Maybe put the baseUrl as a variable
    const metaUrl = `https://dxlab.sl.nsw.gov.au${pathname}`;

    return (
      <div className="app" onScroll={this.handleOnScroll}>
        <Head>
          <title>{buildHeadTitle(title)}</title>

          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=1"
          />
          {title && <meta property="og:title" content={title} />}
          {metaDescription && (
            <meta property="og:description" content={metaDescription} />
          )}
          {metaDescription && (
            <meta name="description" content={metaDescription} />
          )}
          {metaImageUrl && <meta property="og:image" content={metaImageUrl} />}
          {metaUrl && <meta property="og:url" content={metaUrl} />}
          {metaImageAlt && (
            <meta name="twitter:image:alt" content={metaImageAlt} />
          )}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="og:site_name"
            content="DX Lab | State Library of NSW"
          />
          <meta property="fb:app_id" content={process.env.FB_APP_ID} />
          <meta name="twitter:site" content="@statelibrarynsw" />
          <link
            rel="shortcut icon"
            href="http://www.sl.nsw.gov.au/sites/all/themes/slnsw_frontend/favicon.ico"
            type="image/vnd.microsoft.icon"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Lekton:400,400i,700"
            rel="stylesheet"
          />
        </Head>

        <Header pathname={pathname} />
        {/*
          .header-bg is needed for tricky position: sticky css
          Includes line decoration for .primary-menu
        */}
        <div
          className={`header-bg ${this.state.isHeaderBackgroundActive &&
            'is-active'}`}
        />

        <div
          className={`app__loading-screen ${isLoading &&
            'app__loading-screen--is-active'}`}
        >
          <div className="loader-wrapper">
            <div className="loader">
              <div className="ball" />
            </div>
          </div>
        </div>

        <main>{!isLoading && children}</main>

        <Footer pathname={pathname} />

        {/* prettier-ignore */}
        <style jsx global>{baseStyles}</style>
        {/* prettier-ignore */}
        <style jsx global>{globalsStyles}</style>
        <style jsx>{loaderStyles}</style>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default App;

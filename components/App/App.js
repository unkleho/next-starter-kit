import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Header from '../Header';
import Footer from '../Footer';
// import { Router } from '../../routes';
import styles from './App.css';
import baseStyles from '../../styles/base.css';
import globalsStyles from '../../styles/globals.css';
import loaderStyles from '../../styles/loader.css';

const SCROLLTOP_THRESHOLD = 100;

class App extends Component {

  static propTypes = {
    children: PropTypes.array,
    pathname: PropTypes.string,
    isLoading: PropTypes.bool,
  }

  constructor() {
    super();

    this.state = {
      // isLoading: false,
      isHeaderBackgroundActive: false,
    };
  }

  handleOnScroll = (event) => {
    const scrollTop = event.srcElement.scrollingElement.scrollTop;

    this.setState({
      isHeaderBackgroundActive: (scrollTop > SCROLLTOP_THRESHOLD),
    });
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

  componentDidMount() {
    document.addEventListener('scroll', this.handleOnScroll);
    // this.setState({
    //   isLoading: false,
    // });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll);
  }

  render() {
    const {
      children,
      pathname,
      isLoading,
    } = this.props;

    return (
      <div className="app" onScroll={this.handleOnScroll}>
        <Head>
          <title>Home | DX Lab - State Library of NSW</title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
          <link href="https://fonts.googleapis.com/css?family=Lekton:400,400i,700" rel="stylesheet" />
        </Head>

        <Header pathname={pathname} />
        {/*
          .header-bg is needed for tricky position: sticky css
          Includes line decoration for .primary-menu
        */}
        <div className={`header-bg ${this.state.isHeaderBackgroundActive && 'is-active'}`}></div>

        <div className={`app__loading-screen ${isLoading && 'app__loading-screen--is-active'}`}>
          <div className="loader-wrapper">
            <div className="loader">
              <div className="ball"></div>
            </div>
          </div>
        </div>

        <main>
          {!isLoading && children}
        </main>

        <Footer pathname={pathname} />

        <style jsx global>{baseStyles}</style>
        <style jsx global>{globalsStyles}</style>
        <style jsx>{loaderStyles}</style>
        <style jsx>{styles}</style>
      </div>
    );
  }

}

export default App;

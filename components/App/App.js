import { Component } from 'react';
import Head from 'next/head';

import Header from '../Header';
import Footer from '../Footer';
import styles from './App.css';
import baseStyles from '../../styles/base.css';
import globalsStyles from '../../styles/globals.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isHeaderBackgroundActive: false,
    };
  }

  handleOnScroll = (event) => {
    // const scrollTop = event.srcElement.body.scrollTop;
    // const itemTranslate = Math.min(0, (scrollTop / 3) - 60);

    const scrollTop = event.srcElement.scrollingElement.scrollTop;

    this.setState({
      isHeaderBackgroundActive: (scrollTop > 100),
    });

    // console.log(event.srcElement.scrollingElement.scrollTop);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleOnScroll);
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

    // console.log(this.state.isHeaderBackgroundActive);

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

        <div className={`app__loading-screen ${isLoading && 'app__loading-screen--is-active'}`}></div>

        <main>
          {!isLoading && children}
        </main>

        <Footer pathname={pathname} />

        <style jsx global>{baseStyles}</style>
        <style jsx global>{globalsStyles}</style>
        <style jsx>{styles}</style>
      </div>
    );
  }

}

export default App;

import Document, { Head, Main, NextScript } from 'next/document';
// eslint-disable-next-line
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html lang="en">
        <head>
          {/* This custom <head> tag forces IE=edge to be the first meta tag, otherwise site will run in IE7 compatibility mode within *.sl.nsw.gov.au domain on IE. */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </head>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
    render() {
        const { nextStyle } = this.props;

        return (
            <html>
                <Head>
                    { nextStyle.tag }
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = function (ctx) {
    const props = Document.getInitialProps(ctx);

    props.nextStyle = flush();

    return props;
};

export default MyDocument;

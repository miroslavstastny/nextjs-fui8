import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Stylesheet, resetIds } from '@fluentui/react';
// Fluent UI React (Fabric) 7 or earlier
// import { Stylesheet, resetIds } from 'office-ui-fabric-react';

const stylesheet = Stylesheet.getInstance();

// Now set up the document, and just reset the stylesheet.
export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        resetIds();

        const page = renderPage(App => props => <App {...props} />);

        return { ...page, styleTags: stylesheet.getRules(true), serializedStylesheet: stylesheet.serialize() };
    }

    render() {
        return (
            <Html>
                <Head>
                    <style type="text/css" dangerouslySetInnerHTML={{ __html: this.props.styleTags }} />
        <!--
          This is one example on how to pass the data.
          The main purpose is to set the config before the Stylesheet gets initialised on the client.
          Use whatever method works best for your setup to achieve that.
        -->
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
            window.FabricConfig = window.FabricConfig || {};
            window.FabricConfig.serializedStylesheet = ${this.props.serializedStylesheet};
          ` }} />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
        </Html>
    );
    }
}

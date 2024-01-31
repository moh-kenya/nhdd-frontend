import { Html, Head, Main, NextScript } from "next/document";

import {
    DocumentHeadTags,
    documentGetInitialProps,
} from '@mui/material-nextjs/v13-pagesRouter';


export default function Document(props) {
    return (
        <Html lang="en">
            <Head>
                <DocumentHeadTags {...props} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

Document.getInitialProps = async (ctx) => {
    const finalProps = await documentGetInitialProps(ctx);
    return finalProps;
};

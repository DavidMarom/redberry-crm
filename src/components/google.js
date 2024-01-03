import Head from 'next/head';

const GoogleAdWords = () => (
    <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-798887661"></script>
        <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'AW-798887661');
        </script>
    </Head>
);

export default GoogleAdWords;
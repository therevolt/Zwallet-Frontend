import Head from "next/head";

export default function Header(props) {
  return (
    <Head>
      <title>{props.name}</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}

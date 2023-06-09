import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>IBM - [project-name]</title>
        <meta name="description" content="MVP Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.centeringContainer}>
          <div className={styles.innerContainer}>
            <h1>
              IBM - <strong>[project-name]</strong>
            </h1>
            <p>Let&apos;s Build!</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

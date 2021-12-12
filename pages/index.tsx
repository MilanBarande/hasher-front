import type { NextPage } from 'next'
import Head from 'next/head'
import Form from '../components/form'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Archive level 9 hash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Form />
      </main>
    </div>
  )
}

export default Home

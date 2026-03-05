import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Landing.module.css";

export default function Landing() {
  return (
    <>
      <Head>
        <title>HENG HENG GLOBAL CO., LTD. — HENG Coins</title>
        <meta
          name="description"
          content="HENG HENG GLOBAL — แพลตฟอร์มครบวงจร: HENG Coins, Market, Live, Chat, Creator"
        />
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.logoArea}>
            <Image
              src="/logo.png"
              alt="HENG HENG GLOBAL"
              width={120}
              height={120}
              className={styles.logo}
            />
            <h1>บริษัท เฮง เฮง โกลบอล จำกัด</h1>
            <h2>HENG HENG GLOBAL CO., LTD.</h2>
            <p className={styles.tagline}>
              แพลตฟอร์มครบวงจร — การเงิน ครีเอเตอร์ ไลฟ์ มาร์เก็ต และแชต
            </p>
          </div>

          <div className={styles.btnRow}>
            <a href="/market" className={styles.btnPrimary}>
              เข้าสู่แพลตฟอร์ม
            </a>
            <a href="/docs" className={styles.btnOutline}>
              อ่านเพิ่มเติม
            </a>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.card}>🪙 HENG Coins — ใช้จ่ายทั่วระบบ</div>
          <div className={styles.card}>🔥 Burn 1% ทุกธุรกรรม</div>
          <div className={styles.card}>💸 ระบบภาษีและคอมมิชชั่นอัตโนมัติ</div>
        </section>

        <footer className={styles.footer}>
          <p>
            © {new Date().getFullYear()} HENG HENG GLOBAL CO., LTD. — All rights
            reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
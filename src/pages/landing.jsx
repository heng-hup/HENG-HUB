import { Link } from "react-router-dom";
import styles from "../styles/Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.container}>

      <h1>HENG HUB</h1>

      <div className={styles.menu}>

        <Link to="/feed">🏠 หน้าหลัก</Link>

        <Link to="/market">🛒 ร้านค้า</Link>

        <Link to="/live">🎥 ไลฟ์</Link>

        <Link to="/chat">📞 แชท & โทร</Link>

        <Link to="/profile">👤 โปรไฟล์</Link>

      </div>

    </div>
  );
}
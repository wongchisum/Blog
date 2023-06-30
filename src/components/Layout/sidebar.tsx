import Link from "next/link";
import styles from './sidebar.module.scss'

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
        <div className={styles.header}>
        <div className={styles.title}>Wongchisum</div>
      <div className={styles.slogan}>求祂把诗与火赐予我</div>
      <div className={styles.avatar}>

      </div>
        </div>
      <div className={styles.menu}>
        <Link href="/" className={styles.link}>首页</Link>
        <Link href="/tags" className={styles.link}>主题</Link>
        <Link href="/about-me" className={styles.link}>关于我</Link>
      </div>
    </div>
  );
}

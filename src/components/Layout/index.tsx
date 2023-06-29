import { ReactNode } from 'react'
import styles from './index.module.scss'
import SideBar from './sidebar'

type LayoutProps = {
    children:ReactNode
}
export default function Layout({children}:LayoutProps) {
    return (
        <div className={styles.layout}>
            <div className={styles.left}><SideBar /></div>
            <div className={styles.right}>
            {children}
            </div>
        </div>
    )
}
"use client";
import Link from "next/link";
import styles from './sidebar.module.css'

function SideBar() {
    return (
        <div className={styles.container}>
            <Link href="/"><div className={styles.sidebarbtn}>Overview</div></Link>
            <Link href="/Users"><div className={styles.sidebarbtn}>Users</div></Link>
            <Link href="/Mailing"><div className={styles.sidebarbtn}>Mailing</div></Link>
        </div>
    )
}

export default SideBar
"use client";
import Link from "next/link";
import styles from './sidebar.module.css'

function SideBar() {
    return (
        <div className={styles.container}>
            <Link href="/"><div className={styles.sidebarbtn}>Overview</div></Link>
            <Link href="/Contacts"><div className={styles.sidebarbtn}>Contacts</div></Link>
            <Link href="/Mailing"><div className={styles.sidebarbtn}>Mailing</div></Link>
            <Link href="/About"><div className={styles.sidebarbtn}>About</div></Link>
        </div>
    )
}

export default SideBar
"use client";
import Link from "next/link";
import styles from './sidebar.module.css'

function SideBar() {
    return (
        <div className={styles.container}>
            <Link href="/"><div className={styles.sidebarbtn}>Overview</div></Link>
            <Link href="/Contacts"><div className={styles.sidebarbtn}>Contacts</div></Link>
            <Link href="/Notes"><div className={styles.sidebarbtn}>Notes</div></Link>
            <Link href="/About"><div className={styles.sidebarbtn}>Developers</div></Link>
        </div>
    )
}

export default SideBar
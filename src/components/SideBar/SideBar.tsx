"use client";
import Link from "next/link";
import styles from './sidebar.module.css'

function SideBar() {
    return (
        <>
            <div className={styles.container}>
                <div>
                    <Link href="/"><div className={styles.sidebarbtn}>Overview</div></Link>
                    <Link href="/Contacts"><div className={styles.sidebarbtn}>Contacts</div></Link>
                    <Link href="/Notes"><div className={styles.sidebarbtn}>Notes</div></Link>
                    <Link href="/Email"><div className={styles.sidebarbtn}>Email</div></Link>
                </div>
                <div>
                    <Link href="/Config"><div className={styles.sidebarbtn}>Config</div></Link>
                </div>
            </div>
            <div className={styles.container2}>
                <div>
                    <Link href="/"><div className={styles.sidebarbtn}>📊</div></Link>
                    <Link href="/Contacts"><div className={styles.sidebarbtn}>👩‍💻</div></Link>
                    <Link href="/Notes"><div className={styles.sidebarbtn}>✍🏻</div></Link>
                    <Link href="/Email"><div className={styles.sidebarbtn}>📩</div></Link>
                </div>
                <div>
                    <Link href="/Config"><div className={styles.sidebarbtn}>⚙️</div></Link>
                </div>
            </div>
        </>
    )
}

export default SideBar
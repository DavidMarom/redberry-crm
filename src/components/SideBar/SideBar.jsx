"use client";
import Link from "next/link";
import styles from './sidebar.module.css'

function SideBar() {
    return (
        <div className="h-[calc(100dvh-64px)] w-56 bg-default-50  flex flex-col justify-start text-foreground">
            <Link className={"h-12 w-full flex flex-row items-center text-foreground px-4 hover:bg-default-100 hover:pl-6 ease-in-out transition-all"} href="/">Overview</Link>
            <Link href="/Contacts"  className={"h-12 w-full flex flex-row items-center text-foreground px-4 hover:bg-default-100 hover:pl-6 ease-in-out transition-all"}>Contacts</Link>
            <Link href="/Mailing"  className={"h-12 w-full flex flex-row items-center text-foreground px-4 hover:bg-default-100 hover:pl-6 ease-in-out transition-all"}>Mailing</Link>
            <Link href="/About"  className={"h-12 w-full flex flex-row items-center text-foreground px-4 hover:bg-default-100 hover:pl-6 ease-in-out transition-all"}> About</Link>
        </div>
    )
}

export default SideBar


/* Old Side bar reference 
        <div className={styles.container}>
            <Link href="/"><div className={styles.sidebarbtn}>Overview</div></Link>
            <Link href="/Contacts"><div className={styles.sidebarbtn}>Contacts</div></Link>
            <Link href="/Mailing"><div className={styles.sidebarbtn}>Mailing</div></Link>
            <Link href="/About"><div className={styles.sidebarbtn}>About</div></Link>
        </div>
*/
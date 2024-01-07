"use client";
import Link from "next/link";
import styles from "./sidebar.module.css";

function SideBar() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <Link href="/">
            <div className={styles.sidebarbtn}>
              <img src="icons/dashboard-w.svg" alt="dashboard" width={20} />
              <span>Overview</span>
            </div>
          </Link>
          <Link href="/Contacts">
            <div className={styles.sidebarbtn}>
              <img src="icons/contacts-w.svg" alt="contacts" width={20} />
              <span>Contacts</span>
            </div>
          </Link>
          <Link href="/Notes">
            <div className={styles.sidebarbtn}>
            <img src="icons/notes-w.svg" alt="notes" width={20} />
                <span>Notes</span>
            </div>
          </Link>
          <Link href="/Email">
            <div className={styles.sidebarbtn}>
            <img src="icons/mail-w.svg" alt="mail" width={20} />
                <span>Email</span>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/Config">
            <div className={styles.sidebarbtn}>
            <img src="icons/cog-w.svg" alt="mail" width={20} />
                <span>Config</span>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.container2}>
        <div>
          <Link href="/">
            <div className={styles.sidebarbtn}>
              <img src="icons/dashboard-w.svg" alt="mail" width={20} />
            </div>
          </Link>
          <Link href="/Contacts">
            <div className={styles.sidebarbtn}>
              <img src="icons/contacts-w.svg" alt="mail" width={20} />
            </div>
          </Link>
          <Link href="/Notes">
            <div className={styles.sidebarbtn}>
              <img src="icons/notes-w.svg" alt="mail" width={20} />
            </div>
          </Link>
          <Link href="/Email">
            <div className={styles.sidebarbtn}>
              <img src="icons/mail-w.svg" alt="mail" width={20} />
            </div>
          </Link>
        </div>
        <div>
          <Link href="/Config">
            <div className={styles.sidebarbtn}>
              <img src="icons/cog-w.svg" alt="mail" width={20} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideBar;

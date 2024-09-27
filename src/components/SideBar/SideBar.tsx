"use client";
import Link from "next/link";
import styles from "./sidebar.module.css";
import Image from 'next/image';
import { BsChatLeftText } from "react-icons/bs";


function SideBar() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <Link href="/">
            <div className={styles.sidebarbtn}>
              <div className={styles.icon}><Image src="icons/dashboard-w.svg" alt="dashboard" width={20} height={20}></Image></div>
              <p>Overview</p>
            </div>
          </Link>
          <Link href="/Contacts">
            <div className={styles.sidebarbtn}>
              <div className={styles.icon}><img src="icons/contacts-w.svg" alt="contacts" width={20} /></div>
              <p>Contacts</p>
            </div>
          </Link>
          <Link href="/Notes">
            <div className={styles.sidebarbtn}>
              <div className={styles.icon}><img src="icons/notes-w.svg" alt="notes" width={20} /></div>
              <p style={{ paddingRight: '8px' }}>Notes</p>
            </div>
          </Link>
          <Link href="/Email">
            <div className={styles.sidebarbtn}>
              <div className={styles.icon2}><img src="icons/mail-w.svg" alt="mail" width={20} /></div>
              <p>Email</p>
            </div>
          </Link>

        </div>
        <div>
          {/* <Link href="/Chat">
            <div className={styles.sidebarbtn}>
              <div className={styles.icon2}><BsChatLeftText size={20} /></div>
              <p>Chat</p>
            </div>
          </Link> */}

          <Link href="/Settings">
            <div className={styles.sidebarbtn}>
              <div className={styles.icon2}><img src="icons/cog-w.svg" alt="settings" width={20} /></div>
              <p>Settings</p>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.containermobile}>
        <div>
          <Link href="/">
            <div className={styles.sidebarbtn}>
              <img src="icons/dashboard-w.svg" alt="home" width={20} />
            </div>
          </Link>
          <Link href="/Contacts">
            <div className={styles.sidebarbtn}>
              <img src="icons/contacts-w.svg" alt="contacts" width={20} />
            </div>
          </Link>
          <Link href="/Notes">
            <div className={styles.sidebarbtn}>
              <img src="icons/notes-w.svg" alt="notes" width={20} />
            </div>
          </Link>
          <Link href="/Email">
            <div className={styles.sidebarbtn}>
              <img src="icons/mail-w.svg" alt="mail" width={20} />
            </div>
          </Link>
          <br />
          <Link href="/Chat">
            <div className={styles.sidebarbtn}>
              <BsChatLeftText size={20} />
            </div>
          </Link>
        </div>

        <div>
          <Link href="/Settings">
            <div className={styles.sidebarbtn}>
              <img src="icons/cog-w.svg" alt="Settings" width={20} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideBar;

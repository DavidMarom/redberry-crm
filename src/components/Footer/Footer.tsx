import React from 'react'
import { Container, NavContainer } from "./Footer.style"
import Link from 'next/link'
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";


export default function Footer() {
    return (
        <><Container>
            <div className="footer-text">© 2024 Redberry CRM</div>

            <NavContainer>
                <Link href='/Tos'>
                    <p>Terms</p>
                </Link>
            </NavContainer>

            <div className="row w-12">
                <Link href="https://www.linkedin.com/showcase/redberrycrm" passHref target='_blank'><FaLinkedinIn /></Link>
                <Link href="https://www.facebook.com/profile.php?id=61560983933363" passHref target='_blank'><FaFacebookF /></Link>
            </div>
        </Container >
        </>
    )
}

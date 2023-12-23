import React from 'react'
import { Container } from "./Footer.style"
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
        <Container>
            <div className="footer-text">© 2023 Redberry CRM</div>
            <Link href="https://www.linkedin.com/company/redberry-crm" passHref target='_blank'>

                <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </Link>

        </Container>
    )
}

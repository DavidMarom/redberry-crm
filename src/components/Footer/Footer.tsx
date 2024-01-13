import React from 'react'
import { Container, NavContainer } from "./Footer.style"
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
        <><Container>
            <div className="footer-text">© 2023 Redberry CRM</div>

            <NavContainer>
                <Link href='/Tos'>
                    <div className='footer-text2'>Terms of Service</div>
                </Link>
            </NavContainer><Link href="https://www.linkedin.com/company/redberry-crm" passHref target='_blank'>

                <Image src="icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </Link>
        </Container>
        </>
    )
}

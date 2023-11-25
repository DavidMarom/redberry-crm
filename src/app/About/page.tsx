"use client";

import React from 'react';
import { Card01 } from '@/components';
import Link from 'next/link';

const AboutPage = () => {
    return (
        <div>
            <h1>About</h1>
            <p>Redberry is still in development, here you can look into the development process:</p>
            <Card01>
                <div>
                    <p className='inline'>Figma: </p>
                    <Link href="https://www.figma.com/file/19hfxYoVxVRFsIxa25tEj4/Redberry?type=design&node-id=1%3A4&mode=design&t=yRW6OUvT6h3mhpFL-1"
                        target="_blank"
                        passHref>
                        Click here
                    </Link>
                </div>
                
            </Card01>
        </div>
    );
};

export default AboutPage;

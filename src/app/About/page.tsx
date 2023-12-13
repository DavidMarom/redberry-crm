"use client";

import React from 'react';
import { Card01 } from '@/components';
import Link from 'next/link';
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react';

const AboutPage = () => {
    return (
        <div>
            <h1>About</h1>

            <p>Redberry is still in development, here you can look into the development process:</p>

            <Card className="w-full ">
                <CardHeader className="flex gap-3">

                    <div className="flex flex-col">
                        <p className="text-md">Project Resources : </p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <Link href="https://www.figma.com/file/19hfxYoVxVRFsIxa25tEj4/Redberry?type=design&node-id=1%3A4&mode=design&t=yRW6OUvT6h3mhpFL-1"
                        target="_blank"
                        passHref>
                        Figma file - Click here
                    </Link>
                </CardBody>

            </Card>
        </div >
    );
};

export default AboutPage;

"use client";

import React from 'react';
import { Card01 } from '@/components';
import Link from 'next/link';

const AboutPage = () => {
    return (
        <div>
            <h1>Join the development team!</h1>
            <div className='row'>
                <Card01 height='500px'>
                    <h2>Want to join this project?</h2>
                    <p>🚀 This project was setup using Next.js 14, TypeScript and AppRouter</p>
                    <div className='v-spacer' />
                    <h3>Tech Stack</h3>
                    <div className='pad-r font-s'>
                        <ul>
                            <li>Next.js</li>
                            <li>Typescript</li>
                            <li>TailwindCSS</li>
                            <li>MongoDB</li>
                            <li>Zod</li>
                            <li>React Hook Form</li>
                            <li>Zustand</li>
                            <li>Styled Components</li>
                        </ul>
                    </div>
                    <div className='v-spacer' />
                    <h3>Tools and Workflow</h3>
                    <div className='pad-r font-s'>
                        <ul>
                            <li>Vercel</li>
                            <li>Jira</li>
                            <li>Figma</li>
                            <li>Github</li>
                            <li>Storybook</li>
                        </ul>
                    </div>
                </Card01 >
                <Card01 height="500px">
                    <h2>Contact:</h2>
                    <Link className="link" href="https://discord.gg/b4vaCHYyPr">
                        <p>👉 Join us on Discord!</p>
                    </Link>
                    <div className='v-spacer2' />
                    <h2>Resources:</h2>
                    <Link className="link" href="https://github.com/DavidMarom/redberry-crm">GitHub</Link>
                    <div className='v-spacer' />
                    <div className='v-spacer' />
                    <div className='v-spacer' />
                    <div className='v-spacer' />
                </Card01>
            </div>
        </div>
    );
};

export default AboutPage;

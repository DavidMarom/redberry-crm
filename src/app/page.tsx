"use client"
import { CardContent } from '@mui/material';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import Link from 'next/link';

export default function Home() {

  return (
    <div>
      <h1>Overview</h1>
      <div className='flex flex-col gap-2 p-4'>
        <Card >
          <CardHeader>
            <h2>Want to join this project?</h2>

          </CardHeader>
          <CardBody>
            <Divider />
            <h3>Tech Stack</h3>
            <div className='p-2 font-s '>
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
            <Divider />
            <h3>Tools and Workflow</h3>
            <div className='p-2 font-s'>
              <ul>
                <li>Vercel</li>
                <li>Jira</li>
                <li>Figma</li>
                <li>Github</li>
                <li>Storybook</li>
              </ul>
            </div>
          </CardBody>
        </Card >
        <Card >
          <CardHeader>
            <h2>Contact:</h2>
          </CardHeader>
          <CardBody>
            <Divider />
            <Link className="link" href="https://discord.gg/b4vaCHYyPr">
              <p>👉 Join us on Discord!</p>
            </Link>
            <Divider />
            <h2>Resources:</h2>
            <Link className="link" href="https://github.com/DavidMarom/redberry-crm">GitHub</Link>
          </CardBody>
        </Card >
      </div>
    </div >
  )
}

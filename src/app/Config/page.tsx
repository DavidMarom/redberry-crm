"use client";

import React from 'react';
import { Card01 } from '@/components';
import Link from 'next/link';

const AboutPage = () => {
    return (
        <div>
            <h1>Config</h1>
            <br />
            <h2>Your business details:</h2>
            <p>Name:</p>
            <p>Phone number:</p>
            <p>Address:</p>
            
            <br />
            <h2>Preferences:</h2>
            <p>Allow beta features:</p>

        </div>
    );
};

export default AboutPage;

"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { Sidebar } from './'
import { Inter } from 'next/font/google'


interface LayoutProps { children: ReactNode }

const Layout: React.FC<LayoutProps> = ({ children }) => {
    console.log('Layout.tsx');

    return (
        <div className="row">
            <div>
                {/* { loggedIn ? <Sidebar /> : null } */}
            </div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {children}
            </main>

        </div>
    );
};

export default Layout;

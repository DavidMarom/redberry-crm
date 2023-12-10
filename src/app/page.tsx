"use client"
import React from 'react';
import { Card01, Col } from '@/components';
import PieChart from './PieChart';

export default function Home() {
  return (
    <div>
      <h1>Overview</h1>
      <br />
      <Card01>
        <PieChart />
      </Card01>
    </div>
  )
}

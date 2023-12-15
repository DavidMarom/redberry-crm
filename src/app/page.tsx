"use client"
import React from 'react';
import { Card01 } from '@/components';
import PieChart from './PieChart';
import { countStatus } from '@/utils/contactsUtils';

export default function Home() {
  return (
    <div>
      <h1>Overview</h1>
      <br />
      <Card01>
        {localStorage.getItem('contacts') ? <PieChart countData={countStatus(JSON.parse(localStorage.getItem('contacts') ?? ''))} /> : <h3>No data</h3>}
      </Card01>
    </div>
  )
}

"use client"
import React from 'react';
import { Card01 } from '@/components';
import PieChart from './PieChart';
import { ContactsType } from '@/types';

export default function Home() {

  const countStatus = (contacts: ContactsType) => {
    let statusCount = [0, 0, 0];
    contacts.forEach((contact: any) => {
      if (contact.status === 'Blocked') {
        statusCount[0]++;
      } else if (contact.status === 'Active') {
        statusCount[1]++;
      } else if (contact.status === 'Inactive') {
        statusCount[2]++;
      }
    })
    return statusCount;
  }

  return (
    <div>
      <h1>Overview</h1>
      <br />
      <Card01>
        <PieChart countData={countStatus(JSON.parse(localStorage.getItem('contacts') ?? ''))} />
      </Card01>
    </div>
  )
}

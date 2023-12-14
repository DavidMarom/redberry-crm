"use client"
import React, { useEffect, useState } from 'react';
import { Card01 } from '@/components';
import PieChart from './PieChart';

export default function Home() {

  const [contacts, setContacts] = useState([]);
  const [pieData, setPieData] = useState([0, 0, 0]);

  const countStatus = (contacts: any) => {
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

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    
      setPieData(countStatus(JSON.parse(contacts ?? '')))
    
  }, []);

  return (
    <div>
      <h1>Overview</h1>
      <br />
      <Card01>
        <PieChart countData={pieData}/>
      </Card01>
    </div>
  )
}

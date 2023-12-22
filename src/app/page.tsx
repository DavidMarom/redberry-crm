"use client"
import React, { useEffect, useState } from 'react';
import { Card01 } from '@/components';
import PieChart from './PieChart';
import { countStatus } from '@/utils/contactsUtils';
import { getContactsByOwner } from "../services/contacts";
import { ContactsType } from '@/types';

export default function Home() {
  const [contacts, setContacts] = useState<ContactsType>([]);
  const user = localStorage.getItem("user");
  const uid = user ? JSON.parse(user).uid : null;

  useEffect(() => {
    if (localStorage.getItem("contacts") != null) { setContacts(JSON.parse(localStorage.getItem("contacts") ?? "")) }
    const lastFetch = localStorage.getItem('lastFetch');
    if (lastFetch === null) { localStorage.setItem("lastFetch", Date.now().toString()) }

    if (lastFetch && (Date.now() - parseInt(lastFetch)) > 6000) {
      localStorage.setItem("lastFetch", Date.now().toString());
      getContactsByOwner(uid).then((response: ContactsType) => {
        setContacts(response);
        localStorage.setItem("contacts", JSON.stringify(response));
      });
    }
  }, []);

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

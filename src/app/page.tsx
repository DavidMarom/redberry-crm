"use client"
import React, { useEffect } from 'react';
import { Card01 } from '@/components';
import PieChart from './PieChart';
import { countStatus } from '@/utils/contactsUtils';
import { getContactsByOwner } from "../services/contacts";
import { ContactsType } from '@/types';
import useContactsStore from '@/store/contacts';
import { dataExpired, updateLastFetch, setToStorage, getFromStorage } from '@/utils/utils';

export default function Home() {
  const setContacts = useContactsStore(state => state.setContacts);
  const contacts = useContactsStore(state => state.contacts);

  const user = getFromStorage("user");

  useEffect(() => {
    if (getFromStorage("contacts")) { setContacts(getFromStorage("contacts") ?? "") }
    const lastFetch = localStorage.getItem('lastFetch');
    if (lastFetch === null) { updateLastFetch() }

    if (dataExpired()) {
      updateLastFetch();
      getContactsByOwner(user.uid).then((response: ContactsType) => {
        setContacts(response);
        setToStorage("contacts", response);
      });
    }
  }, []);

  return (
    <div>
      <h1>Overview</h1>
      <br />
      <Card01>
        {<PieChart countData={countStatus(contacts)} /> || <h3>No data</h3>}
      </Card01>
    </div>
  )
}

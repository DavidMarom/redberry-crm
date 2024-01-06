"use client"
import React, { useEffect } from 'react';
import { Card01 } from '@/components';
import PieChart from './PieChart';
import { countStatus } from '@/utils/contactsUtils';
import { getContactsByOwner } from "../services/contacts";
import { ContactsType } from '@/types';
import useContactsStore from '@/store/contacts';
import { useRouter } from 'next/navigation';
import { dataExpired, updateLastFetch, setToStorage, getFromStorage } from '@/utils/utils';
import { Ads } from './Ads';

export default function Home() {
  const setContacts = useContactsStore(state => state.setContacts);
  const contacts = useContactsStore(state => state.contacts);
  const user = getFromStorage("user");
  const router = useRouter();

  useEffect(() => {
    if (getFromStorage("contacts")) { setContacts(getFromStorage("contacts")) }

    if (dataExpired()) {
      updateLastFetch();
      getContactsByOwner(user.uid).then((response: ContactsType) => {
        setContacts(response);
        setToStorage("contacts", response);
      });

      if (getFromStorage("contacts") && getFromStorage("contacts").length === 0) { router.push('/Contacts') }
    }
  }, []);

  return (
    <div className="page-container2">
      <h1>Overview</h1>
      <div className='row-between align-start'>
        <Card01 paddingright="0px" marginright="0px" width={"500px"}>{<PieChart countData={countStatus(contacts)} /> || <h3>No data</h3>}</Card01>
        <Ads />
      </div>
    </div>
  )
}

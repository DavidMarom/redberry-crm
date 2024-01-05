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
import { ServiceCard } from '@/components';

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
    <div>
      <h1>Overview</h1>

      <Card01>
        {<PieChart countData={countStatus(contacts)} /> || <h3>No data</h3>}
      </Card01>
      <div className="grid-container">

        <ServiceCard title="aaaa" text="bbbb" img="https://www.tozar-fin.co.il/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-11-at-11.18.54.jpeg" />

      </div>
    </div>
  )
}

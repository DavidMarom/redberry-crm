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
    <div className="page-container2">
      <h1>Overview</h1>
      <div className='row-between align-start'>

        <Card01 paddingright="0px" marginright="0px" width={"500px"}>{<PieChart countData={countStatus(contacts)} /> || <h3>No data</h3>}</Card01>
        <div className="ads-grid-container">
          <ServiceCard
            title="יעוץ פיננסי לעסקים קטנים"
            text="אתם עסק חדש שרוצה להצליח או עסק קיים שמחפש לחזור לשיגרה?"
            img="https://www.tozar-fin.co.il/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-11-at-11.18.54.jpeg"
            url="https://www.tozar-fin.co.il/%D7%A2%D7%9E%D7%95%D7%93-%D7%A0%D7%97%D7%99%D7%AA%D7%94-%D7%99%D7%99%D7%A2%D7%95%D7%A5-%D7%95%D7%9C%D7%99%D7%95%D7%95%D7%99-%D7%A2%D7%A1%D7%A7%D7%99/"
          />
          <ServiceCard
            title="צ׳יק משלוחים"
            text="משלוחים לעסקים קטנים"
            img="https://chikdelivery.co.il/wp-content/uploads/2022/09/%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%A9%D7%9C-%D7%A9%D7%9C%D7%99%D7%97-e1683627748801.png"
            url='https://chikdelivery.co.il/%D7%9E%D7%A9%D7%9C%D7%95%D7%97%D7%99%D7%9D-%D7%9C%D7%A2%D7%A1%D7%A7-%D7%A7%D7%98%D7%9F/'
          />

        </div>
      </div>
    </div>
  )
}

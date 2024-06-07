"use client"
import React, { useState } from 'react';
import { Card01 } from '@/components';
import PieChart from './PieChart';
import { countStatus } from '@/utils/contactsUtils';
import { getContactsByOwner } from "../services/contacts";
import { getFromStorage } from '@/utils/utils';
import { Ads } from './Ads';
import { useQuery } from "react-query";
import { getRecommendation } from '@/services/openai';
import { Button } from "@nextui-org/react";
import Link from 'next/link'


export default function Home() {
  const user = getFromStorage("user");
  const { data, isLoading, isFetching, error } = useQuery("contacts", () => getContactsByOwner(user.uid));
  const notes = data?.map((contact: any) => { if (contact.status === "Awaiting Call") { return contact.name + ' - ' + contact.note } });
  const filteredArray = notes?.filter((element: any) => element !== undefined);
  const [recommendation, setRecommendation] = useState("");

  let size = "100%";
  if (window.innerWidth > 1024) { size = "40%" }

  return (
    <div className="page-container2">
      <h1>Overview</h1>

      <div className='row-between align-start'>
        <Card01 paddingright="0px" paddingleft='0px' marginright="20px" width={size}>
          {(data && data.length > 0) && <PieChart countData={countStatus(data)} />}
          {(!data || data.length === 0) &&
            <div>
              <div className='row-center'>No contacts yet</div>
              <div className='row-center link'><Link href='/Contacts'>Add a contact to get started</Link></div>
            </div>
          }

        </Card01>

        <Card01 width='100%' paddingright='20px'>
          <h2>AI Recommendations</h2>
          <p>Get recommendations based on your notes for contacts under "Awaiting Call"</p>
          <br />
          {recommendation === '' ?
            <Button
              color="primary"

              onClick={() => {
                setRecommendation("Loading...")
                getRecommendation(filteredArray).then((res) => { setRecommendation(res.content.replace(/(?:\r\n|\r|\n)/g, '<br>')) })

              }}>
              Prioritize my tasks!
            </Button> : null}
          <div dangerouslySetInnerHTML={{ __html: recommendation }} />
        </Card01>
      </div>
    </div >
  )
}

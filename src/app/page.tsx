"use client"
import React from 'react';
import { Card01 } from '@/components';
import PieChart from './PieChart';
import { countStatus } from '@/utils/contactsUtils';
import { getContactsByOwner } from "../services/contacts";
import { useRouter } from 'next/navigation';
import { getFromStorage } from '@/utils/utils';
import { Ads } from './Ads';
import { useQuery } from "react-query";
import { getRecommendation } from '@/services/openai';

export default function Home() {
  const user = getFromStorage("user");
  const router = useRouter();
  const { data, isLoading, isFetching, error } = useQuery("contacts", () => getContactsByOwner(user.uid));
  const notes = data?.filter((contact: any) => { if (contact.status === "Awaiting Call") { return 'aaa' } });
console.log(notes)
  return (
    <div className="page-container2">
      <h1>Overview</h1>

      <div className='row-between align-start'>
        <Card01 paddingright="0px" marginright="0px" width={"500px"}>
          {(data && data.length > 0) && <PieChart countData={countStatus(data)} />}
          {(!data || data.length === 0) && <div className='row-center'>No contacts yet</div>}
        </Card01>
        <button onClick={() => { getRecommendation(notes) }}>Call</button>
        <Ads />
      </div>
    </div>
  )
}

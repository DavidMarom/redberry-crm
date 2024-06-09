"use client"
import React, { useState } from 'react';
import { Card01 } from '@/components';
import Graph01 from '@/app/Overview/Graph01';
import { getContactsByOwner } from "../services/contacts";
import { getFromStorage } from '@/utils/utils';
import { useQuery } from "react-query";
import { getRecommendation } from '@/services/openai';
import { Button } from "@nextui-org/react";

export default function Home() {
  const user = getFromStorage("user");
  const { data, isLoading, isFetching, error } = useQuery("contacts", () => getContactsByOwner(user.uid));
  const notes = data?.map((contact: any) => { if (contact.status === "Awaiting Call") { return contact.name + ' - ' + contact.note } });
  const filteredArray = notes?.filter((element: any) => element !== undefined);
  const [recommendation, setRecommendation] = useState("");

  return (
    <div className="page-container2">
      <h1>Overview</h1>

      <div className='row-between align-start'>
        <Graph01 data={data} />

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

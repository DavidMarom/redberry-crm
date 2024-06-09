'use client';

import React, { useState } from 'react';
import { getRecommendation } from '@/services/openai';
import { Card01 } from '@/components';
import { Button } from "@nextui-org/react";


const Graph01 = ({ notes }: { notes: any }) => {

    const [recommendation, setRecommendation] = useState("");
    const filteredArray = notes?.filter((element: any) => element !== undefined);

    return (
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
    )
}

export default Graph01;